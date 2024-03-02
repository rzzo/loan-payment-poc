import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const accountNumberMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const accountNumber = control.get('accountNumber');
	const confirmAccountNumber = control.get('confirmAccountNumber');

	return accountNumber && confirmAccountNumber && accountNumber.value === confirmAccountNumber.value
		? null
		: { accountNumberMismatch: true };
};


export const numbersOnlyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const isValid = /^[0-9]*$/.test(control.value);
	return isValid ? null : { numbersOnly: true };
};
