import { Component, OnInit, Input } from '@angular/core';
import { ColumnDef, ColumnGroupDef } from '../typings/data-table-options';

@Component({
  selector: '[npDataTable] np-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() columns: (ColumnDef | ColumnGroupDef)[];
  @Input() data: any[];
  @Input() totalSize: number;

  constructor() { }

  ngOnInit() {
  }

}
