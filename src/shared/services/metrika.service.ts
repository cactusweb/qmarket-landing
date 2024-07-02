import { Injectable } from '@angular/core';

export interface GoalParams {
	ym: string;
	tw?: string;
	meta: string;
	metaAdditional?: any;
}

@Injectable({
	providedIn: 'root',
})
export class MetrikaService {
	private readonly Y_ID = 97142453;

	reachGoal(goals: GoalParams) {
		try {
			if (goals.tw) {
				(window as any).twq('event', goals.tw);
			}
		} catch {}

		try {
			(window as any).ym(this.Y_ID, 'reachGoal', goals.ym);
		} catch {}

		try {
			if (!goals.metaAdditional) {
				(window as any).fbq('track', goals.meta);
			} else {
				(window as any).fbq('track', goals.meta, goals.metaAdditional);
			}
		} catch {}
	}
}
