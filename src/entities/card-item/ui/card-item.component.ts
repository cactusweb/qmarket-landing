import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../../widgets/card-list/ui/card-list.component';

import { MatDialog } from '@angular/material/dialog';
import { PurchaseModalComponent } from '../../../widgets/purchase-modal';

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

	constructor(public dialog: MatDialog) {}

	openDialog(): void {
		const dialogRef = this.dialog.open(PurchaseModalComponent, {
			data: this.data,
			width: '660px',
			maxHeight: '100vh',
		});
	}
}
