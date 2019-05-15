import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGridLayoutComponent } from './simple-grid-layout/simple-grid-layout.component';

const routes: Routes = [
    {path: 'simple', component: SimpleGridLayoutComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class GridLayoutRoutingModule { }