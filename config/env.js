/**
 * 运行时配置：联调时改 apiBaseUrl，并将 useMock 设为 false。
 * 正式发布建议在 CI/打包脚本里替换或由后端下发配置（按需扩展）。
 */
export function getEnv() {
	return {
		/** 后端 API 根地址，末尾不要斜杠 */
		apiBaseUrl: 'https://your-api.example.com',
		/** true：不走网络，使用 mock；false：使用 uni.request */
		useMock: true,
		requestTimeoutMs: 15000,
	}
}
