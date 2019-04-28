import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { SearchserviceService } from '../services/searchservice/searchservice.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import * as $ from 'jquery';



@Component({
  selector: 'app-add-first-action',
  templateUrl: './add-first-action.page.html',
  styleUrls: ['./add-first-action.page.scss'],
})
export class AddFirstActionPage implements OnInit {

  constructor(public toastController: ToastController,private location: Location,private router: Router,private fb: FormBuilder,public homeservice:HomeserviceService,public searchservice:SearchserviceService){

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

  getFormDataResponse(){
    this.searchservice.getFormData()
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
//this.name.setValue('Nancy');
// this.profileForm.patchValue({
//     firstName: 'Nancy',
//     address: {
//       street: '123 Drew Street'
//     }
//   });

// get name() { return this.heroForm.get('name'); }
//
// get power() { return this.heroForm.get('power'); }

  citylist: Observable<any>;
  checkformnumber = 1;

  //searchone
  searchCity(search: string): void {

    var data = {
      deviceid:this.homeservice.deviceid,
      search:search
    }

    this.checkformnumber = 1;
    this.searchservice.searchCity(data);

  }

  cityListStatus = 0;

  checkCitySearchData(){
      this.searchservice.getCity().subscribe(data => {

          this.citylist = data.data;

          if(this.cityListStatus == 0){

            if(this.checkformnumber == 1){

              this.checkformnumber = 1;

              setTimeout(() => {
                this.checkformnumber = 5;
              }, 6000);

            }else if(this.checkformnumber == 2){

              setTimeout(() => {
                this.checkformnumber = 5;
              }, 6000);

            }

            this.cityListStatus = 1;
          }
          //console.log(data);

      });
  }

  clickCity(name){
      if(this.checkformnumber == 1){
        this.sendForm.controls['fromPlace'].setValue(name);
      }else if(this.checkformnumber == 2){
        this.sendForm.controls['toPlace'].setValue(name);
      }
      this.checkformnumber = 5;
      this.cityListStatus = 1;
  }
  //searchone
  //searchTo

  searchCityto(search: string): void {

    this.checkformnumber = 2;

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




  ngOnInit() {

    this.checkCitySearchData();
    this.getFormDataResponse();

  }

}
