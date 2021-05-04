import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseRequestObject } from '../core/class/base-request-object';
import { BasicAuthenticaitonService } from '../core/services/basic-authenticaiton.service';
import { validationMsgs } from '../core/utils/constants.util';
import { FormUtil } from '../core/utils/form.util';
import { UserModel } from '../core/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequestObject = new BaseRequestObject<any>();

  loginForm = new FormGroup({
    email: new FormControl(null, [ Validators.required, Validators.email ]),
    password: new FormControl(null, [ Validators.required ]),
  });

  readonly msgsValidation = validationMsgs;

  constructor(
    private basicAuthentication: BasicAuthenticaitonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signUp(): void {
    if(FormUtil.validateForm(this.loginForm)) {
      this.loginRequestObject = new BaseRequestObject<any>(
      this.basicAuthentication.executeJWTAuthenticaionService(
        this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .pipe(
          tap(_ => this.router.navigate([''])),
        ));

        this.loginRequestObject.observable.subscribe();
    }
  }

}
