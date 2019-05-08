import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { SetroleserviceService } from '../services/setroleservice/setroleservice.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-selectrole',
  templateUrl: './selectrole.page.html',
  styleUrls: ['./selectrole.page.scss'],
})
export class SelectrolePage implements OnInit {

  val:any;

  constructor(
    public modalCtrl:ModalController,
    public navParams:NavParams,
    public setroleservice:SetroleserviceService,
    public homeservice:HomeserviceService,
    public translateservice:TranslateService
  ) { }


  Find(){

    var role = 1; //send

    var datas = {
      device:this.homeservice.deviceid,
      email:this.homeservice.email,
      role:role,
    }

    this.setroleservice.sendRole(datas);
    this.modalCtrl.dismiss();

  }

  Get(){

    var role = 2;//deliver

    var datas = {
      device:this.homeservice.deviceid,
      email:this.homeservice.email,
      role:role,
    }

    this.setroleservice.sendRole(datas);
    this.modalCtrl.dismiss();

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
