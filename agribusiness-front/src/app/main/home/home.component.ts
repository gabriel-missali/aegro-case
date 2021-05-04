import { AfterContentChecked, Component, OnInit, TemplateRef } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { FarmService } from 'src/app/core/services/farm.service';
import { FarmModel } from 'src/app/core/models/farm.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  updateValue: boolean = false;

  typeRequest: string = 'save';

  farmForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [ Validators.required ]),
    address: new FormControl(null, [ Validators.required ]),
    description: new FormControl(null)
  });

  farmRequestObject = new BaseRequestObject<FarmModel>(this.farmService.getAllByUser());
  deleteRequestObject = new BaseRequestObject<void>();

  public modalRef: BsModalRef;

  constructor(
    private farmService: FarmService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.modalService.config.backdrop = 'static';
    this.getFarms();
  }

  ngAfterContentChecked(): void {
    if(this.updateValue) {
      this.updateValue = false;
      setTimeout(() => { this.getFarms() }, 0);
    }
  }

  private getFarms() {
    this.farmRequestObject.observable = this.farmRequestObject.observable.pipe(
        tap(response => this.farmRequestObject.response = response),
        catchError(error => {
          console.error(error);
          return of(null);
        })
    );
    this.farmRequestObject.observable.subscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createFarm(template: TemplateRef<any>) {
    this.typeRequest = 'save';
    this.farmForm.reset();
    this.openModal(template);
  }

  deleteFarm(id: string, template: TemplateRef<any>) {
    this.deleteRequestObject = new BaseRequestObject<void>(this.farmService.deletFarm(id));
    this.openModal(template);
  }

  updateFarm(farm: FarmModel, template: TemplateRef<any>) {
    this.typeRequest = 'update';
    delete farm.standsList;
    this.farmForm.setValue(farm);
    this.openModal(template);
  }

}
