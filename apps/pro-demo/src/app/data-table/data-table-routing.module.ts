import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleDataTableComponent } from './simple-data-table/simple-data-table.component';


const routes: Routes = [
    { path: 'simple', component: SimpleDataTableComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class DataTableRoutingModule {
}