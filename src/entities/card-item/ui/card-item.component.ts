import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../../widgets/card-list/ui/card-list.component';

import { MatDialog } from '@angular/material/dialog';
import { PurchaseModalComponent } from '../../../widgets/purchase-modal';
import { MetrikaService } from '../../../shared/services/metrika.service';

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
	data!: Card;

	constructor(
		public dialog: MatDialog,
		private metrika: MetrikaService
	) {}

	openDialog(): void {
		this.metrika.reachGoalYandex(this.data.openFormGoalName);
		this.dialog.open(PurchaseModalComponent, {
			data: this.data,
			autoFocus: false,
			restoreFocus: false,
			maxWidth: '660px',
			width: '100%',
			maxHeight: '100vh',
		});
	}
}
