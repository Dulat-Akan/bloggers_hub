import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  checkGoogleAuth():boolean{

    var login = localStorage.getItem("login");

    if(login){
      if(login == "enable"){
          return true;
      }else{
        return false;
      }
    }

  }

}
