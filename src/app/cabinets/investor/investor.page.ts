import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../../services/homeservice/homeservice.service';
import { TranslateService } from '../../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../../services/onlineusers/onlineusers.service';
import { NotificationService } from '../../services/notification/notification.service';
import { PublicserviceService } from '../../services/publicservices/publicservice.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import * as $ from 'jquery';
// npm install @google/maps
import { google } from '@google/maps';
declare var google: any;

@Component({
  selector: 'app-investor',
  templateUrl: './investor.page.html',
  styleUrls: ['./investor.page.scss'],
})
export class InvestorPage implements OnInit {

@ViewChild('chart') chartElement: any;
@ViewChild('charttwo') chartElementtwo: any;

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      private menu: MenuController,
      private publicservice:PublicserviceService

    ) { }



details: Observable<any>;
countvideo = 0;

title = 'Plan execution report';
 type = 'LineChart';

 data = [
   ["Jan",0]
 ];

 columnNames = ["Month", "Views"];
 options = {
    hAxis: {
       title: 'Month'
    },
    vAxis:{
       title: 'Tasks'
    },
 };
 optionstwo = {
    hAxis: {
       title: 'Month'
    },
    vAxis:{
       title: 'Payments'
    },
 };


 width = window.innerWidth;
 height = window.innerHeight / 2;


 sendCheckvideo(){

   var senddata = {
     email:this.homeservice.email
   }

   this.publicservice.sendCheckvideoinvest(senddata);
 }

unsubvideo;

 getCheckvideo(){
   this.unsubvideo = this.publicservice.getCheckvideoinvest()
   .subscribe(data => {

      // console.log(data);

       var montharray = data.montharray;
       var countingarray = data.monthcount;

       this.countvideo = data.count;

       this.data = [
         ["Jan",0]
       ];
       for(var i = 0;i < montharray.length;i++){
         var createar = [montharray[i].month,  countingarray[i]];
         this.data.push(createar);
         //console.log(this.data);
       }


       this.details = data.data;

       console.log(window.innerWidth);

        if(window.innerWidth > 980){
          this.width = window.innerWidth - (window.innerWidth / 3);
        }
       //
       //



   });
 }

countpayments = 0;

datapayments = [
  ["Jan",0]
];


 checkPayments(){

   var senddata = {
     email:this.homeservice.email
   }

   this.publicservice.checkPayments(senddata);
 }

unsubpayments;

 getcheckPayments(){
   this.unsubpayments = this.publicservice.getcheckPayments()
   .subscribe(data => {

      // console.log(data);

       var montharray = data.montharray;
       var countingarray = data.monthcount;

       this.countpayments = countingarray.length;

       this.datapayments = [
         ["Jan",0]
       ];
       for(var i = 0;i < montharray.length;i++){
         var createar = [montharray[i].month,  countingarray[i]];
         this.datapayments.push(createar);
         //console.log(this.data);
       }


      // this.details = data.data;



   });
 }

  trackByFn(index,item){
      return item.id;
   }

   goToUrl(url){
     //window.location.href = url;
     var win = window.open(url, '_blank');
     win.focus();
   }

   openMenu(){
     this.menu.open('first');
   }


    language:Observable<any>;
    getTranslate$;

    getTranslate(){
      this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });
    }

    hideRoleItems(){
      $(".hidecard").hide();
      $(".hidegetmoney").hide();
      $(".hideemployerinstructions").hide();
      $(".hidecreate").hide();
      var r = this.homeservice.role;
      if(r != "3"){
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {

    this.getTranslate();
    this.getCheckvideo();
    this.sendCheckvideo();
    this.getcheckPayments();
    this.checkPayments();
    this.hideRoleItems();


  }

  ngOnDestroy(){

    this.unsubvideo.unsubscribe();

  }



}
