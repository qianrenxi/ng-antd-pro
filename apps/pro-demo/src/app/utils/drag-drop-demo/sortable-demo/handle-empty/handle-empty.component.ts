import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@qianrenxi/ng-antd-pro';

@Component({
  selector: 'demo-handle-empty',
  templateUrl: './handle-empty.component.html',
  styleUrls: ['./handle-empty.component.scss']
})
export class HandleEmptyComponent implements OnInit {


  list1 = [];
  list2 = [];

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < 5; index++) {
      this.list1.push(`Item ${index} of list 1`);
      this.list2.push(`Item ${index} of list 2`);
    }
  }

  onList1Drop($event) {
    this.sortOrSwitchItem($event, this.list2, this.list1);
  }

  onList2Drop($event) {
    this.sortOrSwitchItem($event, this.list1, this.list2);
  }

  sortOrSwitchItem($event, listA, listB) {
    const { currentIndex, previousIndex, container, previousContainer } = $event;
    // console.log($event)
    if (container === previousContainer) {
      moveItemInArray(listB, previousIndex, currentIndex);
    } else {
      const item = listA.splice(previousIndex, 1);
      listB.splice(currentIndex, 0, item);
    }
  }
}
