import { Injectable } from '@angular/core';
import { HomeserviceService } from '../homeservice/homeservice.service';
import { Observable, of, Subject } from 'rxjs';



// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {

  public socket;

  constructor(public homeservice:HomeserviceService) {

    this.socket = this.homeservice.socket;
    this.checkAuthData();

  }


  sendAuth(data){
      this.socket.emit('googleAuth', data);
  }


  checkAuthNew():Observable<any>{

    return new Observable<any>(observer => {

        this.socket.on('googleAuth', (data) => {
            observer.next(data);
        });

    });

  }

  test(){
    var email = localStorage.getItem("email");
    var name = localStorage.getItem("name");
    var image_url = localStorage.getItem("image_url");

    var data = {
      device:this.homeservice.deviceid,
      email:email,
      name:name,
      image_url:image_url
    }

    console.log(data);

    this.sendAuth(data);
  }
  checkAuthData(){
    this.homeservice.timer3s.subscribe(val => {
      //this.test();
      //console.log(val);
      var email = localStorage.getItem("email");
      var name = localStorage.getItem("name");
      var image_url = localStorage.getItem("image_url");
      var status = localStorage.getItem("status");

      var login = localStorage.getItem("login");


      //stopping next
      if(login){
        if(login == "disable"){

        }else{
          return false;
        }
      }else{
        return false;
      }
      //stopping next

      if(status){

          if(status == "enable"){

                var data = {
                  device:this.homeservice.deviceid,
                  email:email,
                  name:name,
                  image_url:image_url
                }

                this.sendAuth(data);
                //console.log("checking..");
                //this.nextAction.next("selectrole");

                localStorage.setItem("status","disable");

          }
      }

    });

  }



}
