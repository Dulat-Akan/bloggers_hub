import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.page.html',
  styleUrls: ['./slideshow.page.scss'],
})
export class SlideshowPage implements OnInit {



    slideOpts = {
        initialSlide: 0,
        speed: 400
      };

  constructor() { }



  ngOnInit() {
  }

}
