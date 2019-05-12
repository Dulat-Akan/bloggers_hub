import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    private myrequestservice:MyrequestService,
    private router: Router,
    public translateservice:TranslateService

  ) { }

  checkMyrequest(){
    this.myrequestservice.checkMyrequest();
  }

  listenMyRequest$;
  listenMyRequest(){
    this.listenMyRequest$ = this.myrequestservice.listenMyRequest()
    .subscribe(data => {
      this.details = data.data;
    });
  }

  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
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
  }

  ngOnDestroy(){
    this.listenMyRequest$.unsubscribe();
    this.getTranslate$.unsubscribe();
  }

}
