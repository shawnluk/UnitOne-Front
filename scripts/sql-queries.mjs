/**
 * SQL 语句模板集合
 * 按业务模块分类存放，便于后端开发时直接引用或复制使用。
 *
 * 用法：
 *   import { Activity, User, Moment } from './sql-queries.js'
 *   或直接执行：node scripts/sql-queries.js 预览所有 SQL 模板
 */

// ============================================================
// 通用工具：SQL 模板标签函数
// ============================================================

/**
 * 简单的 SQL 模板标签，用于格式化 SQL 语句
 * 自动去除多余空白，使 SQL 更整洁
 */
function sql(strings, ...values) {
	let result = ''
	strings.forEach((str, i) => {
		result += str
		if (i < values.length) {
			result += values[i]
		}
	})
	return result
		.replace(/\s+/g, ' ')
		.trim()
}

// ============================================================
// 活动模块 (Activity)
// ============================================================

export const Activity = {
	/** 查询活动列表 */
	list: sql`
		SELECT id, title, cover_url, start_time, end_time,
		       location, max_participants, current_participants,
		       status, created_at
		FROM activities
		WHERE status != 'deleted'
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`,

	/** 根据 ID 查询活动详情 */
	detail: sql`
		SELECT a.id, a.title, a.cover_url, a.description,
		       a.start_time, a.end_time, a.location, a.lat, a.lng,
		       a.max_participants, a.current_participants,
		       a.status, a.creator_id, a.created_at, a.updated_at,
		       u.nickname AS creator_name, u.avatar AS creator_avatar
		FROM activities a
		LEFT JOIN users u ON a.creator_id = u.id
		WHERE a.id = ?
	`,

	/** 创建活动 */
	create: sql`
		INSERT INTO activities
			(title, cover_url, description, start_time, end_time,
			 location, lat, lng, max_participants, creator_id, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')
	`,

	/** 更新活动信息 */
	update: sql`
		UPDATE activities
		SET title = ?, cover_url = ?, description = ?,
		    start_time = ?, end_time = ?, location = ?,
		    lat = ?, lng = ?, max_participants = ?,
		    updated_at = NOW()
		WHERE id = ? AND status != 'deleted'
	`,

	/** 删除活动（软删除） */
	softDelete: sql`
		UPDATE activities
		SET status = 'deleted', updated_at = NOW()
		WHERE id = ?
	`,

	/** 更新活动状态 */
	updateStatus: sql`
		UPDATE activities
		SET status = ?, updated_at = NOW()
		WHERE id = ?
	`,

	/** 查询用户参与的活动 */
	byParticipant: sql`
		SELECT a.id, a.title, a.cover_url, a.start_time, a.end_time,
		       a.location, a.status
		FROM activities a
		INNER JOIN activity_participants ap ON a.id = ap.activity_id
		WHERE ap.user_id = ? AND a.status != 'deleted'
		ORDER BY a.start_time DESC
	`,

	/** 查询用户创建的活动 */
	byCreator: sql`
		SELECT id, title, cover_url, start_time, end_time,
		       location, status, current_participants, max_participants
		FROM activities
		WHERE creator_id = ? AND status != 'deleted'
		ORDER BY created_at DESC
	`,
}

// ============================================================
// 动态/瞬间模块 (Moment)
// ============================================================

export const Moment = {
	/** 查询动态列表（带发布者信息） */
	list: sql`
		SELECT m.id, m.content, m.images, m.like_count,
		       m.comment_count, m.created_at,
		       u.id AS user_id, u.nickname, u.avatar
		FROM moments m
		LEFT JOIN users u ON m.user_id = u.id
		WHERE m.status = 'published'
		ORDER BY m.created_at DESC
		LIMIT ? OFFSET ?
	`,

	/** 查询动态详情 */
	detail: sql`
		SELECT m.id, m.content, m.images, m.like_count,
		       m.comment_count, m.share_count, m.created_at,
		       u.id AS user_id, u.nickname, u.avatar
		FROM moments m
		LEFT JOIN users u ON m.user_id = u.id
		WHERE m.id = ?
	`,

	/** 发布动态 */
	create: sql`
		INSERT INTO moments (user_id, content, images, status)
		VALUES (?, ?, ?, 'published')
	`,

	/** 删除动态 */
	delete: sql`
		UPDATE moments
		SET status = 'deleted', updated_at = NOW()
		WHERE id = ? AND user_id = ?
	`,

	/** 查询动态的评论 */
	comments: sql`
		SELECT c.id, c.content, c.created_at,
		       u.id AS user_id, u.nickname, u.avatar
		FROM moment_comments c
		LEFT JOIN users u ON c.user_id = u.id
		WHERE c.moment_id = ? AND c.status = 'published'
		ORDER BY c.created_at ASC
	`,

	/** 添加评论 */
	addComment: sql`
		INSERT INTO moment_comments (moment_id, user_id, content)
		VALUES (?, ?, ?)
	`,

	/** 点赞/取消点赞 */
	toggleLike: sql`
		INSERT INTO moment_likes (moment_id, user_id)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE is_deleted = NOT is_deleted
	`,
}

// ============================================================
// 用户模块 (User)
// ============================================================

export const User = {
	/** 根据 ID 查询用户信息 */
	byId: sql`
		SELECT id, nickname, avatar, bio, gender, birthday,
		       city, created_at
		FROM users
		WHERE id = ?
	`,

	/** 用户注册/创建 */
	create: sql`
		INSERT INTO users (openid, nickname, avatar, created_at)
		VALUES (?, ?, ?, NOW())
	`,

	/** 更新用户资料 */
	updateProfile: sql`
		UPDATE users
		SET nickname = ?, avatar = ?, bio = ?, gender = ?,
		    birthday = ?, city = ?, updated_at = NOW()
		WHERE id = ?
	`,

	/** 查询用户统计数据 */
	stats: sql`
		SELECT
			(SELECT COUNT(*) FROM activities WHERE creator_id = ? AND status != 'deleted') AS activity_count,
			(SELECT COUNT(*) FROM moments WHERE user_id = ? AND status = 'published') AS moment_count,
			(SELECT COUNT(*) FROM activity_participants WHERE user_id = ?) AS joined_count
	`,

	/** 查询用户所在小队 */
	squads: sql`
		SELECT s.id, s.name, s.avatar, s.member_count,
		       sm.role, sm.joined_at
		FROM squads s
		INNER JOIN squad_members sm ON s.id = sm.squad_id
		WHERE sm.user_id = ? AND s.status = 'active'
		ORDER BY sm.joined_at DESC
	`,
}

// ============================================================
// 消息模块 (Message)
// ============================================================

export const Message = {
	/** 查询用户的消息列表 */
	list: sql`
		SELECT id, type, title, content, is_read,
		       sender_id, created_at
		FROM messages
		WHERE receiver_id = ? AND status != 'deleted'
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`,

	/** 查询未读消息数 */
	unreadCount: sql`
		SELECT COUNT(*) AS count
		FROM messages
		WHERE receiver_id = ? AND is_read = 0 AND status != 'deleted'
	`,

	/** 标记消息为已读 */
	markRead: sql`
		UPDATE messages
		SET is_read = 1, read_at = NOW()
		WHERE id = ? AND receiver_id = ?
	`,

	/** 标记所有消息为已读 */
	markAllRead: sql`
		UPDATE messages
		SET is_read = 1, read_at = NOW()
		WHERE receiver_id = ? AND is_read = 0
	`,

	/** 发送系统推送消息 */
	sendSystem: sql`
		INSERT INTO messages (receiver_id, type, title, content, sender_id)
		VALUES (?, 'system', ?, ?, 'system')
	`,
}

// ============================================================
// 小队模块 (Squad)
// ============================================================

export const Squad = {
	/** 查询小队列表 */
	list: sql`
		SELECT id, name, avatar, description, member_count,
		       max_members, created_at
		FROM squads
		WHERE status = 'active'
		ORDER BY member_count DESC
		LIMIT ? OFFSET ?
	`,

	/** 查询小队详情 */
	detail: sql`
		SELECT s.id, s.name, s.avatar, s.description,
		       s.member_count, s.max_members, s.created_at,
		       u.id AS creator_id, u.nickname AS creator_name
		FROM squads s
		LEFT JOIN users u ON s.creator_id = u.id
		WHERE s.id = ?
	`,

	/** 查询小队成员 */
	members: sql`
		SELECT u.id, u.nickname, u.avatar,
		       sm.role, sm.joined_at
		FROM squad_members sm
		INNER JOIN users u ON sm.user_id = u.id
		WHERE sm.squad_id = ?
		ORDER BY sm.joined_at ASC
	`,

	/** 加入小队 */
	join: sql`
		INSERT INTO squad_members (squad_id, user_id, role)
		VALUES (?, ?, 'member')
	`,

	/** 退出小队 */
	leave: sql`
		DELETE FROM squad_members
		WHERE squad_id = ? AND user_id = ?
	`,
}

// ============================================================
// 认证模块 (Auth)
// ============================================================

export const Auth = {
	/** 根据 openid 查找用户 */
	findByOpenid: sql`
		SELECT id, openid, nickname, avatar, status, created_at
		FROM users
		WHERE openid = ?
	`,

	/** 记录登录日志 */
	logLogin: sql`
		INSERT INTO login_logs (user_id, ip, device, login_at)
		VALUES (?, ?, ?, NOW())
	`,
}

// ============================================================
// 数据统计模块 (Stats)
// ============================================================

export const Stats = {
	/** 平台总览数据 */
	overview: sql`
		SELECT
			(SELECT COUNT(*) FROM users WHERE status = 'active') AS total_users,
			(SELECT COUNT(*) FROM activities WHERE status = 'published') AS total_activities,
			(SELECT COUNT(*) FROM moments WHERE status = 'published') AS total_moments,
			(SELECT COUNT(*) FROM squads WHERE status = 'active') AS total_squads
	`,

	/** 活动参与趋势（按天统计） */
	activityTrend: sql`
		SELECT DATE(created_at) AS date, COUNT(*) AS count
		FROM activity_participants
		WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
		GROUP BY DATE(created_at)
		ORDER BY date ASC
	`,
}

// 如果直接执行本文件，则打印所有 SQL 查询模板
import { fileURLToPath } from 'url'
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	console.log('========== SQL 查询模板 ==========\n')
	const modules = { Activity, Moment, User, Message, Squad, Auth, Stats }
	for (const [name, queries] of Object.entries(modules)) {
		console.log(`--- ${name} ---`)
		for (const [key, query] of Object.entries(queries)) {
			console.log(`  [${key}]`)
			console.log(`  ${query}\n`)
		}
	}
}