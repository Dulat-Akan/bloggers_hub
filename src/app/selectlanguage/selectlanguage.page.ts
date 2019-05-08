import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { Observable, Subject, interval } from 'rxjs';
import { ModalController,NavParams } from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-selectlanguage',
  templateUrl: './selectlanguage.page.html',
  styleUrls: ['./selectlanguage.page.scss'],
})
export class SelectlanguagePage implements OnInit {


  constructor(
    public translateservice:TranslateService,
    public modalCtrl:ModalController,
    public homeservice:HomeserviceService
  ) {


  }

  scurrentLanguage:string = "English";

  onChangeHandler(event: string){

      this.scurrentLanguage = event;
  }

  onSubmit(){
    //console.log(this.currentLanguage);
    localStorage.setItem("language",this.scurrentLanguage);
    localStorage.setItem("enablelanguage","1");
    this.dismiss();
    this.homeservice.nextAction.next("1");
  }



  dismiss(){
    this.modalCtrl.dismiss();
  }

  language:Observable<any>;

  getTranslate(){
    this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });

  }

  ngOnInit() {
    this.getTranslate();
  }

}
