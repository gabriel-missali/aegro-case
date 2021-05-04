import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { LoginGuardService } from "./guards/login-guard.service";
import { RouteGuardService } from "./guards/route-guard.service";
import { HttpIntercepterBasicAuthService } from "./interceptor/http-intercepter-basic-auth.service";
import { BasicAuthenticaitonService } from "./services/basic-authenticaiton.service";
import { FarmService } from "./services/farm.service";
import { ProductionService } from "./services/production.service";
import { SampleService } from "./services/sample.service";
import { StandService } from "./services/stand.service";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [],
  providers: [
    BasicAuthenticaitonService,
    FarmService,
    ProductionService,
    SampleService,
    StandService,
    UserService,

    LoginGuardService,
    RouteGuardService,
    
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
    
  ]
})
export class CoreModule {}