import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MetrikaService } from '../../../shared/services/metrika.service';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatRipple],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
	constructor(private metrika: MetrikaService) {}

	onPurchase() {
		const targetElement = document.getElementById('pricing');
		if (!targetElement) {
			return;
		}
		this.reachGoals();
		const offsetTop = targetElement.offsetTop - 50;
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth',
		});
	}

	private reachGoals() {
		this.metrika.reachGoal({
			ym: 'purchase_button',
			meta: 'Purchase',
			metaAdditional: { value: 0.0, currency: 'USD' },
		});
	}
}
