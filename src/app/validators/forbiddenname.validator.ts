import { AbstractControl, ValidatorFn } from '@angular/forms';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    console.log(control.value);
    const forbidden = nameRe.test(control.value);
    //return forbidden ? {'forbiddenName': {value: control.value}} : null;

    console.log(control.value);

    if(control.value == "test"){
      return {'forbiddenName': true};
    }else{
      return {'forbiddenName': {value: control.value}};
    }

  };
}
