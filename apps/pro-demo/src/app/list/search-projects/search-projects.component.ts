import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-search-projects',
  templateUrl: './search-projects.component.html',
  styleUrls: ['./search-projects.component.scss']
})
export class SearchProjectsComponent implements OnInit {

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
