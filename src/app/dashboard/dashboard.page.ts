import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { Observable, Subject, interval } from 'rxjs';
import { Hero } from '../hero';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { TranslateService } from '../services/translate/translate.service';
import { SetroleserviceService } from '../services/setroleservice/setroleservice.service';
import { AuthService } from '../services/auth/auth.service';
import {PublicserviceService} from '../services/publicservices/publicservice.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import { LoginModalPage } from '../login-modal/login-modal.page';
import { PhonenumberPage } from '../phonenumber/phonenumber.page';
import { SelectrolePage } from '../selectrole/selectrole.page';
import { SelectlanguagePage } from '../selectlanguage/selectlanguage.page';
import { SlideshowPage } from '../slideshow/slideshow.page';

import * as $ from 'jquery';

//declare function TransferAuth(data):any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  details: Observable<any>;
  private Observablesearch = new Subject<string>();

  deviceid:string;
  fixedUpdating = 1;


  constructor(public homeservice: HomeserviceService,
              public onlineservice:OnlineusersService,
              public notificationservice:NotificationService,
              public setroleservice:SetroleserviceService,
              public translateservice:TranslateService,
              private modalCtrl:ModalController,
              public alertController:AlertController,
              private menu: MenuController,
              private router: Router,
              public authservice:AuthService,
              public publicservice:PublicserviceService
            ){
        this.deviceid = this.homeservice.deviceid;
  }


  // Push a search term into the observable stream.
  search(searchString: string): void {
    this.Observablesearch.next(searchString);
  }
  // selectedHero: Hero;

  async LoginModal(){
    const modal = await this.modalCtrl.create({
      component: LoginModalPage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }


  async PhonenumberModal(){
    const modal = await this.modalCtrl.create({
      component: PhonenumberPage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }
  async SelectrolePageModal(){
    const modal = await this.modalCtrl.create({
      component: SelectrolePage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }
  async SelectlanguageModal(){
    const modal = await this.modalCtrl.create({
      component: SelectlanguagePage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }
  async SlideShowModal(){
    const modal = await this.modalCtrl.create({
      component: SlideshowPage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }



    roleListener(){
        //const id = +this.route.snapshot.paramMap.get('id');

        this.setroleservice.roleListener()
          .subscribe(data => {

            //console.log(data);
            this.homeservice.role = data.role;
            localStorage.setItem("role",data.role);
            //getPhonefromUser
            this.PhonenumberModal();
            //getPhonefromUser


          });
    }

loggingsearch;

//1





  listenPhoneMemory(){

    this.homeservice.CheckStoragestate.subscribe(data => {


    });
  }

  openMenu(){
    this.menu.open('first');
  }

  //2

//google auth

  public checkAuthNew$:Observable<any>;

  listenAuth(){

          this.checkAuthNew$ = this.authservice.checkAuthNew();

          this.checkAuthNew$.subscribe(data => {

              if(data.user == "newuser"){

                this.homeservice.email = data.email;
                localStorage.setItem("email",data.email);
                this.SelectrolePageModal();

              }else if(data.user == "olduser"){

                //console.log(data);

                this.homeservice.email = data.email;
                localStorage.setItem("email",data.email);

                if(data.role == 0){
                  this.SelectrolePageModal();
                }else{
                  this.homeservice.role = data.role;
                  localStorage.setItem("role",data.role);


                    if(data.role == "1"){
                      //redirect to employer

                      this.router.navigate(['/employer']);
                    }else if(data.role == "2"){
                      //redirect to promote
                      this.router.navigate(['/ocabinet']);

                    }else if(data.role == "3"){
                      //redirect to investor
                      this.router.navigate(['/investor']);
                    }


                }

                //redirect role 2 to

              }

          });

  }


  newFunc(data){
    console.log(data);
    this.menu.close('first');
    //this.menu.open('first');

    if(data.user == "newuser"){

      this.homeservice.email = data.email;
      localStorage.setItem("email",data.email);
      //this.presentAlert();
      this.SelectrolePageModal();

    }else if(data.user == "olduser"){

      this.homeservice.email = data.email;
      localStorage.setItem("email",data.email);

      if(data.role == 0){
        //this.presentAlert();
        this.SelectrolePageModal();
      }else{

        this.homeservice.role = data.role;
        localStorage.setItem("role",data.role);

      }

      if(data.role == 2){
        this.router.navigate(['/ocabinet']);
      }




    }
  }
//google auth




  listenNotificationsMessages(){
    this.notificationservice.listenNotificationsMessages()
    .subscribe(data => {

        this.homeservice.Toast("You have " + data.count + " Messages");
        this.homeservice.Notification_voice();
    });
  }

  language;

  getTranslate(){
    this.translateservice.currentLanguage.subscribe(data => {
        this.language = data;
        //console.log(data);
      });
  }



  listenjoinUser(){
    this.onlineservice.listenjoinUser()
    .subscribe(data => {
      //console.log(data);
    });
  }


  checkFirstAuth(){
    var lboolean = this.homeservice.checkFirstAuth();

    if(lboolean == false){
      this.SelectlanguageModal();
    }
  }

  ListenerNextAction(){

    this.homeservice.nextAction
    .subscribe(data => {

      //console.log(data);
        if(data == "1"){
          this.SlideShowModal();
        }else if(data == "2"){
          this.LoginModal();
        }else if(data == "selectrole"){
          this.SelectrolePageModal();
        }else if(data == "redirect"){
            var r = localStorage.getItem("role");
            console.log(r);
            console.log("redirect");

            if(r){
              if(r == "1"){
                //redirect to employer
                var s = {
                  email:this.homeservice.email,
                  role:this.homeservice.role,
                  type:1
                }

                this.publicservice.checkAutomaticMessages(s);

                this.router.navigate(['/employer']);
              }else if(r == "2"){
                //redirect to promote
                this.router.navigate(['/add-first-action']);

              }else if(r == "3"){
                //redirect to investor
                this.router.navigate(['/investorpay']);
              }
            }

        }

        this.translateservice.setLanguage();
    });
  }

  listencheckAutomaticMessages(){
    this.publicservice.listencheckAutomaticMessages().subscribe(data => {
      console.log(data);
    });
  }


  checlRole(){

    var currentRole = this.homeservice.role;

    if(currentRole == "1"){
      //redirect to employer

      this.router.navigate(['/employer']);
    }else if(currentRole == "2"){
      //redirect to promote
      this.router.navigate(['/ocabinet']);

    }else if(currentRole == "3"){
      //redirect to investor
      this.router.navigate(['/investor']);
    }

  }


  trackByFn(index,item){
      return item.id;
   }


  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
  }

  initializeMain(){
    this.listenPhoneMemory();//1

    this.roleListener();//4

    this.listenNotificationsMessages();

    this.checkFirstAuth();//check first auth

    this.getTranslate();
    this.translateservice.setLanguage();
    this.ListenerNextAction();//action listener
    this.listenAuth();//google auth
    this.listencheckAutomaticMessages();
    this.checlRole();
  //  this.LoginModal();
  //this.SelectrolePageModal();
    //
  }



  ngOnInit() {

    this.initializeMain();


  }

  ngOnDestroy() {

  }

}
