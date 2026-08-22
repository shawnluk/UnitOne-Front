import { getEnv } from '@/config/env.js'
import { cloneJson } from '@/utils/json.js'
import { isTokenExpired } from '@/utils/token.js'
import { ApiPaths } from '@/constants/api-paths.js'

/** 无需鉴权、跳过 token 过期拦截的接口（按 路径+方法 匹配） */
const NO_AUTH_PATHS = [
	{ url: ApiPaths.health, method: 'GET' },
	{ url: ApiPaths.authLogin, method: 'POST' },
	{ url: ApiPaths.authRegister, method: 'POST' },
	{ url: ApiPaths.activities, method: 'GET' },
	{ url: ApiPaths.categories, method: 'GET' },
]

function isNoAuth(url, method) {
	return NO_AUTH_PATHS.some((item) => item.url === url && item.method === method)
}

function getStoredToken() {
	try {
		return uni.getStorageSync('token') || ''
	} catch (_) {
		return ''
	}
}

function clearLoginCache() {
	try {
		uni.removeStorageSync('token')
		uni.removeStorageSync('userId')
		uni.removeStorageSync('username')
		uni.removeStorageSync('userInfo')
	} catch (_) {}
}

function promptReLogin() {
	uni.showModal({
		title: '请重新登录',
		content: '登录已过期，请重新登录后再操作',
		confirmText: '去登录',
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.navigateTo({ url: '/src/login/login' })
			}
		},
	})
}

/**
 * token 过期统一拦截：返回拒绝的 Promise 并清缓存、提示重登
 * @param {string} message
 * @returns {Promise<never>}
 */
function rejectExpiredToken(message) {
	clearLoginCache()
	promptReLogin()
	return Promise.reject(new Error(message))
}

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
 * Mock 拦截：`getEnv().useMock === true` 时不发起网络请求，仅解析 mock 并深拷贝返回。
 * @param {unknown | ((ctx: MockContext) => unknown)} mock
 * @param {MockContext} ctx
 */
function resolveMock(mock, ctx) {
	if (typeof mock === 'function') return mock(ctx)
	return mock
}

/**
 * @typedef {{ url: string, method: string, data?: Record<string, unknown> }} MockContext
 */

/**
 * @param {object} options
 * @param {string} options.url 相对路径（推荐）或完整 https URL
 * @param {string} [options.method]
 * @param {object} [options.data] query / body
 * @param {object} [options.header]
 * @param {number} [options.timeout]
 * @param {unknown | ((ctx: MockContext) => unknown)} [options.mock]
 *   useMock 为 true 时必填；静态数据或与请求上下文相关的工厂函数，返回值会经 cloneJson 再交给调用方
 * @returns {Promise<any>} 已按约定解包后的业务数据（通常是 data 字段）；mock 模式下为深拷贝后的 mock 结果
 */
export function request(options) {
	const env = getEnv()
	const { url, method = 'GET', data, header = {}, timeout, mock } = options

	// token 过期统一拦截：公共接口（无需鉴权）除外
	const token = getStoredToken()
	if (token && isTokenExpired(token) && !isNoAuth(url, method)) {
		return rejectExpiredToken('登录已过期')
	}

	if (env.useMock) {
		if (mock === undefined) {
			return Promise.reject(
				new Error(`request: useMock 已开启但未提供 mock（${method} ${url}）`),
			)
		}
		return Promise.resolve().then(() => {
			const ctx = { url, method, data }
			const payload = resolveMock(mock, ctx)
			return cloneJson(payload)
		})
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: buildUrl(url),
			method,
			data,
			timeout: timeout != null ? timeout : env.requestTimeoutMs,
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
