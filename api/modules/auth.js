import { request } from '@/api/http.js'
import { getEnv } from '@/config/env.js'
import { ApiPaths } from '@/constants/api-paths.js'

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token?: string, displayName?: string }>}
 */
export async function loginWithPassword(credentials) {
	const { useMock } = getEnv()
	if (useMock) {
		const token = 'mock-token-dev'
		try {
			uni.setStorageSync('token', token)
		} catch (_) {}
		return {
			token,
			displayName: credentials.username || '用户',
		}
	}
	const data = await request({
		url: ApiPaths.authLogin,
		method: 'POST',
		data: credentials,
	})
	if (data && data.token) {
		try {
			uni.setStorageSync('token', data.token)
		} catch (_) {}
	}
	return data
}

/** 退出登录时清除本地 token */
export function logoutLocal() {
	try {
		uni.removeStorageSync('token')
	} catch (_) {}
}
