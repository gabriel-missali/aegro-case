import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { InputTextComponent } from './components/input/input-text/input-text.component';
import { InputErrorMessageComponent } from './components/input/input-error-message/input-error-message.component';
import { EmptyComponent } from './components/empty/empty.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalFarmRegisterComponent } from './components/modal/modal-farm-register/modal-farm-register.component';
import { TextAreaComponent } from './components/input/text-area/text-area.component';
import { ModalDeleteComponent } from './components/modal/modal-delete/modal-delete.component';
import { ModalStandRegisterComponent } from './components/modal/modal-stand-register/modal-stand-register.component';
import { ModalSampleRegisterComponent } from './components/modal/modal-sample-register/modal-sample-register.component';
import { ModalProductionRegisterComponent } from './components/modal/modal-production-register/modal-production-register.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    EmptyComponent,
    ErrorComponent,
    InputTextComponent,
    InputErrorMessageComponent,
    LoadingComponent,
    ModalDeleteComponent,
    ModalFarmRegisterComponent,
    ModalProductionRegisterComponent,
    ModalSampleRegisterComponent,
    ModalStandRegisterComponent,
    TextAreaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ModalModule.forRoot(),
  ],
  exports: [
    EmptyComponent,
    ErrorComponent,
    InputTextComponent,
    InputErrorMessageComponent,
    LoadingComponent,
    ModalDeleteComponent,
    ModalFarmRegisterComponent,
    ModalProductionRegisterComponent,
    ModalSampleRegisterComponent,
    ModalStandRegisterComponent,
    TextAreaComponent,
  ]
})
export class SharedModule { }
