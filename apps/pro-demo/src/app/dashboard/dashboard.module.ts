import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { WorkplaceComponent } from './workplace/workplace.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [AnalysisComponent, MonitorComponent, WorkplaceComponent]
})
export class DashboardModule { }
