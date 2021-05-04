import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticaitonService } from '../services/basic-authenticaiton.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticaitonService: BasicAuthenticaitonService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuthHeaderString = this.basicAuthenticaitonService.getAuthenticatedToken();
    const username = this.basicAuthenticaitonService.getAuthenticatedUser(); 

    if(basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        }
      });
    }

    return next.handle(request);
  };
  
}
