/** 与后端约定的路径片段（不含域名），便于集中修改 */

export const ApiPaths = {
	activities: '/api/v1/activities',
	activityDetail: (id) => `/api/v1/activities/${encodeURIComponent(id)}`,
	messages: '/api/v1/messages',
	momentPosts: '/api/v1/moment/posts',
	authLogin: '/api/v1/auth/login',
	uploadAvatar: '/api/v1/upload/avatar',
}
