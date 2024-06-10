import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtmData, UtmStorageData, UtmTags } from '../models/utm.models';
import { clearQueryParams, getQueryParams } from '../utils/router.utils';

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

	get() {
		if (!localStorage.getItem(UTM_STORAGE_KEY)) {
			return null;
		}
		try {
			return JSON.parse(localStorage.getItem(UTM_STORAGE_KEY)!) as UtmStorageData;
		} catch {
			return null;
		}
	}

	set(data: UtmData) {
		if (JSON.stringify(this.get()) === JSON.stringify(data)) {
			return;
		}

		const expiresIn = Date.now() + 1000 * 60 * 60 * 24 * 7; // плюс неделя
		localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({ data, expiresIn }));
	}

	private checkUTM() {
		const queryParams = getQueryParams();
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

		const data: Record<string, string> = {};

		Object.keys(queryParams)
			.filter((key) => utmTags.includes(key))
			.forEach((key: string) => {
				data[key.replace('utm_', '')] = queryParams[key];
			});
		this.set(data as unknown as UtmData);
		clearQueryParams();
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
}
