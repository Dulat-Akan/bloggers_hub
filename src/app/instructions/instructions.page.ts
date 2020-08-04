import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { ActionSheetController } from '@ionic/angular';
import * as $ from 'jquery';
import {PublicserviceService} from '../services/publicservices/publicservice.service';


@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      public publicservice:PublicserviceService

    ) { }

details: Observable<any>;

  checkInstructions(){
    var send = {
      email:this.homeservice.email
    }

    this.publicservice.checkInstructions(send);
  }
unsubone;
  getInstructions(){
    this.unsubone = this.publicservice.getInstructions().subscribe(data => {
      console.log(data);
      if(data.status == "ok"){
        this.details = data.data;
      }
    });
  }

  trackByFn(index,item){
      return item.id;
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
      this.getInstructions();
      this.checkInstructions();

  }

  ngOnDestroy(){

    this.unsubone.unsubscribe();

  }



}
