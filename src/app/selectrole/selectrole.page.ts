import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-selectrole',
  templateUrl: './selectrole.page.html',
  styleUrls: ['./selectrole.page.scss'],
})
export class SelectrolePage implements OnInit {

  val:any;

  constructor(public modalCtrl:ModalController,public navParams:NavParams) { }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
