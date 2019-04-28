import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { MessagecomponentComponent } from '../components/messagecomponent/messagecomponent.component';
import { LoginModalPage } from '../login-modal/login-modal.page';

import { HomeserviceService } from '../services/homeservice/homeservice.service';

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
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage,HeroDetailComponent,MessagecomponentComponent,LoginModalPage],
  entryComponents:[LoginModalPage],
  providers: [
    HomeserviceService // <-- List providers here
  ]
})
export class DashboardPageModule {}
