import { Injectable } from '@angular/core';
import { UtmService } from './utm.service';
import { MetrikaService } from './metrika.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../api/api.consts';
import { BehaviorSubject, finalize, shareReplay } from 'rxjs';

const DEFAULT_DS_INVITE = 'https://discord.gg/qmarket';

@Injectable()
export class DsJoinerService {
	readonly #loading$ = new BehaviorSubject(false);

	readonly loading$ = this.#loading$.asObservable().pipe(shareReplay());

	constructor(
		private utm: UtmService,
		private metrika: MetrikaService,
		private http: HttpClient
	) {}

	join() {
		this.metrika.reachGoalYandex('click_join_discord');
		this.metrika.trackPixel('Click_Discord');
		const utm = this.utm.get()?.data;

		if (!utm) {
			return this.openInvite(DEFAULT_DS_INVITE);
		}

		this.#loading$.next(true);
		this.http
			.post<{ invite: string }>(API_ENDPOINTS.INVITE, utm)
			.pipe(finalize(() => this.#loading$.next(false)))
			.subscribe({
				next: (v) => this.openInvite(v.invite),
				error: () => this.openInvite(DEFAULT_DS_INVITE),
			});
	}

	private openInvite(invite: string) {
		window.open(invite, '_target', 'noopener');
	}
}
