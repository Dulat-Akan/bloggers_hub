import { Component, OnInit } from '@angular/core';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { Observable, Subject, interval } from 'rxjs';
import { ContactserviceService } from '../services/contactservice/contactservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
import { TranslateService } from '../services/translate/translate.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: Observable<any>;
  data:any;

  constructor(
    public onlineservice:OnlineusersService,
    private router: Router,
    private homeservice:HomeserviceService,
    private contactservice:ContactserviceService,
    public translateservice:TranslateService

  ) {

  }

  sendContactData(){
      this.contactservice.sendContactData();
  }

  getContactData(){
    this.contactservice.getContactData()
    .subscribe(data => {
        //console.log(data);
        this.contacts = data.data;
        this.data = data.data;
    });
  }

  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
   }

   routeToChat(contact){

      localStorage.setItem("sendemail",contact.toEmail);
      localStorage.setItem("sendimage_url",contact.image_url);

      setTimeout(() => {
        this.router.navigate(['/chat']);
      }, 200);

   }

   listenjoinUser(){
     this.onlineservice.listenjoinUser()
     .subscribe(data => {
       //console.log(data);

       if(this.data){
         for(var i = 0;i < this.data.length;i++){
           if((data.username == this.data[i].toEmail) || ((data.username == this.data[i].fromEmail) && (data.username != this.homeservice.email))){
              this.sendContactData();
           }
         }
       }
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
         if(event.url == "/contacts"){
           this.sendContactData();
         }
     });
          }

          language:Observable<any>;

          getTranslate(){
            this.translateservice.getTranslate().subscribe(data => {
                this.language = data;
              });
          }

  ngOnInit() {
    this.getContactData(); //listen first meesages
    this.sendContactData();
    //check Onlineuser status
    this.listenjoinUser();
    this.RouteListener();
    this.getTranslate();
    //check Onlineuser status
  }

}
