import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  template: '',
})
export abstract class ModalCommonComponet {

  private _updateValue: boolean;
  set updateValue(value: boolean) {
    this._updateValue = value;
    this.updateValueChange.emit(this._updateValue);
  }
  @Input()  get updateValue() { return this._updateValue; }
  @Output() public updateValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() modalRef: BsModalRef;

  closeModal() {
    this.modalRef.hide();
  }

}