import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddFirstActionPage } from './add-first-action.page';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { SearchserviceService } from '../services/searchservice/searchservice.service';
import { TranslateService } from '../services/translate/translate.service';


const routes: Routes = [
  {
    path: '',
    component: AddFirstActionPage
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
  declarations: [AddFirstActionPage],
  providers: [
    HomeserviceService, // <-- List providers here
    SearchserviceService,
    TranslateService
  ]
})
export class AddFirstActionPageModule {}
