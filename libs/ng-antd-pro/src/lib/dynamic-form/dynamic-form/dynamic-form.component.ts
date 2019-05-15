import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Field } from '../def/field';
import { NzListGrid } from 'ng-zorro-antd';
import { FieldsConfig } from '../def/fields-config';
import { isArray } from 'util';
import { FormBuilderService } from '../form-builder.service';

@Component({
  selector: 'np-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Input() fields: Field<any>[];
  @Input() fieldsConfig: any;// FieldsConfig;
  @Input() nzGrid: NzListGrid;
  @Input() itemGrid: {label: any, control: any};
  
  @Input() actions: TemplateRef<any>[];

  @Output() afterInit = new EventEmitter<any>();

  constructor(
    private fb: FormBuilderService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    const fieldsConfigChange = changes['fieldsConfig'];
    if (fieldsConfigChange) {
      this.ngZone.run(() => {
        this._initForm();
      });
    }
  }

  private _initForm() {
    if (!!this.fieldsConfig) {
      // 初始化表单
      if (isArray(this.fieldsConfig)) {
        const {fields, formGroup} = this.fb.group2(this.fieldsConfig);
        this.fields = fields;
        this.formGroup = formGroup;
      } else {
        const {fields, formGroup} = this.fb.group(this.fieldsConfig);
        this.fields = fields;
        this.formGroup = formGroup;
      }
    }

    this.afterInit.emit({fields: this.fields, formGroup: this.formGroup});
  }

  _submitForm(e, v) {
    console.log(v);
  }

  getErrorArray(fieldKey: string): {key: string, error: any}[] {
    const errors: ValidationErrors = this.formGroup.get(fieldKey).errors;
    if (!!errors) {
      return Object.keys(errors).map(key => {
        return {key, error: errors[key]};
      });
    }
  }

  hasError(fieldKey: string) {
    const errors = this.getErrorArray(fieldKey);
    return errors && errors.length > 0;
  }
}
