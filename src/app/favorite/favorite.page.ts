import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { FavoriteserviceService } from '../services/favoriteservice/favoriteservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '../services/translate/translate.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  details: Observable<any>;

  constructor(
    private homeservice:HomeserviceService,
    private favoriteservice:FavoriteserviceService,
    private router: Router,
    public translateservice:TranslateService

  ) {


  }

  checkFavorite(){

    var data = {
      email:this.homeservice.email
    }

    this.favoriteservice.checkFavorite(data);
  }

  listenFavorite$;
  listenFavorite(){
    this.listenFavorite$ = this.favoriteservice.listenFavorite()
    .subscribe(data => {
      this.details = data.data;
    });
  }

  trackByFn(index,item){
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
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
    this.listenFavorite();
    this.checkFavorite();
    this.getTranslate();
  }

  ngOnDestroy(){
    this.listenFavorite$.unsubscribe();
    this.getTranslate$.unsubscribe();
  }

}
