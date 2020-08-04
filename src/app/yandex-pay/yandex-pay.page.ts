import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { TranslateService } from '../services/translate/translate.service';
import { PayserviceService } from '../services/payservice/payservice.service';
import { Observable, Subject, interval } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Platform } from '@ionic/angular';
//declare var paypal: any;
declare let window: any; // <--- Declare it like this

@Component({
  selector: 'app-yandex-pay',
  templateUrl: './yandex-pay.page.html',
  styleUrls: ['./yandex-pay.page.scss'],
})
export class YandexPayPage implements OnInit {

    @ViewChild("form") searchElementRef: ElementRef;

  constructor(private fb: FormBuilder,
      public homeservice:HomeserviceService,
      public translateservice:TranslateService,
      private router: Router,
      private payservice:PayserviceService,
      private payPal:PayPal,
      public plt: Platform
    ) {}

  sendForm = this.fb.group({

     shopId: ['530496'],
     scid: ['864356'],
     sum: ['2'],
     customerNumber: ['abc000'],//email
     paymentType: [''],
     orderNumber: ['abc1111111'],
     cps_phone: ['+77083531200'],
     shopDefaultUrl: ['https://2click.org'],
     nnn: ['2click'],
     ident: ['111']

   });

   onSubmit() {

     this.sendForm.controls['sum'].setValue(this.secure_sum);

     this.searchElementRef.nativeElement.submit();

    //  this.checksendForm = 1;

    }

    generateRandomNumber()
    {
        var min_value = 1;
        var max_value = 777;
        return Math.round(Math.random() * (max_value-min_value) + min_value);
    }

    checkpaysubscribe;

    checkPay(){

      this.checkpaysubscribe = this.homeservice.timer10s$.subscribe(data => {

          this.sendPay();
          this.checkToUpdateDbPayStatus();

      });

    }

    sendPay(){
      this.payservice.sendPay().subscribe(data => {

            var datar = data;
            // console.log(data);
            if(datar.status == "ok"){
              var updateid = Number(datar.result[0].obId);
              console.log(updateid);
              //zanesti result v bd
              this.payservice.setPaymentDb(updateid);
              this.checkpaysubscribe.unsubscribe();
            }

      });
    }


    checkToUpdateDbPayStatus(){

      var paystatus = localStorage.getItem("paystatus");

      if(paystatus){
        if(paystatus == "ok"){
          var updatepaypalId = localStorage.getItem("insertId");

          if(updatepaypalId){
            this.payservice.setPaymentDb(updatepaypalId);
            console.log(updatepaypalId);
            this.checkpaysubscribe.unsubscribe();
            localStorage.setItem("paystatus","false");
            this.goCabinet();

          }
        }

      }


    }



    getUpdateDbstate(){
      this.payservice.getUpdateDbstate().subscribe(data => {
        if(data.status == "ok"){
          //next page
          console.log(data);
          this.goCabinet();
        }

      });
    }




    usd_rub_currency:number;
    secure_sum:number;

    listenLoadInfo(){

      this.homeservice.getLoadAllInfo().subscribe(data => {

            this.usd_rub_currency = data.currency_usd;

            if(localStorage.getItem("s")){

              var result = Number(localStorage.getItem("s")) * data.currency_usd;
              this.sendForm.controls['sum'].setValue(result);
              this.secure_sum = result;

              this.paymentAmount = localStorage.getItem("s");
              //console.log(this.paymentAmount);
              // setTimeout(() => {
              //   this.paypalInit();
              // }, 100);

            }

      });

    }

    insertIdentificator(){

     this.sendForm.controls['customerNumber'].setValue(this.homeservice.email);
     this.sendForm.controls['orderNumber'].setValue(this.generateRandomNumber());
     var insertid = localStorage.getItem("insertId");

     if(insertid){
       this.sendForm.controls['ident'].setValue(insertid);
     }

    }

    goCabinet(){

        var page = localStorage.getItem("page");

        if(page){
          if(page == "investor"){
            this.router.navigate(['/investor']);
          }else if(page == "ocabinet"){
            this.router.navigate(['/ocabinet']);
          }
        }

    }

    paymentAmount;
    currency: string = 'USD';
    currencyIcon: string = '$';




    payWithPaypal() {
          //console.log("Pay ????");
          this.payPal.init({
            PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
            PayPalEnvironmentSandbox: 'AWNN2lrrAjKYkq0AsXM656L_AoQuQuJFSFeuEXAOyHdyqCmlkaajVIpyKrInFxHfNrGzmzb9l8vnN_GN'
          }).then(() => {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
              // Only needed if you get an "Internal Service Error" after PayPal login!
              //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(() => {
              let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
              this.payPal.renderSinglePaymentUI(payment).then((res) => {
                console.log(res);

                localStorage.setItem("paystatus","ok");

                // Successfully paid

                // Example sandbox response
                //
                // {
                //   "client": {
                //     "environment": "sandbox",
                //     "product_name": "PayPal iOS SDK",
                //     "paypal_sdk_version": "2.16.0",
                //     "platform": "iOS"
                //   },
                //   "response_type": "payment",
                //   "response": {
                //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                //     "state": "approved",
                //     "create_time": "2016-10-03T13:33:33Z",
                //     "intent": "sale"
                //   }
                // }
              }, () => {
                // Error or render dialog closed without being successful
              });
            }, () => {
              // Error in configuration
            });
          }, () => {
            // Error in initialization, maybe PayPal isn't supported or something else
          });
        }

        webPayPal(){
          let _this = this;

          setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
              window.paypal.Buttons({

                env: 'development',
                locale: 'en_US',
                style: {
                     size: 'small',
                     color: 'blue',
                     shape: 'pill',
                     label: 'pay',
                     layout:'horizontal',
                     tagline:'false'
               },
                // Set up the transaction
                createOrder: function (data, actions) {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: _this.paymentAmount
                      }
                    }]
                  });
                },

                // Finalize the transaction
                onApprove: function (data, actions) {
                  return actions.order.capture()
                    .then(function (details) {
                      // Show a success message to the buyer
                      localStorage.setItem("paystatus","ok");
                      //alert('Transaction completed by ' + details.payer.name.given_name + '!');
                    })
                    .catch(err => {
                      console.log(err);
                    })
                }
              }).render('#paypal-button-container');
          }, 500);


        }

        //alert(details.payer.name.given_name);
      //  localStorage.setItem("paystatus","ok");
      //console.log(this.paymentAmount);


    browser = true;

    checkPlatforms(){
      if(this.plt.is('android')){
        this.browser = false;
      }

      if(this.plt.is('ios')){
        this.browser = false;
      }
    }

    language:Observable<any>;
    getTranslate$;

    getTranslate(){
      this.getTranslate$ = this.translateservice.getTranslate().subscribe(data => {
          this.language = data;
        });
    }




  ngOnInit() {

      this.getTranslate();
      this.listenLoadInfo()//listener
      this.homeservice.loadAllInfo({email:this.homeservice.email});
      this.insertIdentificator();
      this.checkPay();//interval check pay
      this.getUpdateDbstate();
      this.webPayPal();
      this.checkPlatforms();




  }

  ngOnDestroy(){
    this.getTranslate$.unsubscribe();
  }

}
