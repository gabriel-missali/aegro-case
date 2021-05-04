import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuardService } from './core/guards/login-guard.service';
import { RouteGuardService } from './core/guards/route-guard.service';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [RouteGuardService],
  },

  { 
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuardService] },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
