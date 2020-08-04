import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { OcabinetService } from '../services/ocabinet/ocabinet.service';
import { ActionSheetController } from '@ionic/angular';
import * as $ from 'jquery';
import { PayserviceService } from '../services/payservice/payservice.service';

@Component({
  selector: 'app-getmoney',
  templateUrl: './getmoney.page.html',
  styleUrls: ['./getmoney.page.scss'],
})
export class GetmoneyPage implements OnInit {

    constructor(private fb: FormBuilder,
        public homeservice:HomeserviceService,
        public translateservice:TranslateService,
        public onlineservice:OnlineusersService,
        public notificationservice:NotificationService,
        public ocabinetservice:OcabinetService,
        private router: Router,
        public actionSheetController: ActionSheetController,
        public payservice:PayserviceService

      ) { }

  details: Observable<any>;

    trackByFn(index,item){
        return item.id;
     }


     checkTask(){

       var send = {
         email:this.homeservice.email
       }

       this.payservice.checkTask(send);

     }
usertasklength = 0;
unsubone;
     listenTask(){
       this.unsubone = this.payservice.listenTask().subscribe(data => {
         //console.log(data);
         if(data.status == "ok"){
           this.details = data.data;
           this.usertasklength = data.data.length;
         }
       });
     }

     loadAllInfo(){

       var sendobj = {
         email:this.homeservice.email
       }

       this.homeservice.loadAllInfo(sendobj);

     }
workPrice = 0;
mintaskcount = 0;
unsubtwo;
     getLoadAllInfo(){
       this.unsubtwo = this.homeservice.getLoadAllInfo().subscribe(data => {
          //console.log(data);
          this.workPrice = data.alldata.workPrice;
          this.mintaskcount = data.alldata.mintaskcount;
          this.checktask();
       });
     }

total_paydsum = 0;
unsubfour;
     checktask(){

       if((this.workPrice != 0) && (this.usertasklength >= this.mintaskcount)){
           this.total_paydsum = this.usertasklength * this.workPrice;
           //console.log(this.total_paydsum);
       }

        this.unsubfour = this.homeservice.timer10s$.subscribe(data => {
          //console.log(data);
          if((this.workPrice != 0) && (this.usertasklength >= this.mintaskcount)){
              this.total_paydsum = this.usertasklength * this.workPrice;
              //console.log(this.total_paydsum);
          }
        });



     }

     PayOut(){

       var s = {
         email:this.homeservice.email,
         sum:this.total_paydsum
       }

       this.payservice.checkPayout(s);

     }

     listenPayout(){
       this.payservice.listenPayout().subscribe(data => {

         //console.log(data);
         if(data.status == "existrequest"){
           this.homeservice.Toast(this.language.alreadysendedrequest);
         }else if(data.status == "ok"){
           this.homeservice.Toast(this.language.sendedrequest);
         }

       });
     }




      language;
      getTranslate$;

      getTranslate(){
        this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
            this.language = data;
          });
      }

    ngOnInit() {

      this.getTranslate();
      this.checkTask();
      this.listenTask();
      this.getLoadAllInfo();
      this.loadAllInfo();
      this.listenPayout();

    }

    ngOnDestroy(){

      this.getTranslate$.unsubscribe();
      this.unsubone.unsubscribe();
      this.unsubtwo.unsubscribe();
      this.unsubfour.unsubscribe();

    }



}
