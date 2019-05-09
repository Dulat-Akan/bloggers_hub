import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { ModalController,NavParams } from '@ionic/angular';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.page.html',
  styleUrls: ['./slideshow.page.scss'],
})
export class SlideshowPage implements OnInit {



    slideOpts = {
        initialSlide: 0,
        speed: 400
      };

  constructor(
    public translateservice:TranslateService,
      public modalCtrl:ModalController,
      public homeservice:HomeserviceService
    ) { }

    dismiss(){
      this.modalCtrl.dismiss();
    }

    language:Observable<any>;

    getTranslate(){
      this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });

    }


  nextPage(){
    this.dismiss();
    this.homeservice.nextAction.next("2");
  }


  ngOnInit() {
    this.getTranslate();
  }

}
