/**
 * 小队名称规则：仅允许中文（CJK 统一表意文字主区）、英文字母、数字、半角空格。
 * 展示宽度：每个汉字计 2，英文/数字/空格各计 1；总宽度不超过 16
 *（等价于最多 8 个汉字或 16 个英文字符，混合按比例折算）。
 */
export const SQUAD_NAME_MAX_WIDTH = 16

/** @param {string} ch 单字符 */
function squadNameCharWidth(ch) {
	if (!ch || ch.length === 0) return 0
	if (ch === ' ') return 1
	if (/^[0-9]$/.test(ch)) return 1
	if (/^[A-Za-z]$/.test(ch)) return 1
	if (/[\u4e00-\u9fff]/.test(ch)) return 2
	return 0
}

/** 去掉不允许的字符，不做宽度截断（用于判断是否超出上限）。 */
export function stripInvalidSquadChars(raw) {
	if (raw == null || typeof raw !== 'string') return ''
	let out = ''
	for (const ch of raw) {
		if (squadNameCharWidth(ch) > 0) out += ch
	}
	return out
}

/**
 * 过滤非法字符，并按展示宽度截断。
 * @param {string} raw
 * @returns {string}
 */
export function clampSquadName(raw) {
	if (raw == null || typeof raw !== 'string') return ''
	let out = ''
	let w = 0
	for (const ch of raw) {
		const cw = squadNameCharWidth(ch)
		if (cw === 0) continue
		if (w + cw > SQUAD_NAME_MAX_WIDTH) break
		out += ch
		w += cw
	}
	return out
}

/** @param {string} str */
export function squadNameDisplayWidth(str) {
	let w = 0
	for (const ch of str || '') {
		w += squadNameCharWidth(ch)
	}
	return w
}
