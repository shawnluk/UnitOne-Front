import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MESSAGE_LIST, MOCK_CHAT_MESSAGES, getMockChatThread } from '@/mock/messages.js'

/**
 * 获取消息列表
 * @param {Record<string, unknown>} [query] 查询参数：offset、limit 等
 * @returns {Promise<Array<Object>>} 已解包的消息数组（系统公告 / 互动通知等）
 */
export async function fetchMessageList(query = {}) {
	return request({
		url: ApiPaths.messages,
		method: 'GET',
		data: query,
		mock: () => MOCK_MESSAGE_LIST,
	})
}

/**
 * 获取聊天室消息列表
 * 后端聊天室接口尚未提供，暂返回本地 Mock 占位数据；接口就绪后改为 request() 对接。
 * @returns {Promise<Array<Object>>} 聊天室会话数组（squadName / squadAvatar / lastMsg / time / unread）
 */
export async function fetchChatMessageList() {
	return MOCK_CHAT_MESSAGES
}

/**
 * 获取某个聊天室的会话消息记录
 * 后端聊天室接口尚未提供，暂用 Mock 占位；接口就绪后改为 request() 对接。
 * @param {string|number} squadId 小队 id（会话标识）
 * @returns {Promise<Array<Object>>} 消息数组（from / name / avatar / content / time）
 */
export async function fetchChatThread(squadId) {
	const squad = MOCK_CHAT_MESSAGES.find((s) => String(s.id) === String(squadId))
	return getMockChatThread(squad)
}