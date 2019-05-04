import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class PhonenumberserviceService {

  private socket;

  constructor(private homeservice:HomeserviceService) {
      this.socket = this.homeservice.socket;
  }

  setPhone(number){

    var data = {
      email:this.homeservice.email,
      phonenumber:number
    }

    this.socket.emit("setPhoneNumber",data);
  }

  listenPhone():Observable<any>{
    return new Observable<any>(observer => {
        this.socket.on("setPhoneNumber",data => {
            observer.next(data);
        });
    });
  }

  // checkNewMessagesinTime(){
  //   setInterval(() => {
  //
  //   }, 300000);
  // }

}
