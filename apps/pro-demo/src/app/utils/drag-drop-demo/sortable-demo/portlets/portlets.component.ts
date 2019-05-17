import { Component, OnInit } from '@angular/core';
import { DraggableDirective, moveItemInArray } from '@qianrenxi/ng-antd-pro';

@Component({
  selector: 'demo-portlets',
  templateUrl: './portlets.component.html',
  styleUrls: ['./portlets.component.scss']
})
export class PortletsComponent implements OnInit {

  widgets;

  constructor() { }

  ngOnInit() {
    this.widgets = [
      ['Widget 1-1', 'Widget 1-2', 'Widget 1-3', 'Widget 1-4',],
      ['Widget 2-1', 'Widget 2-2', 'Widget 2-3', 'Widget 2-4', 'Widget 2-5',],
      ['Widget 3-1', 'Widget 3-2', 'Widget 3-3',],
      ['Widget 4-1', 'Widget 4-2', 'Widget 4-3', 'Widget 4-4', 'Widget 4-5', 'Widget 4-6',],
    ];
  }

  onContentRegionDrop($event) {
    const { item, container, currentIndex, previousContainer, previousIndex } = $event;
    const data = (item as DraggableDirective).dragData;

    // 根据 data 判断来源

  }

  onRowsDrop($event) {
    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;
    if (currentIndex === -1 || !isPointerOverContainer) {
      console.log('rows dropped, but not catch it');
      return ;
    }

    console.log('rows dropped', $event);
  }

  onRowDrop($event) {
    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;
    if (currentIndex === -1 || !isPointerOverContainer) {
      console.log('row dropped, but not catch it');
      return ;
    }

    console.log('row dropped', $event);
  }
}
