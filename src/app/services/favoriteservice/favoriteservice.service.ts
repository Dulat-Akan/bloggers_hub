import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteserviceService {

  private socket;

  constructor(private homeservice:HomeserviceService) {

    this.socket = this.homeservice.socket;

  }

  checkFavorite(data){

    this.socket.emit("checkFavorite",data);

  }

  listenFavorite():Observable<any>{
    return new Observable<any>(observe => {
        this.socket.on("checkFavorite",data => {
            observe.next(data);
        });
    });
  }

}
