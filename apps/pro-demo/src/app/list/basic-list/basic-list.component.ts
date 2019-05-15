import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss']
})
export class BasicListComponent implements OnInit {
  filterStatus = 'A';

  list: any[];
  pagination: any;

  constructor(
    private fakeApi: FakeApiService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.fakeApi.getFakeList({count: 8}).subscribe(list => {
      this.list = list;
    });
  }

}
