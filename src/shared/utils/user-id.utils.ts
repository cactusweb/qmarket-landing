import * as uuid from 'uuid';

const USER_ID_STORAGE_KEY = 'qm_user_id';

export function getUserId() {
	let userId = localStorage.getItem(USER_ID_STORAGE_KEY);

	if (!userId) {
		userId = uuid.v4();
		localStorage.setItem(USER_ID_STORAGE_KEY, userId);
	}

	return userId;
}

export function setUserId(userId: string) {
	localStorage.setItem(USER_ID_STORAGE_KEY, userId);
}
