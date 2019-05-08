import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { TranslateService } from '../services/translate/translate.service';
import * as $ from 'jquery';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {



  constructor(
    public loginservice:LoginService,
    public modalCtrl:ModalController,
    public navParams:NavParams,
    public translateservice:TranslateService
  ) {


  }

  interval:any;

  trigger(){
    $("#customBtn").trigger('click');
    //console.log("trigger");

  }

  listenGoogle(){
    var login = this.loginservice.checkGoogleAuth();

    if(login == true){
      localStorage.setItem("login","disable");
      this.modalCtrl.dismiss();
      clearInterval(this.interval);
    }

  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  language:Observable<any>;

  getTranslate(){
    this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
        //console.log(data);
      });
  }

  ngOnInit() {

    this.interval = setInterval(() => {
                      this.listenGoogle();
                      //console.log("listen");
                    }, 500);

    this.getTranslate();

  }

}
