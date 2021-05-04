import { DatePipe } from '@angular/common';
import { AfterContentChecked, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { ProductionModel } from 'src/app/core/models/production.model';
import { StandModel } from 'src/app/core/models/stand.model';
import { ProductionService } from 'src/app/core/services/production.service';
import { SampleService } from 'src/app/core/services/sample.service';
import { StandService } from 'src/app/core/services/stand.service';


@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
  providers: [ DatePipe ],
})
export class ProductionComponent implements OnInit, AfterContentChecked {

  @Input() standRequestObject: BaseRequestObject<StandModel>;

  updateProductionValue: boolean = false;
  deleteProductionValue: boolean = false;

  typeRequestProduction: string = 'save';

  deleteRequestObject = new BaseRequestObject<void>();

  productionForm = new FormGroup({
    id: new FormControl(null),
    quantity: new FormControl(null, [ Validators.required ]),
    date: new FormControl(null, [ Validators.required ]),
    farm: new FormControl(null),
    stand: new FormControl(null),
  });

  public modalRef: BsModalRef;

  idFarm: number;
  idStand: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private productionService: ProductionService,
    private standService: StandService,
  ) { }

  ngOnInit(): void {
    this.getStand();

    this.modalService.config.backdrop = 'static';
  }

  ngAfterContentChecked(): void {
    if(this.updateProductionValue || this.deleteProductionValue) {
      this.updateProductionValue = false;
      this.deleteProductionValue = false;
      setTimeout(() => { this.getStand() }, 0);
    }
  }

  private getStand() {
    this.idFarm = this.activatedRoute.snapshot.params['idFarm'];
    this.idStand = this.activatedRoute.snapshot.params['idStand'];

    this.standRequestObject = new BaseRequestObject<StandModel>(
      this.standService.getStandById(this.idStand, this.idFarm).pipe(
        tap(response => {
          response.sampleList.forEach(sample => {
            // Calculo da estivativa de produção em um talhão
            sample.estimate = sample.quantityPlant * sample.mediaQuantityCerealsPlant * sample.mediaWeight / 1000;
          });

          this.standRequestObject.response = response;
        }),
      ));

      this.standRequestObject.observable.subscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createProduction(template: TemplateRef<any>) {
    this.typeRequestProduction = 'save';

    this.productionForm.reset();
    this.productionForm.controls.farm.setValue(this.idFarm);
    this.productionForm.controls.stand.setValue(this.idStand);

    this.openModal(template);
  }

  updateProduction(production: ProductionModel, template: TemplateRef<any>) {
    this.typeRequestProduction = 'update';

    this.productionForm.controls.id.setValue(production.id);
    this.productionForm.controls.quantity.setValue(production.quantity);
    this.productionForm.controls.date.setValue(this.datePipe.transform(production.date, 'yyyy-MM-dd', 'UTC'));
    this.productionForm.controls.farm.setValue(this.idFarm);
    this.productionForm.controls.stand.setValue(this.idStand);
    
    this.openModal(template);

  }

  deleteProduction(id: string, template: TemplateRef<any>) {
    this.deleteRequestObject = new BaseRequestObject<void>(this.productionService.deleteProduction(id));
    this.openModal(template);
  }

}
