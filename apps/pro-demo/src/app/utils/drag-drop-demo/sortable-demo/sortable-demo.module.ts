import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@qianrenxi/ng-antd-pro';
import { SortableDemoRoutingModule } from './sortable-demo-routing.module';
import { SortableDemoComponent } from './sortable-demo.component';
import { DefaultComponent } from './default/default.component';
import { ConnectListsComponent } from './connect-lists/connect-lists.component';
import { AsgridComponent } from './asgrid/asgrid.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HandleEmptyComponent } from './handle-empty/handle-empty.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { PortletsComponent } from './portlets/portlets.component';
import { RowRegionComponent } from './portlets/row-region/row-region.component';
import { ColRegionComponent } from './portlets/col-region/col-region.component';
import { GridRegionComponent } from './portlets/grid-region/grid-region.component';

@NgModule({
  declarations: [SortableDemoComponent, DefaultComponent, ConnectListsComponent, AsgridComponent, PlaceholderComponent, HandleEmptyComponent, FilterItemsComponent, PortletsComponent, RowRegionComponent, ColRegionComponent, GridRegionComponent],
  imports: [
    CommonModule,
    SortableDemoRoutingModule,
    DragDropModule,
  ]
})
export class SortableDemoModule { }
