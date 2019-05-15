import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { TableListComponent } from './table-list/table-list.component';
import { BasicListComponent } from './basic-list/basic-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { SearchComponent } from './search/search.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { SearchProjectsComponent } from './search-projects/search-projects.component';
import { SearchApplicationsComponent } from './search-applications/search-applications.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule,
  ],
  declarations: [TableListComponent, BasicListComponent, CardListComponent, SearchComponent, SearchArticlesComponent, SearchProjectsComponent, SearchApplicationsComponent]
})
export class ListModule { }
