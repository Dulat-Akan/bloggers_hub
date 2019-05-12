import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { MyrequestService } from '../services/myrequest/myrequest.service';
import { TranslateService } from '../services/translate/translate.service';

@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {

  details: Observable<any>;

  constructor(
    private homeservice:HomeserviceService,
    private myrequestservice:MyrequestService,
    private router: Router,
    public translateservice:TranslateService

  ) { }

  checkMyrequest(){
    var data = {
      email:this.homeservice.email
    }

    this.myrequestservice.checkMyrequest(data);
  }

  listenMyRequest$;
  listenMyRequest(){
    this.listenMyRequest$ = this.myrequestservice.listenMyRequest()
    .subscribe(data => {
      //console.log(data);
      this.details = data.data;
    });
  }

  setDeleteorUpdate(detail){

      var data = {
        id:detail.id,
        status:detail.status,
        email:this.homeservice.email
      }
      this.myrequestservice.setDeleteorUpdate(data);
  }

  listensetDeleteorUpdate$;

  listensetDeleteorUpdate(){
      this.listensetDeleteorUpdate$ = this.myrequestservice.listensetDeleteorUpdate()
      .subscribe(data => {
        if(data.status == "updated"){
          this.checkMyrequest();
        }
      });
  }

  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
  }

  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
   }

  language:Observable<any>;

  getTranslate$;

  getTranslate(){
    this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });
  }

  ngOnInit() {
    this.listenMyRequest();
    this.checkMyrequest();
    this.getTranslate();
    this.listensetDeleteorUpdate();
  }

  ngOnDestroy(){
    this.listenMyRequest$.unsubscribe();
    this.getTranslate$.unsubscribe();
    this.listensetDeleteorUpdate$.unsubscribe();
  }

}
