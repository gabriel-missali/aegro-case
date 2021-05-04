import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EqualToValidator {

  static validator(equalToControl: AbstractControl | string){
    return(control: AbstractControl): ValidationErrors => {
      if (typeof equalToControl === 'string') {
        if (!control.parent) { return null; }
        equalToControl = control.parent.get(equalToControl);
      }

      if (control.value !== equalToControl.value) { return { equalToPassword: true }; }
      return null;
    }
  }

}