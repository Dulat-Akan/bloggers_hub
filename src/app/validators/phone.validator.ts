import { FormGroup, AbstractControl, ValidatorFn,ValidationErrors } from '@angular/forms';

export function PhoneValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const forbidden = nameRe.test(control.value);

    if(control.value.length > 0){
        if(control.value[0] != "+"){
          control.setValue('+' + control.value[0])
        }
      }

    
    if(forbidden){
      return null;
    }else{
      return {'PhoneValidator': {value: control.value}};
    }

  };
}

// export const PhoneValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//
//   const phonenumber = control.get('phonenumber');
//
//   if(phonenumber.value.length > 0){
//     if(phonenumber.value[0] != "+"){
//       control.setValue({phonenumber: '+' + phonenumber.value[0] })
//     }
//     console.log(phonenumber.value);
//
//     return { 'PhoneValidator': true };
//   }else{
//     return { 'PhoneValidator': false };
//   }
//
// };

// ,{ validators: PhoneValidator }
