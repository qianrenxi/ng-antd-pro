import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { GridLayoutDirective } from './grid-layout/grid-layout.directive';
import { GridItemComponent } from './grid-item/grid-item.component';
import { GridItemDirective } from './grid-item/grid-item.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridLayoutComponent,
    GridLayoutDirective,
    GridItemComponent,
    GridItemDirective,
  ],
  exports: [
    GridLayoutComponent,
    GridLayoutDirective,
    GridItemComponent,
    GridItemDirective,
  ]
})
export class GridLayoutModule { }
