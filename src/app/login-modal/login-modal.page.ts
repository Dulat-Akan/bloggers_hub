import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { TranslateService } from '../services/translate/translate.service';
import * as $ from 'jquery';
import { Observable, Subject, interval } from 'rxjs';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';

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

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  sendForm = new FormGroup({
    'email': new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(this.emailRegex)
        //PhoneValidator(this.emailRegex)
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //UsernameValidator.validUsername
      ]),
      'name': new FormControl('',[
          Validators.required,
          Validators.minLength(1),
        ]),
        'password': new FormControl('',[
            Validators.required,
            Validators.minLength(1),
          ]),
  });

  sendLogin = new FormGroup({
    'email': new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(this.emailRegex)
        //PhoneValidator(this.emailRegex)
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //UsernameValidator.validUsername
      ]),
      'password': new FormControl('',[
          Validators.required,
          Validators.minLength(1),
        ]),
  });
  sendForgot = new FormGroup({
    'email': new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(this.emailRegex)
        //PhoneValidator(this.emailRegex)
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //UsernameValidator.validUsername
      ])
  });

  checksendForm = 0;
  checksendLogin = 0;
  checksendForgot = 0;

   onSubmit(){
       this.checksendForm = 1;
       //var phone = this.sendForm.get('phonenumber').value;
       //console.log(phone);
       //this.setPhone(phone);
   }
   onSubmitLogin(){
       this.checksendLogin = 1;
       //var phone = this.sendForm.get('phonenumber').value;
       //console.log(phone);
       //this.setPhone(phone);
   }
   onsendForgot(){
       this.checksendForgot = 1;
       //var phone = this.sendForm.get('phonenumber').value;
       //console.log(phone);
       //this.setPhone(phone);
   }

   setPhone(data){
     //this.phonenumberservice.setPhone(data);
   }

   listenPhone(){
     // this.phonenumberservice.listenPhone()
     // .subscribe(data => {
     //   if(data.status == "ok"){
     //     this.modalCtrl.dismiss();
     //   }
     // })
   }

  trigger(){
    $("#customBtn").trigger('click');
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

    //this.listenPhone();

    this.interval = setInterval(() => {
                      this.listenGoogle();
                      //console.log("listen");
                    }, 500);

    this.getTranslate();

  }

}
