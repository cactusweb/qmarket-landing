import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class YandexMetrikaService {
	private readonly ID = 97142453;

	reachGoal(goalName: string) {
		(window as any).ym(this.ID, 'reachGoal', goalName);
	}
}
