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


   checkMyrequest(){
     var data = {
       email:this.homeservice.email
     }

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

     var datas = {
       email:this.homeservice.email,
       id:data.id,
       status:data.status
     }

     this.socket.emit("setDeleteorUpdate",datas);
   }

   listensetDeleteorUpdate():Observable<any>{
     return new Observable<any>(observe => {
         this.socket.on("setDeleteorUpdate",data => {
             observe.next(data);
         });
     });
   }


}
