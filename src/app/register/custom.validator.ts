import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
export function matchValidator(pwd:string,pwdc:string):ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null =>{
        const value=control.get(pwd)?.value
        const conf=control.get(pwdc)?.value
        return (conf==value)?null:{passwordMatch:true}
    }
}