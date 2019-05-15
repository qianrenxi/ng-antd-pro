import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FailComponent } from './fail/fail.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'fail', component: FailComponent },
  { path: 'success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
