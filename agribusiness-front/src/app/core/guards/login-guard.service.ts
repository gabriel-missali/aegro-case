import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BasicAuthenticaitonService } from '../services/basic-authenticaiton.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private basicAuthenticaitonService: BasicAuthenticaitonService,
    private route: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.basicAuthenticaitonService.isUserLoggedIn()) {
      this.route.navigate(['']);
      return false;
    }

    return true;
  }
}
