/**
 * 与后端约定的路径片段（不含域名），便于集中修改。
 * 使用方式：request({ url: ApiPaths.xxx, ... })；http.js 会自动拼接 apiBaseUrl。
 */
export const ApiPaths = {
	health: '/health',
	activities: '/api/v1/activities',
	messages: '/api/v1/messages',
	momentPosts: '/api/v1/moment/posts',
	authLogin: '/api/v1/auth/login',
	authRegister: '/api/v1/auth/register',
	userProfile: '/api/v1/user/profile',
	userSquad: '/api/v1/user/squad',
	squadDetail: '/api/v1/squads',
	categories: '/api/v1/categories',
}
