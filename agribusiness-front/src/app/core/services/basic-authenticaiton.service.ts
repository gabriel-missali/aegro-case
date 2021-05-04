import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints, serviceBackUrl } from '../utils/endpoints.util';


export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable()
export class BasicAuthenticaitonService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  executeJWTAuthenticaionService(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(serviceBackUrl(Endpoints.Authenticate), {email, password})
      .pipe(
        map(data => {
          sessionStorage.setItem(AUTHENTICATED_USER, email);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        })
      );
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    this.router.navigate(['/login']);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticaterUser');

    return !(user === null);
  }

}
