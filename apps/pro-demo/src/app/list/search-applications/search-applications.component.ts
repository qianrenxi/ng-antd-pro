import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-search-applications',
  templateUrl: './search-applications.component.html',
  styleUrls: ['./search-applications.component.scss']
})
export class SearchApplicationsComponent implements OnInit {

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
