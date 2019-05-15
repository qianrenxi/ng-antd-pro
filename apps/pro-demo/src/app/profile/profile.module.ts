import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [BasicComponent, AdvancedComponent]
})
export class ProfileModule { }
