import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BasketService } from '../../shared/services/basket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasketDTO } from '../../shared/models/basket.models';
import { BasketProductComponent } from './basket-product/basket-product.component';
import { PurchaseService } from '../../shared/services/purchase.service';
import { tap } from 'rxjs';

@Component({
	selector: 'qm-basket',
	templateUrl: './basket.component.html',
	styleUrl: './basket.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatIcon, MatDialogModule, BasketProductComponent],
	providers: [PurchaseService],
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

	constructor(
		private purchase: PurchaseService,
		private dialogRef: MatDialogRef<BasketComponent>
	) {}

	onPurchase() {
		this.purchase.viaDiscord();
	}
}
