import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../homeservice/homeservice.service';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private socket;

  constructor(private homeservice:HomeserviceService) {

    this.socket = homeservice.socket;

    //this.listenReadMessage(); //if need to check uncomment this line

  }

  getSendMail():string{
    var sendemail = localStorage.getItem("sendemail");
    return sendemail;
  }

  getSendImage():string{
    var image = localStorage.getItem("sendimage_url");
    return image;
  }

  sendMessage(message){

      var sendemail = localStorage.getItem("sendemail");
      var email = this.homeservice.email;

      var data = {
        sendemail:sendemail,
        email:email,
        message:message
      }

      this.socket.emit("Message",data);

  }

  getMessage():Observable<any>{

      return new Observable<any>(observer => {
        this.socket.on("Message",data => {
            observer.next(data);
        });
      });

  }

  checkGetAllMessages(){

    var sendemail = localStorage.getItem("sendemail");
    var email = this.homeservice.email;

    var data = {
      sendemail:sendemail,
      email:email
    }

    this.socket.emit("getAllMessages",data);
  }

  getAllMessages():Observable<any>{

      return new Observable<any>(observer => {
        this.socket.on("getAllMessages",data => {
            observer.next(data);
        });
      });

  }

  readMessage(data){
      this.socket.emit("setReaded",data);
  }

  listenReadMessage(){

        this.socket.on("setReaded",data => {
            console.log(data);
        });

  }




}
