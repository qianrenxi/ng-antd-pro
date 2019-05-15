import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from '../../api-service/profile-api.service';

@Component({
  selector: 'demo-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  returnedGoods;
  returnedProgress;

  statusMap = {'default': '关闭', 'processing': '运行中', 'success': '已上线', 'error': '异常'};

  constructor(
    private profileApi: ProfileApiService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.profileApi.getBasicData().subscribe(({basicGoods, basicProgress}) => {
      this.returnedGoods = basicGoods;
      this.returnedProgress = basicProgress;
    });
  }
}
