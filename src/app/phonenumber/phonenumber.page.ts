import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.page.html',
  styleUrls: ['./phonenumber.page.scss'],
})
export class PhonenumberPage implements OnInit {

  val:any;

  constructor(public modalCtrl:ModalController,public navParams:NavParams) { }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
