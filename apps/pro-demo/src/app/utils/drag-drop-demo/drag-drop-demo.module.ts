import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@qianrenxi/ng-antd-pro';
import { SharedModule } from '../../shared/shared.module';
import { DragDropDemoRoutingModule } from './drag-drop-demo-routing.module';
import { DraggableDemoModule } from './draggable-demo/draggable-demo.module';
import { DroppableDemoModule } from './droppable-demo/droppable-demo.module';
import { SortableDemoModule } from './sortable-demo/sortable-demo.module';
import { DragDropDemoComponent } from './drag-drop-demo.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    DragDropDemoRoutingModule,
  ],
  declarations: [DragDropDemoComponent],
})
export class DragDropDemoModule { }
