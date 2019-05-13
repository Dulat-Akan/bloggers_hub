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
       fromPlace: ['', Validators.required],
       toPlace: [''],
       date: [''],
       time: [''],
       amount: [''],
       weight: [''],
       description: [''],
     });

 checksendForm = 0;

     onSubmit() {

        var senddata = {
          data:this.sendForm.value,
          role:this.homeservice.role,
          deviceid:this.homeservice.deviceid,
          email:this.homeservice.email
        }

        this.searchservice.sendFormData(senddata);
        this.checksendForm = 1;

        // var date = this.sendForm.controls['date'].value;
        // var time = this.sendForm.controls['time'].value;

        // var datenewdate = new Date(t).getTime();
        // var newtime = new Date(t).getTime();


      }
  getFormData$;

  getFormDataResponse(){
    this.getFormData$ = this.searchservice.getFormData()
    .subscribe(data => {

        if(data.status == "ok"){

            this.presentToast();

            setTimeout(() => {

              //this.router.navigate(['/']);
              this.location.back();

            },2000);

        }

    });
  }



  citylist: Observable<any>;
  //checkformnumber = 1;

  //searchone
  searchCity(search: string): void {

    var data = {
      deviceid:this.homeservice.deviceid,
      search:search
    }

    //this.checkformnumber = 1;
    this.searchservice.searchCity(data);

  }

  //cityListStatus = 0;

  getCity$;

  checkCitySearchData(){
      this.getCity$ = this.searchservice.getCity().subscribe(data => {


          this.citylist = data.data;


      });
  }



  searchCityto(search: string): void {


    var data = {
      deviceid:this.homeservice.deviceid,
      search:search
    }

    this.searchservice.searchCity(data);

  }


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




  ngOnInit() {

    this.checkCitySearchData();
    this.getFormDataResponse();
    this.getTranslate();

  }

  ngOnDestroy(){
    this.getFormData$.unsubscribe();
    this.getCity$.unsubscribe();
    this.getTranslate$.unsubscribe();
  }

}
