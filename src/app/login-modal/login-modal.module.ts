import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { TranslateService } from '../services/translate/translate.service';

import { LoginModalPage } from './login-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LoginModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  //declarations: [LoginModalPage],
  providers: [
    LoginService,
    TranslateService
  ]
})
export class LoginModalPageModule {}
