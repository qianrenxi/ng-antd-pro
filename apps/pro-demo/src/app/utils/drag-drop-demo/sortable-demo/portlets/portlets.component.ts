import { Component, OnInit } from '@angular/core';
import { DraggableDirective } from '../../../drag-drop/directives/draggable.directive';
import { moveItemInArray } from '../../../drag-drop/drag-utils';

@Component({
  selector: 'np-portlets',
  templateUrl: './portlets.component.html',
  styleUrls: ['./portlets.component.scss']
})
export class PortletsComponent implements OnInit {

  list2 = [];

  constructor() { }

  ngOnInit() {
  }

  onContentRegionDrop($event) {
    const {item, container, currentIndex, previousContainer, previousIndex} = $event;
    const data = (item as DraggableDirective).dragData;
    
    // 根据 data 判断来源
    
    if (container === previousContainer) {
      moveItemInArray(this.list2, previousIndex, currentIndex);
    } else {
      this.list2.splice(currentIndex, 0, data);
    }
  }

}
