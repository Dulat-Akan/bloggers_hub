import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import * as $ from 'jquery';
import { PayserviceService } from '../services/payservice/payservice.service';


//fix
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
//fix


@Component({
  selector: 'app-carddata',
  templateUrl: './carddata.page.html',
  styleUrls: ['./carddata.page.scss'],
})
export class CarddataPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      private menu: MenuController,
      public payservice:PayserviceService

    ) { }



    sendForm = this.fb.group({

       cardnumber: [''],
       cardname: [''],
       location: [''],
       address: [''],
       bankname: ['']


     });

checksendForm = 0;
 sendlocation:any;

     onSubmit() {

        var senddata = {
          data:this.sendForm.value,
          email:this.homeservice.email,
          location:this.sendlocation
        }

        console.log(senddata);

        this.payservice.sendFormData(senddata);
        this.checksendForm = 1;

      }

unsubone;

      listengetCardData(){
        this.unsubone = this.payservice.getCardData().subscribe(data => {
          console.log(data);

          if(data.status == "existcard"){
            this.homeservice.Toast(this.language.existcard);
          }else if(data.status == "inserted"){
            this.checkCardData();
            this.homeservice.Toast(this.language.addedcard);
          }

        });
      }

      checkCardData(){

        var sendata = {
          email:this.homeservice.email
        }
        this.payservice.checkCardData(sendata);

      }

      unsubtwo;
      details:Observable<any>;

      getcheckCardData(){
        this.unsubtwo = this.payservice.getcheckCardData().subscribe(data => {

          this.details = data.data;
          console.log(data);
        });
      }

      deleteCard(id){
        var senddata = {
          id:id,
          email:this.homeservice.email
        }

        console.log(senddata);

        this.payservice.deleteCard(senddata);
      }

    unsubthree;
      getdeleteCard(){

        this.unsubthree = this.payservice.getdeleteCard().subscribe(data => {
          console.log(data);
          if(data.status == "deleted"){
            this.checkCardData();
            if(this.language){
              this.homeservice.Toast(this.language.deleteinfo);
            }

          }

        });

      }

      trackByFn(index,item){
          return item.id;
       }


       openMenu(){
         this.menu.open('first');
       }

       goToMap(){

           this.router.navigate(['/googlemap']);

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
                     if(event.url == "/carddata"){

                       var storage = localStorage.getItem("places");

                       if(storage){

                         var obj = JSON.parse(storage);
                         //console.log(obj.places);
                         var insertPlace = obj.places[0].name;
                         this.sendlocation = obj;
                         this.sendForm.controls['location'].setValue(insertPlace);

                       }

                       //console.log("add route");
                     }
                 });

        }

        checkSavedLocations(){
          var storage = localStorage.getItem("places");

          if(storage){

            var obj = JSON.parse(storage);
            //console.log(obj.places);
            var insertPlace = obj.places[0].name;
            this.sendlocation = obj;
            this.sendForm.controls['location'].setValue(insertPlace);

          }
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
          this.RouteListener();
          this.checkSavedLocations();
          this.listengetCardData();
          this.getcheckCardData();
          this.checkCardData();
          this.getdeleteCard();
      }

      ngOnDestroy(){

          this.getTranslate$.unsubscribe();
          this.unsubone.unsubscribe();
          this.unsubtwo.unsubscribe();
          this.unsubthree.unsubscribe();


      }



    }
