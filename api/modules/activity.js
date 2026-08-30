import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { getCachedActivity, cacheActivities } from '@/utils/activity-cache.js'
import { HOME_ACTIVITY_LIST } from '@/mock/activity-list.js'

const DEVICE_ID_KEY = 'higo:device-id'

/**
 * 获取当前设备 ID（用于未登录用户贡献热度时去重）。
 * 首次调用生成一个并持久化到本地存储，后续复用同一值。
 * @returns {string} 设备指纹 ID
 */
function getDeviceId() {
	try {
		let id = uni.getStorageSync(DEVICE_ID_KEY)
		if (!id) {
			id = `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
			uni.setStorageSync(DEVICE_ID_KEY, id)
		}
		return String(id)
	} catch (_) {
		return ''
	}
}

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

/**
 * 上报一次活动热度（点击查看活动详情）。
 * - 已登录：后端从 Bearer token 解析用户并去重；
 * - 未登录：前端携带 device_id，后端按设备去重。
 * 接口目前约定为 POST /api/v1/activities/:id/views，返回 { hot, added }：
 *   hot  当前去重后的热度
 *   added 本次是否为新增计数（true 才本地 +1，避免重复点击虚增）
 * 为不影响用户体验，本函数对外不做承诺：失败时返回 null，交由调用方静默忽略。
 * @param {string|number} id 活动 ID
 * @returns {Promise<{hot:number, added:boolean}|null>}
 */
export async function reportActivityView(id) {
	if (id == null || id === '') return null
	try {
		return await request({
			url: `${ApiPaths.activities}/${id}/views`,
			method: 'POST',
			data: { device_id: getDeviceId() },
			mock: () => ({ hot: Math.round(Math.random() * 8) + 1, added: true }),
		})
	} catch (_) {
		return null
	}
}

/**
 * 本地更新活动热度（拿到已去重的热度后同步到内存列表与本地缓存）。
 * 仅当后端确认本次为新增计数时调用，避免重复点击对已有条目造成虚增。
 * @param {Record<string, unknown>} item 待更新的活动条目
 * @param {object} result 上报返回结果，含 hot 与 added
 * @returns {Record<string, unknown>} 更新后的活动条目（可能是新对象）
 */
export function applyHotResult(item, result) {
	if (!item || !result) return item
	const added = Boolean(result.added)
	const next = { ...item, hot: Number(result.hot != null ? result.hot : (item.hot || 0) + (added ? 1 : 0)) }
	cacheActivities([next])
	return next
}