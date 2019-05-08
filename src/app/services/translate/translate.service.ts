import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) {

    //setDefault language
    var enlang = localStorage.getItem("enablelanguage");

    if(!enlang){
      localStorage.setItem("language","en");
    }

    this.setLanguage();
    //setDefault language

  }

  public ob:Observable<any>;
  public currentLanguagetest = new Subject();
  public currentLanguage = new Subject();

  //public getTranslate(): Observable<any> {
  setLanguage(){

              this.getTranslate().subscribe(data => {
                this.currentLanguage.next(data);
              })

    }
  public getTranslate(): Observable<any> {
        var language = localStorage.getItem("language");

        if(language){
          switch (language) {
              case "en":
                return this.http.get("../assets/language/en.json");
                break;
              case "ru":
              return this.http.get("../assets/language/ru.json");
                break;
              case "espanol":
                return this.http.get("../assets/language/es.json");
                break;
              case "chinese":
                return this.http.get("../assets/language/chinese.json");
                break;
              case "arabian":
                return this.http.get("../assets/language/arabian.json");
                break;
              default:
                return this.http.get("../assets/language/en.json");
            }
        }

    }
}
