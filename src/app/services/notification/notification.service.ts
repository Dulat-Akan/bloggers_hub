import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private socket;
  constructor(private homeservice:HomeserviceService) {

    this.socket = this.homeservice.socket;

    this.checkNewMessagesinTime();
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


}
