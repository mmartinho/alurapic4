import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignupService } from './signup/signup.service';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    /** 
     * Módulo que exporta a instância "FormBuilder" 
     * injetada nos componenentes que a "clamam", e
     * realiza a validação.
     * Obs: Substitui o FormsModule
     */
    ReactiveFormsModule, 
    RouterModule,
    VmessageModule,
    HomeRoutingModule
  ],
  /**
   * Dependencias injetaveis disponiveis
   * para todos do modulo
   */
  providers : [
    SignupService   
  ]
})
export class HomeModule { }
