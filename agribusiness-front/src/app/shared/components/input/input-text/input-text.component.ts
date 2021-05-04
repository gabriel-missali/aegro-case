import { Component, Input } from '@angular/core';

import { FieldCommonComponent } from '../field-common.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends FieldCommonComponent {

  @Input() type = 'text';

  @Input() canShowPassword = true;
  isShowingPassword = false;

  constructor() {
    super();
  }

  showPassword() {
    this.type = this.isShowingPassword ? 'password' : 'text';

    this.isShowingPassword = !this.isShowingPassword;
  }

}
