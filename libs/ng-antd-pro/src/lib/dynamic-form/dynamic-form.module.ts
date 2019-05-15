import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormFieldFactory } from './form-field-factory.service';
import { FormBuilderService } from './form-builder.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  declarations: [
    DynamicFormComponent
  ],
  providers: [
    FormFieldFactory,
    FormBuilderService,
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
