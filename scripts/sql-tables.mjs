/**
 * 建表语句 (DDL)
 * 根据前端 Mock 数据与业务逻辑推导的后端数据库表结构
 * 字段命名遵循：snake_case 表名/字段名，主键统一用 id(BIGINT UNSIGNED AUTO_INCREMENT)
 *
 * 用法：
 *   import { Tables } from './sql-tables.js'
 *   或直接执行：node scripts/sql-tables.js 预览所有建表语句
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
// 建表语句
// ============================================================

export const Tables = {
	/** 用户表 */
	users: sql`
		CREATE TABLE users (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			openid          VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '微信 openid',
			nickname        VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '昵称',
			avatar          VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '头像 URL',
			bio             VARCHAR(256)    NOT NULL DEFAULT ''       COMMENT '个人简介',
			gender          TINYINT         NOT NULL DEFAULT 0        COMMENT '性别 0=未知 1=男 2=女',
			birthday        DATE            NULL                      COMMENT '生日',
			city            VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '所在城市',
			partner_id      VARCHAR(32)     NOT NULL DEFAULT ''       COMMENT '趣玩号',
			status          VARCHAR(16)     NOT NULL DEFAULT 'active' COMMENT '状态 active=正常 banned=封禁',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			INDEX idx_openid (openid),
			INDEX idx_status (status)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表'
	`,

	/** 活动分类表 */
	activity_categories: sql`
		CREATE TABLE activity_categories (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			category_key    VARCHAR(32)     NOT NULL DEFAULT ''       COMMENT '分类标识 sport/movie/outdoor/chat/art',
			name            VARCHAR(32)     NOT NULL DEFAULT ''       COMMENT '分类名称',
			icon            VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '分类图标 URL',
			sort_order      INT             NOT NULL DEFAULT 0        COMMENT '排序权重',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动分类表'
	`,

	/** 活动表 */
	activities: sql`
		CREATE TABLE activities (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			category_id     BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '分类 ID',
			title           VARCHAR(128)    NOT NULL DEFAULT ''       COMMENT '活动标题',
			cover           VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '封面图 URL',
			category_name   VARCHAR(32)     NOT NULL DEFAULT ''       COMMENT '分类名称（约球/观影/户外/闲聊/艺术）',
			location_text   VARCHAR(256)    NOT NULL DEFAULT ''       COMMENT '活动地点文案',
			time_text       VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '活动时间展示文案',
			fee_note        VARCHAR(128)    NOT NULL DEFAULT ''       COMMENT '费用说明',
			description     TEXT            NULL                      COMMENT '活动详细描述（含 HTML）',
			org_avatar      VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '组织者头像',
			org_name        VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '组织者名称',
			creator_id      BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '创建者用户 ID',
			status          VARCHAR(16)     NOT NULL DEFAULT 'draft'  COMMENT 'draft=草稿 published=已发布 deleted=已删除',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			INDEX idx_category (category_id),
			INDEX idx_creator (creator_id),
			INDEX idx_status (status),
			INDEX idx_created (created_at)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动表'
	`,

	/** 活动参与记录表 */
	activity_participants: sql`
		CREATE TABLE activity_participants (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			activity_id     BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '活动 ID',
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '用户 ID',
			joined_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE KEY uk_activity_user (activity_id, user_id),
			INDEX idx_user (user_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动参与记录表'
	`,

	/** 动态/瞬间表 */
	moments: sql`
		CREATE TABLE moments (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '发布者用户 ID',
			activity_title  VARCHAR(128)    NOT NULL DEFAULT ''       COMMENT '关联活动标题',
			content         TEXT            NULL                      COMMENT '文本内容',
			images          JSON            NULL                      COMMENT '图片列表 ["url1","url2"]',
			like_count      INT             NOT NULL DEFAULT 0        COMMENT '点赞数（冗余）',
			comment_count   INT             NOT NULL DEFAULT 0        COMMENT '评论数（冗余）',
			share_count     INT             NOT NULL DEFAULT 0        COMMENT '分享数（冗余）',
			status          VARCHAR(16)     NOT NULL DEFAULT 'published' COMMENT 'published=已发布 deleted=已删除',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			INDEX idx_user (user_id),
			INDEX idx_status_created (status, created_at)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动态表'
	`,

	/** 动态评论表 */
	moment_comments: sql`
		CREATE TABLE moment_comments (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			moment_id       BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '动态 ID',
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '评论者用户 ID',
			content         VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '评论内容',
			status          VARCHAR(16)     NOT NULL DEFAULT 'published' COMMENT 'published=已发布 deleted=已删除',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			INDEX idx_moment (moment_id),
			INDEX idx_user (user_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动态评论表'
	`,

	/** 动态点赞表 */
	moment_likes: sql`
		CREATE TABLE moment_likes (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			moment_id       BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '动态 ID',
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '点赞用户 ID',
			is_deleted      TINYINT         NOT NULL DEFAULT 0        COMMENT '0=有效 1=已取消',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			UNIQUE KEY uk_moment_user (moment_id, user_id),
			INDEX idx_user (user_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动态点赞表'
	`,

	/** 消息表 */
	messages: sql`
		CREATE TABLE messages (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			receiver_id     BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '接收者用户 ID',
			sender_id       VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '发送者 ID（system 表示系统消息）',
			type            VARCHAR(32)     NOT NULL DEFAULT ''       COMMENT '消息类型 system=系统公告 activity=活动消息 account=账号提醒 security=安全中心',
			title           VARCHAR(128)    NOT NULL DEFAULT ''       COMMENT '消息标题',
			content         TEXT            NULL                      COMMENT '消息内容',
			is_read         TINYINT         NOT NULL DEFAULT 0        COMMENT '0=未读 1=已读',
			read_at         DATETIME        NULL                      COMMENT '阅读时间',
			status          VARCHAR(16)     NOT NULL DEFAULT 'active' COMMENT 'active=正常 deleted=已删除',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			INDEX idx_receiver_read (receiver_id, is_read),
			INDEX idx_receiver_created (receiver_id, created_at)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息表'
	`,

	/** 小队表 */
	squads: sql`
		CREATE TABLE squads (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			name            VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '小队名称',
			cover           VARCHAR(512)    NOT NULL DEFAULT ''       COMMENT '小队封面图',
			description     TEXT            NULL                      COMMENT '小队简介',
			creator_id      BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '创建者用户 ID',
			status          VARCHAR(16)     NOT NULL DEFAULT 'active' COMMENT 'active=正常 disbanded=已解散',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			INDEX idx_creator (creator_id),
			INDEX idx_status (status)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='小队表'
	`,

	/** 小队成员表 */
	squad_members: sql`
		CREATE TABLE squad_members (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			squad_id        BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '小队 ID',
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '用户 ID',
			role            VARCHAR(16)     NOT NULL DEFAULT 'member' COMMENT '角色 owner=队长 admin=管理员 member=成员',
			joined_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE KEY uk_squad_user (squad_id, user_id),
			INDEX idx_user (user_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='小队成员表'
	`,

	/** 小队活动关联表（一个小队可发起多个活动） */
	squad_activities: sql`
		CREATE TABLE squad_activities (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			squad_id        BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '小队 ID',
			activity_id     BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '活动 ID',
			created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			UNIQUE KEY uk_squad_activity (squad_id, activity_id),
			INDEX idx_activity (activity_id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='小队活动关联表'
	`,

	/** 登录日志表 */
	login_logs: sql`
		CREATE TABLE login_logs (
			id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			user_id         BIGINT UNSIGNED NOT NULL DEFAULT 0        COMMENT '用户 ID',
			ip              VARCHAR(64)     NOT NULL DEFAULT ''       COMMENT '登录 IP',
			device          VARCHAR(128)    NOT NULL DEFAULT ''       COMMENT '设备信息',
			login_at        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
			INDEX idx_user (user_id),
			INDEX idx_login_at (login_at)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='登录日志表'
	`,
}

// 如果直接执行本文件，则打印所有建表语句
import { fileURLToPath } from 'url'
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	console.log('========== 建表语句 (DDL) ==========\n')
	for (const [name, ddl] of Object.entries(Tables)) {
		console.log(`--- ${name} ---`)
		console.log(`  ${ddl}\n`)
	}
}