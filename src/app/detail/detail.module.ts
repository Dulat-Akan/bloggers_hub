import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { StoreserviceService } from '../services/storeseservice/storeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { GoogleChartsModule } from 'angular-google-charts';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    GoogleChartsModule
  ],
  declarations: [DetailPage],
  providers: [
    HomeserviceService, // <-- List providers here
    DetailserviceService,
    StoreserviceService,
    TranslateService
  ]
})
export class DetailPageModule {}
