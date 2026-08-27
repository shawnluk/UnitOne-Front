import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import {
	MOCK_USER_DEFAULT_AVATAR,
	MOCK_USER_DISPLAY_NAME_GUEST,
	MOCK_USER_DISPLAY_NAME_LOGGED_IN,
	MOCK_USER_HEADER,
	MOCK_USER_DATA_ITEMS,
	mapSquadsToPanelItems,
	getMockUserSquadDetail,
	MOCK_USER_SQUAD_DEFAULT_ID,
} from '@/mock/user-display.js'

/**
 * 获取用户全部资料（头像、昵称、头部卡片、数据宫格等）
 * @returns {Promise<Object>} 已解包的业务数据：
 *   { avatarUrl, displayNameGuest, displayNameLoggedIn, isLoggedIn, header, dataItems }
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

function readStoredSquads() {
	try {
		const squads = uni.getStorageSync('squads')
		return Array.isArray(squads) ? squads : []
	} catch (_) {
		return []
	}
}

/**
 * 获取用户小队卡片（多个小队）。
 * 小队数据来自登录时后端返回的 squads，已由 persistLogin 存入本地存储，
 * 这里统一读取存储并映射为面板列表；无数据时返回占位条目。
 * @returns {Promise<Array<{id: string, cover: string, name: string, stats: string, badge: string, topTag: string}>>}
 */
export async function fetchUserSquadPanel() {
	const squads = readStoredSquads()
	return mapSquadsToPanelItems(squads)
}

/**
 * 获取小队详情。
 * @param {string|number} [squadId] 小队 ID；缺省时回退默认（空）ID
 * @returns {Promise<Object>} 已解包的业务数据：后端小队详情
 *   （基础信息 + members + activities，结构见 normalizeSquadDetail）
 */
export async function fetchSquadDetail(squadId) {
	const id = squadId || MOCK_USER_SQUAD_DEFAULT_ID
	return request({
		url: `${ApiPaths.squadDetail}/${id}`,
		method: 'GET',
		mock: () => getMockUserSquadDetail(id),
	})
}