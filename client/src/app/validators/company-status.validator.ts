import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CompanyStatus } from '../models/company.model';

export function companyStatusValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const companyStatus = Object.values(CompanyStatus);
        return companyStatus.includes(control.value) ? null : { invalidOption: { value: control.value } };
    };
}
