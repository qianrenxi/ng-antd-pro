import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'demo-advanced-form',
  templateUrl: './advanced-form.component.html',
  styleUrls: ['./advanced-form.component.scss']
})
export class AdvancedFormComponent implements OnInit {

  fieldLabels = {
    name: '仓库名',
    url: '仓库域名',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型',
  };

  users = [
    {label: '付晓晓', value: 1},
    {label: '周毛毛', value: 2},
  ];

  types = [
    {label: '公开', value: 1},
    {label: '私密', value: 2},
  ];

  formGroup: FormGroup;

  i = 1;
  editCache = {};
  dataSet = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.initTableData();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [],
      url: [],
      owner: [],
      approver: [],
      dateRange: [],
      type: [],
      name2: [],
      url2: [],
      owner2: [],
      approver2: [],
      dateRange2: [],
      type2: [],
    });
  }

  _submitForm(e, v) {

  }

  initTableData() {
    for (let i = 0; i < 3; i++) {
      this.dataSet.push({
        key    : i.toString(),
        name   : `Edrward ${i}`,
        age    : 32,
        address: `London Park no. ${i}`,
      });
    }
    this.updateEditCache();
  }

  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: item
        };
      }
    });
  }
}
