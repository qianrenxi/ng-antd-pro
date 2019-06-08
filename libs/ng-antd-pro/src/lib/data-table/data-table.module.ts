import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableDirective } from './data-table/data-table.directive';

@NgModule({
  declarations: [DataTableComponent, DataTableDirective],
  imports: [
    CommonModule
  ],
  exports: [DataTableComponent, DataTableDirective]
})
export class DataTableModule { }
