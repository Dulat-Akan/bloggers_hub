import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnlineusersService } from '../services/onlineusers/onlineusers.service';
import { NotificationService } from '../services/notification/notification.service';
import { EmployserviceService } from '../services/employservice/employservice.service';
import { AdminserviceService } from '../services/adminservice/adminservice.service';
import { ActionSheetController } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import * as $ from 'jquery';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

//fix
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
//fix

export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  phone: string;
  approvestatus: string;
  online: string;
}
export interface OrderElement {
  position: number;
  email: string;
  location_name:string;
  date: string;
  pay_status: string;
  sum: string;
  url: string;
}
export interface TasksElement {
  position: number;
  email: string;
  user_email: string;
  url: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
const ORDER_DATA: OrderElement[] = [];
const TASKS_DATA: TasksElement[] = [];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})


export class AdminPage implements OnInit {

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      public onlineservice:OnlineusersService,
      public notificationservice:NotificationService,
      public employservice:EmployserviceService,
      public adminservice:AdminserviceService,
      private router: Router,
      public actionSheetController: ActionSheetController,
      public geolocation: Geolocation,
      private menu: MenuController

    ) { }

details: Observable<any>;


    displayedColumns: string[] = ['position', 'name', 'email', 'phone','approvestatus','online'];
    orderdisplayedColumns: string[] = ['position','email', 'location_name','date','pay_status','sum','url'];
    tasksdisplayedColumns: string[] = ['position','email', 'user_email','url'];



    dataSource = new MatTableDataSource(ELEMENT_DATA);
    orderSource = new MatTableDataSource(ORDER_DATA);
    tasksSource = new MatTableDataSource(TASKS_DATA);

    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    @ViewChild('paginator3') paginator3: MatPaginator;
    // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyOrderFilter(filterValue: string) {
     this.orderSource.filter = filterValue.trim().toLowerCase();
    }

    applyTasksFilter(filterValue: string) {
     this.tasksSource.filter = filterValue.trim().toLowerCase();
    }

    _setDataSource(indexNumber) {
      setTimeout(() => {
        switch (indexNumber) {
          case 0:
            !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
            break;
          case 1:
            !this.orderSource.paginator ? this.orderSource.paginator = this.paginator2 : null;
            break;
          case 2:
            !this.tasksSource.paginator ? this.tasksSource.paginator = this.paginator3 : null;
            break;
        }
      });
    }

  trackByFn(index,item){
      return item.id;
   }

   detailRoute(data){

     var pack = JSON.stringify({ data: data });
     localStorage.setItem("detail",pack);

     this.router.navigate(['/employedetails']);
   }


   openMenu(){
     this.menu.open('first');
   }

   sendForm = new FormGroup({
     'sendArea': new FormControl('',[
         Validators.required,
         Validators.minLength(1)
       ]),
   });

   checksendForm = 0;

   sendMail(){

     var area = this.sendForm.get('sendArea').value;

     var data = {
       area:area,
       device:this.homeservice.deviceid,
       email:this.homeservice.email,
       role:this.homeservice.role
     }

     console.log(data);
     //return false;

     this.adminservice.sendMail(data);

   }

   getMailResponse(){
     this.adminservice.getMailResponse()
     .subscribe(data => {
        console.log(data);
     });
   }

   unsubscribeMail;

   listenMailResponse(){
     this.unsubscribeMail = this.adminservice.getMailResponse()
     .subscribe(data => {
       console.log(data);
     });
   }



latitude;
longitude;
   sendRequest() {

          var data = {
            device:this.homeservice.deviceid,
            email:this.homeservice.email,
            role:this.homeservice.role
          }

          this.adminservice.sendRequest(data);

    }

   count_offline_users = 0;
   count_online_users = 0;
   total_users = 0;
   total_orders = 0;
   total_complete_task = 0;
   unsubscribelistengetAllData;

   listengetAllData(){

       this.unsubscribelistengetAllData = this.adminservice.getAllData()
         .subscribe(data => {
           this.details = data;
           console.log(data);
           //set User Profile
           //console.log(data);

             //add data with users to table
             this.dataSource.data = [];
             const insertData = this.dataSource.data;

             var indexAr = 1;

             var usersArLength = data.users.length;
             this.count_online_users = 0;
             for(var k = 0;k < usersArLength;k++){
               var approve = "no";
               if(data.users[k].approvestatus == 1){
                 approve = "yes";
               }
               var online = "no";
               if(data.users[k].online == 1){
                 online = "yes";
                 this.count_online_users++;
               }

               var newObj = {
                 position: indexAr, email: data.users[k].email, name: data.users[k].name, phone: data.users[k].phone,approvestatus: approve,online:online
               }
               insertData.push(newObj);
               indexAr++;
             }

             this.total_users = usersArLength;
             this.count_offline_users = 0;
             this.count_offline_users = usersArLength - this.count_online_users;

            this.dataSource.data = insertData;

            //add data with users to table
            //orders data
            this.orderSource.data = [];
            const insertOrdersData = this.orderSource.data;

            var indexCount = 1;

            var orders_length = data.orders.length;
            this.total_orders = orders_length;
            for(var b = 0;b < orders_length;b++){

              var pay_status = "ok";
              if(data.orders[b].pay_status == 0){
                pay_status = "no";
              }

              var newObj_two = {
                position:indexCount,
                email:data.orders[b].email,
                location_name:data.orders[b].location_name,
                date:data.orders[b].date,
                pay_status:pay_status,
                sum:data.orders[b].sum,
                url:data.orders[b].url
              }

              insertOrdersData.push(newObj_two);

              indexCount++;

            }

            this.orderSource.data = insertOrdersData;


            //tasks data
            this.tasksSource.data = [];
            const insertTasksData = this.tasksSource.data;
            var tasksCount = 1;

            var task_length = data.complete_task.length;
            this.total_complete_task = task_length;
            for(var j = 0;j < task_length;j++){
              var newObj_three = {
                position:tasksCount,
                email:data.complete_task[j].email,
                user_email:data.complete_task[j].user_email,
                url:data.complete_task[j].url
              }

              insertTasksData.push(newObj_three);
              tasksCount++;
            }

            this.tasksSource.data = insertTasksData;
            //position: number;
            // email: string;
            // user_email: string;
            // url: string;
            //tasks data





           //
           //set User Profile
         });
   }

   check;
   checkevery30s(){
     this.check = this.homeservice.timer30s.subscribe(data => {

       this.sendRequest();
       console.log("state updated");
     });
   }

   listenNotificationsMessages(){
     this.notificationservice.listenNotificationsMessages()
     .subscribe(data => {

         this.homeservice.Toast("You have " + data.count + " Messages");
         this.homeservice.Notification_voice();
     });
   }

   listenjoinUser(){
     this.onlineservice.listenjoinUser()
     .subscribe(data => {
       //console.log(data);
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
                 if(event.url == "/admin"){

                   //console.log("back to employer page");
                  // this.sendRequest();


                 }
             });

    }



    language:Observable<any>;
    getTranslate$;

    getTranslate(){
      this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });
    }

    hideRoleItems(){

      var r = this.homeservice.role;
      if(r != "1"){
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {
    //set Online user status
    this.listenNotificationsMessages();
    this.listenjoinUser();
    this.onlineservice.joinUser();
    this.notificationservice.checkNotificationsMessages();
    //set Online user status
    this.getTranslate();
    this.listengetAllData();
    this.sendRequest();
    this.checkevery30s();
    this.hideRoleItems();
    this.RouteListener();
    this.getMailResponse();
    this.dataSource.paginator = this.paginator;
    this.orderSource.paginator = this.paginator2;
    this.tasksSource.paginator = this.paginator3;
  }

  ngOnDestroy(){

    this.unsubscribelistengetAllData.unsubscribe();
    this.check.unsubscribe();


  }

}
