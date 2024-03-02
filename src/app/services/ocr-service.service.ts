import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OcrService {
	private workerInitPromise: Promise<Tesseract.Worker>;

	constructor() {
		this.workerInitPromise = this.initWorker();
	}

	private async initWorker(): Promise<Tesseract.Worker> {
		const worker = createWorker();
		return worker;
	}

	recognizeImage(file: File): Observable<string> {
		// Convert the async operation to an Observable
		return new Observable<string>(observer => {
			this.workerInitPromise.then(async worker => {
				try {
					const { data: { text } } = await worker.recognize(file);
					console.log(text);

					observer.next(text);
					observer.complete();
				} catch (error) {
					observer.error(error);
				}
			});
		});
	}

	ngOnDestroy(): void {
		this.workerInitPromise.then(worker => worker.terminate());
	}
}
