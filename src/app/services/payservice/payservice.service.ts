import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayserviceService {

  private socket;
  constructor(
    private homeservice:HomeserviceService,
    private http: HttpClient

  ) {
      this.socket = this.homeservice.socket;
  }


  setPaymentDb(id){

    var data = {
      email:this.homeservice.email,
      id: id
    }

    this.socket.emit("setPaymentDb",data);

  }

  getUpdateDbstate():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("setPaymentDb",data => {
             observer.next(data);
       })
    })

  }


  sendPay():Observable<any>{

    var insertid = localStorage.getItem("insertId");

    if(insertid){

      return this.http.get('https://kazpoisk.kz/public_control/getclick/' + insertid);

    }

  }


  sendFormData(data){
    this.socket.emit("setCardData",data);
  }


  getCardData():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("setCardData",data => {
             observer.next(data);
       })
    });

  }


  checkCardData(data){
    this.socket.emit("checkCardData",data);
  }


  getcheckCardData():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkCardData",data => {
             observer.next(data);
       })
    });

  }

  deleteCard(data){
    this.socket.emit("deleteCard",data);
  }


  getdeleteCard():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("deleteCard",data => {
             observer.next(data);
       })
    });

  }


  checkTask(data){
    this.socket.emit("checkTask",data);
  }


  listenTask():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkTask",data => {
             observer.next(data);
       })
    });

  }


  checkPayout(data){
    this.socket.emit("checkPayout",data);
  }


  listenPayout():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkPayout",data => {
             observer.next(data);
       })
    });

  }



}
