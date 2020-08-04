import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OcabinetService {

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

  listendeleteRecord():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("deleteRecord",data => {
             observer.next(data);
       })
    })

  }


}
