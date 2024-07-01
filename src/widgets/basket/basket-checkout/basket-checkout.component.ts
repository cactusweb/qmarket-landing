import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CryptoPaymentComponent } from '../../crypto-payment/crypto-payment.component';
import { CsdCryptoPaymentModule } from '../../crypto-payment/crypto-payment.module';
import { BasketService } from '../../../shared/services/basket.service';
import { BasketProductDTO } from '../../../shared/models/basket.models';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'qm-basket-checkout',
	template: `
		<button class="qm-button" matRipple matRippleColor="#654e7125" (click)="onCheckout()">
			Checkout &dollar;{{ totalPrice() }}
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
	readonly totalPrice = toSignal(
		inject(BasketService).basket$.pipe(map((b) => this.getTotalBasketPrice(b.products)))
	) as Signal<number>;

	constructor(private dialog: MatDialog) {}

	onCheckout() {
		this.dialog.open(CryptoPaymentComponent, {
			maxWidth: '550px',
			width: '100%',
		});
	}

	private getTotalBasketPrice(products: BasketProductDTO[]) {
		const totalPrice = products
			.map((p) => Math.floor(p.price * p.quantity * 100) / 100)
			.reduce((acc, val) => acc + val, 0);

		const secondPartLength = totalPrice.toString().split('.')[1]?.length || 0;

		return secondPartLength > 1 ? Math.ceil(totalPrice * 10) / 10 : totalPrice;
	}
}
