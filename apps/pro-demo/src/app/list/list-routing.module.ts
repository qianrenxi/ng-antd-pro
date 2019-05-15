import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicListComponent } from './basic-list/basic-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { TableListComponent } from './table-list/table-list.component';
import { SearchComponent } from './search/search.component';
import { SearchApplicationsComponent } from './search-applications/search-applications.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { SearchProjectsComponent } from './search-projects/search-projects.component';

const routes: Routes = [
  { path: 'basic-list', component: BasicListComponent },
  { path: 'card-list', component: CardListComponent },
  { path: 'table-list', component: TableListComponent },
  {
    path: 'search', component: SearchComponent, children: [
      { path: 'applications', component: SearchApplicationsComponent },
      { path: 'articles', component: SearchArticlesComponent },
      { path: 'projects', component: SearchProjectsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
