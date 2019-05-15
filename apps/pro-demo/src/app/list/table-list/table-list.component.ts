import { Component, OnInit } from '@angular/core';
import { RuleApiService } from '../../api-service/rule-api.service';

@Component({
  selector: 'demo-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  list: any[];
  pagination: any;

  statusMap = ['default', 'processing', 'success', 'error'];
  status = ['关闭', '运行中', '已上线', '异常'];
  filterGender = [
    {
      text: this.status[0],
      value: 0,
    },
    {
      text: this.status[1],
      value: 1,
    },
    {
      text: this.status[2],
      value: 2,
    },
    {
      text: this.status[3],
      value: 3,
    },
  ];

  constructor(
    private ruleApi: RuleApiService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ruleApi.getRules().subscribe(({list, pagination}) => {
      this.list = list;
      this.pagination = pagination;
    });
  }

  updateFilter(e) {

  }
}
