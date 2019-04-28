import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  val:any;

  constructor(public modalCtrl:ModalController,public navParams:NavParams) {

    this.val = this.navParams.get("value");
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
