import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface UtmStorageData {
	data: UtmData;
	expiresIn: number;
}

interface UtmData {
	[UtmTags.SOURCE]: string;
	[UtmTags.MEDIUM]: string;
	[UtmTags.CAMPAIGN]: string;
	[UtmTags.TERM]: string;
	[UtmTags.CONTENT]: string;
}

const enum UtmTags {
	SOURCE = 'utm_source',
	MEDIUM = 'utm_medium',
	CAMPAIGN = 'utm_campaign',
	TERM = 'utm_term',
	CONTENT = 'utm_content',
}

const UTM_STORAGE_KEY = 'qm_utm';

@Injectable()
export class UtmService {
	constructor(@Inject(PLATFORM_ID) platformId: Object) {
		if (isPlatformServer(platformId)) {
			return;
		}
		this.checkRemoveUtm();
		this.checkUTM();
	}

	getUtm() {
		if (!localStorage.getItem(UTM_STORAGE_KEY)) {
			return null;
		}
		try {
			return JSON.parse(localStorage.getItem(UTM_STORAGE_KEY)!) as UtmStorageData;
		} catch {
			return null;
		}
	}

	private checkUTM() {
		const queryParams = this.getQueryParams();
		const utmTags: string[] = [
			UtmTags.SOURCE,
			UtmTags.MEDIUM,
			UtmTags.CAMPAIGN,
			UtmTags.TERM,
			UtmTags.CONTENT,
		];
		if (!queryParams[UtmTags.SOURCE]) {
			return;
		}
		Object.keys(queryParams)
			.filter((key) => !utmTags.includes(key))
			.forEach((key: string) => delete queryParams[key]);
		const expiresIn = Date.now() + 1000 * 60 * 60 * 24 * 7; // плюс неделя
		localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({ data: queryParams, expiresIn }));
		this.clearQueryParams();
	}

	private checkRemoveUtm() {
		if (!localStorage.getItem(UTM_STORAGE_KEY)) {
			return;
		}
		try {
			const utm: UtmStorageData = JSON.parse(localStorage.getItem(UTM_STORAGE_KEY)!);
			if (Date.now() > utm.expiresIn) {
				localStorage.removeItem(UTM_STORAGE_KEY);
			}
		} catch {
			localStorage.removeItem(UTM_STORAGE_KEY);
		}
	}
	private clearQueryParams() {
		inject(Router).navigate([], {
			relativeTo: inject(ActivatedRoute),
			queryParams: {},
			queryParamsHandling: 'merge', // remove to replace all query params by provided
		});
	}

	private getQueryParams() {
		try {
			var search = location.search.substring(1);
			return JSON.parse(
				'{"' +
					decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
					'"}'
			);
		} catch {
			return {};
		}
	}
}
