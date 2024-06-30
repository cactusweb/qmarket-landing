import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { GoalParams, MetrikaService } from '../../../shared/services/metrika.service';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgOptimizedImage, MatRipple],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	readonly TG_YM_GOAL = 'telegram_footer';
	readonly X_YM_GOAL = 'X_footer';
	readonly DS_YM_GOAL = 'discord_footer';

	constructor(private metrika: MetrikaService) {}

	reachGoals(ymGoal: string) {
		this.metrika.reachGoal({
			ym: ymGoal,
			meta: 'ViewContent',
		});
	}
}
