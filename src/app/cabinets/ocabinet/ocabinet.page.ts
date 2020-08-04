import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../../services/homeservice/homeservice.service';
import { TranslateService } from '../../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../../services/onlineusers/onlineusers.service';
import { NotificationService } from '../../services/notification/notification.service';
import { OcabinetService } from '../../services/ocabinet/ocabinet.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-ocabinet',
  templateUrl: './ocabinet.page.html',
  styleUrls: ['./ocabinet.page.scss'],
})
export class OcabinetPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      public ocabinetservice:OcabinetService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      private menu: MenuController,

    ) { }

details: Observable<any>;

  trackByFn(index,item){
      return item.id;
   }

   addNew(){
     this.router.navigate(['/add-first-action']);
   }

   openMenu(){
     this.menu.open('first');
   }

   detailRoute(data){

     var pack = JSON.stringify({ data: data });
     localStorage.setItem("detail",pack);
     this.router.navigate(['/detail']);

   }
   goToPay(data){
       localStorage.setItem("insertId",data.id);
       localStorage.setItem("s",data.sum)//sum
       this.router.navigate(['/yandex-pay']);
   }

   deleteRecord(data){

     var datad = {
       email:this.homeservice.email,
       id: data.id
     }

      this.ocabinetservice.deleteRecord(datad);
   }

   unsubscribelistendeleteRecord;
   listendeleteRecord(){
      this.unsubscribelistendeleteRecord = this.ocabinetservice.listendeleteRecord().subscribe(data => {
        //console.log(data);
        if(data.status == "ok"){
          this.loadAllData();
        }
      });
   }

   async presentActionSheet(data) {
    const actionSheet = await this.actionSheetController.create({

      buttons: [
        {
          text: 'To Pay',
          icon: 'airplane',
          handler: () => {
            this.goToPay(data);
          }
        },{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteRecord(data);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

    unsubscribelistengetAllData;

    listengetAllData(){

        this.unsubscribelistengetAllData = this.homeservice.getAllData()
          .subscribe(data => {
            this.details = data.sdata;
            //console.log(data.sdata);
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

    loadAllData(){

      var data = {
        device:this.homeservice.deviceid,
        email:this.homeservice.email,
        role:this.homeservice.role,
        message:"1"
      }

      this.homeservice.sendRequest(data);
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
      var r = this.homeservice.role;
      if(r != "2"){
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {

    this.listengetAllData();
    this.loadAllData();
    this.listendeleteRecord();
    this.getTranslate();
    this.hideRoleItems();
  }

  ngOnDestroy(){
    this.unsubscribelistendeleteRecord.unsubscribe();
    this.unsubscribelistengetAllData.unsubscribe();
    this.getTranslate$.unsubscribe();

  }



}
