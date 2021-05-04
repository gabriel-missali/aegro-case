import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user.model';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  postUser(user: UserModel): Observable<UserModel>{
    delete user.confirmPassword;

    return this.httpClient.post<UserModel>(serviceBackUrl(Endpoints.CreateUser), user);
  }
}
