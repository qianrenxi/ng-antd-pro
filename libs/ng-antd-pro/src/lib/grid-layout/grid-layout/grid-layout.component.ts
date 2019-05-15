import { Component, OnInit, ElementRef, HostBinding, Input, ContentChildren, QueryList, HostListener, AfterViewInit, AfterContentInit, EventEmitter, AfterViewChecked } from '@angular/core';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { Observable } from 'rxjs';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'np-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  providers: [
    GridLayoutService
  ]
})
export class GridLayoutComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // @Input() style: any;
  @Input() width: number;
  @Input() autoSize = true;
  @Input() cols = 12;
  @Input() verticalCompact = true;
  @Input() compactType: 'horizontal' | 'vertical' = 'vertical';
  @Input() gutter = 8; // 间隙
  @Input() rowHeight = 150;
  @Input() rowHeightRate = 0.6125; // 设置 rowHeightRate 后 row height 将自动失效
  @Input() maxRows = Infinity;
  @Input() isDraggable = true;
  @Input() isResizable = true;
  @Input() preventCollision = false;
  @Input() useCSSTransforms = true;
  @Input() usePercentages = false;

  colWidth: number;
  // layout: LayoutItem[];
  
  // WARNING in Circular dependency detected:
  // @ContentChildren(GridItemComponent) items: QueryList<GridItemComponent>;

  boundingClientRect: ClientRect | DOMRect;

  resizeEvent = new EventEmitter();

  @HostBinding("class.np-grid-layout")
  apGridLayoutStyleClass = true;

  @HostListener("window:resize", ['$event'])
  onResize($event) {
    // TODO: 使用 Observable 的 debounce 防抖动
    this.updateRect();
  }

  get containerWidth() {
    const rect = this.boundingClientRect = this._calcContainerRect();
    return rect.width;
  }

  constructor(
    protected elementRef: ElementRef
  ) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.updateRect();
    // }, 300);
  }

  ngAfterViewInit() {
    // console.log('grid layout view init.');
    this.updateRect();
    // first init
    this.resizeEvent.emit({});
  }

  ngAfterViewChecked() {
    // console.log('grid layout view checked.');
    this.updateRect();
  }

  updateRect() {
    const oldRect = this.boundingClientRect;
    const rect = this.boundingClientRect = this._calcContainerRect();
    // console.log(oldRect, rect)
    this.colWidth = (rect.width - this.gutter * (this.cols - 1)) / this.cols;
    if (this.rowHeightRate) {
      this.rowHeight = this.colWidth * this.rowHeightRate;
    }

    if (oldRect.width !== rect.width) {
      this.resizeEvent.emit({});
    }
  }

  setHeight(containerHeight: number): any {
    const element = this.elementRef.nativeElement as HTMLElement;
    element.style.height = `${containerHeight}px`;
  }


  private _calcContainerRect(): ClientRect | DOMRect {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundingClientRect = element.getBoundingClientRect();
    // this.boundingClientRect = boundingClientRect;
    return boundingClientRect;
  }
}
