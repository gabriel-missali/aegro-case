import { AfterContentChecked, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';

import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { FarmModel } from 'src/app/core/models/farm.model';
import { StandModel } from 'src/app/core/models/stand.model';
import { FarmService } from 'src/app/core/services/farm.service';
import { StandService } from 'src/app/core/services/stand.service';


@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, AfterContentChecked {

  updateValue: boolean = false;

  typeRequest: string = 'save';
  
  farmRequestObject: BaseRequestObject<FarmModel>;
  standRequestObject: BaseRequestObject<StandModel>;
  deleteRequestObject = new BaseRequestObject<void>();

  standForm = new FormGroup({
    id: new FormControl(null),
    area: new FormControl(null, [Validators.required]),
    farm: new FormControl(null, [Validators.required]),
  });

  public modalRef: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private farmService: FarmService,
    private standService: StandService,
  ) { }

  ngOnInit(): void {
    this.getFarm();

    this.modalService.config.backdrop = 'static';
  }

  private getFarm() {
    const idFarm = this.activatedRoute.snapshot.params['idFarm'];
    this.farmRequestObject = new BaseRequestObject<FarmModel>(
      this.farmService.getById(idFarm).pipe(
        tap(response => this.farmRequestObject.response = response),
      ));
    this.farmRequestObject.observable.subscribe();
  }

  ngAfterContentChecked(): void {
    if(this.updateValue) {
      this.updateValue = false;
      setTimeout(() => { this.getFarm() }, 0);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createStand(template: TemplateRef<any>) {
    this.typeRequest = 'save';
    this.standForm.reset();
    this.standForm.controls.farm.setValue(this.farmRequestObject.response.id);
    this.openModal(template);
  }

  updateStand(stand: StandModel, template: TemplateRef<any>) {
    this.typeRequest = 'update';

    this.standForm.controls.id.setValue(stand.id)
    this.standForm.controls.area.setValue(stand.area)
    this.standForm.controls.farm.setValue(this.farmRequestObject.response.id);

    this.openModal(template);
  }

  deleteStand(id: string, template: TemplateRef<any>) {
    this.deleteRequestObject = new BaseRequestObject<void>(this.standService.deleteStand(id));
    this.openModal(template);
  }

}
