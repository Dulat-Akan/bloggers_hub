import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../services/translate/translate.service';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { Observable, Subject, interval } from 'rxjs';
import * as THREE from 'three';
import * as $ from 'jquery';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage implements OnInit {

  constructor(public translateservice:TranslateService,
    public homeservice:HomeserviceService) { }



  LoadThree(){

    var sceneId = document.getElementById("scene");
    const scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    var thirdPartWidth = window.innerWidth - (window.innerWidth / 3);
    var thirdPartHeight = window.innerHeight - ((window.innerHeight / 3) / 2);
    renderer.setSize( thirdPartWidth, thirdPartHeight );



    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );


    sceneId.appendChild( renderer.domElement );

    //add cube

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// 	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		// 	var cube = new THREE.Mesh( geometry, material );
		// 	scene.add( cube );
    //
		// 	camera.position.z = 5;
    //
		// 	var animate = function () {
		// 		requestAnimationFrame( animate );
    //
		// 		cube.rotation.x += 0.01;
		// 		cube.rotation.y += 0.01;
    //
		// 		renderer.render( scene, camera );
		// 	};

			//animate();
      //add cube

      //add line
      var materialBlueLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      var geometryG = new THREE.Geometry();
      geometryG.vertices.push(new THREE.Vector3( -10, 0, 0) );
      geometryG.vertices.push(new THREE.Vector3( 0, 10, 0) );
      geometryG.vertices.push(new THREE.Vector3( 10, 0, 0) );
      var line = new THREE.Line( geometryG, materialBlueLine );
      scene.add( line );
      renderer.render( scene, camera );



  }

  language:Observable<any>;

  getTranslate(){
    this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });

  }

  ngOnInit() {

    this.getTranslate();
    // setTimeout(() => {
    //
    // },1000);
    //this.LoadThree();


  }

  ngOnDestroy(){



  }

}
