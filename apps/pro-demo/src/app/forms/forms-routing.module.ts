import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { StepFormComponent } from './step-form/step-form.component';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: 'basic-form', component: BasicFormComponent },
  { path: 'step-form', component: StepFormComponent },
  { path: 'advanced-form', component: AdvancedFormComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
