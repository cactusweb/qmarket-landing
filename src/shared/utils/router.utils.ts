import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export function clearQueryParams() {
	inject(Router).navigate([], {
		relativeTo: inject(ActivatedRoute),
		queryParams: {},
		queryParamsHandling: 'merge', // remove to replace all query params by provided
	});
}

export function getQueryParams(): Record<string, string> {
	try {
		var search = location.search.substring(1);
		return JSON.parse(
			'{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
		);
	} catch {
		return {};
	}
}
