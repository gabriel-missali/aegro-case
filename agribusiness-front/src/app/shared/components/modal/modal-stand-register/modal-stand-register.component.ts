import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { StandModel } from 'src/app/core/models/stand.model';
import { StandService } from 'src/app/core/services/stand.service';
import { validationMsgs } from 'src/app/core/utils/constants.util';
import { FormUtil } from 'src/app/core/utils/form.util';
import { ModalCommonComponet } from '../modal-common.component';

@Component({
  selector: 'app-modal-stand-register',
  templateUrl: './modal-stand-register.component.html',
  styleUrls: ['./modal-stand-register.component.scss']
})
export class ModalStandRegisterComponent extends ModalCommonComponet {

  // private _updateValue: boolean;
  // set updateValue(value: boolean) {
  //   this._updateValue = value;
  //   this.updateValueChange.emit(this._updateValue);
  // }
  // @Input()  get updateValue() { return this._updateValue; }
  // @Output() public updateValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // @Input() modalRef: BsModalRef;
  @Input() typeRequest: string = 'save';
  @Input() standForm: FormGroup;

  readonly msgsValidation = validationMsgs;

  standRequestObject = new BaseRequestObject<StandModel>();

  constructor(
    private standService: StandService,
  ) { 
    super();
  }

  saveStand() {
    if(FormUtil.validateForm(this.standForm)) {
      const stand: StandModel = {
        area: this.standForm.controls.area.value,
      }

      if(this.typeRequest === 'save') {
        this.standRequestObject = new BaseRequestObject<StandModel>(
          this.standService.postCreateStand(stand, this.standForm.controls.farm.value).pipe(
            tap(() => {
              this.updateValue = true;
              this.standForm.reset();
              this.closeModal();
            }),
          ));

      } else if(this.typeRequest === 'update') {
        if (this.standForm.controls.id.value) {
          stand.id = this.standForm.controls.id.value;
        }

        this.standRequestObject = new BaseRequestObject<StandModel> (
          this.standService.updateStand(stand, this.standForm.controls.farm.value).pipe(
            tap(() => {
              this.updateValue = true;
              this.standForm.reset();
              this.closeModal();
            }),
          ));
      }

      this.standRequestObject.observable.subscribe();
    }
  }

}
