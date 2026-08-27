/** 消息中心 Mock */
export const MOCK_MESSAGE_LIST = [
	{
		id: 1,
		type: '系统公告',
		title: '版本更新通知',
		content: 'v2.3.0 已发布，新增夜间模式与消息置顶功能，建议尽快升级体验。',
		time: '今天 10:20',
		read: false
	},
	{
		id: 2,
		type: '活动消息',
		title: '春季签到活动开启',
		content: '连续签到 7 天可领取专属头像框，活动时间截至本周日 24:00。',
		time: '今天 08:35',
		read: false
	},
	{
		id: 3,
		type: '账号提醒',
		title: '异地登录提醒',
		content: '你的账号于昨天 22:17 在新设备登录，如非本人操作请立即修改密码。',
		time: '昨天 22:17',
		read: true
	},
	{
		id: 4,
		type: '安全中心',
		title: '安全建议',
		content: '开启二次验证可进一步保护账号安全，前往设置 > 安全中心开启。',
		time: '04-10 16:02',
		read: true
	}
]

/** 聊天室消息 Mock（后端聊天室接口尚未提供，先用本地数据占位） */
export const MOCK_CHAT_MESSAGES = [
	{
		id: 101,
		squadName: '篮球搭子',
		squadAvatar: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=96&q=80',
		lastMsg: '王小明：明天下午三点老地方见，别迟到',
		time: '09:40',
		unread: 3
	},
	{
		id: 102,
		squadName: '影迷俱乐部',
		squadAvatar: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=96&q=80',
		lastMsg: '李四：这周片单定了，周五晚八点',
		time: '08:21',
		unread: 0
	},
	{
		id: 103,
		squadName: '摄影俱乐部',
		squadAvatar: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=96&q=80',
		lastMsg: '阿杰：外拍集合点在江边栈道东口',
		time: '昨天',
		unread: 1
	},
	{
		id: 104,
		squadName: '足球小队',
		squadAvatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=96&q=80',
		lastMsg: '赵强：下半场踢 4-2-3-1，求个后腰',
		time: '昨天',
		unread: 0
	}
]

/** 聊天室成员头像 / 昵称（Mock 占位） */
const CHAT_AVATARS = [
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80',
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80'
]
const CHAT_NAMES = ['王小明', '李强', '阿杰']

/** 根据会话生成聊天室消息记录（后端聊天接口就绪前占位） */
export function getMockChatThread(squad) {
	if (!squad) return []
	return [
		{ id: 1, from: 'other', name: CHAT_NAMES[0], avatar: CHAT_AVATARS[0], content: `欢迎加入「${squad.squadName}」聊天室，大家随意聊～`, time: '昨天 20:10' },
		{ id: 2, from: 'other', name: CHAT_NAMES[1], avatar: CHAT_AVATARS[1], content: '最近的活动安排大家都有空参加吗？', time: '昨天 20:12' },
		{ id: 3, from: 'me', name: '我', avatar: '', content: '都行，提前说好时间就好', time: '昨天 20:15' },
		{ id: 4, from: 'other', name: CHAT_NAMES[0], avatar: CHAT_AVATARS[0], content: '好，那我晚点发个投票统计下', time: '昨天 20:16' },
		{ id: 5, from: 'other', name: CHAT_NAMES[2], avatar: CHAT_AVATARS[2], content: '没问题，随时到', time: '今天 09:02' }
	]
}
