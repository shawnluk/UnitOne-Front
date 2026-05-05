import { request } from '@/api/http.js'
import { getEnv } from '@/config/env.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { HOME_ACTIVITY_LIST } from '@/mock/activity-list.js'
import { cloneJson } from '@/utils/json.js'

/**
 * 首页 / 动态 Stories 等活动列表
 * @param {Record<string, unknown>} [query] 分类筛选等查询参数，随后端约定扩展
 */
export async function fetchHomeActivityList(query = {}) {
	const { useMock } = getEnv()
	if (useMock) {
		return cloneJson(HOME_ACTIVITY_LIST)
	}
	return request({
		url: ApiPaths.activities,
		method: 'GET',
		data: query,
	})
}

/**
 * 创建活动（表单提交）
 * @param {Record<string, unknown>} payload
 */
export async function createActivity(payload) {
	const { useMock } = getEnv()
	if (useMock) {
		return { id: `mock-${Date.now()}`, ...payload }
	}
	return request({
		url: ApiPaths.activities,
		method: 'POST',
		data: payload,
	})
}
