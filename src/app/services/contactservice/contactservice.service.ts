import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';


@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class ContactserviceService {

  private socket;

  constructor(private homeservice:HomeserviceService) {

      this.socket = this.homeservice.socket;

  }

  sendContactData(data){

    this.socket.emit("getAllContactsMessages",data);

  }

  getContactData():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("getAllContactsMessages",data => {
            //  console.log(data);
             observer.next(data);
       })
    })

  }

}
