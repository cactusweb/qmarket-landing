import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BasketService } from '../../shared/services/basket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasketDTO } from '../../shared/models/basket.models';
import { BasketProductComponent } from './basket-product/basket-product.component';
import { tap } from 'rxjs';
import { BasketPaymentComponent } from './basket-payment/basket-payment.component';

@Component({
	selector: 'qm-basket',
	templateUrl: './basket.component.html',
	styleUrl: './basket.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatIcon, MatDialogModule, BasketProductComponent, BasketPaymentComponent],
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

	readonly productsTitleWidth = signal<number | undefined>(undefined);

	constructor(private dialogRef: MatDialogRef<BasketComponent>) {}

	onSetTitleWidth(newWidth: number) {
		if (!this.productsTitleWidth()) {
			this.productsTitleWidth.set(newWidth);
		} else if (newWidth > this.productsTitleWidth()!) {
			this.productsTitleWidth.set(newWidth);
		}
	}
}
