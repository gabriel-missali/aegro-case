import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { FarmModel } from 'src/app/core/models/farm.model';
import { FarmService } from 'src/app/core/services/farm.service';
import { validationMsgs } from 'src/app/core/utils/constants.util';
import { FormUtil } from 'src/app/core/utils/form.util';
import { ModalCommonComponet } from '../modal-common.component';


@Component({
  selector: 'app-modal-farm-register',
  templateUrl: './modal-farm-register.component.html',
  styleUrls: ['./modal-farm-register.component.scss']
})
export class ModalFarmRegisterComponent extends ModalCommonComponet {

  @Input() typeRequest: string = 'save';
  @Input() farmForm: FormGroup;
  
  readonly msgsValidation = validationMsgs;
  
  farmRequestObject = new BaseRequestObject<FarmModel>();


  constructor(
    private farmService: FarmService,
  ) { 
    super();
  }

  saveFarm(): void {
    if(FormUtil.validateForm(this.farmForm)) {
      const farm: FarmModel = {
        name: this.farmForm.controls.name.value,
        address: this.farmForm.controls.address.value,
        description: this.farmForm.controls.description.value
      };

      if(this.typeRequest === 'save') {
        this.farmRequestObject = new BaseRequestObject<FarmModel>(
          this.farmService.postCreateFarm(farm).pipe(
            tap(() => {
              this.updateValue = true;
              this.farmForm.reset();
              this.closeModal();
            }),
          ));

      } else if(this.typeRequest === 'update') {
        if (this.farmForm.controls.id.value) {
          farm.id = this.farmForm.controls.id.value;
        }

        this.farmRequestObject = new BaseRequestObject<FarmModel>(
          this.farmService.updateFarm(farm).pipe(
            tap(() => {
              this.updateValue = true;
              this.farmForm.reset();
              this.closeModal();
            }),
          ));
      }

      this.farmRequestObject.observable.subscribe();
    }
  }

}
