import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, interval } from 'rxjs';

import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';
import { StoreserviceService } from '../services/storeseservice/storeservice.service';

import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  UsersData: Observable<any>;
  Users: Observable<any>;
  favoriteState:boolean = false;


  constructor(public storeservice:StoreserviceService,public detailservice: DetailserviceService,public homeservice: HomeserviceService,private route: ActivatedRoute,private router : Router,private location: Location){

      }




  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
   }



  goBack(): void {
    this.location.back();
  }


  getDetailData(){
    this.detailservice.getDetailData()
    .subscribe(data => {

        
        this.UsersData = data.UsersData;
        this.Users = data.Users;
        localStorage.setItem("sendemail",data.Users.email);
        localStorage.setItem("sendimage_url",data.Users.image_url);


    });
  }

  ShareLink(){


    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.homeservice.Toast("copied to clipboard");

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



  Favorite(name){

        if(name == "enable"){
          this.storeservice.favoriteButtonStore.dispatch({ type: 'ENABLE',updateDatabase:true });
        }else if(name == "disable"){
          this.storeservice.favoriteButtonStore.dispatch({ type: 'DISABLE',updateDatabase:true });
        }

    }


  checkFavoriteStates(){
    this.storeservice.buttonstateObservable.subscribe(data => {
        if(data == true){
          this.favoriteState = true;
        }else{
          this.favoriteState = false;
        }
    });
  }



  ngOnInit() {

    this.getDetailData();//listen getdetails data

    var id = +this.route.snapshot.paramMap.get('id');
    this.detailservice.page_id = id;
    this.detailservice.sendDetailData(id);


    this.Backbutton();//initialize back button

    this.storeservice.checkDetailsState(id);

    this.checkFavoriteStates()//listen button states
    //this.storeservice.favoriteButtonStore.dispatch({ type: 'ENABLE',id:2 });


    // this.route
    //   .queryParams
    //   .subscribe(v => {
    //
    //     this.unitNumber = v.unit;
    //
    //   });

  }

  ngOnDestroy() {

  }

}
