import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YandexMetrikaService } from '../../../shared/services/yandex-metrika.service';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, MatIconModule],
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
	constructor(private yandexMetrika: YandexMetrikaService) {}
	
	onJoinDiscord() {
		this.yandexMetrika.reachGoal('click_join_discord');
	}
}
