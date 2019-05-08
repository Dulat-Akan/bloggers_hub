import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { ChatserviceService } from '../services/chatservice/chatservice.service';
import { TranslateService } from '../services/translate/translate.service';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
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
  declarations: [ChatPage],
  providers: [
    HomeserviceService, // <-- List providers here
    ChatserviceService,
    TranslateService
  ]
})
export class ChatPageModule {}
