import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MetrikaService } from '../../../shared/services/metrika.service';
import { HttpClient } from '@angular/common/http';
import { UtmService } from '../../../shared/services/utm.service';
import { API_ENDPOINTS } from '../../../shared/api/api.consts';
import { BehaviorSubject, finalize } from 'rxjs';
import { DsJoinerService } from '../../../shared/services/ds-joiner.service';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, MatIconModule],
	providers: [DsJoinerService],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
	readonly loading$ = this.dsJoiner.loading$;

	constructor(private dsJoiner: DsJoinerService) {}

	onJoinDiscord() {
		this.dsJoiner.join();
	}

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
