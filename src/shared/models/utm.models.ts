export interface UtmStorageData {
	data: UtmData;
	expiresIn: number;
}

export interface UtmData {
	[UtmTags.SOURCE]: string;
	[UtmTags.MEDIUM]: string;
	[UtmTags.CAMPAIGN]: string;
	[UtmTags.TERM]: string;
	[UtmTags.CONTENT]: string;
}

export const enum UtmTags {
	SOURCE = 'utm_source',
	MEDIUM = 'utm_medium',
	CAMPAIGN = 'utm_campaign',
	TERM = 'utm_term',
	CONTENT = 'utm_content',
}
