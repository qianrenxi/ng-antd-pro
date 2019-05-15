import { Component, OnInit, Input, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';

export type ResultType = 'success' | 'error';

@Component({
  selector: 'np-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterContentInit {

  @Input() type: ResultType;
  @Input() title: string | TemplateRef<any>;
  @Input() description: string | TemplateRef<any>;
  @Input() extra: TemplateRef<any>;
  @Input() actions: TemplateRef<any>;

  @ContentChild("title") tplTitle: TemplateRef<any>;
  @ContentChild("description") tplDescription: TemplateRef<any>;
  @ContentChild("extra") tplExtra: TemplateRef<any>;
  @ContentChild("actions") tplActions: TemplateRef<any>;

  iconMap = {
    'success': 'anticon anticon-check-circle success',
    'error': 'anticon anticon-close-circle error'
  };

  get showDescription(): boolean {
    return !!this.description || !!this.tplDescription;
  }

  get showExtra(): boolean {
    return !!this.extra || !!this.tplExtra;
  }

  get showActions(): boolean {
    return !!this.actions || !!this.tplActions;
  }

  constructor() { }

  ngAfterContentInit(): void {
    if (this.title && this.title instanceof TemplateRef) {
      this.tplTitle = this.title;
    }
    if (this.description && this.description instanceof TemplateRef) {
      this.tplDescription = this.description;
    }
    if (this.extra && this.extra instanceof TemplateRef) {
      this.tplExtra = this.extra;
    }
    if (this.actions && this.actions instanceof TemplateRef) {
      this.tplActions = this.actions;
    }
  }

  ngOnInit() {
  }



}
