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
  permitForUpdating = 0;

  constructor(public homeservice: HomeserviceService,
              public onlineservice:OnlineusersService,
              public notificationservice:NotificationService,
              public setroleservice:SetroleserviceService,
              public translateservice:TranslateService,
              private modalCtrl:ModalController,
              public alertController:AlertController,
              private menu: MenuController,
              private router: Router,
              public authservice:AuthService
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

            this.loadAllData();
            this.permitForUpdating = 1;

          });
    }

loggingsearch;

//1
  checkInputSearchData(){

      this.Observablesearch.subscribe(searchnumber => {

          var data = {
            device:this.homeservice.deviceid,
            email:this.homeservice.email,
            role:this.homeservice.role,
            searchnumber:searchnumber
          }

          if(searchnumber.length < 1){
            this.fixedUpdating = 1;
          }else{
            this.fixedUpdating = 0;
            this.loggingsearch = data;
          }

          this.homeservice.searchData(data);

      });

  }

  getSearchUsersData(){
      //const id = +this.route.snapshot.paramMap.get('id');

      this.homeservice.getSearchUsersData()
        .subscribe(data => {
          this.details = data.sdata;
          //console.log(data.sdata);
          //this.router.navigate(['/product-list'], { queryParams: { serviceId: serviceId} });

        });
  }

  //1

  //2

  loadAllData(){

    var data = {
      device:this.homeservice.deviceid,
      email:this.homeservice.email,
      role:this.homeservice.role,
      message:"1"
    }

    this.homeservice.sendRequest(data);
  }

  listengetAllData(){

      this.homeservice.getAllData()
        .subscribe(data => {
          this.details = data.sdata;
          //console.log(data.sdata);
          //set User Profile
            if(data.userdata.length > 0){

              if(data.userdata[0].image_url == "0"){

              }else{
                $(".circle").attr("src",data.userdata[0].image_url);
              }

              $(".userName").text(data.userdata[0].name);
              //hide login button
              $(".logininput").hide();
              //hide login button


            }


            //set Online user status
            this.onlineservice.joinUser();
            this.notificationservice.checkNotificationsMessages();
            //set Online user status



          //
          //set User Profile
        });
  }



  listenPhoneMemory(){

    this.homeservice.CheckStoragestate.subscribe(data => {

      //console.log(data);

        this.loadAllData(); //send Request after load memory
        this.permitForUpdating = 1;

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

                this.homeservice.email = data.email;
                localStorage.setItem("email",data.email);

                if(data.role == 0){
                  this.SelectrolePageModal();
                }else{
                  this.homeservice.role = data.role;
                  localStorage.setItem("role",data.role);
                  this.loadAllData();
                  this.permitForUpdating = 1;
                }

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

        this.loadAllData();
        this.permitForUpdating = 1;
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
        }else if(data == "loadalldata"){
          //console.log("loadalldata");
          this.permitForUpdating = 1;
          this.loadAllData();
        }

        this.translateservice.setLanguage();
    });
  }


  UpdateDataThroughInterval(){

    this.homeservice.timer10s$.subscribe(val => {

      if(this.permitForUpdating == 1){
        if(this.fixedUpdating == 1){
          //this.just update all data
          this.loadAllData();
          //console.log("alldata");
        }else if(this.fixedUpdating == 0){
          //this.working for update search data
          //console.log("logsearch");
          this.homeservice.searchData(this.loggingsearch);
        }
      }

    });

  }

  trackByFn(index,item){
      return item.id;
   }


  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
  }

  initializeMain(){
    this.listengetAllData();//1
    this.listenPhoneMemory();//1

    this.checkInputSearchData();//2
    this.getSearchUsersData();//2


    this.roleListener();//4

    this.listenNotificationsMessages();

    this.checkFirstAuth();//check first auth

    this.getTranslate();
    this.translateservice.setLanguage();
    this.ListenerNextAction();//action listener
    this.UpdateDataThroughInterval();
    this.listenAuth();
  //  this.LoginModal();
  }



  ngOnInit() {

    this.initializeMain();

  }

  ngOnDestroy() {

  }

}
