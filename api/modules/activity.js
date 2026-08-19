import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { HOME_ACTIVITY_LIST } from '@/mock/activity-list.js'

/**
 * 首页 / 动态 Stories 等活动列表
 * @param {Record<string, unknown>} [query] 分类筛选等查询参数，随后端约定扩展
 */
export async function fetchHomeActivityList(query = {}) {
	return request({
		url: ApiPaths.activities,
		method: 'GET',
		data: query,
		// mock: () => HOME_ACTIVITY_LIST,
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
