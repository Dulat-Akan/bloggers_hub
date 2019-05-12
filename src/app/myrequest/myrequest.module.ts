import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { MyrequestService } from '../services/myrequest/myrequest.service';
import { TranslateService } from '../services/translate/translate.service';


import { IonicModule } from '@ionic/angular';

import { MyrequestPage } from './myrequest.page';

const routes: Routes = [
  {
    path: '',
    component: MyrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyrequestPage],
  providers: [
    HomeserviceService,
    MyrequestService,
    TranslateService
  ]
})
export class MyrequestPageModule {}
