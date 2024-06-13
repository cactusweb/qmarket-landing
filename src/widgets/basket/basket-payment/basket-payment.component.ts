import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { BasketService } from '../../../shared/services/basket.service';
import { PurchaseService } from '../../../shared/services/purchase.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BasketProductDTO } from '../../../shared/models/basket.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethods } from './models/payment-methods.enums';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { GoalParams, MetrikaService } from '../../../shared/services/metrika.service';

const PURCHASE_GOALS: GoalParams = {
	ym: 'initiate_checkout',
	tw: 'tw-omizm-omizp',
	meta: 'InitiateCheckout',
};

@Component({
	selector: 'qm-basket-payment',
	templateUrl: './basket-payment.component.html',
	styleUrl: './basket-payment.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, MatRadioModule, ReactiveFormsModule, MatIcon, MatRipple],
	providers: [PurchaseService],
	standalone: true,
})
export class BasketPaymentComponent {
	readonly totalPrice = toSignal(
		this.basket.basket$.pipe(map((b) => this.getTotalBasketPrice(b.products)))
	) as Signal<number>;

	readonly paymentMethod = new FormControl<PaymentMethods>(PaymentMethods.DISCORD);

	readonly PaymentMethods = PaymentMethods;

	readonly loading = toSignal(this.purchase.loading$);

	constructor(
		private basket: BasketService,
		private purchase: PurchaseService,
		private metrika: MetrikaService
	) {}

	onPurchase() {
		if (this.paymentMethod.value === PaymentMethods.DISCORD) {
			this.purchase.viaDiscord();
		} else {
			this.purchase.viaTelegram();
		}

		this.metrika.reachGoal(PURCHASE_GOALS);
	}

	private getTotalBasketPrice(products: BasketProductDTO[]) {
		const totalPrice = products
			.map((p) => Math.floor(p.price * p.quantity * 100) / 100)
			.reduce((acc, val) => acc + val, 0);

		const secondPartLength = totalPrice.toString().split('.')[1]?.length || 0;

		return secondPartLength > 1 ? Math.ceil(totalPrice * 10) / 10 : totalPrice;
	}
}
