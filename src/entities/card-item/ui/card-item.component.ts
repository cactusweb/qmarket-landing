import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';
import { PurchaseModalComponent } from '../../../widgets/purchase-modal';
import { MetrikaService } from '../../../shared/services/metrika.service';
import { ProductItem } from '../../../shared/models/product-item.models';

@Component({
	selector: 'app-card-item',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgOptimizedImage],
	templateUrl: './card-item.component.html',
	styleUrl: './card-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent {
	@Input()
	product!: ProductItem;

	constructor(
		public dialog: MatDialog,
		private metrika: MetrikaService
	) {}

	openDialog(): void {
		this.metrika.reachGoalYandex(this.product.openFormGoalName);
		this.dialog.open(PurchaseModalComponent, {
			data: this.product,
			autoFocus: false,
			restoreFocus: false,
			maxWidth: '660px',
			width: '100%',
			maxHeight: '100vh',
		});
	}
}
