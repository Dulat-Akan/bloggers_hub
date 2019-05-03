import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FavoriteserviceService } from '../services/favoriteservice/favoriteservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  details: Observable<any>;

  constructor(private favoriteservice:FavoriteserviceService,private router: Router) {


  }

  checkFavorite(){
    this.favoriteservice.checkFavorite();
  }

  listenFavorite(){
    this.favoriteservice.listenFavorite()
    .subscribe(data => {
      this.details = data.data;
    });
  }

  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
  }

  ngOnInit() {
    this.listenFavorite();
    this.checkFavorite();
  }

}
