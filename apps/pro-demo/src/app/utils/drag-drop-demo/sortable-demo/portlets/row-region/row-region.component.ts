import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@qianrenxi/ng-antd-pro';
import * as _ from 'lodash';
import { isWidgetPrototypeLike } from '../utils';

@Component({
  selector: 'demo-row-region',
  templateUrl: './row-region.component.html',
  styleUrls: ['./row-region.component.scss']
})
export class RowRegionComponent implements OnInit {
  widgets = [];
  i = 0;
  constructor() { }

  ngOnInit() {
    this.widgets = [
      ['Widget 1-1', 'Widget 1-2', 'Widget 1-3', 'Widget 1-4',],
      ['Widget 2-1', 'Widget 2-2', 'Widget 2-3', 'Widget 2-4', 'Widget 2-5',],
      ['Widget 3-1', 'Widget 3-2', 'Widget 3-3',],
      ['Widget 4-1', 'Widget 4-2', 'Widget 4-3', 'Widget 4-4', 'Widget 4-5', 'Widget 4-6',],
    ];
  }


  rowsReceive($event) {
    // console.log('rows dropped', $event);
    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;
    const sourceData = item.dragData;

    let widget = null;
    if (isWidgetPrototypeLike(sourceData)) {
      // 从组件画廊中拽入的组件原型数据
      // createWidget()
      // 1. 创建一个组件

      widget = `${sourceData.label} - ${++this.i}`;
    } else {
      widget = sourceData;
    }

    // if (isWidgetLike(sourceData)) {
    //   widget = sourceData;
    // }

    if (!!widget) {
      this.widgets.splice(currentIndex, 0, [widget]);
    }
    console.log(this.widgets)
    // 追加组件到相应的位置
  }

  rowReceive($event) {
    // console.log('row dropped', $event);
    // 创建组件
    // 追加组件

    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;
    const sourceData = item.dragData;

    let widget = null;
    if (isWidgetPrototypeLike(sourceData)) {
      // 从组件画廊中拽入的组件原型数据
      // createWidget()
      // 1. 创建一个组件

      widget = `${sourceData.label} - ${++this.i}`;
    } else {
      widget = sourceData;
    }

    // if (isWidgetLike(sourceData)) {
    //   widget = sourceData;
    // }

    if (!!widget) {
      const list = container.sortData as any[];
      // console.log(list)
      if (!_.isEmpty(list)) {
        list.splice(currentIndex, 0, widget);
      }
    }
  }

  rowRemoveItem($event) {
    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;
    const sourceData = item.dragData;

    console.log('previousIndex', previousIndex, isPointerOverContainer)

    const list = container.sortData as any[];
      // console.log(list)
      if (!_.isEmpty(list) && previousIndex >= 0) {
        list.splice(previousIndex, 1);

        // clean 空行
        if (_.isEmpty(list)) {
          _.remove(this.widgets, (it) => it === list)
        }
      }
  }

  rowDrop($event) {
    // 和拖拽元素相关的容器均会接收到释放信息，移动或新增的释放信息已单独处理，这里只需要处理同一个容器内的组件排序即可
    const { item, container, currentIndex, previousContainer, previousIndex, isPointerOverContainer } = $event;

    if (container !== previousContainer || currentIndex === previousIndex || currentIndex < 0 || !isPointerOverContainer) {
      return;
    }

    const sourceData = item.dragData;
    // if (!isWidgetLike(sourceData)) { // 正常情况，这种情况是不会出现的
    //   return;
    // }

    const list = container.sortData;
    if (!_.isEmpty(list)) {
      moveItemInArray(list, previousIndex, currentIndex);
    }
  }
}
