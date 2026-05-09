import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MOMENT_POSTS } from '@/mock/moment-feed.js'

/** 动态信息流（帖子列表） */
export async function fetchMomentPosts(query = {}) {
	return request({
		url: ApiPaths.momentPosts,
		method: 'GET',
		data: query,
		mock: () => MOCK_MOMENT_POSTS,
	})
}
