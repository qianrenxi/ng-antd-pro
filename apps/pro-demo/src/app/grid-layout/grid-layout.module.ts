import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleGridLayoutComponent } from './simple-grid-layout/simple-grid-layout.component';
import { SharedModule } from '../shared/shared.module';
import { GridLayoutRoutingModule } from './grid-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GridLayoutRoutingModule,
  ],
  declarations: [SimpleGridLayoutComponent]
})
export class GridLayoutModule { }
