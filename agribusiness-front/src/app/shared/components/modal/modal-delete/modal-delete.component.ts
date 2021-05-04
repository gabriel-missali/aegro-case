import { Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { ModalCommonComponet } from '../modal-common.component';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent extends ModalCommonComponet {

  @Input() title: string;
  @Input() deleteRequestObject: BaseRequestObject<any> = new BaseRequestObject<any>();
  @Input() body: string;
  @Input() warning: null;

  deleteItem() {
    if(this.deleteRequestObject) {
      this.deleteRequestObject.observable.pipe(
        tap(() => {
          this.updateValue = true;
          this.closeModal();
        }),
      ).subscribe();
    }
  }

}
