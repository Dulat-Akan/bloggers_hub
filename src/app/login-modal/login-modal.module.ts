import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginModalPage],
  providers: [
    LoginService // <-- List providers here
  ]
})
export class LoginModalPageModule {}
