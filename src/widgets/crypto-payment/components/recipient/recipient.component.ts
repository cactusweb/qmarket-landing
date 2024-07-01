import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'qm-crypto-recipient',
	templateUrl: './recipient.component.html',
	styleUrls: ['./recipient.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoRecipientComponent {
	@Input()
	recipient!: string | null;

	constructor(private snBar: MatSnackBar) {}

	copyRecipient() {
		if (!this.recipient) {
			return;
		}
		this.copy(this.recipient);
	}

	copy(data: string) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = data;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		this.snBar.open('Address copied!', undefined, { duration: 3000 });
		// if (notification)
		//   this.snackbarService.createItem(text, CsdSnackbarLevels.INFO);
	}
}
