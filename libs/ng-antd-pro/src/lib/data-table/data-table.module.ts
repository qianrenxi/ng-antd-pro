import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ResizedModule } from '../resized';

@NgModule({
  imports: [
    CommonModule,
    ResizedModule,
  ],
  declarations: [
    DataTableComponent, 
  ],
  exports: [
    DataTableComponent,
  ]
})
export class DataTableModule { }
