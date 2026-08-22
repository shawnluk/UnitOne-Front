/**
 * token 工具：解析 JWT 到期时间
 */

function base64UrlDecode(str) {
	// Base64URL -> Base64
	let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
	while (base64.length % 4) base64 += '='
	// 先按字节解码，再转 UTF-8，避免中文乱码
	const binary = atob(base64)
	const bytes = new Uint8Array(binary.length)
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
	return new TextDecoder().decode(bytes)
}

/**
 * 解析 token 的到期时间（毫秒时间戳）。
 * 仅支持 JWT（三段式，payload 含 exp）；非 JWT 返回 null。
 * @param {string} token
 * @returns {number|null}
 */
export function getTokenExpiry(token) {
	if (!token || typeof token !== 'string') return null
	const parts = token.split('.')
	if (parts.length !== 3) return null
	try {
		const payload = JSON.parse(base64UrlDecode(parts[1]))
		if (payload && typeof payload.exp === 'number') {
			return payload.exp * 1000
		}
	} catch (_) {}
	return null
}

/**
 * 判断 token 是否已到期。非 JWT（无法解析）视为未到期。
 * @param {string} token
 * @returns {boolean}
 */
export function isTokenExpired(token) {
	const expMs = getTokenExpiry(token)
	if (expMs == null) return false
	return expMs <= Date.now()
}
