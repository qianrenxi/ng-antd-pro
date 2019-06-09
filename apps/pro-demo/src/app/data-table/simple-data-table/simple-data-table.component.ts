import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../api-service/users-api.service';

@Component({
  selector: 'demo-simple-data-table',
  templateUrl: './simple-data-table.component.html',
  styleUrls: ['./simple-data-table.component.scss']
})
export class SimpleDataTableComponent implements OnInit {

  data;

  colDefs = [
    { name: 'Id', field: 'id' },
    { name: 'Avatar', field: 'avatar', cellRender: 'image' },
    { name: 'Name', field: 'name' },
    { name: 'Sex', field: 'sex' },
    // { name: 'Sign', field: 'sign' },
    { name: 'Birthday', field: 'birthday' },
    { name: 'Salary', field: 'salary' },
  ];

  constructor(
    private readonly usersApi: UsersApiService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.usersApi.users().subscribe(data => {
      this.data = data;
      // console.log(data);
    });
  }

}
