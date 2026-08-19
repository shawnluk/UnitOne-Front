import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'

/**
 * 获取活动分类列表
 */
export async function fetchCategories() {
	return request({
		url: ApiPaths.categories,
		method: 'GET',
	})
}
