import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../api/api.consts';
import { getUserId } from '../utils/user-id.utils';
import { BehaviorSubject, finalize, shareReplay } from 'rxjs';

@Injectable()
export class PurchaseService {
	readonly #loading$ = new BehaviorSubject(false);

	readonly loading$ = this.#loading$.asObservable().pipe(shareReplay());

	constructor(private http: HttpClient) {}

	viaDiscord() {
		const url = API_ENDPOINTS.INVITE.replace(':param', getUserId());
		this.openLink(url);
	}

	viaTelegram() {
		const url = `https://t.me/QMarketOrder_bot?start=${getUserId()}`;
		this.openLink(url);
	}

	private openLink(invite: string) {
		window.open(invite, '_target', 'noopener');
	}
}
