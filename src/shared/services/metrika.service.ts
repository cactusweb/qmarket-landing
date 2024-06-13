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
		try {
			(window as any).twq('event', goals.tw);
		} catch {}

		try {
			(window as any).ym(this.Y_ID, 'reachGoal', goals.ym);
		} catch {}

		try {
			(window as any).fbq('track', goals.meta);
		} catch {}
	}
}
