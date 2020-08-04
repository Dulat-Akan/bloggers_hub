import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployserviceService {

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


  sendRequestE(data){

    //console.log(data);
    this.socket.emit('getAllDataE', data);

  }

  getAllDataE(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('getAllDataE', (data) => {
            observer.next(data);
        });

    });

  }


}
