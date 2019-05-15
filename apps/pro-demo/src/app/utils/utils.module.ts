import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UtilsRoutingModule } from './utils-routing.module';
import { SplitterComponent } from './splitter/splitter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UtilsRoutingModule,
  ],
  declarations: [
    SplitterComponent,
  ]
})
export class UtilsModule { }
