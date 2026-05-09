import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token?: string, displayName?: string }>}
 */
export async function loginWithPassword(credentials) {
	const data = await request({
		url: ApiPaths.authLogin,
		method: 'POST',
		data: credentials,
		mock: () => ({
			token: 'mock-token-dev',
			displayName: credentials.username || '用户',
		}),
	})
	if (data && data.token) {
		try {
			uni.setStorageSync('token', data.token)
		} catch (_) {}
	}
	return data
}
