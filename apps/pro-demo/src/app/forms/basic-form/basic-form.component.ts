import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: [, Validators.required],
      dateRange: [, Validators.required],
      goal: [, Validators.required],
      standard: [, Validators.required],
      client: [],
      invites: [],
      weight: [],
      public: ['public']
    });
  }

  _submitForm(e, v) {
    
  }
}
