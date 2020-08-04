import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private socket;
  constructor(
    private homeservice:HomeserviceService,
    private http: HttpClient

  ) {
      this.socket = this.homeservice.socket;
  }


  deleteRecord(data){

    this.socket.emit("deleteRecord",data);

  }

  getUpdateDbstate():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("setPaymentDb",data => {
             observer.next(data);
       })
    })

  }


  sendRequest(data){

    //console.log(data);
    this.socket.emit('getAdminData', data);

  }

  getAllData(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('getAdminData', (data) => {
            observer.next(data);
        });

    });

  }



  sendMail(data){

    //console.log(data);
    this.socket.emit('sendMail', data);

  }

  getMailResponse(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('sendMail', (data) => {
            observer.next(data);
        });

    });

  }


}
