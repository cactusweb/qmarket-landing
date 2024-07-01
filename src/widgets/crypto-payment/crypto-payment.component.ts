import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostBinding, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, finalize, map, switchMap, take } from 'rxjs';
import { CRYPTO_PAYMENT_OPTIONS, WH_URL } from './consts/crypto-payments.consts';
import { BasketService } from '../../shared/services/basket.service';
import { BasketProductDTO } from '../../shared/models/basket.models';
import { buildPaidWebhook } from './utils/crypto-payment.utils';
import { UtmService } from '../../shared/services/utm.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
	selector: 'qm-crypto-payment',
	templateUrl: './crypto-payment.component.html',
	styleUrls: ['./crypto-payment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPaymentComponent {
	@HostBinding('style.--primary-color')
	primaryColor = '#B12EFF';

	readonly totalPrice = toSignal(
		this.basket.basket$.pipe(map((b) => this.getTotalBasketPrice(b.products)))
	) as Signal<number>;

	readonly form = new FormGroup({
		tx: new FormControl('', Validators.required),
		typeId: new FormControl<number | null>(null, Validators.required),
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
		private http: HttpClient,
		private basket: BasketService,
		private utm: UtmService,
		private dialogRef: MatDialogRef<CryptoPaymentComponent>,
		private dialog: MatDialog
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

		const paymentMethod = CRYPTO_PAYMENT_OPTIONS.find((opt) => opt.id === this.form.value.typeId!)!;

		this.basket.basket$
			.pipe(
				take(1),
				map((basket) =>
					buildPaidWebhook(
						basket,
						this.form.value.tx!,
						paymentMethod.coin.fullname,
						this.utm.get()?.data
					)
				),
				switchMap((wh) => this.http.post(WH_URL, wh)),
				finalize(() => this.loading$.next(false))
			)
			.subscribe({
				next: () => {
					this.onSendWh();
				},
				error: () => {},
			});
	}

	private onSendWh() {
		this.dialogRef.close();
		this.dialog.open(ContactsComponent, {
			maxWidth: '500px',
			width: '100%',
			autoFocus: false,
			restoreFocus: false,
		});
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

	private getTotalBasketPrice(products: BasketProductDTO[]) {
		const totalPrice = products
			.map((p) => Math.floor(p.price * p.quantity * 100) / 100)
			.reduce((acc, val) => acc + val, 0);

		const secondPartLength = totalPrice.toString().split('.')[1]?.length || 0;

		return secondPartLength > 1 ? Math.ceil(totalPrice * 10) / 10 : totalPrice;
	}
}
