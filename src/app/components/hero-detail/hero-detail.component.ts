import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero';
//import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';

@Component({
  selector: 'app-hero-detail',
  //directives: [IONIC_DIRECTIVES],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor() {



  }

  ngOnInit() {}

}
