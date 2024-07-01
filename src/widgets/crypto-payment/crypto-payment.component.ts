import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { CRYPTO_PAYMENT_OPTIONS } from './consts/crypto-payments.consts';

@Component({
	selector: 'qm-crypto-payment',
	templateUrl: './crypto-payment.component.html',
	styleUrls: ['./crypto-payment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPaymentComponent {
	@Input()
	@HostBinding('style.--primary-color')
	primaryColor = '#B12EFF';

	@Output()
	orderSuccess = new EventEmitter<any>();

	readonly form = new FormGroup({
		tx: new FormControl('', Validators.required),
		typeId: new FormControl<number | null>(1, Validators.required),
	});

	readonly CRYPTO_PAYMENT_OPTIONS = CRYPTO_PAYMENT_OPTIONS;

	readonly loading$ = new BehaviorSubject(false);

	readonly recipientAddress = toSignal(
		this.form.controls.typeId.valueChanges.pipe(
			map((res) => (res ? CRYPTO_PAYMENT_OPTIONS.find((opt) => opt.id === res)!.recipient : null))
		)
	) as Signal<string | null>;

	constructor(
		private snBar: MatSnackBar,
		private http: HttpClient
	) {}

	onSubmit() {
		this.form.markAllAsTouched();
		this.showWarnNotifications();
		if (this.form.invalid) {
			return;
		}

		const body = {
			email: '',
			crypto: {
				...this.form.value,
				tx: this.getOnlyTx(this.form.value.tx!),
			},
		};

		this.loading$.next(true);

		// this.http
		// 	.request<any>(Requests.PUT_ORDER_DATA, body, this.order.id)
		// 	.pipe(finalize(() => this.loading$.next(false)))
		// 	.subscribe({
		// 		next: (data) => this.orderSuccess.emit(data),
		// 		error: () => {},
		// 	});
	}

	private showWarnNotifications() {
		if (this.form.get('typeId')!.invalid)
			this.snBar.open('Choose the payment method', undefined, {
				duration: 3000,
				panelClass: 'snbar_warn',
			});

		if (this.form.get('tx')!.invalid)
			this.snBar.open('Input the transaction hash', undefined, {
				duration: 3000,
				panelClass: 'snbar_warn',
			});
	}

	private getOnlyTx(txValue: string) {
		return txValue.split('/').pop();
	}
}
