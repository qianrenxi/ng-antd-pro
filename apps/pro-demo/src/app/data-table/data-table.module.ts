import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDataTableComponent } from './simple-data-table/simple-data-table.component';
import { SharedModule } from '../shared/shared.module';
import { DataTableRoutingModule } from './data-table-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataTableRoutingModule,
  ],
  declarations: [
    SimpleDataTableComponent
  ],
})
export class DataTableModule { }
