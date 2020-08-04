import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
// import { AgmCoreModule } from '@agm/core';

import { IonicModule } from '@ionic/angular';

import { GooglemapPage } from './googlemap.page';

const routes: Routes = [
  {
    path: '',
    component: GooglemapPage
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
  declarations: [GooglemapPage],
  providers: [
    HomeserviceService, // <-- List providers here
    TranslateService
  ]
})
export class GooglemapPageModule {}
