import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  private socket;
  // private Observablecitysearch = new Subject<string>();

  constructor(private homeservice: HomeserviceService) {

      this.socket = this.homeservice.socket;

  }


  searchCity(data){
      this.socket.emit('searchCity', data);
  }

  getCity(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('searchCity', (data) => {
            observer.next(data);
        });

    });

  }

  sendFormData(data){
      this.socket.emit('sendFormData', data);
  }

  getFormData(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('sendFormData', (data) => {
            observer.next(data);
        });

    });

  }


}
