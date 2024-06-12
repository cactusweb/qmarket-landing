import { Injectable } from '@angular/core';

export interface GoalParams {
	ym: string;
	tw: string;
	meta: string;
}

@Injectable({
	providedIn: 'root',
})
export class MetrikaService {
	private readonly Y_ID = 97142453;

	reachGoal(goals: GoalParams) {
		(window as any).ym(this.Y_ID, 'reachGoal', goals.ym);
		(window as any).twq('event', goals.tw);
		(window as any).fbq('track', goals.meta);
	}
}
