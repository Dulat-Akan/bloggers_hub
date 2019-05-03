import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineusersService {

  private socket;
  constructor(private homeservice:HomeserviceService) {
      this.socket = this.homeservice.socket;
  }

  joinUser(){
    var email = this.homeservice.email;
    var deviceid = this.homeservice.deviceid;

    var data = {
      email:email,
      deviceid:deviceid
    }

    this.socket.emit("onlineUsers",data);
  }

  listenjoinUser():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("onlineUsers",data => {
            observer.next(data);
        })
    });
  }
}
