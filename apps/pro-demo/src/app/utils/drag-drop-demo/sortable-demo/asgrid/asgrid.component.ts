import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@qianrenxi/ng-antd-pro';

@Component({
  selector: 'demo-asgrid',
  templateUrl: './asgrid.component.html',
  styleUrls: ['./asgrid.component.scss']
})
export class AsgridComponent implements OnInit {

  items = [];

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < 11; index++) {
      this.items.push(`${index}`);
    }
  }

  onSortDrop($event) {
    const { currentIndex, previousIndex } = $event;
    // console.log("onSortDrop:", currentIndex, previousIndex);
    moveItemInArray(this.items, previousIndex, currentIndex);
  }
}
