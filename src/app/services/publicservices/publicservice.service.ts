import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicserviceService {

  private socket;
  constructor(
    private homeservice:HomeserviceService,
    private http: HttpClient

  ) {
      this.socket = this.homeservice.socket;
  }


  checkInstructions(data){

    this.socket.emit("checkInstructions",data);

  }

  getInstructions():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkInstructions",data => {
             observer.next(data);
       })
    })

  }


  checkAutomaticMessages(data){

    this.socket.emit("checkAutomaticMessages",data);

  }

  listencheckAutomaticMessages():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkAutomaticMessages",data => {
             observer.next(data);
       })
    })

  }


  sendInvestData(data){

    this.socket.emit("sendInvestData",data);

  }

  listenInvestData():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("sendInvestData",data => {
             observer.next(data);
       })
    })

  }


  sendCheckvideoinvest(data){

    this.socket.emit("checkvideoinvest",data);

  }

  getCheckvideoinvest():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkvideoinvest",data => {
             observer.next(data);
       })
    });

  }


  checkPayments(data){

    this.socket.emit("checkPayments",data);

  }

  getcheckPayments():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkPayments",data => {
             observer.next(data);
       })
    });

  }


}
