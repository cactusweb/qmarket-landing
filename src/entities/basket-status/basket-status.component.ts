import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	HostBinding,
	inject,
} from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
	selector: 'qm-basket-status',
	templateUrl: './basket-status.component.html',
	styleUrl: './basket-status.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatDialogModule, MatIcon, MatRipple],
	standalone: true,
})
export class BasketStatusComponent {
	readonly quantity = toSignal(
		inject(BasketService).basket$.pipe(
			map((d) => d.products.length),
			tap((length) => {
				this.toggleFooterPadding(length ? 'add' : 'remove');
				this.cdr.markForCheck();
			})
		)
	);

	constructor(
		private matDialog: MatDialog,
		private cdr: ChangeDetectorRef
	) {}

	@HostBinding('class.hidden')
	get hidden() {
		return !this.quantity();
	}

	openBasket() {
		// this.matDialog.open();
	}

	toggleFooterPadding(action: 'add' | 'remove') {
		if (window.innerWidth > 768) {
			return;
		}

		const footer = window.document.querySelector<HTMLElement>('#contacts');
		footer?.style.setProperty('padding-bottom', action === 'add' ? '71px' : '0px');
	}
}
