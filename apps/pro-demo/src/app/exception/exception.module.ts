import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ExceptionRoutingModule } from './exception-routing.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { TriggerComponent } from './trigger/trigger.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExceptionRoutingModule
  ],
  declarations: [UnauthorizedComponent, NotFoundComponent, ErrorComponent, TriggerComponent]
})
export class ExceptionModule { }
