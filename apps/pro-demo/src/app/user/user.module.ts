import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterResultComponent } from './register-result/register-result.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, RegisterResultComponent]
})
export class UserModule { }
