import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../api-service/fake-api.service';

@Component({
  selector: 'demo-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {

  notice: any[];
  activities: any[];

  constructor(
    private fackApi: FakeApiService
  ) { }

  ngOnInit() {
    this.loadFake();
  }

  loadFake() {
    this.fackApi.getNotices().subscribe(it => this.notice = it);
    this.fackApi.getActivities().subscribe(it => this.activities = it)
  }

}
