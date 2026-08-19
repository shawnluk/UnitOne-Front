/**
 * 个人中心等页面的展示用 Mock（原写死在各组件内，与接口对齐后可逐步替换）。
 */

const COS_TEST = 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar'

/** 用户页默认头像（未裁剪前） */
export const MOCK_USER_DEFAULT_AVATAR = `${COS_TEST}/logo.png`

/** 未登录 / 已登录展示昵称（开发占位） */
export const MOCK_USER_DISPLAY_NAME_GUEST = 'HiGoer'
export const MOCK_USER_DISPLAY_NAME_LOGGED_IN = 'HiGoer'

/** 头部资料卡：取伙号、徽章、会员条文案 */
export const MOCK_USER_HEADER = {
	partnerId: '000001',
	partnerIdTag: '🟠',
	// badges: ['🔄1年', '🎪', '🛡️'],
	badges: [''],
	memberTitle: '成为会员',
	memberDesc: '付费一场活动，立即成为HiGo会员',
	memberLink: '查看会员权益 ›',
}

/** 伙柴 / 伙卡 / 伙星（统计条） */
export const MOCK_USER_STATS_ITEMS = [
	{ icon: '🔥', label: '伙柴', value: 0 },
	{ icon: '🎫', label: '伙卡', value: 0 },
]
export const MOCK_USER_STAR_VALUE = 5

/** 数据宫格：小队 / 好友等 */
export const MOCK_USER_DATA_ITEMS = [
	{ label: '小队', value: 0 },
	{ label: '好友', value: 0 },
	{ label: '历史活动', value: 0 },
	{ label: '相册', value: 0 },
]

/** 服务入口宫格 */
export const MOCK_USER_SERVICE_ENTRIES = [
	{ icon: '📋', label: '订单' },
	{ icon: '💰', label: '钱包' },
	{ icon: '🎧', label: '客服' },
	{ icon: '⚙️', label: '设置' },
]

/** 默认小队 id（个人页卡片与详情页 Mock 共用） */
export const MOCK_USER_SQUAD_DEFAULT_ID = ''

/** 小队管理区块默认一条（占位） */
export const MOCK_USER_SQUAD_PANEL = {
	title: '小队管理',
	moreText: '点击创建小队>>',
	item: {
		id: MOCK_USER_SQUAD_DEFAULT_ID,
		// cover: `${COS_TEST}/real-madrid-ucl-1024x1024.jpg`,
		cover: '',
		name: '',
		stats: '0活动 0成员',
		badge: '小队长',
		topTag: '置顶',
	},
}

/**
 * 小队详情页 Mock（与 MOCK_USER_SQUAD_PANEL.item 对应，接口接入后可合并数据源）。
 */
export const MOCK_USER_SQUAD_DETAILS = {
	[MOCK_USER_SQUAD_DEFAULT_ID]: {
		id: MOCK_USER_SQUAD_DEFAULT_ID,
		// cover: `${COS_TEST}/real-madrid-ucl-1024x1024.jpg`,
		cover: '',
		name: '',
		badge: '小队长',
		topTag: '置顶',
		activityCount: 0,
		memberCount: 0,
		createdAtLabel: '',
		intro:
			'',
		members: [
			{
				name: '',
				role: '小队长',
				// avatar: `${COS_TEST}/helloworld_01.jpg`,
				avatar: '',
			},
		],
		/** 近期小队活动（占位，空数组时详情页展示空状态） */
		recentActivities: [],
		notice: '小队资料与成员列表为展示数据，后续与接口对齐后将支持编辑与邀请。',
	},
}

export function getMockUserSquadDetail(squadId) {
	const id = squadId && MOCK_USER_SQUAD_DETAILS[squadId] ? squadId : MOCK_USER_SQUAD_DEFAULT_ID
	return { ...MOCK_USER_SQUAD_DETAILS[id] }
}
