import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from './services/translate/translate.service';
import { Device } from '@ionic-native/device/ngx';
import { HomeserviceService } from './services/homeservice/homeservice.service';
import { ContactserviceService } from './services/contactservice/contactservice.service';
import { OnlineusersService } from './services/onlineusers/onlineusers.service';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { SetroleserviceService } from './services/setroleservice/setroleservice.service';
import {MatButtonModule, MatCheckboxModule,MatInputModule,MatAutocompleteModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { GooglePlus } from '@ionic-native/google-plus/ngx';







import { HttpClientModule, HttpClient } from '@angular/common/http';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,
    Device,
    HomeserviceService,
    ContactserviceService,
    OnlineusersService,
    AuthService,
    NotificationService,
    SetroleserviceService,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}

// required for AOT compilation
