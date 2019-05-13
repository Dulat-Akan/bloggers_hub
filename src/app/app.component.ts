import { Component } from '@angular/core';

import { Platform,ModalController,AlertController,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from './services/translate/translate.service';
import { Observable, Subject, interval } from 'rxjs';
import * as $ from 'jquery';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  title = 'Hello from Dulat';

  public appPages = [
    // {
    //   title: 'Main',
    //   url: '/home',
    //   icon: 'home'
    // },
    {
      title: 'Main',
      url: '/dashboard',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public translateservice:TranslateService
  ) {
    this.initializeApp();
  }

  autoClose(){

      this.menu.close('first');

  }

  language:Observable<any>;

  getTranslate(){
    this.translateservice.getTranslate().subscribe(data => {
        this.language = data;
      });
  }

  triggerComponent(){
    $("#customBtn").trigger('click');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getTranslate();
    });
  }
}
