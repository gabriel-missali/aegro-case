import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";

import { SharedModule } from "../shared/shared.module";
import { FarmComponent } from "./farm/farm.component";
import { HomeComponent } from "./home/home.component";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StandComponent } from './stand/stand.component';
import { SampleComponent } from './stand/sample/sample.component';
import { ProductionComponent } from './stand/production/production.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule } from "ng2-charts";


@NgModule({
  declarations: [
    HomeComponent,
    FarmComponent,
    MainComponent,
    ProductionComponent,
    StandComponent,
    ReportComponent,
    SampleComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ChartsModule,

    ModalModule.forRoot(),
  ],
})
export class MainModule {}
