import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteserviceService } from '../services/favoriteservice/favoriteservice.service';
import { TranslateService } from '../services/translate/translate.service';

import { IonicModule } from '@ionic/angular';

import { FavoritePage } from './favorite.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritePage],
  providers: [
    FavoriteserviceService,
    TranslateService
  ]
})
export class FavoritePageModule {}
