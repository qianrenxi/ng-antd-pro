import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';
import { SuccessComponent } from './success/success.component';
import { FailComponent } from './fail/fail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ResultRoutingModule
  ],
  declarations: [SuccessComponent, FailComponent]
})
export class ResultModule { }
