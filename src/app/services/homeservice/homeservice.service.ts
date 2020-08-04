import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as io from 'socket.io-client';
import { Device } from '@ionic-native/device/ngx';
import { Observable, of,interval, Subject } from 'rxjs';
// import { catchError, map, tap, timeout } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from '../message/message.service';



// @Injectable({
//   providedIn: 'root'
// })
@Injectable()

export class HomeserviceService {

  results:Observable<any>;
  public deviceid = "123";
  public email = "";
  public role = "";
  public CheckStoragestate = new Subject<string>();
  public nextAction = new Subject<string>();
  public timer3s = new Subject<any>();
  public timer10s$ = new Subject<any>();
  public timer60s = new Subject<any>();
  public timer300000s$ = new Subject<any>();
  public timer30s = new Subject<any>();


  private url = 'https://2click.org:3002';
  //private url = 'http://18.218.27.49:3002';
  //private url = 'http://kazpoisk.kz:3002';
  public socket;


  constructor(
    public toastController: ToastController,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private device: Device
  ) {
          this.initSocket();
          //this.reConnect();
          this.initTimers();
          this.checkStorage();
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


   initTimers(){

      const source = interval(3000);
      const source10s = interval(10000);
      const source60s = interval(60000);
      const source300000s = interval(300000);
      const source30ss = interval(30000);

      source.subscribe(val => {
         this.timer3s.next(val);
       });
      source10s.subscribe(val => {
         this.timer10s$.next(val);
       });
      source60s.subscribe(val => {
         this.timer60s.next(val);
       });
      source300000s.subscribe(val => {
         this.timer300000s$.next(val);
       });
      source30ss.subscribe(val => {
         this.timer30s.next(val);
       });




   }






  checkStorage(){

    var email = localStorage.getItem("email");
    var role = localStorage.getItem("role");


    if(email){
      this.email = email;

    }

    //console.log(role);

    if(role){
      this.role = role;

      setTimeout(() => {
        //console.log("1");
        this.CheckStoragestate.next("checkmemory");
      }, 200);

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

    //console.log(data);
    this.socket.emit('getAllData', data);

  }

  getAllData(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('getAllData', (data) => {
            observer.next(data);
        });

    });

  }


  loadAllInfo(data){

    //console.log(data);
    this.socket.emit('load_all_info', data);

  }

  getLoadAllInfo(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('load_all_info', (data) => {
            observer.next(data);
        });

    });

  }





  Notification_voice(){

        let audioPlayer = <HTMLVideoElement> document.getElementById("myAudio");
        audioPlayer.play();

  }



  // sendData(title:string):Observable<any>{
  //
  //
  //   return this.http.get('http://www.test.com&s=${stringvalue}')
  //   .pipe(
  //     map(results => {
  //       console.log('logrequest' + results);
  //       return results['key'];
  //     })
  //   );
  //
  // };
  //
  // sendRegistration(phone:string,email:string,password:string):Observable<any>{
  //
  //  baseurl:string = "http://localhost:8100";
  //   let json = {
  //     phone: phone,
  //     email:email,
  //     password:password
  //   }
  //
  //   console.log(json);
  //
  //   return this.http.post(this.baseurl + "/api/registration", json);
  //
  // };

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
      duration: 2000,
      // buttons: [
      //   {
      //     side: 'start',
      //     icon: 'notifications',
      //     text: 'Go to messages',
      //     handler: () => {
      //       this.router.navigate(['/contacts']);
      //     }
      //   }
      // ]
    });

    toast.present();
  }



}
