import { Component, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { Hero } from '../hero';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import { LoginModalPage } from '../login-modal/login-modal.page';

import * as $ from 'jquery';

//declare function TransferAuth(data):any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  details: Observable<any>;
  private Observablesearch = new Subject<string>();
  connection;
  deviceid:string;


  // Push a search term into the observable stream.
  search(searchString: string): void {
    this.Observablesearch.next(searchString);
  }
  // selectedHero: Hero;

  async ShowModal(){
    const modal = await this.modalCtrl.create({
      component: LoginModalPage,
      componentProps: { value: 123 }
    });

    await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Select your Role',
      message: 'must choose one',
      buttons: [
        {
          text: 'Find a person to deliver',
          handler: () => {

            var role = 1; //send

            var datas = {
              device:this.deviceid,
              email:this.homeservice.email,
              role:role,
            }

            this.homeservice.sendRole(datas);

          }
        }, {
          text: 'Get the goods along the way',
          handler: () => {

            var role = 2;//deliver

            var datas = {
              device:this.deviceid,
              email:this.homeservice.email,
              role:role,
            }

            this.homeservice.sendRole(datas);

          }
        }
      ]
    });

    await alert.present();
  }

    roleListener(){
        //const id = +this.route.snapshot.paramMap.get('id');

        this.connection = this.homeservice.roleListener()
          .subscribe(data => {

            //console.log(data);
            this.homeservice.role = data.role;
            localStorage.setItem("role",data.role);

            this.loadAllData();

          });
    }

  constructor(public homeservice: HomeserviceService,
              private modalCtrl:ModalController,
              public alertController:AlertController,
              private menu: MenuController,
              private router: Router
            ){
        this.deviceid = this.homeservice.deviceid;
  }





//1
  checkInputSearchData(){

      this.Observablesearch.subscribe(searchnumber => {

          var data = {
            device:this.deviceid,
            email:this.homeservice.email,
            role:this.homeservice.role,
            searchnumber:searchnumber
          }

          this.homeservice.searchData(data);

      });

  }

  getSearchApartments(){
      //const id = +this.route.snapshot.paramMap.get('id');

      this.connection = this.homeservice.getSearchApartments()
        .subscribe(data => {
          this.details = data.sdata;
          //console.log(data.sdata);
          //this.router.navigate(['/product-list'], { queryParams: { serviceId: serviceId} });

        });
  }

  //1

  //2

  loadAllData(){

    var data = {
      device:this.deviceid,
      email:this.homeservice.email,
      role:this.homeservice.role,
      message:"1"
    }

    this.homeservice.sendRequest(data);
  }

  getAllData(){
      //const id = +this.route.snapshot.paramMap.get('id');

      this.connection = this.homeservice.getAllData()
        .subscribe(data => {
          this.details = data.sdata;
          //console.log(data.userdata);
          //set User Profile

            $(".circle").attr("src",data.userdata[0].image_url);
            $(".userName").text(data.userdata[0].name);

            //hide login button
            $(".logininput").hide();
            //hide login button



          //
          //set User Profile
        });
  }

  checkPhoneMemory(){

    this.homeservice.CheckStoragestate.subscribe(data => {

        this.loadAllData(); //send Request after load memory

    });
  }

  //2

//google auth


  listenAuth(){

      this.connection = this.homeservice.checkAuth()
        .subscribe(data => {

          this.menu.close('first');
          //this.menu.open('first');
          //console.log(data);

          if(data.user == "newuser"){

            this.homeservice.email = data.email;
            localStorage.setItem("email",data.email);
            this.presentAlert();

          }else if(data.user == "olduser"){

            this.homeservice.email = data.email;
            localStorage.setItem("email",data.email);

            if(data.role == 0){
              this.presentAlert();
            }else{

              this.homeservice.role = data.role;
              localStorage.setItem("role",data.role);

              this.loadAllData();
            }


          }

        });

  }
//google auth

trackByFn(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.id;
 }


  detailRoute(id){
      this.router.navigate(['/detail/' + id]);
  }


  Testfunction(){

  
    var  y = 100;
    var i = 100000;

    var k = i + y;

    var h = "amir";

    var f = "sanzhar";
    var j = "dulat";

    console.log(k);

  }


  ngOnInit() {

    this.getAllData();//1
    this.checkPhoneMemory();//1

    this.checkInputSearchData();//2
    this.getSearchApartments();//2

    this.listenAuth();//3
    this.roleListener();//4
    //this.Testfunction();



  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
