import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { PublicserviceService } from '../services/publicservices/publicservice.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController,AlertController,MenuController,ToastController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-investorpay',
  templateUrl: './investorpay.page.html',
  styleUrls: ['./investorpay.page.scss'],
})
export class InvestorpayPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      private menu: MenuController,
      private publicservice:PublicserviceService,
      public toastController: ToastController

    ) { }

details: Observable<any>;


  sendForm = this.fb.group({
     sum: ['1'],
   });

checksendForm = 0;

    onSubmit() {

      //console.log(this.sendForm.value);

      var sum = this.sendForm.get('sum').value;

      localStorage.setItem("page","investor");
      //ocabinet
      localStorage.setItem("s",sum);


       var senddata = {
         sum:this.sendForm.value.sum,
         role:this.homeservice.role,
         deviceid:this.homeservice.deviceid,
         email:this.homeservice.email,
         stockprice:this.stockprice,
         count:this.count
       }

       //console.log(senddata);
       //
       //
        this.publicservice.sendInvestData(senddata);
       this.checksendForm = 1;


     }

     calculateSum(sum){
       if(sum != ''){
         console.log(sum);
         this.count = sum / this.stockprice;
       }else{
         this.count = 0;
       }

     }


     getFormData$;

     getFormDataResponse(){
       this.getFormData$ = this.publicservice.listenInvestData()
       .subscribe(data => {

         console.log(data);

           if(data.status == "ok"){

               localStorage.setItem("insertId",data.insertId);

               this.presentToast();

               setTimeout(() => {

                 this.router.navigate(['/yandex-pay']);

               },2000);

           }

       });
     }


appParams;
countBoughtstocks = 0;
totalstock = 0;
stockprice = 0;
count = 0;

listenLoadInfo(){

  this.homeservice.getLoadAllInfo().subscribe(data => {

      this.appParams = data.alldata;

      this.stockprice = data.alldata.stockprice;
      this.totalstock = data.alldata.totalStock;
      this.countBoughtstocks = data.alldata.countBoughtstocks;

      // this.peoplecount = data.alldata.peoplecount;
      // this.videoPrice = data.alldata.pricevideo;
      //
      //
      // if(this.peoplecount < 100){
      //   this.peoplecount = 1000;
      // }

        //console.log(data);
  });

}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Success next step to pay..',
    duration: 2000
  });
  toast.present();
}

  trackByFn(index,item){
      return item.id;
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

  ngOnInit() {

    this.getTranslate();
    this.getFormDataResponse();

    this.listenLoadInfo()//listener
    this.homeservice.loadAllInfo({email:this.homeservice.email});

  }

  ngOnDestroy(){


  }



}
