import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../hero';


import { HomeserviceService } from '../services/homeservice/homeservice.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    heroes: Hero[];
    results: Observable<any>;
    search = '';

    selectedHero: Hero;

    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }

    // onKey(event: any) {
    //   this.search = event.target.value;
    // }


    constructor(public homeservice: HomeserviceService){

    }

    getHeroes(): void {
      this.homeservice.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
    }

    searchFunction(){
      //this.results = this.homeservice.sendData("test");

      // this.results.subscribe(res => {
      //
      // });
    }

    ngOnInit() {
      this.getHeroes();
    }


}
