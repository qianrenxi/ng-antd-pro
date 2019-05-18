import { Component, OnInit } from '@angular/core';
import { DraggableDirective, moveItemInArray } from '@qianrenxi/ng-antd-pro';
import * as _ from 'lodash';

@Component({
  selector: 'demo-portlets',
  templateUrl: './portlets.component.html',
  styleUrls: ['./portlets.component.scss']
})
export class PortletsComponent implements OnInit {

  _widgets = [
    { group: 'region', key: 'layout', label: '行布局', desc: '帮助说明帮助说明帮助说明帮助说明帮助说明帮助说明'},
    { group: 'region', key: 'layout', label: '列布局', desc: '帮助说明帮助说明帮助说明帮助说明帮助说明帮助说明'},
    { group: 'region', key: 'layout', label: '行列布局', desc: '帮助说明帮助说明帮助说明帮助说明帮助说明帮助说明'},
    { group: 'region', key: 'layout', label: '自由栅格布局', desc: '帮助说明帮助说明帮助说明帮助说明帮助说明帮助说明'},
  ]
  
  constructor() { }

  ngOnInit() {
    
  }

}