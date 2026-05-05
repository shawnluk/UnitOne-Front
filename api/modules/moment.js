import { request } from '@/api/http.js'
import { getEnv } from '@/config/env.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MOMENT_POSTS } from '@/mock/moment-feed.js'
import { cloneJson } from '@/utils/json.js'

/** 动态信息流（帖子列表） */
export async function fetchMomentPosts(query = {}) {
	const { useMock } = getEnv()
	if (useMock) {
		return cloneJson(MOCK_MOMENT_POSTS)
	}
	return request({
		url: ApiPaths.momentPosts,
		method: 'GET',
		data: query,
	})
}
