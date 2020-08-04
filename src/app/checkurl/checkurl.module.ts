import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';
import { IonicModule } from '@ionic/angular';

import { CheckurlPage } from './checkurl.page';

const routes: Routes = [
  {
    path: '',
    component: CheckurlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    HomeserviceService, // <-- List providers here
    DetailserviceService
  ],
  declarations: [CheckurlPage]
})
export class CheckurlPageModule {}
