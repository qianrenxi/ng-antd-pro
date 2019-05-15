import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {

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
