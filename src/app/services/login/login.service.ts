import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private socket;

  constructor(private homeservice:HomeserviceService) {
      this.socket = this.homeservice.socket;
  }


  setRegistration(data){

    var datas = {
      "deviceid":this.homeservice.deviceid,
      "email":data.email,
      "name":data.name,
      "password":data.password
    }

    //console.log(data);

    this.socket.emit("setRegistration",datas);
  }

  listenRegistration():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setRegistration",data => {
            observer.next(data);
        });
    });
  }


  setLogin(datas){

    var data = {
      "deviceid":this.homeservice.deviceid,
      "email":datas.email,
      "password":datas.password
    }

    this.socket.emit("setLogin",data);
  }

  listenLogin():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setLogin",data => {
            observer.next(data);
        });
    });
  }

  setForgot(datas){

    var data = {
      "deviceid":this.homeservice.deviceid,
      "email":datas.email
    }

    this.socket.emit("setForgot",data);
  }

  listenForgot():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setForgot",data => {
            observer.next(data);
        });
    });
  }

  checkGoogleAuth():boolean{

    var login = localStorage.getItem("login");

    if(login){
      if(login == "enable"){
          return true;
      }else{
        return false;
      }
    }

  }

}
