import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { UserModel } from 'src/app/core/models/user.model';
import { validationMsgs } from 'src/app/core/utils/constants.util';
import { FormUtil } from 'src/app/core/utils/form.util';
import { EqualToValidator } from 'src/app/core/validators/equal-to.validator';
import { UserService } from '../../core/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequestObject = new BaseRequestObject<UserModel>();

  registerForm = new FormGroup({
    name: new FormControl(null, [ Validators.required ]),
    email: new FormControl(null, [ Validators.required, Validators.email ]),
    password: new FormControl(null, [ Validators.required ]),
    confirmPassword: new FormControl(null, [ Validators.required, EqualToValidator.validator('password') ]),
  });

  readonly msgsValidation = validationMsgs;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  register() {
    if(FormUtil.validateForm(this.registerForm)) {
      this.registerRequestObject = new BaseRequestObject<UserModel>(
      this.userService.postUser(this.registerForm.value).pipe(
        tap(() => {
          window.location.href = '/';
        }),
      ));

      this.registerRequestObject.observable.subscribe();
    }
  }

}
