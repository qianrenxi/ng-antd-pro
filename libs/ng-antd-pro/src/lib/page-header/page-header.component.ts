import { Component, OnInit, HostBinding, Input, ContentChild, TemplateRef, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { isString, isArray } from 'util';
import { NzTabChangeEvent } from 'ng-zorro-antd';

export interface Breadcrumb {
  lable: string;
  link?: string | string[];
  icon?: string;
}

export interface TabItem {
  label: string;
  icon?: string;
}

@Component({
  selector: 'np-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterContentInit {

  @Input() breadcrumbs: Breadcrumb[];
  @Input() logo: TemplateRef<any>;
  @Input() title: string | TemplateRef<any>;
  @Input() actions: TemplateRef<any>;
  @Input() content: string | TemplateRef<any>;
  @Input() contentExtra: TemplateRef<any>;
  @Input() tabs: TabItem[] | TemplateRef<any>;

  @Output() tabChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild("logo") tplLogo: TemplateRef<any>;
  @ContentChild("title") tplTitle: TemplateRef<any>;
  @ContentChild("actions") tplActions: TemplateRef<any>;
  @ContentChild("content") tplContent: TemplateRef<any>;
  @ContentChild("contentExtra") tplContentExtra: TemplateRef<any>;
  @ContentChild("tabs") tplTabs: TemplateRef<any>;

  @HostBinding("class.page-header")
  get showPageHeader(): boolean {
    return this.showBreadcrumb || this.showDetail || this.showTabs;
  }

  get showBreadcrumb(): boolean {
    return !!this.breadcrumbs && this.breadcrumbs.length > 0;
  }

  get showDetail(): boolean {
    return this.showLogo || this.showTitle || this.showContent;
  }

  get showLogo(): boolean {
    return !!this.logo || !!this.tplLogo;
  }

  get showTitle(): boolean {
    return !!this.title || !!this.tplTitle || !!this.tplActions;
  }

  get showContent(): boolean {
    return !!this.content || !!this.tplContent || !!this.tplContentExtra;
  }

  get showExtraContent(): boolean {
    return !!this.tplContentExtra;
  }

  get showTabs(): boolean {
    return !!this.tabs && (!(this.tabs instanceof TemplateRef) && this.tabs.length > 0 );
  }

  constructor(
    private titleService: Title
  ) { }

  ngAfterContentInit(): void {
    if (this.logo && this.logo instanceof TemplateRef) {
      this.tplLogo = this.logo;
    }
    
    if (this.title && this.title instanceof TemplateRef) {
      this.tplTitle = this.title;
    }

    if (this.actions && this.actions instanceof TemplateRef) {
      this.tplActions = this.actions;
    }

    if (this.content && this.content instanceof TemplateRef) {
      this.tplContent = this.content;
    }

    if (this.contentExtra && this.contentExtra instanceof TemplateRef) {
      this.tplContentExtra = this.contentExtra;
    }

    if (this.tabs && this.tabs instanceof TemplateRef) {
      this.tplTabs = this.tabs;
    }

  }
  
  ngOnInit() {
    if (this.title && isString(this.title)) {
      // this.titleService.setTitle(this.title);
    }
  }

  

  fireTabChange(e: NzTabChangeEvent) {
    this.tabChange.emit({...e, tabItem: this.tabs[e.index]});
  }

}
