import { ChangeDetectionStrategy, Component, Inject, Signal, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BasketService } from '../../shared/services/basket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasketDTO } from '../../shared/models/basket.models';
import { BasketProductComponent } from './basket-product/basket-product.component';
import { tap } from 'rxjs';
import { BasketPaymentComponent } from './basket-payment/basket-payment.component';
import { CheckoutTypes } from './models/checkout.models';
import { BasketCheckoutComponent } from './basket-checkout/basket-checkout.component';

@Component({
	selector: 'qm-basket',
	templateUrl: './basket.component.html',
	styleUrl: './basket.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatIcon,
		MatDialogModule,
		BasketProductComponent,
		BasketPaymentComponent,
		BasketCheckoutComponent,
	],
	standalone: true,
})
export class BasketComponent {
	readonly basket = toSignal(
		inject(BasketService).basket$.pipe(
			tap((d) => {
				if (d.products.length === 0) {
					this.dialogRef.close();
				}
			})
		)
	) as Signal<BasketDTO>;

	readonly CheckoutTypes = CheckoutTypes;

	readonly productsTitleWidth = signal<number | undefined>(undefined);

	constructor(
		private dialogRef: MatDialogRef<BasketComponent>,
		@Inject(MAT_DIALOG_DATA)
		public checkoutType: CheckoutTypes
	) {}

	onSetTitleWidth(newWidth: number) {
		if (!this.productsTitleWidth()) {
			this.productsTitleWidth.set(newWidth);
		} else if (newWidth > this.productsTitleWidth()!) {
			this.productsTitleWidth.set(newWidth);
		}
	}
}
