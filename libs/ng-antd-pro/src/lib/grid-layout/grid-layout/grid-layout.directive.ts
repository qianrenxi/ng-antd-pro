import { Directive, ElementRef, forwardRef } from '@angular/core';
import { GridLayoutComponent } from './grid-layout.component';
import { GridLayoutService } from '../grid-layout.service';

@Directive({
  selector: 'npGridLayout], npGrid], [np-grid]',
  providers: [
    {
      provide: GridLayoutComponent,
      useExisting: forwardRef(() => GridLayoutDirective)
    },
    GridLayoutService
  ]
})
export class GridLayoutDirective extends GridLayoutComponent {

  constructor(
    protected elementRef: ElementRef
  ) {
    super(
      elementRef
    );
  }


}
