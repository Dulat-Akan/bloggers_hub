import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { StoreserviceService } from '../services/storeseservice/storeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';

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
    RouterModule.forChild(routes)
  ],
  declarations: [DetailPage],
  providers: [
    HomeserviceService, // <-- List providers here
    DetailserviceService,
    StoreserviceService
  ]
})
export class DetailPageModule {}
