import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OcrService } from './services/ocr-service.service';
import { accountNumberMatchValidator, numbersOnlyValidator } from './validators/validators';

type Method = 'check' | 'debit';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	constructor() {
		effect(() => {
			this.updatePaymentMethodFields(this.activeMethod());
			if (this.activeMethod() === 'check') {
				this.reset();
			} if (this.activeMethod() === 'debit') {
				this.reset();
			}
		});
	}

	title = 'Loan Payment';
	activeMethod = signal<Method>('check');
	@ViewChild('fileInput') fileInput!: ElementRef;

	private ocrService = inject(OcrService);
	form!: FormGroup;
	imageSrc: string | ArrayBuffer | null = null;

	ngOnInit(): void {
		this.form = new FormGroup({
			loanAccountNumber: new FormControl('', [Validators.required, numbersOnlyValidator])
		});

		// this.form = new FormGroup({
		// 	loanAccountNumber: new FormControl('', [Validators.required, numbersOnlyValidator]),
		// 	routingNumber: new FormControl('', [Validators.required, numbersOnlyValidator]),
		// 	accountNumber: new FormControl('', [Validators.required, numbersOnlyValidator]),
		// 	confirmAccountNumber: new FormControl('', [Validators.required]),
		// }, { validators: accountNumberMatchValidator });

	}

	onFileChanged(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				if (e.target?.result) {
					this.imageSrc = e.target.result; // Assign the result to imageSrc
				}
			};

			reader.readAsDataURL(file); // Read the file as a data URL

			this.ocrService.recognizeImage(file).subscribe({
				next: (text) => {
					this.extractAndPopulateForm(text);
				},
				error: (error) => console.error(error)
			});
		}
	}


	extractAndPopulateForm(ocrText: string): void {

		const matches = ocrText.match(/\b\d{8,12}\b/g);

		if (matches && matches.length >= 2) {
			// This is a simple match built for my fake check (check.jpg)
			// This is for POC purposes only
			this.form.patchValue({
				routingNumber: matches[0],
				accountNumber: matches[1],
				confirmAccountNumber: matches[1]
			});
		} else if (matches && matches.length === 1) {
			this.form.patchValue({
				routingNumber: matches[0]
			});
		}
	}

	onSubmit(): void {
		console.log('Form Data:', this.form.value);
		this.form.markAllAsTouched();
		if (!this.form.valid) return;

		this.openDialog();

	}

	openDialog(): void {
		const dialog: HTMLDialogElement | null = document.querySelector('dialog#confirmationDialog');
		if (dialog) {
			dialog.showModal();
		}
	}

	closeDialog(): void {
		const dialog: HTMLDialogElement | null = document.querySelector('dialog#confirmationDialog');
		if (dialog) {
			dialog.close();
		}
	}

	setMethod(method: Method): void {
		this.activeMethod.set(method);
	}

	updatePaymentMethodFields(paymentMethod: string): void {
		this.form.removeControl('routingNumber');
		this.form.removeControl('accountNumber');
		this.form.removeControl('confirmAccountNumber');
		this.form.removeControl('cardNumber');
		this.form.removeControl('expirationDate');
		this.form.removeControl('cvv');
		this.form.removeControl('nameOnCard');

		// Check which payment method is selected and add relevant form controls
		if (paymentMethod === 'check') {
			this.form.addControl('routingNumber', new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]));
			this.form.addControl('accountNumber', new FormControl('', [Validators.required, Validators.pattern(/^\d{8,12}$/)]));
			this.form.addControl('confirmAccountNumber', new FormControl('', [Validators.required]));
			this.form.setValidators(accountNumberMatchValidator);
		} else if (paymentMethod === 'debit') {
			this.form.addControl('cardNumber', new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]));
			this.form.addControl('expirationDate', new FormControl('', [Validators.required]));
			this.form.addControl('cvv', new FormControl('', [Validators.required, Validators.pattern(/^\d{3,4}$/)]));
			this.form.addControl('nameOnCard', new FormControl('', [Validators.required]));

			// Reset custom validators if they were set for the check payment method
			this.form.setValidators(null);
		}

		// Call updateValueAndValidity to re-evaluate the form status
		this.form.updateValueAndValidity();
	}

	reset(): void {
		this.form.reset();
		this.imageSrc = null;

		if (this.fileInput && this.fileInput.nativeElement) {
			this.fileInput.nativeElement.value = "";
		}
	}
}
