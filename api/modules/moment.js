import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MOMENT_POSTS } from '@/mock/moment-feed.js'

/**
 * 动态信息流（帖子列表）
 * @param {Record<string, unknown>} [query] 查询参数：offset、limit 等
 * @returns {Promise<Array<Object>>} 已解包的动态帖子数组
 */
export async function fetchMomentPosts(query = {}) {
	// GET 走免鉴权公共路径，未设置 req.user，需显式传 user_id，
	// 后端据此计算每个帖子的 likedByMe（未登录传空则恒为 false）
	const userId = uni.getStorageSync('userId')
	const data = { ...query }
	if (userId) data.user_id = userId
	return request({
		url: ApiPaths.momentPosts,
		method: 'GET',
		data,
		mock: () => MOCK_MOMENT_POSTS,
	})
}

/**
 * 发布动态（可带多图、关联活动）
 * @param {{ user_id?: number|string, activity_id?: number|string, content: string, image_urls?: string[] }} payload
 * @returns {Promise<{ id: number }>} 新动态 id
 */
export async function createMoment(payload = {}) {
	return request({
		url: ApiPaths.momentPosts,
		method: 'POST',
		data: payload,
	})
}

/**
 * 点赞动态（幂等）
 * @param {number|string} postId 动态 id
 * @returns {Promise<{ post_id: number, user_id: number, liked: true }>}
 */
export async function likeMoment(postId) {
	return request({
		url: `${ApiPaths.momentPosts}/${postId}/like`,
		method: 'POST',
	})
}

/**
 * 取消点赞动态（幂等）
 * @param {number|string} postId 动态 id
 * @returns {Promise<{ post_id: number, user_id: number, liked: false }>}
 */
export async function unlikeMoment(postId) {
	return request({
		url: `${ApiPaths.momentPosts}/${postId}/unlike`,
		method: 'POST',
	})
}

/**
 * 给动态发评论
 * @param {number|string} postId 动态 id
 * @param {string} text 评论内容
 * @returns {Promise<{ id: number }>} 新评论 id
 */
export async function addMomentComment(postId, text) {
	return request({
		url: `${ApiPaths.momentPosts}/${postId}/comments`,
		method: 'POST',
		data: { text },
	})
}

/**
 * 删除评论（仅作者本人）
 * @param {number|string} commentId 评论 id
 * @returns {Promise<{ id: number, deleted: true }>}
 */
export async function removeMomentComment(commentId) {
	return request({
		url: `${ApiPaths.momentComments}/${commentId}/remove`,
		method: 'POST',
	})
}