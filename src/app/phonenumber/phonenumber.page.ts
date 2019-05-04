import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { Observable, Subject, interval } from 'rxjs';
import { FormBuilder, Validators, FormArray,FormGroup, FormControl} from '@angular/forms';
//import { forbiddenNameValidator } from '../validators/forbiddenname.validator';
import { HomeserviceService } from '../services/homeservice/homeservice.service';
import { PhonenumberserviceService } from '../services/phonenumberservice/phonenumberservice.service';

import { PhoneValidator } from '../validators/phone.validator';


@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.page.html',
  styleUrls: ['./phonenumber.page.scss'],
})
export class PhonenumberPage implements OnInit {

  val:any;


  constructor(
    public homeservice:HomeserviceService,
    public phonenumberservice:PhonenumberserviceService,
    public modalCtrl:ModalController,
    public navParams:NavParams,
    private fb: FormBuilder
  ) {

    }

    phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;

    sendForm = new FormGroup({
      'phonenumber': new FormControl('',[
          Validators.required,
          Validators.minLength(1),
          //Validators.pattern(this.phoneRegex)
          PhoneValidator(this.phoneRegex)
          //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
          //UsernameValidator.validUsername
        ]),
    });



   checksendForm = 0;

    onSubmit(){
        this.checksendForm = 1;
        var phone = this.sendForm.get('phonenumber').value;
        //console.log(phone);
        this.setPhone(phone);
    }


    dismiss(){
      this.modalCtrl.dismiss();
    }

    setPhone(data){
      this.phonenumberservice.setPhone(data);
    }

    listenPhone(){
      this.phonenumberservice.listenPhone()
      .subscribe(data => {
        if(data.status == "ok"){
          this.modalCtrl.dismiss();
        }
      })
    }

  ngOnInit() {
      this.listenPhone();
  }

}
