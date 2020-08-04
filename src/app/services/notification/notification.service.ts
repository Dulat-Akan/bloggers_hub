import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket;
  constructor(
    private homeservice:HomeserviceService,
    private fcm: FCM,
    private router: Router
  ) {

    this.socket = this.homeservice.socket;

    this.checkNewMessagesinTime();
    this.enableFpmMessages();


  }

  public fpmMessagesToSubscribe = new Subject<any>();

  getFcmToken(){
    this.fcm.getToken().then(token => {
      console.log(token);
      this.sendFirebaseToken(token);
    });
  }

  refreshToken(){
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      this.sendFirebaseToken(token);
    });
  }

  listenFpmMessages(){
    this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.fpmMessagesToSubscribe.next(data);
          //this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.fpmMessagesToSubscribe.next(data);
          //this.router.navigate([data.landing_page, data.price]);
        }
      });
  }

  enableFpmMessages(){
    this.getFcmToken();
    this.refreshToken();
    this.listenFpmMessages();
    this.fcm.subscribeToTopic('people');
    this.listenFirebaseToken().subscribe(data => {
      console.log("t-n.. writed");
    });
    this.listenWebFirebaseTokenone().subscribe(data => {
      console.log("webt.. writed");
    });
    this.listenSubscribeWebFirebaseToken().subscribe(data => {
      console.log("webTokenSubscibed");
    });
    this.listenWebfirebaseToken();
  }

  checkNotificationsMessages(){

    var data = {
      email:this.homeservice.email
    }

    this.socket.emit("checkNewMessage",data);
  }

  listenNotificationsMessages():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("checkNewMessage",data => {
            observer.next(data);
        });
    });
  }

  checkNewMessagesinTime(){

    this.homeservice.timer300000s$.subscribe(val => {
      this.checkNotificationsMessages(); //check every 5 min
    });
  }


  sendFirebaseToken(token){

    var data = {
      email:this.homeservice.email,
      token:token
    }

    this.socket.emit("setFirebaseToken",data);
  }

  listenFirebaseToken():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setFirebaseToken",data => {
            observer.next(data);
        });
    });
  }

  sendWebFirebaseToken(token){

    var data = {
      email:this.homeservice.email,
      token:token
    }

    this.socket.emit("setWebFirebaseToken",data);
  }

  listenWebFirebaseTokenone():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setWebFirebaseToken",data => {
            observer.next(data);
        });
    });
  }

  subscribeWebFirebaseToken(token){

    var data = {
      email:this.homeservice.email,
      token:token,
      topicName:"people"
    }

    this.socket.emit("subscribeToTopic",data);
  }

  listenSubscribeWebFirebaseToken():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("subscribeToTopic",data => {
            observer.next(data);
        });
    });
  }



  listenWebfirebaseToken(){
    this.homeservice.timer10s$.subscribe(data => {
      //check just token
      var checkToken = localStorage.getItem("listenfirebaseToken");
      var storageToken = localStorage.getItem("firebaseToken");

      if(checkToken){
          if(checkToken == "1"){
            this.sendWebFirebaseToken(storageToken);
            localStorage.setItem("listenfirebaseToken","0");
          }
      }
      //check just token
      //listen web firebase token
      var firebaseWebToken = localStorage.getItem("firebaseWebToken");
      var listenfirebaseWebToken = localStorage.getItem("listenfirebaseWebToken");

      if(listenfirebaseWebToken){
          if(listenfirebaseWebToken == "1"){
            this.subscribeWebFirebaseToken(firebaseWebToken);
            localStorage.setItem("listenfirebaseWebToken","0");
          }
      }
      //listen web firebase token

    });
  }


}
