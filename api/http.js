import { getEnv } from '@/config/env.js'

function unwrapBusinessBody(body) {
	if (!body || typeof body !== 'object') return body
	const hasEnvelope =
		('code' in body && 'data' in body) ||
		('success' in body && 'data' in body)
	if (!hasEnvelope) return body

	const ok =
		body.success === true ||
		body.code === 0 ||
		body.code === 200
	if (!ok) {
		const msg = body.message || body.msg || '请求失败'
		throw new Error(msg)
	}
	return body.data
}

function buildUrl(path) {
	if (!path) throw new Error('request: url is required')
	if (/^https?:\/\//i.test(path)) return path
	const base = getEnv().apiBaseUrl.replace(/\/+$/, '')
	const p = path.startsWith('/') ? path : `/${path}`
	return `${base}${p}`
}

function authHeaders() {
	try {
		const token = uni.getStorageSync('token')
		if (token) return { Authorization: `Bearer ${token}` }
	} catch (_) {}
	return {}
}

/**
 * @param {object} options
 * @param {string} options.url 相对路径（推荐）或完整 https URL
 * @param {string} [options.method]
 * @param {object} [options.data] query / body
 * @param {object} [options.header]
 * @param {number} [options.timeout]
 * @returns {Promise<any>} 已按约定解包后的业务数据（通常是 data 字段）
 */
export function request(options) {
	const env = getEnv()
	const { url, method = 'GET', data, header = {}, timeout } = options

	return new Promise((resolve, reject) => {
		uni.request({
			url: buildUrl(url),
			method,
			data,
			timeout: timeout ?? env.requestTimeoutMs,
			header: {
				'Content-Type': 'application/json',
				...authHeaders(),
				...header,
			},
			success: (res) => {
				const { statusCode, data: raw } = res
				if (statusCode < 200 || statusCode >= 300) {
					reject(new Error(`HTTP ${statusCode}`))
					return
				}
				try {
					resolve(unwrapBusinessBody(raw))
				} catch (e) {
					reject(e)
				}
			},
			fail: (err) => {
				reject(err || new Error('网络请求失败'))
			},
		})
	})
}
