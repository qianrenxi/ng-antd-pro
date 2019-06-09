import { Component, OnInit, Input, ElementRef, Inject } from '@angular/core';
import { ColumnDef, ColumnGroupDef } from '../typings/data-table-options';
import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: '[npDataTable], np-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() columns: (ColumnDef | ColumnGroupDef)[];
  @Input() data: any[];
  @Input() totalSize: number;

  private _initialized = false;
  private _headerWrapper: HTMLElement;

  constructor(
    private readonly element: ElementRef,
    @Inject(DOCUMENT) private readonly document: any,
  ) { }

  ngOnInit() {
    this._initialized = true;

    this._refreshHeader();
  }

  onHeaderCellResized($event) {
    if (!this._initialized) {
      return ;
    }
    // console.log("header cell resized", $event);
    // TODO: rxjs 
    this._refreshHeader();
  }

  private _refreshHeader() {
    const el = coerceElement<HTMLElement>(this.element);
    
    let wrapper: HTMLElement = this._headerWrapper;
    if (!!wrapper) {
      el.removeChild(wrapper);
      // 闪烁
    }
    wrapper = this._headerWrapper = this._createHeaderWrapper();
    // el.appendChild(wrapper);
  }

  private _createHeaderWrapper() {
    const el = coerceElement<HTMLElement>(this.element);
    const document = this.document as Document;
    
    const tbodyEl = el.querySelector("tbody");
    const tableEl = tbodyEl.parentElement;
    const theadEl = tableEl.querySelector("thead");
    theadEl.style.opacity = '0';
    tableEl.style.marginTop = '-21px'; // TODO: fix

    // const theadEl = el.querySelector("thead");
    const clonedTheadEl = theadEl.cloneNode(true) as HTMLElement;
    clonedTheadEl.style.opacity = '1';

    const headCells = theadEl.querySelectorAll("th");
    const clonedHeadCells = clonedTheadEl.querySelectorAll("th");
    headCells.forEach((oc, index) =>{
      const rect = oc.getBoundingClientRect();
      const nc = clonedHeadCells[index];
      nc.style.width = `${rect.width}px`;
      nc.style.height = `${rect.height}px`;
    });

    const wrapper = document.createElement("div");
    wrapper.style.position = 'sticky'; // 'absolute';
    wrapper.style.top = '0';
    wrapper.style.left = '0';

    // const wrapperTable = document.createElement("table");
    const wrapperTable = tableEl.cloneNode(false);

    wrapper.appendChild(wrapperTable);
    wrapperTable.appendChild(clonedTheadEl);

    el.insertBefore(wrapper, tableEl);

    return wrapper;
  }
}
