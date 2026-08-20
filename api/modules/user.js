import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import {
	MOCK_USER_DEFAULT_AVATAR,
	MOCK_USER_DISPLAY_NAME_GUEST,
	MOCK_USER_DISPLAY_NAME_LOGGED_IN,
	MOCK_USER_HEADER,
	MOCK_USER_DATA_ITEMS,
	MOCK_USER_SQUAD_PANEL,
	getMockUserSquadDetail,
	MOCK_USER_SQUAD_DEFAULT_ID,
} from '@/mock/user-display.js'

/**
 * 获取用户全部资料（头像、昵称、头部卡片、数据宫格等）
 */
export async function fetchUserProfile() {
	return request({
		url: ApiPaths.userProfile,
		method: 'GET',
		mock: () => ({
			avatarUrl: MOCK_USER_DEFAULT_AVATAR,
			displayNameGuest: MOCK_USER_DISPLAY_NAME_GUEST,
			displayNameLoggedIn: MOCK_USER_DISPLAY_NAME_LOGGED_IN,
			isLoggedIn: false,
			header: { ...MOCK_USER_HEADER },
			dataItems: MOCK_USER_DATA_ITEMS.map((row) => ({ ...row })),
		}),
	})
}

/**
 * 获取用户小队卡片
 */
export async function fetchUserSquadPanel() {
	return request({
		url: ApiPaths.userSquad,
		method: 'GET',
		mock: () => MOCK_USER_SQUAD_PANEL,
	})
}

/**
 * 获取小队详情
 */
export async function fetchSquadDetail(squadId) {
	const id = squadId || MOCK_USER_SQUAD_DEFAULT_ID
	return request({
		url: `${ApiPaths.squadDetail}/${id}`,
		method: 'GET',
		mock: () => getMockUserSquadDetail(id),
	})
}