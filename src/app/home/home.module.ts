import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { MessagecomponentComponent } from '../components/messagecomponent/messagecomponent.component';
import { HomeserviceService } from '../services/homeservice/homeservice.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    //TestPageModule,


  ],
  declarations: [HomePage,HeroDetailComponent,MessagecomponentComponent],
  providers: [
    HomeserviceService // <-- List providers here
  ]

})
export class HomePageModule {



}
