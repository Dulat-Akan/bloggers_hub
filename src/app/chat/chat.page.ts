import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { IonContent,IonList } from '@ionic/angular';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { ChatserviceService } from '../services/chatservice/chatservice.service';
import { Observable, Subject, interval } from 'rxjs';
import { FormControl,Validators } from '@angular/forms';
import { TranslateService } from '../services/translate/translate.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


  increment:number = 0;
  email:string;
  inputstring = new FormControl('',[
      Validators.required,
      Validators.minLength(1),

    ]);

  sendimage_url:string;

  private mutationObserver: MutationObserver;


  @ViewChild(IonContent) contentArea: IonContent;
  @ViewChild(IonList, {read: ElementRef}) chatList: ElementRef;



  chat_array:Array<{id:number,message: string, fromEmail: string,toEmail:string,date:string}>;


  constructor(
    private homeservice:HomeserviceService,
    private chatservice:ChatserviceService,
    public translateservice:TranslateService

  ) {
      this.chat_array = [];
      this.email = this.homeservice.email;
      this.sendimage_url = this.chatservice.getSendImage();
   }

   getMessage$;
   getAllMessages$;
   getTranslate$;

  listenMessages(){

    this.getMessage$ = this.chatservice.getMessage().subscribe(data => {

        this.chat_array.push({
          message:data.message,
          fromEmail:data.fromEmail,
          id:this.increment =+ 1,
          toEmail:data.toEmail,
          date:data.date
        });

        this.chatservice.readMessage(data);//read status

        this.homeservice.Notification_voice();
      //console.log(this.chat_array);

    });

    this.chatservice.sendMessage("init");

  }

  sendMessage(){

    if(this.inputstring.value.length < 1){
      return false;
    }
    this.chatservice.sendMessage(this.inputstring.value);

    var today  = new Date();

    this.chat_array.push({
      message: this.inputstring.value,
      fromEmail: this.homeservice.email,
      id: this.increment =+ 1,
      toEmail: this.chatservice.getSendMail(),
      date: today.toLocaleDateString("en-US")
    });

    //this.scrollToBottom();

    //console.log(this.chat_array);
  }

  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
   }

   listenGetAllMessages(){
     this.getAllMessages$ = this.chatservice.getAllMessages().subscribe(data => {
        //console.log(data);
        this.chat_array = data.data;

        var lastid = 0;
        for(var i = 0;i < data.data.length;i++){
           lastid = data.data[i].id;
        }

        this.increment = lastid;
        this.scrollToBottom();
     });
   }

   scrollToBottom(){

     setTimeout(() => {
       this.contentArea.scrollToBottom(1500);
       this.inputstring.setValue('');
     }, 300);

   }

   listenMutationObserver(){

        this.mutationObserver = new MutationObserver((mutations) => {
            this.scrollToBottom();
        });

        this.mutationObserver.observe(this.chatList.nativeElement, {
            childList: true
        });

    }

   logScrolling(event){
      //console.log(event);
    }
    logScrollStart(){
       //console.log("logScrollStart : When Scroll Starts");
     }
    logScrollEnd(){
      //console.log("logScrollEnd : When Scroll Ends");
    }

    language:Observable<any>;

    getTranslate(){
      this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });
    }



  ngOnInit() {

    this.listenMessages();

    this.chatservice.checkGetAllMessages();//check all messages
    this.listenGetAllMessages();
    this.listenMutationObserver();
    this.getTranslate();

  }

  ngOnDestroy() {
    this.getMessage$.unsubscribe();
    this.getAllMessages$.unsubscribe();
    this.getTranslate$.unsubscribe();
  }

}
