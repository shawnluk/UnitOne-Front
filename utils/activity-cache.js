/**
 * 活动数据本地缓存：列表页加载后写入，详情页按 activity_id 直接读取，
 * 跳转详情时无需再次请求后端。
 */

const STORAGE_KEY = 'higo:activity-cache'

function normalizeId(value) {
	if (value == null || value === '') return null
	return String(value)
}

function readMap() {
	try {
		const data = uni.getStorageSync(STORAGE_KEY)
		return data && typeof data === 'object' ? data : {}
	} catch (_) {
		return {}
	}
}

/**
 * 批量缓存活动条目
 * @param {Array<object>} items
 */
export function cacheActivities(items) {
	const list = Array.isArray(items) ? items : []
	if (!list.length) return
	const map = readMap()
	list.forEach((item) => {
		if (!item || typeof item !== 'object') return
		const id = normalizeId(item.activity_id != null ? item.activity_id : item.id)
		if (id == null) return
		map[id] = item
	})
	try {
		uni.setStorageSync(STORAGE_KEY, map)
	} catch (_) {}
}

/**
 * 按活动 ID 读取本地缓存
 * @param {string|number} activityId
 * @returns {object|null}
 */
export function getCachedActivity(activityId) {
	const id = normalizeId(activityId)
	if (id == null) return null
	const map = readMap()
	return map[id] || null
}