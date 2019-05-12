import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
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
    public translateservice:TranslateService,
    public homeservice:HomeserviceService
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

  tempdata:any;

   onSubmit(){
       //this.checksendForm = 1;
       var email = this.sendForm.get('email').value;
       var name = this.sendForm.get('name').value;
       var password = this.sendForm.get('password').value;

       var data = {
         "email":email,
         "name":name,
         "password":password
       }

       this.tempdata = data;
       //console.log(data);
       this.loginservice.setRegistration(data);
   }

   listenRegistration(){
     this.loginservice.listenRegistration()
     .subscribe(data => {

        //console.log(data);
        if(data.status == "olduser"){
          this.homeservice.Toast("User already Registered Please SignIn");
        }else if(data.status == "newuser"){
          this.homeservice.Toast("Thanks! For Registration!");
          localStorage.setItem("email",this.tempdata.email);
          localStorage.setItem("name",this.tempdata.name);
          localStorage.setItem("image_url","0");
          this.homeservice.email = this.tempdata.email;
          this.modalCtrl.dismiss();
          clearInterval(this.interval);
          this.homeservice.nextAction.next("selectrole");

        }

         //this.modalCtrl.dismiss();

     })
   }
   onSubmitLogin(){
       //this.checksendLogin = 1;
       var email = this.sendLogin.get('email').value;
       var password = this.sendLogin.get('password').value;

       var data = {
         "email":email,
         "password":password
       }
       this.loginservice.setLogin(data);
       //var phone = this.sendForm.get('phonenumber').value;
       //console.log(phone);
       //this.setPhone(phone);
   }

   listenLogin(){
     this.loginservice.listenLogin()
     .subscribe(data => {

        //console.log(data);//
        if(data.status == "usernotfound"){
            this.homeservice.Toast("User not found..");
        }else if(data.status == "correct"){
            this.homeservice.Toast("Correct");

            localStorage.setItem("email",data.data.email);
            localStorage.setItem("name",data.data.name);
            localStorage.setItem("image_url",data.data.image_url);
            localStorage.setItem("role",data.data.role);
            this.homeservice.role = data.data.role;
            this.homeservice.email = data.data.email;
            this.modalCtrl.dismiss();
            clearInterval(this.interval);
            this.homeservice.nextAction.next("loadalldata");

        }else if(data.status == "notcorrect"){
            this.homeservice.Toast("Password incorrect.. Please check your password!");
        }
         //this.modalCtrl.dismiss();

     })
   }
   onsendForgot(){
       //this.checksendForgot = 1;
       var email = this.sendForgot.get('email').value;

       var data = {
         "deviceid":this.homeservice.deviceid,
         "sendemail":email
       }
       this.loginservice.setForgot(data);
   }

   listenForgot(){
     this.loginservice.listenForgot()
     .subscribe(data => {

        //console.log(data);

        if(data.status == "sended"){
          this.homeservice.Toast("Password has been sent to your email!");
        }else if(data.status == "notfound"){
          this.homeservice.Toast("User not found!");
        }
        //status: "sended"
         //this.modalCtrl.dismiss();

     })
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

    this.listenRegistration();
    this.listenLogin();
    this.listenForgot();

  }

}
