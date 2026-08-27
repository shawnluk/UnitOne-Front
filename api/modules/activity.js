import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { getCachedActivity } from '@/utils/activity-cache.js'
import { HOME_ACTIVITY_LIST } from '@/mock/activity-list.js'

/**
 * 首页活动列表（分页）
 * @param {Record<string, unknown>} [query] 查询参数：offset、limit、category_id 等
 * @returns {Promise<Array<Object>>} 已解包的活动列表（每项为一条活动）
 */
export async function fetchHomeActivityList(query = {}) {
	return request({
		url: ApiPaths.activities,
		method: 'GET',
		data: query,
		mock: ({ data }) => {
			const offset = Number(data && data.offset) || 0
			const limit = Number(data && data.limit) || 10
			return HOME_ACTIVITY_LIST.slice(offset, offset + limit)
		},
	})
}

/**
 * 活动详情（按 ID 查询）。
 * 缓存优先：本地已有该活动时直接返回缓存数据，不发起网络请求；
 * 未命中缓存时才请求 GET /api/v1/activities/:id。
 * @param {string|number} id 活动 ID
 * @returns {Promise<Object|null>} 已解包的活动详情对象；缓存未命中且请求失败时返回 null
 */
export async function fetchActivityDetail(id) {
	const cached = getCachedActivity(id)
	if (cached) return cached
	try {
		return await request({
			url: `${ApiPaths.activities}/${id}`,
			method: 'GET',
		})
	} catch (_) {
		return null
	}
}

/**
 * 创建活动（表单提交）
 * @param {Record<string, unknown>} payload 活动表单数据（title、category_id、cover 等）
 * @returns {Promise<Object>} 已解包的新建活动对象
 */
export async function createActivity(payload) {
	return request({
		url: ApiPaths.activities,
		method: 'POST',
		data: payload,
		mock: ({ data }) => ({
			id: `mock-${Date.now()}`,
			...(data || {}),
		}),
	})
}