import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmComponent } from './farm/farm.component';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { ReportComponent } from './report/report.component';
import { StandComponent } from './stand/stand.component';


const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'farm/:idFarm', component: FarmComponent },
  { path: 'farm/:idFarm/stand/:idStand', component: StandComponent },
  { path: 'report/:id', component: ReportComponent },
];

const routes: Routes = [
  { path: '', component: MainComponent, children: childRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
