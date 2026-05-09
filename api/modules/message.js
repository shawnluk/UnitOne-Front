import { request } from '@/api/http.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MESSAGE_LIST } from '@/mock/messages.js'

export async function fetchMessageList(query = {}) {
	return request({
		url: ApiPaths.messages,
		method: 'GET',
		data: query,
		mock: () => MOCK_MESSAGE_LIST,
	})
}
