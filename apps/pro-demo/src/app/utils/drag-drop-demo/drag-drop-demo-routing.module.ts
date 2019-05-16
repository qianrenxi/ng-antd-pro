import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragDropDemoComponent } from './drag-drop-demo.component';

const routes: Routes = [
  {
    path: '', component: DragDropDemoComponent, children: [
      { path: '', redirectTo: 'draggable', pathMatch: 'full' },
      { path: 'draggable', loadChildren: './draggable-demo/draggable-demo.module#DraggableDemoModule' },
      { path: 'droppable', loadChildren: './droppable-demo/droppable-demo.module#DroppableDemoModule' },
      { path: 'sortable', loadChildren: './sortable-demo/sortable-demo.module#SortableDemoModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragDropDemoRoutingModule { }
