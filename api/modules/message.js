import { request } from '@/api/http.js'
import { getEnv } from '@/config/env.js'
import { ApiPaths } from '@/constants/api-paths.js'
import { MOCK_MESSAGE_LIST } from '@/mock/messages.js'
import { cloneJson } from '@/utils/json.js'

export async function fetchMessageList(query = {}) {
	const { useMock } = getEnv()
	if (useMock) {
		return cloneJson(MOCK_MESSAGE_LIST)
	}
	return request({
		url: ApiPaths.messages,
		method: 'GET',
		data: query,
	})
}
