import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { SetroleserviceService } from '../services/setroleservice/setroleservice.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';

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
    public homeservice:HomeserviceService
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

  ngOnInit() {

  }

}
