import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'

/**
 * 登录成功后本地保存 token 与用户信息
 * @param {{ token?: string, user_id?: number, username?: string, profile?: object }} data
 */
function persistLogin(data) {
	if (!data) return
	try {
		if (data.token) uni.setStorageSync('token', data.token)
		if (data.user_id !== undefined) uni.setStorageSync('userId', data.user_id)
		if (data.username) uni.setStorageSync('username', data.username)
		if (data.profile) uni.setStorageSync('userInfo', data.profile)
	} catch (_) {}
}

/**
 * 后端返回：{ token, user_id, username, profile }
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token?: string, user_id?: number, username?: string, profile?: object }>}
 */
export async function loginWithPassword(credentials) {
	const data = await request({
		url: ApiPaths.authLogin,
		method: 'POST',
		data: credentials,
		// mock: () => ({
		// 	code: 0,
		// 	message: '登录成功',
		// 	token: 'mock-token-dev',
		// 	user_id: 1,
		// 	username: credentials.username,
		// 	profile: {
		// 		nickname: credentials.username || '用户',
		// 		avatar: '',
		// 		bio: '',
		// 		gender: '',
		// 		birthday: '',
		// 		city: '',
		// 		status: 'active',
		// 		created_at: '2026-08-21 00:00:00',
		// 	},
		// }),
	})
	persistLogin(data)
	return data
}

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ success?: boolean }>}
 */
export async function register(credentials) {
	const data = await request({
		url: ApiPaths.authRegister,
		method: 'POST',
		data: credentials,
		mock: () => ({ success: true }),
	})
	return data
}
