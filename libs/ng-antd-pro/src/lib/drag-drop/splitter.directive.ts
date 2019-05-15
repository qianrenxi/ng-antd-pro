import { Directive, ElementRef, Inject, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { DragDrop, DragRef, CDK_DRAG_CONFIG, DragRefConfig, CdkDrag } from '@angular/cdk/drag-drop';
import { coerceBooleanProperty } from '@angular/cdk/coercion';



@Directive({
  selector: '[npSplitter]'
})
export class SplitterDirective<T = any> implements OnInit {

  _dragRef: DragRef;

  @Input('npSplitterPrev') prevElement: HTMLElement; 
  @Input('npSplitterNext') nextElement: HTMLElement; 

  /** Locks the position of the dragged element along the specified axis. */
  @Input('npSplitterLockAxis') lockAxis: 'x' | 'y' = 'x';

    /**
   * Selector that will be used to determine the element to which the draggable's position will
   * be constrained. Matching starts from the element's parent and goes up the DOM until a matching
   * element has been found.
   */
  @Input('npSplitterBoundary') boundaryElementSelector: string;

  /** Whether starting to drag this element is disabled. */
  @Input('npSplitterDisabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._dragRef.disabled = this._disabled;
  }
  private _disabled = false;

  private _pickupPositionOnPage: Point;

  private _prevElementRect: ClientRect | DOMRect;
  private _nextElementRect: ClientRect | DOMRect;

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(CDK_DRAG_CONFIG) config: DragRefConfig,
    dragDrop: DragDrop,
    protected _changeDetectorRef?: ChangeDetectorRef
  ) {
    this._dragRef = dragDrop.createDrag(element, config);
    this._dragRef.data = this;

    this._syncInputs(this._dragRef);
    this._handleEvents(this._dragRef);
  }

  ngOnInit() {
    // console.log("Splitter targets elements:", this.prevElement, this.nextElement);
  }

  /** Gets the boundary element, based on the `boundaryElementSelector`. */
  private _getBoundaryElement() {
    const selector = this.boundaryElementSelector;
    return selector ? getClosestMatchingAncestor(this.element.nativeElement, selector) : null;
  }

  /** Syncs the inputs of the CdkDrag with the options of the underlying DragRef. */
  private _syncInputs(ref: DragRef<CdkDrag<T>>) {
    ref.beforeStarted.subscribe(() => {
      if (!ref.isDragging()) {
        // const placeholder = null;
        // const preview = null;

        ref.disabled = this.disabled;
        ref.lockAxis = this.lockAxis;
        ref
          .withBoundaryElement(this._getBoundaryElement());
          // .withPlaceholderTemplate(placeholder)
          // .withPreviewTemplate(preview);

      }
    });
  }

  /** Handles the events from the underlying `DragRef`. */
  private _handleEvents(ref: DragRef<CdkDrag<T>>) {
    ref.started.subscribe(() => {
      // this.started.emit({source: this});
      // console.log('Splitter drag start.');

      this._pickupPositionOnPage = ref['_pickupPositionOnPage'];
      if (this.prevElement) {
        this._prevElementRect = this.prevElement.getBoundingClientRect();
      }
      if (this.nextElement) {
        this._nextElementRect = this.nextElement.getBoundingClientRect();
      }

      // Since all of these events run outside of change detection,
      // we need to ensure that everything is marked correctly.
      if (this._changeDetectorRef) {
        // @breaking-change 8.0.0 Remove null check for _changeDetectorRef
        this._changeDetectorRef.markForCheck();
      }
    });

    ref.moved.subscribe((args) => {
      const {pointerPosition}: {pointerPosition: {x: number, y: number}} = args;
      // console.log('Splitter drag moved.', pointerPosition, delta);
      
      if (this._pickupPositionOnPage) {
        // const transform: Point = {x: 0, y: 0};
        // transform.x = pointerPosition.x - this._pickupPositionOnPage.x;
        // transform.y = pointerPosition.y - this._pickupPositionOnPage.y;

        if (this.lockAxis === 'x') {
          const transformX = pointerPosition.x - this._pickupPositionOnPage.x;
          if (this.prevElement && this._prevElementRect) {
            this.prevElement.style.width = `${this._prevElementRect.width + transformX}px`;
          }
          if (this.nextElement && this._nextElementRect) {
            this.nextElement.style.width = `${this._nextElementRect.width - transformX}px`;
          }
        } else if(this.lockAxis === 'y') {
          const transformY = pointerPosition.y - this._pickupPositionOnPage.y;
          if (this.prevElement && this._prevElementRect) {
            this.prevElement.style.height = `${this._prevElementRect.height + transformY}px`;
          }
          if (this.nextElement && this._nextElementRect) {
            this.nextElement.style.height = `${this._nextElementRect.height - transformY}px`;
          }
        }

        this._dragRef.reset();
      }
    });

    // ref.released.subscribe(() => {
    //   this.released.emit({source: this});
    // });

    ref.ended.subscribe(() => {
      // this.ended.emit({source: this});
      console.log('Splitter drag end.');
      this._dragRef.reset();

      // Since all of these events run outside of change detection,
      // we need to ensure that everything is marked correctly.
      if (this._changeDetectorRef) {
        // @breaking-change 8.0.0 Remove null check for _changeDetectorRef
        this._changeDetectorRef.markForCheck();
      }
    });

    // ref.entered.subscribe(event => {
    //   this.entered.emit({
    //     container: event.container.data,
    //     item: this
    //   });
    // });

    // ref.exited.subscribe(event => {
    //   this.exited.emit({
    //     container: event.container.data,
    //     item: this
    //   });
    // });

    // ref.dropped.subscribe(event => {
    //   this.dropped.emit({
    //     previousIndex: event.previousIndex,
    //     currentIndex: event.currentIndex,
    //     previousContainer: event.previousContainer.data,
    //     container: event.container.data,
    //     isPointerOverContainer: event.isPointerOverContainer,
    //     item: this
    //   });
    // });
  }
}

/** Point on the page or within an element. */
interface Point {
  x: number;
  y: number;
}

/** Gets the closest ancestor of an element that matches a selector. */
function getClosestMatchingAncestor(element: HTMLElement, selector: string) {
  let currentElement = element.parentElement as HTMLElement | null;

  while (currentElement) {
    // IE doesn't support `matches` so we have to fall back to `msMatchesSelector`.
    if (currentElement.matches ? currentElement.matches(selector) :
        (currentElement as any).msMatchesSelector(selector)) {
      return currentElement;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
}