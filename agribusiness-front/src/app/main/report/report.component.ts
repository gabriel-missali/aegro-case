import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets, NestedTickOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { FarmModel } from 'src/app/core/models/farm.model';
import { StandModel } from 'src/app/core/models/stand.model';
import { FarmService } from 'src/app/core/services/farm.service';
import { ProductionService } from 'src/app/core/services/production.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales : { yAxes: [{ ticks: { beginAtZero: true } }] }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;

  // barChartData: ChartDataSets[];
  barChartData: ChartDataSets[] = [{ 
    data: [],
    backgroundColor: 'rgba(0,160,0,0.6)',
    borderColor: "rgba(0,160,0,1)",
    hoverBackgroundColor: "rgba(0,160,0,0.8)",
    hoverBorderColor: "rgba(0,160,0,1)"
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private farmService: FarmService,
    private productionService: ProductionService,
  ) { }

  farmRequestObject= new BaseRequestObject<FarmModel>();
  productiomRequestObject= new BaseRequestObject<any>();

  ngOnInit(): void {
    const idFarm = this.activatedRoute.snapshot.params['id'];

    this.farmRequestObject = new BaseRequestObject<FarmModel>(
      this.farmService.getById(idFarm).pipe(
        tap(response => {
          response.standsList.forEach(stand => {
            if(stand.sampleList.length) {
              stand.estimate = this.calculationEstimate(stand);
            }
          });

          this.farmRequestObject.response = response;
        }),
      ));
    this.farmRequestObject.observable.subscribe();

    this.productiomRequestObject = new BaseRequestObject<any>(
      this.productionService.getReport(idFarm).pipe(
        tap(response => {
          response.forEach(item => {
            this.barChartLabels.push(item[1] + '/' + item[0]);
            this.barChartData[0].data.push(item[2].toFixed(3));
          });
        }),
      ));

    this.productiomRequestObject.observable.subscribe();
  }

  // Calculo da estimativa de produção(kg) por talhão
  calculationEstimate(stand: StandModel): number {
    let totalQuantityPlant = 0;
    let totalMediaQuantityCerealsPlant = 0;
    let totalMediaWeight = 0;
    const qtdSample = stand.sampleList?.length;

    stand.sampleList.forEach(sample => {
      totalQuantityPlant += sample.quantityPlant;
      totalMediaQuantityCerealsPlant += sample.mediaQuantityCerealsPlant;
      totalMediaWeight += sample.mediaWeight;
    });

    const estimateStand = (totalQuantityPlant/qtdSample) * (totalMediaQuantityCerealsPlant/qtdSample) * (totalMediaWeight/qtdSample);

    return +(estimateStand * stand.area / 1000).toFixed(2);
  }

}
