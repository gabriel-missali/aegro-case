import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormUtil } from 'src/app/core/utils/form.util';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss']
})
export class InputErrorMessageComponent {

  @Input() control: FormControl;
  @Input() errorMsgs: {};
  @Input() errorValidation = FormUtil.errorValidation;

}
