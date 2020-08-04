import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { SearchserviceService } from '../services/searchservice/searchservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import * as $ from 'jquery';

//fix
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
//fix



@Component({
  selector: 'app-add-first-action',
  templateUrl: './add-first-action.page.html',
  styleUrls: ['./add-first-action.page.scss'],
})
export class AddFirstActionPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    public homeservice:HomeserviceService,
    public searchservice:SearchserviceService,
    public translateservice:TranslateService,

  ){

   }


    sendForm = this.fb.group({

       url: [''],
       description: [''],
       location: [''],
       sum: [''],
       date: [''],
       time: [''],
       minviews: ['0'],
       minvideos: ['0']

     });

 checksendForm = 0;
 sendlocation:any;

     onSubmit() {

       //console.log(this.sendForm.value);

       var sum = this.sendForm.get('sum').value;

       localStorage.setItem("s",sum);
       localStorage.setItem("page","ocabinet");
       //


        var senddata = {
          data:this.sendForm.value,
          role:this.homeservice.role,
          deviceid:this.homeservice.deviceid,
          email:this.homeservice.email,
          location:this.sendlocation
        }


        this.searchservice.sendFormData(senddata);
        this.checksendForm = 1;


      }


  getFormData$;

  getFormDataResponse(){
    this.getFormData$ = this.searchservice.getFormData()
    .subscribe(data => {

        if(data.status == "ok"){

            localStorage.setItem("insertId",data.insertId);

            this.presentToast();

            setTimeout(() => {

              //this.location.back();
              this.router.navigate(['/yandex-pay']);

            },2000);

        }

    });
  }



  citylist: Observable<any>;
  //checkformnumber = 1;
  videoPrice = 0;
  peoplecount = 0;
  //searchone



appParams;

  listenLoadInfo(){

    this.homeservice.getLoadAllInfo().subscribe(data => {

        this.appParams = data.alldata;

        this.sendForm.controls['sum'].setValue(data.alldata.pricevideo);
        this.sendForm.controls['minviews'].setValue(data.alldata.minviews);
        this.sendForm.controls['minvideos'].setValue(data.alldata.minvideos);

        this.peoplecount = data.alldata.peoplecount;
        this.videoPrice = data.alldata.pricevideo;


        if(this.peoplecount < 100){
          this.peoplecount = 1000;
        }

          //console.log(data);
    });

  }

  goToMap(){

      this.router.navigate(['/googlemap']);

  }

  //cityListStatus = 0;

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Description created',
      duration: 2000
    });
    toast.present();
  }

  language:Observable<any>;
  getTranslate$;

  getTranslate(){
    this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
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
                if(event.url == "/add-first-action"){

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






  ngOnInit() {


    this.getFormDataResponse();
    this.getTranslate();
    this.RouteListener();

    this.listenLoadInfo()//listener
    this.homeservice.loadAllInfo({email:this.homeservice.email});



  }

  ngOnDestroy(){
    this.getFormData$.unsubscribe();

    this.getTranslate$.unsubscribe();
  }

}
