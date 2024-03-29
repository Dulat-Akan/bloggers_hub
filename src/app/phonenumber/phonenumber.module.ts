import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { PhonenumberserviceService } from '../services/phonenumberservice/phonenumberservice.service';
import { TranslateService } from '../services/translate/translate.service';

import { IonicModule } from '@ionic/angular';

import { PhonenumberPage } from './phonenumber.page';

const routes: Routes = [
  {
    path: '',
    component: PhonenumberPage
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
  //declarations: [PhonenumberPage],
  declarations: [],
  providers: [
    HomeserviceService, // <-- List providers here
    PhonenumberserviceService,
    TranslateService

  ]
})
export class PhonenumberPageModule {}
