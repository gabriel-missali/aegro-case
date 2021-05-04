import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormUtil } from "src/app/core/utils/form.util";

@Component({
  template: ''
})
export abstract class FieldCommonComponent {
  @Input() id = '';
  @Input() control: FormControl;
  @Input() errorMsgs: { [key: string]: string} = {};
  @Input() fieldName = '';

  errorValidation = FormUtil.errorValidation;
}