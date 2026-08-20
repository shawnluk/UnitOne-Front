import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { HOME_ACTIVITY_LIST } from '@/mock/activity-list.js'

/**
 * 首页活动列表（分页）
 * @param {Record<string, unknown>} [query] 查询参数：offset、limit、category_id 等
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
 * 创建活动（表单提交）
 * @param {Record<string, unknown>} payload
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