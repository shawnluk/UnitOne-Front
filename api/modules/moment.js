import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MOMENT_POSTS } from '@/mock/moment-feed.js'

/**
 * 动态信息流（帖子列表）
 * @param {Record<string, unknown>} [query] 查询参数：offset、limit 等
 * @returns {Promise<Array<Object>>} 已解包的动态帖子数组
 */
export async function fetchMomentPosts(query = {}) {
	return request({
		url: ApiPaths.momentPosts,
		method: 'GET',
		data: query,
		mock: () => MOCK_MOMENT_POSTS,
	})
}