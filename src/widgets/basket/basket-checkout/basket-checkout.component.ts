import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CryptoPaymentComponent } from '../../crypto-payment/crypto-payment.component';
import { CsdCryptoPaymentModule } from '../../crypto-payment/crypto-payment.module';

@Component({
	selector: 'qm-basket-checkout',
	template: `
		<button class="qm-button" matRipple matRippleColor="#654e7125" (click)="onCheckout()">
			Checkout
		</button>
	`,
	styles: `
		:host {
			@apply tw-w-full tw-grid max-md:tw-p-4;
		}

		button {
			@apply tw-max-w-md tw-w-full tw-justify-self-center;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatRipple, CsdCryptoPaymentModule],
})
export class BasketCheckoutComponent {
	constructor(private dialog: MatDialog) {}

	onCheckout() {
		this.dialog.open(CryptoPaymentComponent, {
			maxWidth: '550px',
			width: '100%',
		});
	}
}
