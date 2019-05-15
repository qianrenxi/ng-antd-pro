import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'demo-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss']
})
export class StepFormComponent implements OnInit {
  current = 0;

  infoForm: FormGroup;
  confirmForm: FormGroup;

  info;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initInfoForm();
    this.initConfirmForm();
  }

  initInfoForm() {
    this.infoForm = this.fb.group({
      payAccount: ['ant-design@alipay.com', Validators.required],
      receiverAccountType: ['alipay', Validators.required],
      receiverAccount: ['test@example.com', Validators.required],
      receiverName: ['Alex', Validators.required],
      amount: [500, [Validators.required]],
    });
  }

  initConfirmForm() {
    this.confirmForm = this.fb.group({
      password: []
    });
  }

  _submitInfoForm(e, v) {
    this.infoForm.markAsDirty();
    if (this.infoForm.valid) {
      this.info = v;
      this.next();
    }
  }

  _submitConfirmForm(e, v) {
    this.infoForm.markAsDirty();
    this.confirmForm.markAsDirty();
    if (this.infoForm.valid && this.confirmForm.valid) {
      this.info = this.infoForm.value;
      this.next();
    }
  }

  prev() {
    this.current = this.current - 1 >= 0 ? this.current - 1 : 0;
  }

  next() {
    this.current = this.current + 1 <= 2 ? this.current + 1 : 2;
  }

  reset() {
    this.initInfoForm();
    this.initConfirmForm();
    this.current = 0;
  }
}
