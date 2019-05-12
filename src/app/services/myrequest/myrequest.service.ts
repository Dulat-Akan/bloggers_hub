import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})

export class MyrequestService {

  private socket;

  constructor(private homeservice:HomeserviceService) {

      this.socket = this.homeservice.socket;

   }


   checkMyrequest(data){

     this.socket.emit("checkMyrequest",data);

   }

   listenMyRequest():Observable<any>{
     return new Observable<any>(observe => {
         this.socket.on("checkMyrequest",data => {
             observe.next(data);
         });
     });
   }

   setDeleteorUpdate(data){

     this.socket.emit("setDeleteorUpdate",data);

   }

   listensetDeleteorUpdate():Observable<any>{
     return new Observable<any>(observe => {
         this.socket.on("setDeleteorUpdate",data => {
             observe.next(data);
         });
     });
   }


}
