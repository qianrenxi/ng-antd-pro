import { Directive, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { ResizedEvent } from './resized-event';

@Directive({
  selector: '[npResized]'
})
export class ResizedDirective implements OnInit, OnDestroy {

  
  @Output('npResized')
  readonly resized = new EventEmitter<ResizedEvent>();

  private oldWidth: number;
  private oldHeight: number;

  private _resizeSensor: ResizeSensor;

  constructor(
    private readonly element: ElementRef
  ) { }

  ngOnInit() {
    new ResizeSensor(this.element.nativeElement, _ => this.onResized());
    this.onResized();
  }

  private onResized() {
    const newWidth = this.element.nativeElement.clientWidth;
    const newHeight = this.element.nativeElement.clientHeight;

    if (newWidth === this.oldWidth && newHeight === this.oldHeight) {
      return;
    }

    const event = new ResizedEvent(
      this.element,
      newWidth,
      newHeight,
      this.oldWidth,
      this.oldHeight
    );

    this.oldWidth = this.element.nativeElement.clientWidth;
    this.oldHeight = this.element.nativeElement.clientHeight;

    this.resized.emit(event);
  }

  ngOnDestroy() {
    if (this._resizeSensor) {
      this._resizeSensor.detach();
    }
  }
}
