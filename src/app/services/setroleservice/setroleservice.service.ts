import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class SetroleserviceService {

  private socket;

  constructor(private homeservice:HomeserviceService) {

      this.socket = this.homeservice.socket;

  }

  sendRole(data){
    this.socket.emit('setRole', data);
  }

  roleListener(): Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('setRole', (data) => {
            observer.next(data);
        });

    });

  }
}
