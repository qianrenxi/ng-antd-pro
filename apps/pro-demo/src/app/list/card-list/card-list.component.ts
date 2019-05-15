import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

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
