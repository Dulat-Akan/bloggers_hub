import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { Observable, Subject, interval } from 'rxjs';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage implements OnInit {


  constructor(
    public homeservice:HomeserviceService,
    public translateservice:TranslateService,
  ) {

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
    //this.initMap();

    // setTimeout(() => {
    //       this.initAutocomplete();
    // },3000);

  }

  ngOnDestroy(){

    this.getTranslate$.unsubscribe();
  }

}
