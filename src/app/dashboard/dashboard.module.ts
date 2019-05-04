import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { MessagecomponentComponent } from '../components/messagecomponent/messagecomponent.component';
import { LoginModalPage } from '../login-modal/login-modal.page';
import { PhonenumberPage } from '../phonenumber/phonenumber.page';
import { SelectrolePage } from '../selectrole/selectrole.page';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { SetroleserviceService } from '../services/setroleservice/setroleservice.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
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
  declarations: [DashboardPage,HeroDetailComponent,MessagecomponentComponent,LoginModalPage,PhonenumberPage,SelectrolePage],
  entryComponents:[LoginModalPage,PhonenumberPage,SelectrolePage],
  providers: [
    HomeserviceService, // <-- List providers here
    OnlineusersService,
    NotificationService,
    SetroleserviceService
  ]
})
export class DashboardPageModule {}
