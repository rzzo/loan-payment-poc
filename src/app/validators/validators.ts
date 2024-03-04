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

export const cvvValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const isValid = /^\d{3}$/.test(control.value);
	return isValid ? null : { cvvInvalid: true };
};

export const routingNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const isValid = /^\d{1,9}$/.test(control.value);
	return isValid ? null : { routingNumberInvalid: true };
};
