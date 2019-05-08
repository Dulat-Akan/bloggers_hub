import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { IonicModule } from '@ionic/angular';

import { SelectlanguagePage } from './selectlanguage.page';

const routes: Routes = [
  {
    path: '',
    component: SelectlanguagePage
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
  //declarations: [SelectlanguagePage],
  providers: [
    TranslateService,
    HomeserviceService
  ]
})
export class SelectlanguagePageModule {}
