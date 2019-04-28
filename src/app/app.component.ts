import { Component } from '@angular/core';

import { Platform,ModalController,AlertController,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



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
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  autoClose(){

      this.menu.close('first');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
