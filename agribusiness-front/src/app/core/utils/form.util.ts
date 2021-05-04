import { AbstractControl, FormGroup } from "@angular/forms";


export class FormUtil {

  static errorValidation(formControl: AbstractControl){
    return formControl.invalid && formControl.touched;
  }

  static touchForm(form: FormGroup) {
    form.markAllAsTouched();
    Object.keys(form.controls).forEach(control => form.controls[control].markAllAsTouched());
  }

  static dirtyForm(form: FormGroup) {
    form.markAllAsTouched();
    Object.keys(form.controls).forEach(control => form.controls[control].markAsDirty());
  }

  static validateForm(form: FormGroup) {
    FormUtil.touchForm(form);
    FormUtil.dirtyForm(form);

    return form.valid
  }

}
