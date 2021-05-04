import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { SampleModel } from 'src/app/core/models/sample.model';
import { SampleService } from 'src/app/core/services/sample.service';
import { validationMsgs } from 'src/app/core/utils/constants.util';
import { FormUtil } from 'src/app/core/utils/form.util';
import { ModalCommonComponet } from '../modal-common.component';

@Component({
  selector: 'app-modal-sample-register',
  templateUrl: './modal-sample-register.component.html',
  styleUrls: ['./modal-sample-register.component.scss']
})
export class ModalSampleRegisterComponent extends ModalCommonComponet {

  @Input() typeRequest: string = 'save';
  @Input() sampleForm: FormGroup;

  readonly msgsValidation = validationMsgs;

  sampleRequestObject = new BaseRequestObject<SampleModel>();

  constructor(
    private sampleService:  SampleService,
  ) {
    super();
   }

  saveSample(){
    if(FormUtil.validateForm(this.sampleForm)) {
      const sample: SampleModel = {
        mediaQuantityCerealsPlant: this.sampleForm.controls.mediaQuantityCerealsPlant.value,
        mediaWeight: this.sampleForm.controls.mediaWeight.value,
        quantityPlant: this.sampleForm.controls.quantityPlant.value,
      };

      if(this.typeRequest === 'save') { 
        this.sampleRequestObject = new BaseRequestObject<SampleModel>(
          this.sampleService.postCreateSample(
            this.sampleForm.controls.farm.value, this.sampleForm.controls.stand.value, sample
          ).pipe(
            tap(() => {
              this.updateValue = true;
              this.sampleForm.reset();
              this.closeModal();
            }),
          ));

      } else if(this.typeRequest === 'update') {
        if (this.sampleForm.controls.id.value) {
          sample.id = this.sampleForm.controls.id.value;
        }

        this.sampleRequestObject = new BaseRequestObject<SampleModel>(
          this.sampleService.putUpdateSample(
            this.sampleForm.controls.farm.value, this.sampleForm.controls.stand.value, sample
          ).pipe(
            tap(() => {
              this.updateValue = true;
              this.sampleForm.reset();
              this.closeModal();
            }),
          ));
      }

      this.sampleRequestObject.observable.subscribe();
    }
  }

}
