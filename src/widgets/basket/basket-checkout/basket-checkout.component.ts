import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

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
	imports: [MatRipple],
})
export class BasketCheckoutComponent {
	constructor(private dialog: MatDialog) {}

	onCheckout() {}
}
