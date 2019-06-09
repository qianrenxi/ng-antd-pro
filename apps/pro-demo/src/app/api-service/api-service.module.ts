import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleApiService } from './rule-api.service';
import { FakeApiService } from './fake-api.service';
import { ProfileApiService } from './profile-api.service';
import { UsersApiService } from './users-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    RuleApiService,
    FakeApiService,
    ProfileApiService,
    UsersApiService,
  ]
})
export class ApiServiceModule { }
