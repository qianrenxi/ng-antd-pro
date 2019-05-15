import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from 'src/app/drag-drop/drag-utils';

@Component({
  selector: 'np-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {

  items = [];

  constructor() { }

  ngOnInit() {
    for (let index = 0; index < 8; index++) {
      this.items.push(`Item ${index}`);
    }
  }

  onSortDrop($event) {
    const { currentIndex, previousIndex } = $event;
    // console.log("onSortDrop:", currentIndex, previousIndex);
    moveItemInArray(this.items, previousIndex, currentIndex);
  }

}