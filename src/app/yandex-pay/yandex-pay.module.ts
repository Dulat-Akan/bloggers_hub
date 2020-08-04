import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { HomeserviceService } from '../services/homeservice/homeservice.service';
// import { TranslateService } from '../services/translate/translate.service';
// import { PayserviceService } from '../services/payservice/payservice.service';

import { IonicModule } from '@ionic/angular';

import { YandexPayPage } from './yandex-pay.page';

const routes: Routes = [
  {
    path: '',
    component: YandexPayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YandexPayPage],
  providers: [
    // HomeserviceService, // <-- List providers here
    // TranslateService,
    // PayserviceService
  ]
})
export class YandexPayPageModule {}
