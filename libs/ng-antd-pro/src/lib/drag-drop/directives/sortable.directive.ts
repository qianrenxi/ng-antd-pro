import { Directive, ContentChildren, QueryList, AfterContentInit, NgZone, OnDestroy, ElementRef, Inject, Renderer2, Output, EventEmitter, Input, ContentChild, ViewContainerRef, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { pipe, Subject } from 'rxjs';
import { take, takeUntil, startWith, tap } from 'rxjs/operators';

import { SortableItemDirective } from './sortable-item.directive';
import { SortableItemRef, SortableRef } from '../sortable-ref';
import { DragDropRegistryService } from '../drag-drop-registry.service';
import { DragDropService } from '../drag-drop.service';
import * as _ from 'lodash';
import { coerceElement, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DraggableDirective } from './draggable.directive';
import { DraggableRef, DragHelperTemplate } from '../draggable-ref';
import { DragPlaceholderWrapperDirective } from './drag-placeholder-wrapper.directive';

type Selector = string;

@Directive({
  selector: '[npSortable]'
})
export class SortableDirective<S = any> implements AfterContentInit, OnDestroy {
  private static _globalSortables: SortableDirective[] = [];

  private _destroyed = new Subject();

  _sortRef: SortableRef<SortableDirective>;

  @Input('npDropAccept')
  accept: Selector | ((drag: DraggableDirective, drop: SortableDirective) => boolean) = "*";
  @Input('npDropScope') scope: string;
  @Input('npDragSort') sort: boolean = true;

  @Input('npSortAxis') axis: 'x' | 'y';
  @Input('npSortConnectWith') connectWith: string;

  @Input('npSortData') sortData: S;

  @ContentChildren(SortableItemDirective) items: QueryList<SortableItemDirective>;
  // @ContentChildren(SortableDirective) childSortables: QueryList<SortableDirective>;
  @ContentChild(DragPlaceholderWrapperDirective) _placeholderWrapperTemplate: DragPlaceholderWrapperDirective;

  @Output('npSortActivate')
  activated = new EventEmitter<any>();
  /** Before stop */
  @Output('npSortRelease')
  released = new EventEmitter<any>();
  /** Maybe triggered during sorting、removing、receiving */
  @Output('npSortChange')
  changed = new EventEmitter<any>();
  @Output('npSortDeactivate')
  deactivated = new EventEmitter<any>();
  @Output('npSortLeave')
  leaved = new EventEmitter<any>();
  @Output('npSortEntere')
  entered = new EventEmitter<any>();
  @Output('npSortReceive')
  received = new EventEmitter<any>();
  @Output('npSortRemove')
  removed = new EventEmitter<any>();
  @Output('npSortSorting')
  sorting = new EventEmitter<any>();
  @Output('npSortStarte')
  started = new EventEmitter<any>();
  /** same to stopped */
  @Output('npSortEnd')
  ended = new EventEmitter<any>();
  /** same as updated of jquery-ui */
  @Output('npSortDrop')
  dropped = new EventEmitter<any>();

  @HostBinding('class.np-sort-active')
  get bindActivatedClass(): boolean {
    return this._sortRef.isActivated();
  }

  @HostBinding('class.np-sort-over')
  get bindOveringClass(): boolean {
    return this._sortRef.entered;
  }

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private _document: any,
    private _ngZone: NgZone,
    private _viewportRuler: ViewportRuler,
    private _dragDropRegistry: DragDropRegistryService<any, any>,
    private _renderer: Renderer2,
    private _viewContainerRef: ViewContainerRef,
    dragDrop: DragDropService
  ) {
    const sortRef = this._sortRef = dragDrop.createSort(element, _renderer);

    sortRef.instance = this;
    this._syncInputs(sortRef);
    this._handleEvents(sortRef);

    SortableDirective._globalSortables.push(this);
  }

  ngAfterContentInit() {
    // console.log(`Found ${this.items.length} items in sortable`);
    this._ngZone.onStable.asObservable()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe(() => {
        this.items.changes
          .pipe(startWith(this.items), takeUntil(this._destroyed))
          .subscribe((items: QueryList<SortableItemDirective>) => {
            const sortItems: SortableItemRef[] = items.toArray()
            .filter(it => coerceElement(it.element) !== coerceElement(this.element))
            .map(it => it._dragRef as SortableItemRef);
            this._sortRef.withItems(sortItems);
          });
        // this.childSortables.changes
        //   .pipe(startWith(this.childSortables), takeUntil(this._destroyed))
        //   .subscribe((childSortables: QueryList<SortableDirective>) => {
        //     const children: SortableRef[] = childSortables.toArray()
        //       .filter(it => it === this)
        //       .map(it => it._sortRef);
        //     this._sortRef.withChildren(children);
        //   });
      })
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();

    this._sortRef.despose();
    
    _.remove(SortableDirective._globalSortables, this);
  }

  private _syncInputs(ref: SortableRef<SortableDirective>) {
    ref.beforStarted.subscribe(() => {
      const siblings = SortableDirective._globalSortables
        .filter(it => isElementMatchSelector(coerceElement(it.element), this.connectWith))
        .map(it => it._sortRef);

      ref.connectWith(siblings);

      if (_.isFunction(this.accept)) {
        const accept = (dragRef: DraggableRef, dropRef: SortableRef) => {
          return _.isFunction(this.accept) && this.accept.call(dragRef.instance, dropRef.instance);
        };
        ref.withAccept(accept);
      } else {
        ref.withAccept(this.accept);
      }

      ref.scope = this.scope;
      ref.sort = coerceBooleanProperty(this.sort);

      const placeholderWrapper = this._placeholderWrapperTemplate ? <DragHelperTemplate>{
        template: this._placeholderWrapperTemplate.templateRef,
        context: this._placeholderWrapperTemplate.data,
        viewContainer: this._viewContainerRef,
      } : null;
      ref.withPlaceholderWrapperTemplate(placeholderWrapper);

    });
  }

  private _handleEvents(ref: SortableRef<SortableDirective>) {

    ref.removed$.subscribe((event) => {
      const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = event;
      this.removed.emit({
        item: item.instance,
        container: this,
        currentIndex,
        previousContainer: previousContainer.instance,
        previousIndex,
        isPointerOverContainer,
      });
    });
    ref.received$.subscribe((event) => {
      const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = event;
      this.received.emit({
        item: item.instance,
        container: this,
        currentIndex,
        previousContainer: previousContainer.instance,
        previousIndex,
        isPointerOverContainer,
      });
    });
    ref.ended$.subscribe((event) => {
      const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = event;
      this.dropped.emit({
        item: item.instance,
        container: this,
        currentIndex,
        previousContainer: previousContainer.instance,
        previousIndex,
        isPointerOverContainer,
      });
    });
    ref.dropped$.subscribe((event) => {
      const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = event;
      this.dropped.emit({
        item: item.instance,
        container: this,
        currentIndex,
        previousContainer: previousContainer.instance,
        previousIndex,
        isPointerOverContainer,
      });
    });
  }
}

function isElementMatchSelector(element: HTMLElement, selector: string) {
  return element.matches ? element.matches(selector) :
    (element as any).msMatchesSelector(selector);
}
