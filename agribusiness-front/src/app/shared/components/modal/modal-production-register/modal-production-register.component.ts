import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { validationMsgs } from 'src/app/core/utils/constants.util';
import { ProductionModel } from 'src/app/core/models/production.model';
import { FormUtil } from 'src/app/core/utils/form.util';
import { ProductionService } from 'src/app/core/services/production.service';
import { tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ModalCommonComponet } from '../modal-common.component';


@Component({
  selector: 'app-modal-production-register',
  templateUrl: './modal-production-register.component.html',
  styleUrls: ['./modal-production-register.component.scss'],
  providers: [ DatePipe ],
})
export class ModalProductionRegisterComponent {

  private _updateValueProduction: boolean;
  set updateValueProduction(value: boolean) {
    this._updateValueProduction = value;
    this.updateValueProductionChange.emit(this._updateValueProduction);
  }
  @Input()  get updateValueProduction() { return this._updateValueProduction; }
  @Output() public updateValueProductionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() modalRef: BsModalRef;

  @Input() typeRequestProduction: string = 'save';
  @Input() productionForm: FormGroup;

  readonly msgsValidation = validationMsgs;

  productionRequestObject = new BaseRequestObject<ProductionModel>();

  constructor(
    private productionService: ProductionService,
    private datePipe: DatePipe,
  ) { }

  saveProduction() {
    if(FormUtil.validateForm(this.productionForm)) {
      const production: ProductionModel ={
        quantity: this.productionForm.controls.quantity.value,
        date: this.datePipe.transform(this.productionForm.controls.date.value, 'yyyy-MM-dd', 'UTC'),
      }
      
      if(this.typeRequestProduction === 'save') { 
        this.productionRequestObject = new BaseRequestObject<ProductionModel>(
          this.productionService.postCreateProduction(
            this.productionForm.controls.farm.value, this.productionForm.controls.stand.value, production
          ).pipe(
            tap(() => this.closeModal()),
          ));

      } else if(this.typeRequestProduction === 'update') {
        if (this.productionForm.controls.id.value) {
          production.id = this.productionForm.controls.id.value;
        }
          
        this.productionRequestObject = new BaseRequestObject<ProductionModel>(
          this.productionService.putUpdateProduction(
            this.productionForm.controls.farm.value, this.productionForm.controls.stand.value, production
          ).pipe(
            tap(() => this.closeModal()),
          ));
      }

      this.productionRequestObject.observable.subscribe();
    }
  }

  closeModal() {
    this.updateValueProduction = true;
    this.productionForm.reset();
    this.modalRef.hide();

  }

}
