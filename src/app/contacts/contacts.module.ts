import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactsPage } from './contacts.page';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { ContactserviceService } from '../services/contactservice/contactservice.service';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { TranslateService } from '../services/translate/translate.service';

const routes: Routes = [
  {
    path: '',
    component: ContactsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactsPage],
  providers: [
  //  HomeserviceService, // <-- List providers here
    //ContactserviceService,
    //OnlineusersService,
    //TranslateService
  ]
})
export class ContactsPageModule {}
