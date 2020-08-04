import { Component, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { DetailserviceService } from '../services/detailservice/detailservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-checkurl',
  templateUrl: './checkurl.page.html',
  styleUrls: ['./checkurl.page.scss'],
})
export class CheckurlPage implements OnInit {

  constructor(
    private homeservice:HomeserviceService,
    private detailservice:DetailserviceService,
    private route: ActivatedRoute
  ) { }

ip;
hash;
  checkIp(){

    this.detailservice.getIpAddress().subscribe(data => {
      //console.log(data.ip);
      this.ip = data.ip;
      this.setViews();
    });

  }

  setViews(){

    var data = {
      ip:this.ip,
      hash:this.hash
    }

    //console.log(data);

    this.detailservice.setViews(data);
  }

  getViews(){
    this.detailservice.getViews().subscribe(data => {
      //console.log(data.redirecturl);
      window.location.href = data.redirecturl;
    });
  }

  //

  ngOnInit() {

    this.checkIp();

    var r = this.route.snapshot.paramMap.get('id');
    this.hash = r;
    //console.log(r);
    this.getViews();



  }

}
