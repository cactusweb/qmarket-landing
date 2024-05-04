import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class MetrikaService {
	private readonly ID = 97142453;

	reachGoalYandex(goalName: string) {
		(window as any).ym(this.ID, 'reachGoal', goalName);
	}

	trackPixel(action: string) {
		(window as any).fbq('track', action);
	}
}
