import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplitterComponent } from './splitter/splitter.component';


const routes: Routes = [
  { path: 'dragDrop', loadChildren: "app/utils/drag-drop-demo/drag-drop-demo#DragDropDemoModule" },
  { path: 'splitter', component: SplitterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilsRoutingModule { }

export const routedComponents = [
];