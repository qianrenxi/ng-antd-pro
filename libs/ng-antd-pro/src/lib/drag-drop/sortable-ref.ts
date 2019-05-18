import { ElementRef, NgZone, Renderer2, EmbeddedViewRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DragDropRegistryService } from './drag-drop-registry.service';
import { DraggableRef, DragHelperTemplate } from './draggable-ref';
import { Subscription, Subject } from 'rxjs';
import * as _ from 'lodash';
import { coerceElement } from '@angular/cdk/coercion';
import { moveItemInArray } from './drag-utils';

interface CachedItemPosition {
    /** Instance of the drag item. */
    item: SortableItemRef;
    /** Dimensions of the item. */
    clientRect: ClientRect;
    /** Amount by which the item has been moved since dragging started. */
    offset: number;
}

let ID = 0;

export interface SortableItemRef extends DraggableRef { };

export class SortableRef<T = any> {

    private _items: SortableItemRef[];
    // private _childSortables: SortableRef[];

    private _accept: string | ((dragRef, dropRef) => boolean);
    scope: string;

    private _placeholderWrapper: HTMLElement;
    private _placeholderWrapperRef: EmbeddedViewRef<any> | null;
    private _placeholderWrapperTemplate?: DragHelperTemplate | null;

    private _anyDragStartSubscription: Subscription;
    private _anyDragStopSubscription: Subscription;
    private _dragSubscriptions: Subscription[] = [];

    private _clientRects: ClientRect[];

    private _itemPositions: CachedItemPosition[];

    private _siblings: SortableRef[];
    private _activeSiblings: SortableRef[];
    private _isActivated: boolean = false;

    get entered(): boolean {
        return this._entered;
    }
    private _entered: boolean = false;

    axis: 'x' | 'y';
    // floating: boolean = false;
    sort: boolean = true;

    _hasStarted: boolean = false;

    scroll: boolean = true;
    // 保持唯一，需要传入 Dom 元素的ID
    scrollHookSelector: string;
    // TODO change to config
    scrollSensitivity: number = 20;
    scrollSpeed: number = 20;

    instance: T;

    beforStarted = new Subject<any>();

    activated$ = new Subject<any>();
    /** Before stop */
    released$ = new Subject<any>();
    /** Maybe triggered during sorting、removing、receiving */
    changed$ = new Subject<any>();
    deactivated$ = new Subject<any>();
    /** out */
    leaved$ = new Subject<any>();

    /** over the container at first time, even if it nerver being moved out */
    entered$ = new Subject<any>();
    received$ = new Subject<any>();
    removed$ = new Subject<any>();
    sorting$ = new Subject<any>();
    started$ = new Subject<any>();
    /** same to stopped  */
    ended$ = new Subject<any>();
    /** same as updated of jquery-ui */
    dropped$ = new Subject<{
        item: SortableItemRef,
        container: SortableRef,
        currentIndex: number,
        previousContainer: SortableRef,
        previousIndex: number,
        isPointerOverContainer: boolean,
    }>();

    id = ++ID;

    constructor(
        public element: ElementRef<HTMLElement> | HTMLElement,
        private _document: Document,
        private _ngZone: NgZone,
        private _viewportRuler: ViewportRuler,
        private _dragDropRegistry: DragDropRegistryService<any, any>,
        private renderer: Renderer2,
    ) {
        this._anyDragStartSubscription = _dragDropRegistry.startDragging$.subscribe(dragRef => this._anyDragStarted(dragRef));
        this._anyDragStopSubscription = _dragDropRegistry.stopDragging$.subscribe(dragRef => this._anyDragStoped(dragRef));

        // coerceElement(element).append(`${++this.id}`);
    }

    withItems(items: SortableItemRef[]): this {
        this._items = items;
        return this;
    }

    withAccept(accept: string | ((dragRef, dropRef) => boolean)): this {
        this._accept = accept;
        return this;
    }
    // withChildren(children: SortableRef[]): this {
    //     this._childSortables = children;
    //     return this;
    // }

    connectWith(sortables: SortableRef[]): this {
        this._siblings = sortables.slice();
        return this;
    }

    withPlaceholderWrapperTemplate(template: DragHelperTemplate | null): this {
        this._placeholderWrapperTemplate = template;
        return this;
    }

    despose() {
        this._anyDragStartSubscription.unsubscribe();
        this._anyDragStopSubscription.unsubscribe();
        this._removeDragSubscriptions();

    }

    getIndexOfItem(item: SortableItemRef): number {
        return _.indexOf(this._items, item);
    }

    isActivated(): boolean {
        return !!this._isActivated;
    }

    markAsActivated(event) {
        this._isActivated = true;
        this.activated$.next(event);
    }

    markAsDeactivated(event) {
        this._isActivated = false;
        this.deactivated$.next(event);
    }

    isFloating(): boolean {
        return this.axis === 'x' || (!_.isEmpty(this._items) && this._isFloating(this._items[0].getRootElement()));
    }
    // contains(target: SortableRef): boolean {
    //     return _.includes(this._childSortables, target);
    // }

    enter(event, initContainer) {
        // this.beforStarted.next();
        // console.log(this.id, "entered")

        // TODO: extract to a method
        const { source, pointerPosition, delta }: { source: SortableItemRef, pointerPosition: Point, delta } = event;

        // TODO emit change,
        // TODO shuld emit change after enter, so 应该调整时间及相应处理逻辑的先后顺序
        // 但是，jQuery UI也是先触发了 change 然后是over的，值得商榷

        this._entered = true;
        this.entered$.next({
            ...event,
            target: this
        });

        if (!_.includes(this._items, source)) {
            this.beforStarted.next();

            this._hasStarted = true;

            this._cacheItemPositions(source);

            this._dragSubscriptions.push(
                source.moved.subscribe((event) => {
                    // console.log(this._id, 'sorting')
                    this._sort(event);
                }),
                source.ended.subscribe((event) => {
                    this._handleDragEnd(event, initContainer);
                })
            );
        }
    }

    leave(event) {
        this._entered = false;
        // this._hasStarted = false;
        // console.log(this.id, "leaving")

        const { source }: { source: SortableItemRef } = event;
        if (!_.includes(this._items, source)) {
            this._removeDragSubscriptions();
            // this._destoryPlaceholderWrapper();
        }
    }

    cancel() {
        if (!this._hasStarted) {
            this._entered = false;
            this._destoryPlaceholderWrapper();
        }
    }

    private _anyDragStarted(dragRef: SortableItemRef) {
        // console.log('start...')
        // TODO: fix to accept connected items
        if (!_.includes(this._items, dragRef)) {
            return;
        }

        // Call to create placeholder
        // dragRef.initDragHelpers();

        this._removeDragSubscriptions();
        this._dragSubscriptions.push(
            dragRef.started.subscribe((event) => this._handleDragStart(event)),
            dragRef.moved.subscribe((event) => this._handleDragMove(event)),
            // dragRef.released.subscribe((event) => this._handleDragRelease(event)),
            dragRef.ended.subscribe((event) => this._handleDragEnd(event)),
        );
    }

    private _isAccept(dragRef): boolean {
        const accept = this._accept;
        let isAccept = false;
        if (_.isString(accept)) {
            const rootElement = coerceElement(dragRef.getRootElement());
            const element = coerceElement(dragRef.element);

            isAccept = isElementMatchSelector(rootElement, accept) || isElementMatchSelector(element, accept);
        } else if (_.isFunction(accept)) {
            isAccept = accept(dragRef, this);
        }

        return isAccept;
    }

    private _anyDragStoped(dragRef: SortableItemRef) {
        // console.log('stop...')
        if (!this._hasStarted) {
            this._removeDragSubscriptions();
        }
    }


    private _handleDragStart(event) {
        this.beforStarted.next();

        this._hasStarted = true;
        this._entered = true;
        // TODO: Filter active siblings
        this._activeSiblings = this._siblings;
        this._activeSiblings.forEach(it => it.markAsActivated(event));

        const { source } = event;
        source.initDragHelpers();

        this._cacheItemPositions();
    }

    private _handleDragMove(event) {
        const innermostContainer = this._contactContainers(event);

        // scroll
        if ((!!innermostContainer && innermostContainer.scroll) || this.scroll) {
            if (this._scroll(event)) {
                if (!!innermostContainer) {
                    innermostContainer._cacheItemPositions(event.source);
                }
            }
        }

        // this._sort(event);
        // expect must be found
        if (innermostContainer === this) {
            this._sort(event);
        }
    }

    private _handleDragRelease(event) {
        // const {source }: {source: SortableItemRef} = event;
        // const previousContainer = this;
        // const previousIndex = previousContainer.getIndexOfItem(source);

        // const currentIndex = _.findIndex(this._itemPositions, (it) => it.item === source);

    }

    private _handleDragEnd(event, initialContainer?) {
        const { source }: { source: SortableItemRef } = event;
        const previousContainer = initialContainer || this;
        const previousIndex = previousContainer.getIndexOfItem(source);

        const currentIndex = _.findIndex(this._itemPositions, (it) => it.item === source);

        const eventObj = {
            item: source,
            container: this,
            currentIndex: currentIndex,
            previousContainer: previousContainer,
            previousIndex: previousIndex,
            isPointerOverContainer: this._entered,
        };

        // console.log(previousContainer.id, this.id, this._entered)
        // console.log("drop container", this.id, currentIndex, previousIndex, this._entered)
        if (previousContainer === this) {
            // deactivate siblings
            this._siblings.forEach(it => it.markAsDeactivated(event));

            // TODO: isEnterd 不能解决从父级container移动到子级的情况，
            // 需要重构，在合适的情况更新 itemPositions，以 currentIndex === -1 作为移除的唯一判定条件
            // console.log("me", this.id, previousContainer.id, this._entered)
            if (this._entered) {
                // 没有移除本容器
                if (currentIndex === previousIndex) {
                    // 没有移动
                    // this.ended$.next(eventObj); // 稍后统一发出
                } else {
                    // console.log('drop devent')
                    this.dropped$.next(eventObj); // same as update of jquery ui
                }
            } else {
                this.removed$.next(eventObj);
                this.dropped$.next(eventObj);
            }
        } else {
            // console.log("other", this.id, previousContainer.id, this._entered)
            if (this._entered) {
                if (currentIndex >= 0) {
                    this.received$.next(eventObj);
                    this.dropped$.next(eventObj);
                }
            }
        }

        this.ended$.next(eventObj);

        if (previousContainer === this) {
            this._activeSiblings.forEach(it => {
                it.cancel();
            });
        }
        this._destoryPlaceholderWrapper();

        this._hasStarted = false;
        this._entered = false;
        this._removeDragSubscriptions();
    }

    // TODO: 会在拖动过程中频繁调用，但是该方法看起来又很复杂，会不会有性能问题？
    private _contactContainers(event) {
        const { source, pointerPosition, delta }: { source: SortableItemRef, pointerPosition: Point, delta } = event;
        const currentItem = source;
        const currentItemElement = currentItem.getRootElement();

        const containers = _.isEmpty(this._activeSiblings) ? [this] : _.concat(this, this._activeSiblings); // 可能已包含自己，去重...
        // const innermostSibling = this._activeSiblings.find(it => this._intersectsWith(coerceElement(it.element)));
        let innermostContainer: SortableRef = null;
        let innermostIndex = null; // 没有实际的参考价值，目标数组对象是不可控的 

        containers.forEach((container, index) => {
            const containerElement = coerceElement(container.element);
            // Never consider a container that's located within the item itself.
            if (currentItemElement!.contains(containerElement)) {
                return;
            }

            if (this._intersectsWith(container, containerElement, pointerPosition, delta)) {
                // If we've already found a container and it's more "inner" than this, then continue
                if (innermostContainer && containerElement.contains(coerceElement(innermostContainer.element))) {
                    return;
                }

                innermostContainer = container;
                innermostIndex = index;
            } else {
                // container dosen't intersect, emit "out" event if necessary
                if (container.entered) {
                    // mark out of container
                    container.leave(event);
                }
            }
        });

        if (!innermostContainer) {
            return;
        } else {
            containers.forEach((container, index) => {
                const containerElement = coerceElement(container.element);
                // Never consider a container that's located within the item itself.
                if (currentItemElement!.contains(containerElement)) {
                    return;
                }

                // if (this._intersectsWith(container, containerElement, pointerPosition, delta)) {
                //     // If we've already found a container and it's more "inner" than this, then continue
                //     if (innermostContainer && containerElement.contains(coerceElement(innermostContainer.element))) {
                //         container._destoryPlaceholderWrapper();
                //         container._cacheItemPositions();
                //         return;
                //     }

                // }
                if (container !== innermostContainer) {
                    if (container._placeholderWrapper) {
                        container._destoryPlaceholderWrapper();
                    }
                    if (container !== this) {
                        container._cacheItemPositions();
                    } else {
                        this._itemPositions = this._itemPositions && this._itemPositions.filter(it => it.item === source);
                        // container._cacheItemPositions();
                    }
                }
            });
        }

        // if (innermostContainer === this) {
        //     if (!this.entered) {
        //         // TODO: mark enter into the container
        //         // this._entered = true;
        //         this.enter(event, this);
        //     }

        //     // return ;
        // } else {
        if ((!innermostContainer._itemPositions || !innermostContainer._itemPositions.some(it => it.item === source))
            || (innermostContainer === this && !innermostContainer.entered)) {
            // When entering a new container, we will find the item with the least distance and
            // append our item near it

            let itemWithLeastDistance = null;
            let direction = null;
            let leastIndex = null;

            // // if (_.isEmpty(this._items) && !this.dropOnEmpty) {  return false; }

            if (!_.isEmpty(innermostContainer._items)) {
                // const currentItemElement = source.getRootElement();
                let dist = 10000;
                const floating = innermostContainer.isFloating();//innermostContainer.isFloating() || this._isFloating(currentItemElement);
                // const posProperty = floating ? 'left' : 'top';
                // const sizeProperty = floating ? 'width' : 'height';
                // const axis = floating ? 'x' : 'y';

                innermostContainer._items.forEach((item, index) => {
                    const itemElement = item.getRootElement();
                    if (!coerceElement(innermostContainer.element).contains(itemElement)) {
                        return;
                    }

                    if (item === source) {
                        return;
                    }

                    const rect = itemElement.getBoundingClientRect();
                    const c = floating ? rect.left : rect.top;
                    const p = floating ? pointerPosition.x : pointerPosition.y;
                    const s = floating ? rect.width : rect.height;

                    let nearBottom = false;
                    if (p - c > s / 2) {
                        nearBottom = true;
                    }

                    if (Math.abs(p - c) < dist) {
                        dist = Math.abs(p - c);
                        itemWithLeastDistance = item;
                        direction = nearBottom ? 'up' : 'down';
                        leastIndex = index;
                    }

                    // TODO, 优化定位，解决闪动的问题
                    // const intersect = innermostContainer._intersectsWithPointer(itemElement, pointerPosition, delta);

                    // if (!intersect) {
                    //     return;
                    // }

                    // itemWithLeastDistance = item;
                    // direction = intersect === 1 ? 'down' : 'up';
                });
            }

            // console.log(itemWithLeastDistance, direction, leastIndex, innermostContainer._items.length)
            if (itemWithLeastDistance) {
                innermostContainer._rearrange(event, direction, itemWithLeastDistance);
            } else {
                // 可以解决空容器的问题
                innermostContainer._rearrange(event, direction);
            }

            innermostContainer._cacheItemPositions(source);

            const currentIndex = _.findIndex(innermostContainer._itemPositions, (it) => it.item === source);
            // console.log(this.id, 'AAA>>', currentIndex)

            //TODO: 下面这种处理方式不能包括从内向外移动的情况，
            // 在上面的逻辑中， sortItem 可能同时 enter了重叠的多个 sortlist
            // 在enter里层的sortlist时，不会 leave外层的sortlist 
            if (!innermostContainer.entered) {
                innermostContainer.enter(event, this);
            }

        }

        return innermostContainer;
    }

    _scroll(event) {
        const { source, pointerPosition } = event;
        const placeholder = (source as SortableItemRef).getPlaceholder(); // this._getPlaceholder(source);
        const scrollParent = getScrollParent(placeholder) as (HTMLElement | Document);
        const pointerY = pointerPosition.y;
        const pointerX = pointerPosition.x;
        const scrollSensitivity = this.scrollSensitivity || 20;
        const scrollSpeed = this.scrollSpeed || 20;
        let scrolled = false;

        if (!(scrollParent instanceof Document) && scrollParent.tagName !== "HTML") {
            const overflowOffset = getOffset(scrollParent);

            if ((overflowOffset.top + scrollParent.offsetHeight) -
                pointerY < scrollSensitivity) {
                scrollParent.scrollTop = scrollParent.scrollTop + scrollSpeed;
                scrolled = true;
            } else if (pointerY - overflowOffset.top < scrollSensitivity) {
                scrollParent.scrollTop = scrollParent.scrollTop - scrollSpeed;
                scrolled = true;
            }

            if ((overflowOffset.left + scrollParent.offsetWidth) -
                pointerX < scrollSensitivity) {
                scrollParent.scrollLeft = scrollParent.scrollLeft + scrollSpeed;
                scrolled = true;
            } else if (pointerX - overflowOffset.left < scrollSensitivity) {
                scrollParent.scrollLeft = scrollParent.scrollLeft - scrollSpeed;
                scrolled = true;
            }
        } else {
            const docElement = this._document.documentElement;
            if (pointerY - docElement.scrollTop < scrollSensitivity) {
                docElement.scrollTop = docElement.scrollTop - scrollSpeed;
                scrolled = true;
            } else if (window.innerHeight - (pointerY - docElement.scrollTop) < scrollSensitivity) {
                docElement.scrollTop = docElement.scrollTop + scrollSpeed;
                scrolled = true;
            }

            if (pointerX - docElement.scrollLeft < scrollSensitivity) {
                docElement.scrollLeft = docElement.scrollLeft - scrollSpeed;
                scrolled = true;
            } else if (window.innerWidth - (pointerX - docElement.scrollLeft) < scrollSensitivity) {
                docElement.scrollLeft = docElement.scrollLeft + scrollSpeed;
                scrolled = true;
            }
        }

        return scrolled;
    }

    _sort(event) {
        if (!this.enter) {
            return;
        }

        if (!this.sort) {
            return;
            // TODO: sccept the item, append it to the list 
        }

        const { source, pointerPosition, delta }: { source: SortableItemRef, pointerPosition: { x: number, y: number }, delta: any } = event;

        // const currentIndex = this._items.indexOf(source);
        // const currentRect = this._clientRects[currentIndex];
        // const placeholder = source.getPlaceholder();

        // this._clientRects.slice()
        this._items.slice().forEach((item, index) => {
            const itemElement = item.getRootElement();
            const intersection = this._intersectsWithPointer(itemElement, pointerPosition, delta);

            if (!intersection) {
                return;
            }

            if (item === source) {
                return;
            }

            // if ((intersection === 1 ? placeholder.previousSibling : placeholder.nextSibling) === itemElement) {
            //     return;
            // }

            const direction = intersection === 1 ? 'down' : 'up';

            if (this._intersectsWithSides(itemElement, pointerPosition, delta)) {
                this._rearrange(event, direction, item);

                const currentIndex = _.findIndex(this._itemPositions, (it) => it.item === source);
                // console.log(this.id, currentIndex, index)
                const newIndex = index;
                moveItemInArray(this._itemPositions, currentIndex, newIndex);
            }

            // TODO: Emit sorting
        });

    }

    private _cacheItemPositions(outerItem?) {
        const isHorizontal = this.isFloating();
        this._itemPositions = (outerItem ? [...(this._items.filter(it => it !== outerItem)), outerItem] : this._items).map(item => {
            const elementToMeasure = this._dragDropRegistry.isDragging(item) ?
                this._getPlaceholder(item) :
                item.getRootElement();
            const clientRect = elementToMeasure.getBoundingClientRect();
            // console.log('rect', clientRect)

            return <CachedItemPosition>{
                item: item,
                offset: 0,
                clientRect: {
                    top: clientRect.top,
                    right: clientRect.right,
                    bottom: clientRect.bottom,
                    left: clientRect.left,
                    width: clientRect.width,
                    height: clientRect.height,
                }
            };
        }).sort((a, b) => {
            // console.log(a.clientRect.left - b.clientRect.left, a.clientRect, b.clientRect)
            // console.log((a.clientRect.left - b.clientRect.left) || (a.clientRect.top - b.clientRect.top))
            // return (a.clientRect.top - b.clientRect.top)
            return isHorizontal ?
                ((a.clientRect.left - b.clientRect.left) || (a.clientRect.top - b.clientRect.top)) :
                ((a.clientRect.top - b.clientRect.top) || (a.clientRect.left - b.clientRect.left));
        });
    }

    private _rearrange(event, direction, item?: SortableItemRef, ) {
        const { source }: { source: SortableItemRef } = event;
        const placeholder = this._getPlaceholder(source);

        if (!!item) {
            const itemElement = item.getRootElement();
            itemElement.parentNode.insertBefore(placeholder, (direction === "down" ? itemElement : itemElement.nextSibling))
        } else {
            const containerElement = coerceElement(this.element);
            containerElement.appendChild(placeholder);
        }
    }

    private _isOverAxis(x, reference, size) {
        return (x >= reference) && (x < (reference + size));
    }

    private _isFloating(item: HTMLElement) {
        const itemStyle = window.getComputedStyle(item);
        return (/left|right/).test(itemStyle.cssFloat) ||
            (/inline|table-cell/).test(itemStyle.display);
    }

    // Be careful with the following core functions
    private _intersectsWith(container: SortableRef, item: HTMLElement, pointerPosition: Point, delta: any) {
        // return this._intersectsWithPointer(item, pointerPosition, delta);
        const rect = coerceElement(container.element).getBoundingClientRect();
        const isOverElementHeight = (this.axis === 'x') || this._isOverAxis(pointerPosition.y, rect.top, rect.height);
        const isOverElementWidth = (this.axis === 'y') || this._isOverAxis(pointerPosition.x, rect.left, rect.width);

        const isOverElement = isOverElementHeight && isOverElementWidth;

        // if (this.tolerance === "pointer") {
        return isOverElement;
        // } else { 通过 Preview 计算是否交叉 }
    }

    private _intersectsWithPointer(item: HTMLElement, pointerPosition: Point, delta: any) {
        const rect = item.getBoundingClientRect();
        const isOverElementHeight = (this.axis === 'x') || this._isOverAxis(pointerPosition.y, rect.top, rect.height);
        const isOverElementWidth = (this.axis === 'y') || this._isOverAxis(pointerPosition.x, rect.left, rect.width);

        const isOverElement = isOverElementHeight && isOverElementWidth;

        if (!isOverElement) {
            return false;
        }

        // const { verticalDirection, horizontalDirection}: { x as  }
        const verticalDirection = delta.y;
        const horizontalDirection = delta.x;

        const floating = this.isFloating();// this.axis === 'x' || this._isFloating(item);
        return floating ?
            ((horizontalDirection === 1 || verticalDirection === 1) ? 2 : 1) :
            (verticalDirection && (verticalDirection === 1 ? 2 : 1));
    }

    private _intersectsWithSides(item: HTMLElement, pointerPosition: Point, delta: any) {
        const rect = item.getBoundingClientRect();
        const isOverBottomHalf = this._isOverAxis(pointerPosition.y, rect.top + (rect.height / 2), rect.height);
        const isOverRightHalf = this._isOverAxis(pointerPosition.x, rect.left + (rect.width / 2), rect.width);
        const verticalDirection = delta.y;
        const horizontalDirection = delta.x;

        const floating = this.isFloating(); // this.axis === 'x' || this._isFloating(item);

        if (floating && horizontalDirection) {
            return (horizontalDirection === 1 && isOverRightHalf) ||
                (horizontalDirection === -1 && !isOverRightHalf);
        } else {
            return verticalDirection &&
                ((verticalDirection === 1 && isOverBottomHalf) ||
                    (verticalDirection === -1 && !isOverBottomHalf));
        }

    }

    private _getPlaceholder(source: SortableItemRef): HTMLElement {
        // Wrapper 只对外部成员生效
        if (_.includes(this._items, source)) {
            if (source.mode === 'clone') {
                return source.getRootElement();
            } else {
                return source.getPlaceholder();
            }
        }

        let wrapper = this._placeholderWrapper;
        if (!wrapper && !!this._placeholderWrapperTemplate) {
            wrapper = this._placeholderWrapper = this._createPlaceholderWrapperElement();
        }

        if (!wrapper) {
            return source.getPlaceholder();
        }

        wrapper.appendChild(source.getPlaceholder());
        return wrapper;

    }

    private _createPlaceholderWrapperElement() {
        const wrapperConfig = this._placeholderWrapperTemplate;
        const wrapperTemplate = wrapperConfig ? wrapperConfig.template : null;
        let wrapper: HTMLElement;

        if (wrapperTemplate) {
            this._placeholderWrapperRef = wrapperConfig!.viewContainer.createEmbeddedView(
                wrapperTemplate,
                wrapperConfig!.context
            );
            wrapper = this._placeholderWrapperRef.rootNodes[0] as HTMLElement;
            wrapper.parentNode.removeChild(wrapper);
        } else {
            // placeholder = deepCloneNode(this._rootElement);
        }

        wrapper.classList.add('np-drag-placeholder-wrapper');
        return wrapper;
    }

    private _destoryPlaceholderWrapper() {
        if (this._placeholderWrapper) {
            removeElement(this._placeholderWrapper);
        }

        if (this._placeholderWrapperRef) {
            this._placeholderWrapperRef.destroy();
        }

        this._placeholderWrapper = this._placeholderWrapperRef = null!;
    }

    private _removeDragSubscriptions() {
        if (this._dragSubscriptions.length) {
            this._dragSubscriptions.forEach(it => it.unsubscribe());
        }
    }
}

interface Point {
    x: number;
    y: number;
}

function distanct(rectA: ClientRect, rectB: ClientRect) {
    return Math.sqrt(
        Math.pow(rectB.top - rectA.top, 2) + Math.pow(rectB.left - rectA.left, 2)
    );
}

function isElementMatchSelector(element: HTMLElement, selector: string) {
    return element.matches ? element.matches(selector) :
        (element as any).msMatchesSelector(selector);
}


/**
 * Helper to remove an element from the DOM and to do all the necessary null checks.
 * @param element Element to be removed.
 */
function removeElement(element: HTMLElement | null) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function getScrollParent(element: HTMLElement, includeHidden?: boolean) {
    const position = window.getComputedStyle(element).position;
    const excludeStaticParent = position === "absolute";
    const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
    const scrollParent = getElementMatchParent(element, (parent) => {
        const parentCss = window.getComputedStyle(parent);
        if (excludeStaticParent && parentCss.position === "static") {
            return false;
        }
        return overflowRegex.test(parentCss.overflow + parentCss.overflowY +
            parentCss.overflowX);
    });

    return position === "fixed" || !scrollParent ?
        (element.ownerDocument || document) :
        scrollParent;
}

function getElementMatchParent(element: HTMLElement, predicate: (element: HTMLElement) => boolean) {
    const parent = element.parentElement;
    if (!parent) {
        return null;
    }

    const isMatch = predicate(parent);

    if (isMatch) {
        return parent;
    }

    return getElementMatchParent(parent, predicate);
}

function getOffset(element: HTMLElement): { top: number, left: number } {
    if (!element) {
        return;
    }

    const ownerDocument = element.ownerDocument;
    if (!ownerDocument) {
        return;
    }

    const docElement = ownerDocument.documentElement;
    if (!docElement.contains(element)) {
        return { top: 0, left: 0 };
    }

    const elRect = element.getBoundingClientRect();
    const win = window; // jquery 中有一堆...

    return {
        top: elRect.top + win.pageYOffset - docElement.clientTop,
        left: elRect.left + win.pageXOffset - docElement.clientLeft
    };

}