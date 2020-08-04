import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../../services/homeservice/homeservice.service';
import { TranslateService } from '../../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../../services/onlineusers/onlineusers.service';
import { NotificationService } from '../../services/notification/notification.service';
import { EmployserviceService } from '../../services/employservice/employservice.service';
import { ActionSheetController } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import * as $ from 'jquery';

//fix
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
//fix

@Component({
  selector: 'app-employer',
  templateUrl: './employer.page.html',
  styleUrls: ['./employer.page.scss'],
})
export class EmployerPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      public employservice:EmployserviceService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      public geolocation: Geolocation,
      private menu: MenuController

    ) { }

details: Observable<any>;

  trackByFn(index,item){
      return item.id;
   }

   detailRoute(data){

     var pack = JSON.stringify({ data: data });
     localStorage.setItem("detail",pack);

     this.router.navigate(['/employedetails']);
   }


   openMenu(){
     this.menu.open('first');
   }

latitude;
longitude;
   getCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {

          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          var data = {
            lat:this.latitude,
            long:this.longitude,
            device:this.homeservice.deviceid,
            email:this.homeservice.email,
            role:this.homeservice.role,
            message:"1"
          }

          this.employservice.sendRequestE(data);
          //console.log(this.latitude);


       });
     }
    }

   unsubscribelistengetAllData;

   listengetAllData(){

       this.unsubscribelistengetAllData = this.employservice.getAllDataE()
         .subscribe(data => {
           this.details = data.sdata;
           console.log(data);
           //set User Profile
           //console.log(data);
             if(data.userdata.length > 0){

               if(data.userdata[0].image_url == "0"){

               }else{
                 $(".circle").attr("src",data.userdata[0].image_url);
               }

               $(".userName").text(data.userdata[0].name);
               //hide login button
               $(".logininput").hide();
               $(".hidecreate").hide();
               //hide login button

               //set Online user status
               //this.onlineservice.joinUser();
               //this.notificationservice.checkNotificationsMessages();
               //set Online user status


             }


             //set Online user status
             this.onlineservice.joinUser();
             this.notificationservice.checkNotificationsMessages();
             //set Online user status



           //
           //set User Profile
         });
   }

   check;
   checkevery30s(){
     this.check = this.homeservice.timer30s.subscribe(data => {

       this.getCurrentPosition();
       console.log("state updated");
     });
   }

   listenNotificationsMessages(){
     this.notificationservice.listenNotificationsMessages()
     .subscribe(data => {

         this.homeservice.Toast("You have " + data.count + " Messages");
         this.homeservice.Notification_voice();
     });
   }

   listenjoinUser(){
     this.onlineservice.listenjoinUser()
     .subscribe(data => {
       //console.log(data);
     });
   }

   RouteListener(){

             this.router.events
             .pipe(
                 filter(
                     ( event: NavigationEvent ) => {
                         return( event instanceof NavigationStart );
                     }
                 )
             ).subscribe((event: NavigationStart) => {
                 if(event.url == "/employer"){

                   //console.log("back to employer page");
                   this.getCurrentPosition();


                 }
             });

    }



    language:Observable<any>;
    getTranslate$;

    getTranslate(){
      this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });
    }

    hideRoleItems(){

      var r = this.homeservice.role;
      if(r != "1"){
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {
    this.getTranslate();
    this.listengetAllData();
    this.getCurrentPosition();
    this.checkevery30s();
    this.listenNotificationsMessages();
    this.listenjoinUser();
    this.hideRoleItems();
    this.RouteListener();
  }

  ngOnDestroy(){

    this.unsubscribelistengetAllData.unsubscribe();
    this.check.unsubscribe();

  }

}
