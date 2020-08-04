import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, interval } from 'rxjs';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';
import { StoreserviceService } from '../services/storeseservice/storeservice.service';
import { TranslateService } from '../services/translate/translate.service';

import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

// npm install @google/maps
import { google } from '@google/maps';
declare var google: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  UsersData: Observable<any>;
  @ViewChild('chart') chartElement: any;

  constructor(
    public storeservice:StoreserviceService,
    public detailservice: DetailserviceService,
    public homeservice: HomeserviceService,
    private route: ActivatedRoute,
    private router : Router,
    private location: Location,
    public translateservice:TranslateService

  ){




      }

details;
countvideo = 0;
countobjectarray;

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
         title: 'Views'
      },
   };


   width = window.innerWidth;
   height = window.innerHeight / 2;


  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
   }



  goBack(): void {
    this.location.back();
  }

  sendCheckvideo(id){

    var senddata = {
      project_id:id,
      email:this.homeservice.email
    }

    this.detailservice.sendCheckvideo(senddata);
  }

unsubvideo;

  getCheckvideo(){
    this.unsubvideo = this.detailservice.getCheckvideo()
    .subscribe(data => {

        //console.log(data);

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
        //this.data[] =
        // this.UsersData = data.UsersData;
        //
        // localStorage.setItem("sendemail",data.Users.email);
        // localStorage.setItem("sendimage_url",data.Users.image_url);


    });
  }

  goToUrl(url){
    //window.location.href = url;
    var win = window.open(url, '_blank');
    win.focus();
  }



  Backbutton(){

    document.addEventListener('backbutton', () => {
          this.location.back();
      }, false);
        //document.addEventListener("backbutton", this.Backbutton(), false);
    }

    routeToMessage(){
      this.router.navigate(['/chat']);
    }


    getPack(){
      //var pack = JSON.stringify({ data: data });
      var pack = localStorage.getItem("detail");

      if(pack){

        var unpack = JSON.parse(pack);
        this.UsersData = unpack.data;
        //console.log(unpack.data);

        this.sendCheckvideo(unpack.data.id);

      }
    }


    //charts


    //charts








  unsubscribetranslateservice;
  language:Observable<any>;

  getTranslate(){
    this.unsubscribetranslateservice = this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });
  }

  drawBasic() {


  }

  ngOnInit() {


    this.Backbutton();
    this.getTranslate();
    this.getPack();
    this.getCheckvideo();



  }

  ngOnDestroy() {
    this.unsubscribetranslateservice.unsubscribe();
    this.unsubvideo.unsubscribe();
  }

}
