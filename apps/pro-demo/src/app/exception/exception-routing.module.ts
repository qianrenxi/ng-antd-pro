import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { TriggerComponent } from './trigger/trigger.component';

const routes: Routes = [
  { path: '403', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ErrorComponent },
  { path: 'trigger', component: TriggerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }
