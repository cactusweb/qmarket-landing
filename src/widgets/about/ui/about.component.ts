import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatRipple],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
	onPurchase() {
		const targetElement = document.getElementById('pricing');
		if (!targetElement) {
			return;
		}
		const offsetTop = targetElement.offsetTop - 50;
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth',
		});
	}
}
