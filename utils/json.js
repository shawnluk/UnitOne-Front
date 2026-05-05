/** 深拷贝可序列化对象（用于 Mock 返回，避免引用污染） */
export function cloneJson(value) {
	return JSON.parse(JSON.stringify(value))
}
