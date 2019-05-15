import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from '../../api-service/profile-api.service';

@Component({
  selector: 'demo-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  operations;
  currentOperationTab = 0;
  statusMap = { 'agree': { type: 'success', label: '成功' }, 'reject': { type: 'error', label: '驳回' } };

  constructor(
    private profileApi: ProfileApiService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.profileApi.getAdvancedData().subscribe(operations => {
      this.operations = operations;
    });
  }

}
