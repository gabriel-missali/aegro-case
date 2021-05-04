import { AfterContentChecked, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { SampleModel } from 'src/app/core/models/sample.model';
import { StandModel } from 'src/app/core/models/stand.model';
import { SampleService } from 'src/app/core/services/sample.service';
import { StandService } from 'src/app/core/services/stand.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit, AfterContentChecked {

  @Input() standRequestObject: BaseRequestObject<StandModel>;

  updateValue: boolean = false;

  typeRequest: string = 'save';

  deleteRequestObject = new BaseRequestObject<void>();

  sampleForm = new FormGroup({
    id: new FormControl(null),
    quantityPlant: new FormControl(null, [Validators.required]),
    mediaQuantityCerealsPlant: new FormControl(null, [Validators.required]),
    mediaWeight: new FormControl(null, [Validators.required]),
    farm: new FormControl(null),
    stand: new FormControl(null),
  });

  public modalRef: BsModalRef;

  idFarm: number;
  idStand: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private sampleService: SampleService,
    private standService: StandService,
  ) { }

  ngOnInit(): void {
    this.getStand();

    this.modalService.config.backdrop = 'static';
  }

  ngAfterContentChecked(): void {
    if(this.updateValue) {
      this.updateValue = false;
      setTimeout(() => { this.getStand() }, 0);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createSample(template: TemplateRef<any>) {
    this.typeRequest = 'save';
    this.sampleForm.reset();
    this.sampleForm.controls.farm.setValue(this.idFarm);
    this.sampleForm.controls.stand.setValue(this.idStand);
    this.openModal(template);
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

  updateSample(sample: SampleModel, template: TemplateRef<any>) {
    this.typeRequest = 'update';
    
    this.sampleForm.controls.id.setValue(sample.id);
    this.sampleForm.controls.quantityPlant.setValue(sample.quantityPlant);
    this.sampleForm.controls.mediaQuantityCerealsPlant.setValue(sample.mediaQuantityCerealsPlant);
    this.sampleForm.controls.mediaWeight.setValue(sample.mediaWeight);
    this.sampleForm.controls.farm.setValue(this.idFarm);
    this.sampleForm.controls.stand.setValue(this.idStand);

    this.openModal(template);
  }

  deleteSample(id: string, template: TemplateRef<any>) {
    this.deleteRequestObject = new BaseRequestObject<void>(this.sampleService.deleteSample(id));
    this.openModal(template);
  }

}
