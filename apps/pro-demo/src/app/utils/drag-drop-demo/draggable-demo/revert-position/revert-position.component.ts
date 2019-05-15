import { Component, OnInit } from '@angular/core';
import { DragReleaseEvent } from '@qianrenxi/ng-antd-pro';

@Component({
  selector: 'demo-revert-position',
  templateUrl: './revert-position.component.html',
  styleUrls: ['./revert-position.component.scss']
})
export class RevertPositionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDragReleased($event: DragReleaseEvent) {
    const { source } = $event;
    source.revert();
  }

}
