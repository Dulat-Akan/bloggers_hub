import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, interval } from 'rxjs';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../../services/homeservice/homeservice.service';
import { DetailserviceService } from '../../services/detailservice/detailservice.service';
import { StoreserviceService } from '../../services/storeseservice/storeservice.service';
import { TranslateService } from '../../services/translate/translate.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-employedetails',
  templateUrl: './employedetails.page.html',
  styleUrls: ['./employedetails.page.scss'],
})
export class EmployedetailsPage implements OnInit {

  constructor(
    public storeservice:StoreserviceService,
    public detailservice: DetailserviceService,
    public homeservice: HomeserviceService,
    private route: ActivatedRoute,
    private router : Router,
    private location: Location,
    public translateservice:TranslateService,
    private fb: FormBuilder
  ) { }

  details;

  button_one_indicator = 0;
  button_two_indicator = 0;
  button_three_indicator = 0;

  numberviewsmaked = 0;
  numbervideosmaked = 0;
  numberarticlesmaked = 0;

taskfinished = 0;
taskfinishedviews = 0;



  sendFormArticles = this.fb.group({

     url: ['']

   });






   checkViews(){

     var data = {
       hash:this.url
     }

     //console.log(data);
     this.detailservice.setcheckViews(data);

   }

twos;
   getCheckViews(){
     this.twos = this.detailservice.getcheckViews().subscribe(data => {
       this.numberviewsmaked = data.count;

       if(this.details.peoplecount == this.numberviewsmaked){
         this.taskfinishedviews = 1;
       }

       //send to finished all task
        //console.log(data);
     });
   }







   sendForm = this.fb.group({

      url: ['']

    });

   onSendUrl(){

     var data = {
       url:this.sendForm.get('url').value,
       email:this.homeservice.email,
       project_id:this.details.id
     }

     this.detailservice.setVideo(data);

   }



fours;
   getVideoListen(){

     this.fours = this.detailservice.getVideo().subscribe(data => {
        //console.log(data);
        this.sendForm.controls['url'].setValue('');
        this.checkVideo();
     });

   }

   checkVideo(){
     var data = {
       email:this.homeservice.email,
       project_id:this.details.id
     }

     this.detailservice.checkVideo(data);
   }



fives;
   getCheckVideo(){
     this.fives = this.detailservice.getCheckVideo().subscribe(data => {
       this.numbervideosmaked = data.count;

       if(this.numbervideosmaked == 1){
         this.taskfinished = 1;
       }
        //console.log(data);
     });
   }


  Copy(){

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.location.origin + "/checkurl/" + this.url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.homeservice.Toast("copied to clipboard");

  }

viewstatus = "check";

  MakeViews(){

    var data = {
      email:this.homeservice.email,
      id: this.details.id,
      status:this.viewstatus
    }

    this.detailservice.makeHref(data);
  }

url;
sixs;
  listenmakeHref(){
    this.sixs = this.detailservice.getHref().subscribe(data => {
      //console.log(data);
      if(data.status == "ok"){
        this.button_one_indicator = 1;
        this.url = data.url;
        $(".generatedUrl").text(document.location.origin + "/checkurl/" + data.url);
      }

      //call views
      this.checkViews();
      //call views
    });
  }

sevens;
  listenCloseOrder(){
    this.sevens = this.homeservice.timer10s$.subscribe(data => {
      //console.log(1);
        if((this.taskfinishedviews == 1) && (this.taskfinished == 1)){

            var json = {
              id:this.details.id,
              email:this.homeservice.email,
              approvetask:this.details.approvetask
            }

            this.detailservice.setCloseorders(json);
        }


    });
  }

eights;
  checkevery60s(){
    this.eights = this.homeservice.timer60s.subscribe(data => {

        this.checkVideo();
        this.checkViews();
    });
  }

nines;
  getCloseorders(){
    this.nines = this.detailservice.getCloseorders().subscribe(data => {
      this.location.back();
    });
  }

  getPack(){
    //var pack = JSON.stringify({ data: data });
    var pack = localStorage.getItem("detail");

    if(pack){

      var unpack = JSON.parse(pack);
      this.details = unpack.data;
      //console.log(unpack.data);

    }
  }

  unsubscribetranslateservice;
  language:Observable<any>;

  getTranslate(){
    this.unsubscribetranslateservice = this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });
  }

  ngOnInit() {
    this.getPack();
    this.getTranslate();
    this.listenmakeHref();
    //make to generate url
    this.MakeViews();
    this.viewstatus = "set";
    //listen getVideoListen
    this.getVideoListen();
    this.getCheckVideo();
    this.checkVideo();



    this.getCheckViews();
    this.listenCloseOrder();
    this.getCloseorders();
    this.checkevery60s();
  }

  ngOnDestroy() {
    this.unsubscribetranslateservice.unsubscribe();
    this.twos.unsubscribe();
    this.fours.unsubscribe();
    this.fives.unsubscribe();
    this.sixs.unsubscribe();
    this.sevens.unsubscribe();
    this.eights.unsubscribe();
    this.nines.unsubscribe();

  }




}
