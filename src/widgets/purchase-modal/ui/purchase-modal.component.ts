import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Input,
	ViewEncapsulation,
	input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../card-list/ui/card-list.component';
import { MatDividerModule } from '@angular/material/divider';

import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
	selector: 'app-purchase-modal',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
	],
	templateUrl: './purchase-modal.component.html',
	styleUrl: './purchase-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PurchaseModalComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Card,
		private dialog: DialogRef
	) {}

	formData = {
		messenger: '',
		numAccounts: null,
		paymentMethod: {
			bankTransfer: false,
			crypto: false,
		},
	};

	close() {
		this.dialog.close();
	}
}
