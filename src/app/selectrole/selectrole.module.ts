import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectrolePage } from './selectrole.page';

import { SetroleserviceService } from '../services/setroleservice/setroleservice.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';

const routes: Routes = [
  {
    path: '',
    component: SelectrolePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectrolePage],
  providers: [
    SetroleserviceService,
    HomeserviceService
  ]
})
export class SelectrolePageModule {}
