import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'

/**
 * 获取活动分类列表
 * @returns {Promise<Array<Object>>} 已解包的活动分类数组（每项含 category_id / name 等）
 */
export async function fetchCategories() {
	return request({
		url: ApiPaths.categories,
		method: 'GET',
	})
}
