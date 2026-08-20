/**
 * 首页活动列表 Mock（与接口字段对齐，便于日后替换为真实响应）。
 * 封面图为 Unsplash 场景图；若微信小程序加载失败，请在后台配置 download 合法域名 images.unsplash.com，或改回自有 COS 地址。
 */
export const HOME_ACTIVITY_LIST = [
	{
		category_id: 1,
		activity_id: 1,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=900&q=80',
		title: '周三晚南山羽毛球局（新手友好）',
		location_text: '深圳市南山区科苑路15号 深圳湾体育中心羽毛球馆',
		time_text: '2026-04-24 19:30:00',
		fee_note: '场地费 AA，约 ¥35/人（球拍可租借）',
		description: '新手友好局，双打轮转为主，现场会简单讲解规则和热身。\n请穿运动鞋入场；自带拍或现场租借均可，羽球费用当场分摊。\n开始前 15 分钟在场馆入口集合，迟到请在群里说一声方便留位。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '阿Ken',
		joinCount: 10,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 2,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
		title: '福田5v5篮球夜场（缺2人）',
		location_text: '深圳市福田区福华三路88号 市民中心篮球公园',
		time_text: '2026-04-26 20:00:00',
		fee_note: '场地灯光费 AA，约 ¥20/人',
		description: '全场 5v5，目前还差 2 人锁场，欢迎中等强度球友。\n请自备饮用水与毛巾；分队随机抽签，打到闭馆或体力耗尽为止。\n雨天若露天场地关闭，会提前 2 小时在群里通知并改期。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: 'Mia篮球手',
		joinCount: 10,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 3,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
		title: 'IMAX观影《沙丘2》拼单场',
		location_text: '深圳市南山区海德三道85号 万象天地百老汇影城',
		time_text: '2026-04-27 15:10:00',
		fee_note: '票价自理（选座后群内同步付款）',
		description: '已锁定 IMAX 黄金场次，座位尽量挨在一起；开场前 20 分钟取票口集合。\n禁止屏摄；观影后可自愿一起去楼下咖啡聊聊剧情。\n临时跳车请提前一天说明，方便补位。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '电影小牧',
		joinCount: 11,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 4,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
		title: '梧桐山轻徒步看日落（8km）',
		location_text: '深圳市罗湖区莲塘街道 梧桐山风景名胜区北门',
		time_text: '2026-04-28 14:30:00',
		fee_note: '门票与补给自理；建议预算 ¥50 内',
		description: '轻度路线约 8km，累计爬升适中，适合有运动习惯的伙伴。\n请穿防滑徒步鞋，带够水和帽子；日落时段山顶风大注意保暖。\n集合请准时，迟到会在北门牌坊处留人等 10 分钟。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '山野阿泽',
		joinCount: 12,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 5,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
		title: '下班后Coffee Chat：产品x设计交流',
		location_text: '深圳市南山区粤海街道 科技园南区星巴克臻选店',
		time_text: '2026-04-25 19:00:00',
		fee_note: '饮品自理',
		description: '轻松圆桌，产品和设计同学分享近期踩坑与协作心得。\n不设固定议程，欢迎带一个问题或一个小案例来聊。\n店内座位先到先得，若满座可换隔壁咖啡店继续。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: 'Luna产品喵',
		joinCount: 13,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 6,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
		title: '周末油画体验课：莫兰迪静物',
		location_text: '深圳市福田区华强北街道 深业上城L2 艺术工坊',
		time_text: '2026-04-27 10:00:00',
		fee_note: '材料费 ¥128/人（含画布与颜料）',
		description: '零基础友好，老师演示调色与笔触后独立完成一幅静物小画。\n画室提供围裙与颜料，建议穿深色上衣以防沾染。\n作品可当日带走；如需烘干装裱可现场加购。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '木子画室',
		joinCount: 14,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 7,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=900&q=80',
		title: '宝安羽毛球友谊赛（周末场）',
		location_text: '深圳市宝安区创业一路 宝安体育馆羽毛球馆',
		time_text: '2026-05-02 10:00:00',
		fee_note: '场地费 AA，约 ¥32/人',
		description: '周末轻量友谊赛，四人轮换双打，气氛轻松。\n球拍可租借，建议提前十分钟到场热身。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '羽球小白',
		joinCount: 8,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 8,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
		title: '龙岗篮球3对3街头赛',
		location_text: '深圳市龙岗区龙翔大道 大运中心篮球场',
		time_text: '2026-05-03 15:00:00',
		fee_note: '场地免费，饮水自理',
		description: '3对3 街头赛制，随机分组，输球下场轮换。\n欢迎各类水平球友，重在出汗与认识新朋友。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '龙岗球王',
		joinCount: 12,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 9,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80',
		title: '罗湖足球五人制包场',
		location_text: '深圳市罗湖区爱国路 淘金山五人制足球场',
		time_text: '2026-05-07 20:30:00',
		fee_note: '包场费 AA，约 ¥45/人',
		description: '室内五人制足球，缺 3 人锁场。\n建议穿碎钉鞋，带护腿板更稳妥。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '绿茵少年',
		joinCount: 9,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 10,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=900&q=80',
		title: '福田乒乓球周末切磋',
		location_text: '深圳市福田区上步南路 深圳体育馆乒乓球馆',
		time_text: '2026-05-09 14:00:00',
		fee_note: '球台费 AA，约 ¥18/人',
		description: '业余爱好切磋局，水平不限，单双打轮换。\n球拍可自备也可现场租借。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '乒乓老张',
		joinCount: 6,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 11,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=80',
		title: '南山网球双打招募',
		location_text: '深圳市南山区深南大道 深圳大学网球场',
		time_text: '2026-05-10 09:30:00',
		fee_note: '场地费 AA，约 ¥50/人',
		description: '双打 2.5-3.0 水平，缺 1 人。\n请自备球拍与新球，场上多沟通。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '爱网球的Ace',
		joinCount: 4,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 12,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
		title: '深圳湾夜跑荧光跑',
		location_text: '深圳市南山区滨海大道 深圳湾公园西段',
		time_text: '2026-05-12 19:30:00',
		fee_note: '免费，荧光手环 AA 约 ¥10',
		description: '约 5km 轻松夜跑，配速 6 分半左右，边跑边聊。\n提供荧光手环与拉伸指导，欢迎新手。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '夜跑队长',
		joinCount: 20,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 13,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80',
		title: '科技园游泳下午茶',
		location_text: '深圳市南山区科技南十二路 南山文体中心游泳馆',
		time_text: '2026-05-14 15:00:00',
		fee_note: '门票自理，约 ¥40/人',
		description: '午后放松泳，1200 米自由泳+闲游。\n结束后可一起下午茶，泳镜泳帽自理。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '畅游者',
		joinCount: 7,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 1,
		activity_id: 14,
		isActive: false,
		tag_text: '约球',
		cover:
			'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
		title: '公园晨间瑜伽共练',
		location_text: '深圳市福田区红荔西路 莲花山公园风筝广场',
		time_text: '2026-05-16 08:00:00',
		fee_note: '免费，自带瑜伽垫',
		description: '清晨户外哈他瑜伽，时长约 60 分钟。\n老师带练，适合零基础，穿舒适运动装。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '瑜伽朵朵',
		joinCount: 15,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 15,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80',
		title: '经典老片重温夜《霸王别姬》',
		location_text: '深圳市南山区望海路 海岸城CGV影城',
		time_text: '2026-05-03 19:00:00',
		fee_note: '票价自理，约 ¥70/人',
		description: '4K 修复版重映，映后一起聊戏。\n禁止屏摄，座位群内同步。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '胶片迷',
		joinCount: 16,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 16,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
		title: '纪录片放映+导演连线',
		location_text: '深圳市福田区福中一路 少年宫报告厅',
		time_text: '2026-05-08 18:30:00',
		fee_note: '门票 ¥60/人',
		description: '独立纪录片展映，映后导演视频连线交流。\n现场名额有限，先到先得。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '纪录中国',
		joinCount: 22,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 17,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
		title: '独立短片展映交流',
		location_text: '深圳市南山区华侨城创意园 燕晗高地',
		time_text: '2026-05-10 16:00:00',
		fee_note: '免费，需预约',
		description: '青年导演短片展映，映后有主创面对面。\n欢迎电影爱好者与创作者交流。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '新浪潮',
		joinCount: 18,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 18,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
		title: '露天汽车影院怀旧场',
		location_text: '深圳市龙华区民治大道 龙华露天汽车影院',
		time_text: '2026-05-15 20:00:00',
		fee_note: '车均 ¥120，拼车 AA',
		description: '经典港片连映，车内观影专属氛围。\n拼车前往，现场提供爆米花套餐。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '车轮上的影迷',
		joinCount: 10,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 19,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1560109945-7900effc5e93?auto=format&fit=crop&w=900&q=80',
		title: '动画电影亲子专场',
		location_text: '深圳市福田区深南大道 福田星河COCO Park影院',
		time_text: '2026-05-17 14:00:00',
		fee_note: '亲子套票 ¥99/一大一小',
		description: '合家欢动画片专场，适合带娃一起。\n映后有小礼物与互动环节。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '亲子观影团',
		joinCount: 14,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 20,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80',
		title: '舞台剧《雷雨》集体观演',
		location_text: '深圳市南山区深南大道 保利剧院',
		time_text: '2026-05-22 19:30:00',
		fee_note: '票价自理，约 ¥180/人',
		description: '经典话剧《雷雨》巡演场，团购可折扣。\n开场前 30 分钟剧院门口集合。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '戏剧人生',
		joinCount: 12,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 21,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
		title: '悬疑片推理夜',
		location_text: '深圳市福田区上梅林 卓悦汇博纳影城',
		time_text: '2026-05-24 19:30:00',
		fee_note: '票价自理，约 ¥55/人',
		description: '悬疑新片抢先看，映后一起复盘线索。\n欢迎推理爱好者，禁止剧透。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '推理社',
		joinCount: 19,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 2,
		activity_id: 22,
		isActive: false,
		tag_text: '观影',
		cover:
			'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
		title: '音乐纪录片专场',
		location_text: '深圳市南山区南海大道 蛇口海上世界文化艺术中心',
		time_text: '2026-05-29 19:00:00',
		fee_note: '门票 ¥80/人',
		description: '摇滚乐纪录片专场，映后乐迷交流。\n现场有黑胶唱片展示与试听。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '音乐之友',
		joinCount: 21,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 23,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
		title: '七娘山登顶看云海',
		location_text: '深圳市大鹏新区地质公园路 七娘山登山口',
		time_text: '2026-05-04 07:00:00',
		fee_note: '免费，往返拼车 AA',
		description: '深圳第二高峰，全程约 6 小时，看云海奇观。\n需备登山杖与充足饮水，体力较好者参加。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '登峰小队',
		joinCount: 13,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 24,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
		title: '海边露营烧烤过夜',
		location_text: '深圳市大鹏新区较场尾 海滩露营区',
		time_text: '2026-05-09 15:00:00',
		fee_note: '食材装备 AA，约 ¥120/人',
		description: '周末海边露营，日落烧烤+篝火+星空。\n帐篷可租借，含晚餐与次日早餐。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '露营老司机',
		joinCount: 17,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 25,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80',
		title: '盐田海滨栈道骑行',
		location_text: '深圳市盐田区海涛路 盐田海滨栈道起点',
		time_text: '2026-05-16 09:00:00',
		fee_note: '共享单车或自备，免费',
		description: '约 20km 海景骑行，中途停靠拍照补给。\n路况平坦，适合休闲骑行。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '骑行驿站',
		joinCount: 25,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 26,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=900&q=80',
		title: '羊台山森林溯溪',
		location_text: '深圳市宝安区石岩街道 羊台山森林公园',
		time_text: '2026-05-18 08:30:00',
		fee_note: '免费，补给自理',
		description: '夏日溯溪清凉路线，约 4 小时往返。\n请穿防滑溯溪鞋，注意防晒与蚊虫。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '溪谷探客',
		joinCount: 11,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 27,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
		title: '大鹏半岛赶海挖沙',
		location_text: '深圳市大鹏新区南澳街道 西涌沙滩',
		time_text: '2026-05-20 07:30:00',
		fee_note: '拼车 AA，约 ¥40/人',
		description: '退潮赶海挖花蛤，海边亲子友好。\n请自备小桶与铲子，注意潮汐安全。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '赶海一家',
		joinCount: 16,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 28,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80',
		title: '城市绿道徒步穿越',
		location_text: '深圳市福田区梅林 梅林绿道入口',
		time_text: '2026-05-23 09:00:00',
		fee_note: '免费，饮水自理',
		description: '梅林绿道至塘朗山，城市半山徒步约 10km。\n难度适中，沿途打卡城市景观。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: 'CityWalker',
		joinCount: 23,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 29,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
		title: '东西冲海岸线穿越',
		location_text: '深圳市大鹏新区东涌村 东涌海岸线',
		time_text: '2026-05-30 07:00:00',
		fee_note: '拼车+保险 AA，约 ¥60/人',
		description: '经典海岸线穿越，约 7km，需一定体力。\n沿途海景绝美，需穿防滑徒步鞋。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '海岸穿越者',
		joinCount: 15,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 3,
		activity_id: 30,
		isActive: false,
		tag_text: '户外',
		cover:
			'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=900&q=80',
		title: '观澜湖高尔夫练习体验',
		location_text: '深圳市龙华区观澜街道 观澜湖高尔夫球会',
		time_text: '2026-06-06 10:00:00',
		fee_note: '练习场 ¥120/人（含球杆）',
		description: '零基础高尔夫体验，教练一对一纠正挥杆。\n提供球杆与练习球，穿运动鞋即可。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '挥杆人生',
		joinCount: 9,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 31,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
		title: '科技园午间咖啡社交',
		location_text: '深圳市南山区科技南十二路 科技园创业咖啡',
		time_text: '2026-05-05 12:30:00',
		fee_note: '饮品自理',
		description: '午间轻社交，认识周边上班族与创业者。\n话题自由，轻松换名片。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '咖啡社交官',
		joinCount: 24,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 32,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
		title: '周末读书分享会',
		location_text: '深圳市南山区粤海街道 西西弗书店',
		time_text: '2026-05-10 15:00:00',
		fee_note: '免费，可自带书',
		description: '每月共读一本书，本周《小王子》。\n欢迎带一本最近在读的书来交换感悟。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '悦读会',
		joinCount: 14,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 33,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80',
		title: '桌游之夜狼人杀',
		location_text: '深圳市福田区金田路 皇庭广场桌游吧',
		time_text: '2026-05-15 20:00:00',
		fee_note: '人均 ¥45（含饮料）',
		description: '狼人杀+阿瓦隆，新手全程带玩。\n氛围友好，来了就开，不熟也能融入。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '桌游狂想',
		joinCount: 12,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 34,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80',
		title: '中英语言交换角',
		location_text: '深圳市福田区深南大道 中心书城咖啡角',
		time_text: '2026-05-17 19:00:00',
		fee_note: '饮品自理',
		description: '中英语言交换，母语者互相纠正发音。\n欢迎想练口语或认识外国朋友的人。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '语伴联盟',
		joinCount: 26,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 35,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80',
		title: '职业互助茶话会',
		location_text: '深圳市南山区科苑南路 深圳湾创业广场茶室',
		time_text: '2026-05-20 19:30:00',
		fee_note: '茶位费 AA，约 ¥30/人',
		description: '分享求职与转型经验，匿名互助答疑。\n欢迎带简历或困惑来，互相打气。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '职场灯塔',
		joinCount: 18,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 36,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
		title: '独立开发者闭门交流',
		location_text: '深圳市南山区高新南一道 科技园联合办公空间',
		time_text: '2026-05-24 14:00:00',
		fee_note: '免费，需提前报名',
		description: '独立开发者圆桌，聊产品、增长与变现。\n每人带一个正在做的项目分享。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: 'IndieHacker深圳',
		joinCount: 20,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 37,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
		title: '深夜食堂故事会',
		location_text: '深圳市南山区南头古城 深夜串串店',
		time_text: '2026-05-28 22:00:00',
		fee_note: '餐费 AA，约 ¥50/人',
		description: '深夜撸串聊天，每人分享一个生活小故事。\n放松减压，认识有趣灵魂。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '深夜食堂主理',
		joinCount: 11,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 4,
		activity_id: 38,
		isActive: false,
		tag_text: '闲聊',
		cover:
			'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80',
		title: '摄影街拍扫街约伴',
		location_text: '深圳市罗湖区东门 东门老街步行街',
		time_text: '2026-06-01 15:00:00',
		fee_note: '免费，器材自理',
		description: '老街扫街拍摄，手机相机皆可。\n交流构图与人文街拍心得，边走边拍。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '快门声线',
		joinCount: 13,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 39,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
		title: '陶艺手作体验课',
		location_text: '深圳市南山区华侨城创意园 陶然工坊',
		time_text: '2026-05-06 10:00:00',
		fee_note: '材料费 ¥158/人（含烧制）',
		description: '拉坯+手捏体验，完成一件陶器可烧制带走。\n老师全程指导，零基础友好。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '陶然工坊',
		joinCount: 10,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 40,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
		title: '水彩风景写生班',
		location_text: '深圳市福田区莲花山 莲花山公园湖畔',
		time_text: '2026-05-11 09:30:00',
		fee_note: '材料费 ¥98/人',
		description: '户外水彩写生，老师示范湿画法。\n画材由工作室提供，画作可带走留念。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '水彩日记',
		joinCount: 8,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 41,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
		title: '手工皮具制作工坊',
		location_text: '深圳市南山区科技园 拾作手作工作室',
		time_text: '2026-05-16 14:00:00',
		fee_note: '材料费 ¥268/人',
		description: '亲手缝制一枚卡包，含真皮与五金件。\n小班教学，成品当日带走。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '拾作匠人',
		joinCount: 6,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 42,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=80',
		title: '街头摄影基础课',
		location_text: '深圳市福田区华强北 华强北电子街头',
		time_text: '2026-05-21 15:30:00',
		fee_note: '课程费 ¥120/人',
		description: '街拍基础：构图、光影与抓拍时机。\n手机摄影也欢迎，现场实战指导。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '光影课堂',
		joinCount: 9,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 43,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
		title: '尤克里里入门弹唱',
		location_text: '深圳市南山区蛇口 海上世界音乐教室',
		time_text: '2026-05-26 19:00:00',
		fee_note: '课时费 ¥88/人（琴可租）',
		description: '零基础尤克里里，一节课学会一首弹唱。\n乐器可现场租借，轻松上手。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '岛歌教室',
		joinCount: 12,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 44,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
		title: '版画体验亲子场',
		location_text: '深圳市南山区南海大道 蛇口文创版画室',
		time_text: '2026-05-31 10:00:00',
		fee_note: '亲子套票 ¥168/一大一小',
		description: '橡皮章+版画印制，亲子共同完成一幅作品。\n材料齐全，成品可带回家。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '版画工房',
		joinCount: 7,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 45,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=80',
		title: '香薰蜡烛手作',
		location_text: '深圳市福田区香蜜湖 香遇手作工作室',
		time_text: '2026-06-05 14:00:00',
		fee_note: '材料费 ¥138/人',
		description: '调香+蜡艺，制作专属香薰蜡烛。\n多种精油可选，成品可带回家。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '香遇工作室',
		joinCount: 10,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
		]
	},
	{
		category_id: 5,
		activity_id: 46,
		isActive: false,
		tag_text: '艺术',
		cover:
			'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
		title: '数字绘画板绘分享',
		location_text: '深圳市南山区高新园 数字艺术共创空间',
		time_text: '2026-06-13 15:00:00',
		fee_note: '免费，需自带 iPad/手绘板',
		description: 'Procreate 板绘入门分享，演示上色流程。\n欢迎插画爱好者在交流中互相启发。',
		org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/logo.png',
		org_name: '板绘充电站',
		joinCount: 16,
		joinAvatars: [
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
			'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
		]
	}
]
