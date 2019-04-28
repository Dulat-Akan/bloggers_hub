import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class DetailserviceService {

  private socket;
  public page_id:number;

  constructor(private homeservice:HomeserviceService) {

      this.socket = this.homeservice.socket;

   }

   sendDetailData(id){

     var data = {
       deviceid:this.homeservice.deviceid,
       id: id
     }

     this.socket.emit("getDetailData",data);

   }

   getDetailData():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("getDetailData",data => {
              observer.next(data);
        })
     })

   }
}
