import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as io from 'socket.io-client';
import { Device } from '@ionic-native/device/ngx';

//import { HttpClient,HttpParams } from '@angular/http';
import { Observable, of, Subject } from 'rxjs';

// import { debounceTime } from 'rxjs/operators/debounceTime';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-heroes';
import { MessageService } from '../message/message.service';

// import { share } from "rxjs/operator/share";
// import  "rxjs/operator/share";
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class HomeserviceService {

  results:Observable<any>;
  public deviceid = "123";
  public email = "";
  public role = "";
  public CheckStoragestate = new Subject<string>();
  public nextAction = new Subject<string>();

  //public CheckStoragestate = new AsyncSubject();
  //let phone = localStorage.getItem("phone")
  baseurl:string = "http://localhost:8100";

  // const httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  //private url = 'http://localhost:3002';
  private url = 'http://kazpoisk.kz:3002';
  public socket;


  constructor(
    public toastController: ToastController,
    private http: HttpClient,
    private messageService: MessageService,
    private device: Device
  ) {
          this.initSocket();
          this.reConnect();

          this.checkStorage();

          this.checkAuthData();
          this.initDeviceId();

   }



  initSocket(){
      this.socket = io.connect(this.url,{
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax : 5000,
                    reconnectionAttempts: Infinity
                  });

        }


   reConnect(){
           this.socket.on('connect',function () {
               console.log('connected to server');
             });
           this.socket.on('disconnect',function(){
             console.log('disconnected from server');
           });
   }




  checkStorage(){

    var email = localStorage.getItem("email");
    var role = localStorage.getItem("role");

    if(email){
      this.email = email;
      //console.log(email);
    }
    if(role){
      this.role = role;

      setTimeout(() => {
        this.CheckStoragestate.next("checkmemory");
      }, 100);

      //console.log(role);
    }

  }


  checkFirstAuth():boolean{
    var email = localStorage.getItem("email");

    if(email){
      return true;
    }else{
      return false;
    }
  }


  checkAuthData(){

    setInterval(() => {

      var email = localStorage.getItem("email");
      var name = localStorage.getItem("name");
      var image_url = localStorage.getItem("image_url");
      var status = localStorage.getItem("status");

      var login = localStorage.getItem("login");

      //stopping next
      if(login){
        if(login == "disable"){

        }else{
          return false;
        }
      }else{
        return false;
      }
      //stopping next

      if(status){

          if(status == "enable"){

                var data = {
                  device:this.deviceid,
                  email:email,
                  name:name,
                  image_url:image_url
                }

                this.sendAuth(data);
                console.log("checking..");

                localStorage.setItem("status","disable");

          }
      }

    }, 1000);

  }


  searchData(data){

    this.socket.emit('searchUsersData', data);

  }

  getSearchUsersData(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('searchUsersData', (data) => {
            observer.next(data);
        });

    });

  }

  sendRequest(data){

    this.socket.emit('getAllData', data);

  }

  getAllData(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('getAllData', (data) => {
            observer.next(data);
        });

    });

  }

  sendAuth(data){
      this.socket.emit('google_auth', data);
  }

  checkAuth(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('google_auth', (data) => {
            observer.next(data);
        });

    });

  }



  Notification_voice(){

        let audioPlayer = <HTMLVideoElement> document.getElementById("myAudio");
        audioPlayer.play();

  }



  getHeroes(): Observable<Hero[]> {

    this.messageService.add('HeroService: fetched heroes');

    return of(HEROES);
  }

  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  // getHero(id: number): Observable<Hero> {
  //
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }


  // updateHero(value:string): Observable<any>{
  //
  // }

  // return this.http.get<Hero>(url).pipe(
  //   tap(_ => this.log(`fetched hero id=${id}`)),
  //   catchError(this.handleError<Hero>(`getHero id=${id}`))
  // );


  sendData(title:string):Observable<any>{


    return this.http.get('http://www.test.com&s=${stringvalue}')
    .pipe(
      map(results => {
        console.log('logrequest' + results);
        return results['key'];
      })
    );

  };

  sendRegistration(phone:string,email:string,password:string):Observable<any>{


    let json = {
      phone: phone,
      email:email,
      password:password
    }

    console.log(json);

    return this.http.post(this.baseurl + "/api/registration", json);

  };

  generateRandomNumber(min_value , max_value)
  {
      return Math.random() * (max_value-min_value) + min_value;
  }


  initDeviceId(){

            var phoneid = this.device.uuid;//window.device.uuid;

            var checkdeviceid = localStorage.getItem("deviceid");

            var fixdevicememory = 0;

            if(checkdeviceid){
                localStorage.setItem("deviceid",checkdeviceid);
                this.deviceid = checkdeviceid;
                fixdevicememory = 1;
            }

            if((phoneid == null) && (fixdevicememory == 0)){

              var generatevalue = this.generateRandomNumber(1,5555555555555);
              localStorage.setItem("deviceid",generatevalue);
              this.deviceid = generatevalue;

            }else if(phoneid != null){
              localStorage.setItem("deviceid",phoneid);
              this.deviceid = phoneid;
            }

            //console.log(this.deviceid);
  }


  async Toast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



}
