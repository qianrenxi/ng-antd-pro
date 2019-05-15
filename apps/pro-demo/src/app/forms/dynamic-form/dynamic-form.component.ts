import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '@qianrenxi/ng-antd-pro';
import { Validators } from '@angular/forms';

@Component({
  selector: 'demo-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  fields;
  formGroup;

  searchForm: {fields, formGroup};

  fields3 = [
    {key: 'name', controlType: 'text', label: '名称'},
    {key: 'status', controlType: 'dropdown', label: '状态', options: [{key: 'ok', value: '正常'}, {key: 'locked', value: '锁定'}]}
  ];

  constructor(
    private fb: FormBuilderService
  ) { }

  ngOnInit() {
    const { fields, formGroup } = this.fb.group({
      name: [, Validators.required, null, { controlType: 'text', label: '姓名', required: true, explain: { errors: { required: '姓名必填' } } }],
      age: []
    });
    this.fields = fields;
    this.formGroup = formGroup;

    console.log('fields', fields);
    console.log('formGroup', formGroup);

    this.searchForm = this.fb.group({
      name: [,,, {controlType: 'text', label: '名称'}],
      status: [,,, {controlType: 'dropdown', label: '状态', options: [{key: 'ok', value: '正常'}, {key: 'locked', value: '锁定'}]}]
    });
  }

}
