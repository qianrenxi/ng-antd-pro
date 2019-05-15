import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { config as exceptionTypeConfig } from './type-config';

export type ExceptionType = 'forbidden' | 'notFound' | 'error';

@Component({
  selector: 'np-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {
  
  config = exceptionTypeConfig;
  
  @Input() type: ExceptionType;
  @Input() img: string;
  @Input() title: string | TemplateRef<any>;
  @Input() description: string | TemplateRef<any>;
  @Input() actions: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
