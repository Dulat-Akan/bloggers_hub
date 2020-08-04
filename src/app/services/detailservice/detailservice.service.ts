import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DetailserviceService {

  private socket;
  public page_id:number;

  constructor(
    private homeservice:HomeserviceService,
    private http:HttpClient

  ) {

      this.socket = this.homeservice.socket;

   }

   sendDetailData(id){

     var data = {
       deviceid:this.homeservice.deviceid,
       id: id
     }

     this.socket.emit("getDetailData",data);

   }

   getDetailData():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("getDetailData",data => {
              observer.next(data);
        })
     });

   }


   sendCheckvideo(data){

     this.socket.emit("checkvideo",data);

   }

   getCheckvideo():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("checkvideo",data => {
              observer.next(data);
        })
     });

   }


   makeHref(data){

     this.socket.emit("makeHref",data);

   }

   getHref():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("makeHref",data => {
              observer.next(data);
        })
     });

   }


   setVideo(data){

     this.socket.emit("setvideo",data);

   }

   getVideo():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("setvideo",data => {
              observer.next(data);
        })
     });

   }


   checkVideo(data){

     this.socket.emit("checkvideo",data);

   }

   getCheckVideo():Observable<any>{

     return new Observable<any>(observer => {
        this.socket.on("checkvideo",data => {
              observer.next(data);
        })
     });

   }

   //articles





   getIpAddress():Observable<any> {
        return this.http.get('https://api.ipify.org?format=json');
    }

  setViews(data){

    this.socket.emit("setviews",data);

  }

  getViews():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("setviews",data => {
             observer.next(data);
       })
    });

  }


  setcheckViews(data){

    this.socket.emit("checkviews",data);

  }

  getcheckViews():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("checkviews",data => {
             observer.next(data);
       })
    });

  }


  setCloseorders(data){

    this.socket.emit("closeorders",data);

  }

  getCloseorders():Observable<any>{

    return new Observable<any>(observer => {
       this.socket.on("closeorders",data => {
             observer.next(data);
       })
    });

  }

}
