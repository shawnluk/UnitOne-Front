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

/** 小队管理区块标题 / 创建入口 */
export const MOCK_USER_SQUAD_PANEL = {
	title: '小队管理',
	moreText: '点击创建小队>>',
}

/** 无小队时的占位条目 */
export const MOCK_USER_SQUAD_EMPTY_ITEM = {
	id: MOCK_USER_SQUAD_DEFAULT_ID,
	// cover: `${COS_TEST}/real-madrid-ucl-1024x1024.jpg`,
	cover: '',
	name: '',
	stats: '0活动 0成员',
	badge: '小队长',
	topTag: '置顶',
}

/**
 * 把后端 member_role 数字转为角色文案。
 * @param {number|string} role 角色值：0=队长 1=普通成员 2=副队长
 * @returns {string} 角色文案（小队长 / 副队长 / 成员）
 */
function mapMemberRole(role) {
	const r = Number(role)
	if (r === 0) return '小队长'
	if (r === 2) return '副队长'
	return '成员'
}

/**
 * 把 squads 数组映射为小队面板可渲染的 item 列表。
 * 空数组时返回一条占位，便于展示「点击创建小队」入口。
 *
 * 后端字段说明（来自 squad-service）：
 *   squad_id / squad_name / squad_avatar / captain_id / vice_captain_id / intro /
 *   category_id / max_members / member_count / join_type / status / invite_code
 * 当前用户在小队的角色 member_role：0=队长 1=普通成员 2=副队长
 * @param {Array<Object>} squads 后端返回的小队数组（读取自本地缓存 squads）
 * @returns {Array<{id: string, cover: string, name: string, stats: string, badge: string, pinned: boolean}>}
 *   面板 item 列表；空数组时返回含一条占位条目的数组
 */
export function mapSquadsToPanelItems(squads) {
	if (!Array.isArray(squads) || squads.length === 0) {
		return [{ ...MOCK_USER_SQUAD_EMPTY_ITEM }]
	}
	return squads.map((s) => {
		const memberCount = s.member_count != null ? s.member_count : 0
		const activityCount = s.activity_count != null ? s.activity_count : 0
		return {
			id: s.squad_id != null ? s.squad_id : '',
			cover: String(s.squad_avatar || s.avatar || s.cover || '').replace(/`/g, '').trim(),
			name: s.squad_name || s.name || '',
			stats: `${activityCount}活动 ${memberCount}成员`,
			badge: s.member_role != null ? mapMemberRole(s.member_role) : '小队长',
			pinned: false,
		}
	})
}

/** 时间文本：兼容 ISO 字符串与已有文案 */
function formatTimeLabel(value) {
	if (!value) return ''
	const d = new Date(value)
	if (Number.isNaN(d.getTime())) return String(value)
	const p = (n) => String(n).padStart(2, '0')
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** 角色文本：兼容后端数字（0/1/2）与已有文案 */
function resolveRoleText(role) {
	if (role === '小队长' || role === '副队长' || role === '成员') return role
	return mapMemberRole(role)
}

/**
 * 把后端小队详情（GET /api/v1/squads/:id）映射为详情页可渲染结构。
 * 兼容 useMock 时的 Mock 结构与后端真实结构（字段名见 mapSquad / mapMember）。
 * @param {Object} [detail] 后端返回的小队详情（含基础信息 + members + activities）
 * @returns {Object} 详情页视图结构：{ id, cover, name, badge, activityCount, memberCount,
 *   createdAtLabel, intro, members[], recentActivities[], notice }；
 *   入参非法时返回空占位详情
 */
export function normalizeSquadDetail(detail) {
	const empty = getMockUserSquadDetail(MOCK_USER_SQUAD_DEFAULT_ID)
	if (!detail || typeof detail !== 'object') return empty

	const members = Array.isArray(detail.members) ? detail.members : []
	const activities = Array.isArray(detail.activities) ? detail.activities : []

	return {
		...empty,
		id: detail.squad_id != null ? detail.squad_id : detail.id || '',
		cover: String(detail.squad_avatar || detail.avatar || detail.cover || '')
			.replace(/`/g, '')
			.trim(),
		name: detail.squad_name || detail.name || '',
		badge: detail.member_role != null ? mapMemberRole(detail.member_role) : '小队长',
		activityCount: activities.length || detail.activityCount || 0,
		memberCount:
			detail.member_count != null
				? detail.member_count
				: detail.memberCount != null
					? detail.memberCount
					: members.length,
		createdAtLabel: formatTimeLabel(detail.create_time || detail.createdAtLabel),
		intro: detail.intro || '',
		members: members.map((m) => ({
			name: m.nickname || m.name || '',
			role: resolveRoleText(m.role),
			avatar: String(m.avatar || '').replace(/`/g, '').trim(),
		})),
		recentActivities: activities.map((a) => ({
			id: a.activity_id || '',
			title: a.title || '',
			timeLabel: a.time_text || a.timeLabel || '',
			cover: String(a.cover || '').replace(/`/g, '').trim(),
			location: a.location_text || a.location || '',
			fee: a.fee_note || a.fee || '',
			orgName: detail.squad_name || a.squad_name || a.orgName || '',
			// 保留后端原始活动对象，供点击跳转详情时写入活动缓存
			raw: a,
		})),
		notice: detail.notice || '',
	}
}

/**
 * 小队详情页 Mock（与小队面板条目对应，接口接入后可合并数据源）。
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

/**
 * 获取小队详情 Mock（渲染兜底 / useMock 时使用）。
 * @param {string|number} [squadId] 小队 ID；未命中 Mock 记录或为空时返回默认空详情
 * @returns {Object} 小队详情视图结构（浅拷贝，不会修改 MOCK_USER_SQUAD_DETAILS 原数据）
 */
export function getMockUserSquadDetail(squadId) {
	const id = squadId && MOCK_USER_SQUAD_DETAILS[squadId] ? squadId : MOCK_USER_SQUAD_DEFAULT_ID
	return { ...MOCK_USER_SQUAD_DETAILS[id] }
}
