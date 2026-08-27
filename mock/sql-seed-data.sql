-- ============================================
-- 种子数据：小队表、活动表、小队成员表
-- 生成日期：2026-08-26
-- ============================================

-- 分类：约球(1) 观影(2) 户外(3) 闲聊(4) 艺术(5)
-- 用户：user_id 1-20
-- member_role: 0=队长 1=普通成员 2=副队长
-- member_status: 1=在队

-- ============================================
-- 1. 小队表 (10条)
-- ============================================
INSERT INTO squad (squad_name, squad_avatar, captain_id, vice_captain_id, intro, category_id, max_members, member_count, join_type, status, invite_code, create_time, update_time, delete_flag) VALUES
('篮球搭子',     '', 2,  3,  '一起打篮球，挥洒汗水',     1, 20, 7, 0, 1, 'INV001', '2026-07-01 10:00:00', '2026-07-01 10:00:00', 0),
('足球小队',     '', 4,  5,  '绿茵场上奔跑，享受足球',   1, 20, 6, 0, 1, 'INV002', '2026-07-03 11:00:00', '2026-07-03 11:00:00', 0),
('周末观影团',   '', 6,  7,  '每周精选好片一起看',       2, 20, 6, 0, 1, 'INV003', '2026-07-05 14:00:00', '2026-07-05 14:00:00', 0),
('影迷俱乐部',   '', 8,  0,  '电影爱好者聚集地',         2, 20, 6, 1, 1, 'INV004', '2026-07-07 15:00:00', '2026-07-07 15:00:00', 0),
('登山爱好者',   '', 9,  10, '征服每一座山峰',           3, 20, 7, 0, 1, 'INV005', '2026-07-09 08:00:00', '2026-07-09 08:00:00', 0),
('骑行小队',     '', 11, 0,  '用轮子丈量城市',           3, 20, 6, 0, 1, 'INV006', '2026-07-11 09:00:00', '2026-07-11 09:00:00', 0),
('闲聊茶话会',   '', 12, 13, '喝茶聊天，放松心情',       4, 20, 6, 0, 1, 'INV007', '2026-07-13 16:00:00', '2026-07-13 16:00:00', 0),
('游戏开黑群',   '', 14, 0,  '组队上分，快乐游戏',       4, 20, 6, 0, 1, 'INV008', '2026-07-15 19:00:00', '2026-07-15 19:00:00', 0),
('绘画工坊',     '', 15, 16, '用画笔记录美好',           5, 20, 7, 1, 1, 'INV009', '2026-07-17 13:00:00', '2026-07-17 13:00:00', 0),
('摄影俱乐部',   '', 17, 0,  '定格每一个精彩瞬间',       5, 20, 6, 0, 1, 'INV010', '2026-07-19 10:00:00', '2026-07-19 10:00:00', 0);

-- ============================================
-- 2. 活动表 (50条，每个小队5条)
-- ============================================

-- 篮球搭子 (squad 1, category 1)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(1, 1, '约球', '', '周末篮球友谊赛', '朝阳公园篮球场', '2026-08-30 14:00', '免费', '周末约一场酣畅淋漓的篮球赛，不限水平，快乐第一', '', '篮球搭子', 2, 0),
(1, 1, '约球', '', '周三夜场篮球', '五棵松篮球馆', '2026-09-03 19:00', '费用 ¥30/人', '周三晚上的固定篮球局，灯光球场，打到尽兴', '', '篮球搭子', 3, 0),
(1, 1, '约球', '', '投篮训练营', '朝阳公园篮球场', '2026-09-06 10:00', '免费', '投篮技巧专项训练，提升命中率', '', '篮球搭子', 2, 0),
(1, 1, '约球', '', '3v3街头篮球赛', '东单体育中心', '2026-09-10 15:00', '费用 ¥20/人', '三人制街头篮球赛，自由组队，冠军有奖品', '', '篮球搭子', 5, 0),
(1, 1, '约球', '', '篮球新手教学', '朝阳公园篮球场', '2026-09-13 09:00', '免费', '零基础篮球教学，从运球到投篮手把手教', '', '篮球搭子', 1, 0);

-- 足球小队 (squad 2, category 1)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(1, 2, '约球', '', '周末五人制足球', '奥体中心足球场', '2026-08-31 16:00', '费用 ¥40/人', '五人制足球，快节奏高对抗', '', '足球小队', 4, 0),
(1, 2, '约球', '', '足球战术训练', '奥体中心足球场', '2026-09-04 18:00', '免费', '战术跑位与传切配合训练', '', '足球小队', 5, 0),
(1, 2, '约球', '', '周二足球夜场', '朝阳体育中心', '2026-09-09 19:30', '费用 ¥35/人', '周中夜场足球，灯光球场体验', '', '足球小队', 4, 0),
(1, 2, '约球', '', '足球友谊赛', '奥体中心足球场', '2026-09-14 15:00', '费用 ¥30/人', '与隔壁小区球队的友谊赛', '', '足球小队', 8, 0),
(1, 2, '约球', '', '守门员特训', '朝阳体育中心', '2026-09-17 10:00', '免费', '守门员专项训练，扑救技巧教学', '', '足球小队', 4, 0);

-- 周末观影团 (squad 3, category 2)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(2, 3, '观影', '', '周末观影《流浪地球3》', '万达影城CBD店', '2026-08-30 14:30', '费用 ¥50/人', '一起看最新科幻大片，映后讨论交流', '', '周末观影团', 6, 0),
(2, 3, '观影', '', '恐怖片之夜', '私人影院望京店', '2026-09-05 20:00', '费用 ¥40/人', '恐怖片专场，胆小慎入，氛围拉满', '', '周末观影团', 7, 0),
(2, 3, '观影', '', '经典电影回顾展', '中国电影资料馆', '2026-09-08 13:00', '费用 ¥30/人', '重温《肖申克的救赎》等经典影片', '', '周末观影团', 6, 0),
(2, 3, '观影', '', '纪录片放映会', '单向空间书店', '2026-09-12 15:00', '免费', '环保主题纪录片放映+讨论', '', '周末观影团', 10, 0),
(2, 3, '观影', '', '动画电影专场', '万达影城CBD店', '2026-09-16 10:30', '费用 ¥45/人', '宫崎骏经典动画回顾放映', '', '周末观影团', 6, 0);

-- 影迷俱乐部 (squad 4, category 2)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(2, 4, '观影', '', '院线新片观影', '英皇电影城', '2026-09-01 19:00', '费用 ¥55/人', '第一时间看新上映的大片', '', '影迷俱乐部', 8, 0),
(2, 4, '观影', '', '独立电影沙龙', '798艺术区', '2026-09-06 14:00', '费用 ¥25/人', '小众独立电影放映+导演交流', '', '影迷俱乐部', 12, 0),
(2, 4, '观影', '', '科幻电影马拉松', '私人影院望京店', '2026-09-10 12:00', '费用 ¥80/人', '连续4部科幻经典，从中午看到晚上', '', '影迷俱乐部', 8, 0),
(2, 4, '观影', '', '悬疑片讨论会', '单向空间书店', '2026-09-14 16:00', '免费', '看完悬疑片一起推理讨论，烧脑有趣', '', '影迷俱乐部', 13, 0),
(2, 4, '观影', '', '喜剧之夜', '英皇电影城', '2026-09-18 20:00', '费用 ¥45/人', '喜剧专场，笑到肚子疼，释放压力', '', '影迷俱乐部', 8, 0);

-- 登山爱好者 (squad 5, category 3)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(3, 5, '户外', '', '周末香山徒步', '香山公园', '2026-08-31 08:00', '免费', '香山经典徒步路线，全程约3小时，适合新手', '', '登山爱好者', 9, 0),
(3, 5, '户外', '', '长城徒步挑战', '慕田峪长城', '2026-09-06 07:00', '费用 ¥60/人', '慕田峪长城一日徒步，感受历史与壮美', '', '登山爱好者', 10, 0),
(3, 5, '户外', '', '夜爬香山看日出', '香山公园', '2026-09-10 03:00', '免费', '凌晨出发夜爬香山，山顶看日出', '', '登山爱好者', 9, 0),
(3, 5, '户外', '', '春季登山节', '百花山', '2026-09-15 07:30', '费用 ¥80/人', '百花山登山节，赏花登山两不误', '', '登山爱好者', 14, 0),
(3, 5, '户外', '', '户外露营体验', '海坨山谷', '2026-09-20 09:00', '费用 ¥120/人', '两天一夜露营体验，篝火晚会+星空', '', '登山爱好者', 9, 0);

-- 骑行小队 (squad 6, category 3)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(3, 6, '户外', '', '环湖骑行', '雁栖湖', '2026-09-01 08:30', '免费', '环雁栖湖骑行，全程约30公里，风景优美', '', '骑行小队', 11, 0),
(3, 6, '户外', '', '城市夜骑', '长安街', '2026-09-06 20:00', '免费', '夜骑长安街，感受城市夜景', '', '骑行小队', 16, 0),
(3, 6, '户外', '', '山地车越野', '老山山地车公园', '2026-09-10 09:00', '费用 ¥50/人', '山地车越野体验，挑战技术路段', '', '骑行小队', 11, 0),
(3, 6, '户外', '', '周末休闲骑行', '温榆河绿道', '2026-09-14 15:00', '免费', '沿河绿道休闲骑行，适合全家参与', '', '骑行小队', 17, 0),
(3, 6, '户外', '', '骑行摄影之旅', '古北水镇', '2026-09-20 07:00', '费用 ¥100/人', '骑行+摄影，沿途记录最美风景', '', '骑行小队', 11, 0);

-- 闲聊茶话会 (squad 7, category 4)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(4, 7, '闲聊', '', '周末茶话会', '胡同茶馆', '2026-08-31 14:00', '费用 ¥30/人', '一壶好茶，三五好友，畅聊人生', '', '闲聊茶话会', 12, 0),
(4, 7, '闲聊', '', '读书分享会', 'PageOne书店', '2026-09-05 15:00', '免费', '每人分享一本最近在读的书', '', '闲聊茶话会', 13, 0),
(4, 7, '闲聊', '', '桌游之夜', '桌游吧三里屯店', '2026-09-09 19:00', '费用 ¥40/人', '狼人杀、阿瓦隆、卡坦岛，玩到尽兴', '', '闲聊茶话会', 12, 0),
(4, 7, '闲聊', '', '话题讨论会', '胡同茶馆', '2026-09-12 14:00', '费用 ¥25/人', '本期话题：AI会取代人类吗？', '', '闲聊茶话会', 14, 0),
(4, 7, '闲聊', '', '美食分享会', '共享厨房', '2026-09-17 11:00', '费用 ¥50/人', '每人带一道拿手菜，一起分享品尝', '', '闲聊茶话会', 12, 0);

-- 游戏开黑群 (squad 8, category 4)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(4, 8, '闲聊', '', '王者荣耀开黑', '线上', '2026-09-01 20:00', '免费', '五排上分，目标王者', '', '游戏开黑群', 14, 0),
(4, 8, '闲聊', '', '吃鸡组队', '线上', '2026-09-05 21:00', '免费', '四人小队跳伞吃鸡', '', '游戏开黑群', 15, 0),
(4, 8, '闲聊', '', '原神联机活动', '线上', '2026-09-09 19:30', '免费', '联机刷副本，一起探索提瓦特', '', '游戏开黑群', 14, 0),
(4, 8, '闲聊', '', '主机游戏之夜', '游戏体验馆', '2026-09-13 18:00', '费用 ¥60/人', 'PS5/Switch主机游戏线下聚会', '', '游戏开黑群', 16, 0),
(4, 8, '闲聊', '', '桌游+电子游戏', '桌游吧三里屯店', '2026-09-18 14:00', '费用 ¥50/人', '下午桌游晚上电竞，双倍快乐', '', '游戏开黑群', 14, 0);

-- 绘画工坊 (squad 9, category 5)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(5, 9, '艺术', '', '水彩画入门', '798艺术区画室', '2026-09-02 14:00', '费用 ¥80/人', '零基础水彩画教学，材料全包', '', '绘画工坊', 15, 0),
(5, 9, '艺术', '', '素描基础课', '798艺术区画室', '2026-09-06 10:00', '费用 ¥60/人', '素描基本功训练，从线条到明暗', '', '绘画工坊', 16, 0),
(5, 9, '艺术', '', '油画体验课', '798艺术区画室', '2026-09-10 14:00', '费用 ¥120/人', '油画入门体验，完成一幅属于自己的作品', '', '绘画工坊', 15, 0),
(5, 9, '艺术', '', '户外写生', '颐和园', '2026-09-14 09:00', '费用 ¥40/人', '颐和园户外写生，捕捉自然之美', '', '绘画工坊', 17, 0),
(5, 9, '艺术', '', '数字绘画分享', '线上', '2026-09-18 19:00', '免费', 'Procreate/iPad绘画技巧线上分享', '', '绘画工坊', 15, 0);

-- 摄影俱乐部 (squad 10, category 5)
INSERT INTO activities (category_id, squad_id, category_name, cover, title, location_text, time_text, fee_note, description, org_avatar, org_name, creator_id, status) VALUES
(5, 10, '艺术', '', '城市街拍', '南锣鼓巷', '2026-09-03 15:00', '免费', '老北京胡同街拍，捕捉城市烟火气', '', '摄影俱乐部', 17, 0),
(5, 10, '艺术', '', '人像摄影教学', '朝阳公园', '2026-09-07 14:00', '费用 ¥50/人', '人像摄影技巧教学，有模特配合练习', '', '摄影俱乐部', 17, 0),
(5, 10, '艺术', '', '风光摄影之旅', '金山岭长城', '2026-09-11 05:00', '费用 ¥100/人', '金山岭长城日出风光摄影', '', '摄影俱乐部', 5, 0),
(5, 10, '艺术', '', '手机摄影技巧', '线上', '2026-09-15 19:00', '免费', '手机也能拍大片，构图与后期技巧分享', '', '摄影俱乐部', 17, 0),
(5, 10, '艺术', '', '夜景摄影实战', '国贸CBD', '2026-09-19 19:00', '免费', '城市夜景长曝光摄影实战', '', '摄影俱乐部', 6, 0);

-- ============================================
-- 3. 小队成员表 (18个用户加入10个小队)
-- ============================================

-- 篮球搭子 (squad 1): captain 2, vice 3, members 1,4,5,6,7 → 7人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(1, 2, 0, 1, '2026-07-01 10:00:00', '创建小队', '2026-07-01 10:00:00', '2026-07-01 10:00:00'),
(1, 3, 2, 1, '2026-07-01 11:00:00', '副队长',   '2026-07-01 11:00:00', '2026-07-01 11:00:00'),
(1, 1, 1, 1, '2026-07-02 10:00:00', '',         '2026-07-02 10:00:00', '2026-07-02 10:00:00'),
(1, 4, 1, 1, '2026-07-03 10:00:00', '',         '2026-07-03 10:00:00', '2026-07-03 10:00:00'),
(1, 5, 1, 1, '2026-07-04 10:00:00', '',         '2026-07-04 10:00:00', '2026-07-04 10:00:00'),
(1, 6, 1, 1, '2026-07-05 10:00:00', '',         '2026-07-05 10:00:00', '2026-07-05 10:00:00'),
(1, 7, 1, 1, '2026-07-06 10:00:00', '',         '2026-07-06 10:00:00', '2026-07-06 10:00:00');

-- 足球小队 (squad 2): captain 4, vice 5, members 2,3,8,9 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(2, 4, 0, 1, '2026-07-03 11:00:00', '创建小队', '2026-07-03 11:00:00', '2026-07-03 11:00:00'),
(2, 5, 2, 1, '2026-07-03 12:00:00', '副队长',   '2026-07-03 12:00:00', '2026-07-03 12:00:00'),
(2, 2, 1, 1, '2026-07-04 14:00:00', '',         '2026-07-04 14:00:00', '2026-07-04 14:00:00'),
(2, 3, 1, 1, '2026-07-05 14:00:00', '',         '2026-07-05 14:00:00', '2026-07-05 14:00:00'),
(2, 8, 1, 1, '2026-07-06 14:00:00', '',         '2026-07-06 14:00:00', '2026-07-06 14:00:00'),
(2, 9, 1, 1, '2026-07-07 14:00:00', '',         '2026-07-07 14:00:00', '2026-07-07 14:00:00');

-- 周末观影团 (squad 3): captain 6, vice 7, members 1,8,10,11 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(3, 6, 0, 1, '2026-07-05 14:00:00', '创建小队', '2026-07-05 14:00:00', '2026-07-05 14:00:00'),
(3, 7, 2, 1, '2026-07-05 15:00:00', '副队长',   '2026-07-05 15:00:00', '2026-07-05 15:00:00'),
(3, 1, 1, 1, '2026-07-06 16:00:00', '',         '2026-07-06 16:00:00', '2026-07-06 16:00:00'),
(3, 8, 1, 1, '2026-07-07 16:00:00', '',         '2026-07-07 16:00:00', '2026-07-07 16:00:00'),
(3, 10, 1, 1, '2026-07-08 16:00:00', '',        '2026-07-08 16:00:00', '2026-07-08 16:00:00'),
(3, 11, 1, 1, '2026-07-09 16:00:00', '',        '2026-07-09 16:00:00', '2026-07-09 16:00:00');

-- 影迷俱乐部 (squad 4): captain 8, members 2,3,5,12,13 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(4, 8, 0, 1, '2026-07-07 15:00:00', '创建小队', '2026-07-07 15:00:00', '2026-07-07 15:00:00'),
(4, 2, 1, 1, '2026-07-08 10:00:00', '',         '2026-07-08 10:00:00', '2026-07-08 10:00:00'),
(4, 3, 1, 1, '2026-07-09 10:00:00', '',         '2026-07-09 10:00:00', '2026-07-09 10:00:00'),
(4, 5, 1, 1, '2026-07-10 10:00:00', '',         '2026-07-10 10:00:00', '2026-07-10 10:00:00'),
(4, 12, 1, 1, '2026-07-11 10:00:00', '',        '2026-07-11 10:00:00', '2026-07-11 10:00:00'),
(4, 13, 1, 1, '2026-07-12 10:00:00', '',        '2026-07-12 10:00:00', '2026-07-12 10:00:00');

-- 登山爱好者 (squad 5): captain 9, vice 10, members 3,4,6,14,15 → 7人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(5, 9, 0, 1, '2026-07-09 08:00:00', '创建小队', '2026-07-09 08:00:00', '2026-07-09 08:00:00'),
(5, 10, 2, 1, '2026-07-09 09:00:00', '副队长',  '2026-07-09 09:00:00', '2026-07-09 09:00:00'),
(5, 3, 1, 1, '2026-07-10 08:00:00', '',        '2026-07-10 08:00:00', '2026-07-10 08:00:00'),
(5, 4, 1, 1, '2026-07-11 08:00:00', '',        '2026-07-11 08:00:00', '2026-07-11 08:00:00'),
(5, 6, 1, 1, '2026-07-12 08:00:00', '',        '2026-07-12 08:00:00', '2026-07-12 08:00:00'),
(5, 14, 1, 1, '2026-07-13 08:00:00', '',       '2026-07-13 08:00:00', '2026-07-13 08:00:00'),
(5, 15, 1, 1, '2026-07-14 08:00:00', '',       '2026-07-14 08:00:00', '2026-07-14 08:00:00');

-- 骑行小队 (squad 6): captain 11, members 1,7,12,16,17 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(6, 11, 0, 1, '2026-07-11 09:00:00', '创建小队', '2026-07-11 09:00:00', '2026-07-11 09:00:00'),
(6, 1, 1, 1, '2026-07-12 09:00:00', '',         '2026-07-12 09:00:00', '2026-07-12 09:00:00'),
(6, 7, 1, 1, '2026-07-13 09:00:00', '',         '2026-07-13 09:00:00', '2026-07-13 09:00:00'),
(6, 12, 1, 1, '2026-07-14 09:00:00', '',        '2026-07-14 09:00:00', '2026-07-14 09:00:00'),
(6, 16, 1, 1, '2026-07-15 09:00:00', '',        '2026-07-15 09:00:00', '2026-07-15 09:00:00'),
(6, 17, 1, 1, '2026-07-16 09:00:00', '',        '2026-07-16 09:00:00', '2026-07-16 09:00:00');

-- 闲聊茶话会 (squad 7): captain 12, vice 13, members 9,10,14,18 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(7, 12, 0, 1, '2026-07-13 16:00:00', '创建小队', '2026-07-13 16:00:00', '2026-07-13 16:00:00'),
(7, 13, 2, 1, '2026-07-13 17:00:00', '副队长',   '2026-07-13 17:00:00', '2026-07-13 17:00:00'),
(7, 9, 1, 1, '2026-07-14 16:00:00', '',         '2026-07-14 16:00:00', '2026-07-14 16:00:00'),
(7, 10, 1, 1, '2026-07-15 16:00:00', '',        '2026-07-15 16:00:00', '2026-07-15 16:00:00'),
(7, 14, 1, 1, '2026-07-16 16:00:00', '',        '2026-07-16 16:00:00', '2026-07-16 16:00:00'),
(7, 18, 1, 1, '2026-07-17 16:00:00', '',        '2026-07-17 16:00:00', '2026-07-17 16:00:00');

-- 游戏开黑群 (squad 8): captain 14, members 11,15,16,17,18 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(8, 14, 0, 1, '2026-07-15 19:00:00', '创建小队', '2026-07-15 19:00:00', '2026-07-15 19:00:00'),
(8, 11, 1, 1, '2026-07-16 19:00:00', '',        '2026-07-16 19:00:00', '2026-07-16 19:00:00'),
(8, 15, 1, 1, '2026-07-17 19:00:00', '',        '2026-07-17 19:00:00', '2026-07-17 19:00:00'),
(8, 16, 1, 1, '2026-07-18 19:00:00', '',        '2026-07-18 19:00:00', '2026-07-18 19:00:00'),
(8, 17, 1, 1, '2026-07-19 19:00:00', '',        '2026-07-19 19:00:00', '2026-07-19 19:00:00'),
(8, 18, 1, 1, '2026-07-20 19:00:00', '',        '2026-07-20 19:00:00', '2026-07-20 19:00:00');

-- 绘画工坊 (squad 9): captain 15, vice 16, members 1,2,11,13,17 → 7人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(9, 15, 0, 1, '2026-07-17 13:00:00', '创建小队', '2026-07-17 13:00:00', '2026-07-17 13:00:00'),
(9, 16, 2, 1, '2026-07-17 14:00:00', '副队长',   '2026-07-17 14:00:00', '2026-07-17 14:00:00'),
(9, 1, 1, 1, '2026-07-18 13:00:00', '',         '2026-07-18 13:00:00', '2026-07-18 13:00:00'),
(9, 2, 1, 1, '2026-07-19 13:00:00', '',         '2026-07-19 13:00:00', '2026-07-19 13:00:00'),
(9, 11, 1, 1, '2026-07-20 13:00:00', '',        '2026-07-20 13:00:00', '2026-07-20 13:00:00'),
(9, 13, 1, 1, '2026-07-21 13:00:00', '',        '2026-07-21 13:00:00', '2026-07-21 13:00:00'),
(9, 17, 1, 1, '2026-07-22 13:00:00', '',        '2026-07-22 13:00:00', '2026-07-22 13:00:00');

-- 摄影俱乐部 (squad 10): captain 17, members 3,5,6,8,18 → 6人
INSERT INTO squad_member (squad_id, user_id, member_role, member_status, join_time, remark, create_time, update_time) VALUES
(10, 17, 0, 1, '2026-07-19 10:00:00', '创建小队', '2026-07-19 10:00:00', '2026-07-19 10:00:00'),
(10, 3, 1, 1, '2026-07-20 10:00:00', '',         '2026-07-20 10:00:00', '2026-07-20 10:00:00'),
(10, 5, 1, 1, '2026-07-21 10:00:00', '',         '2026-07-21 10:00:00', '2026-07-21 10:00:00'),
(10, 6, 1, 1, '2026-07-22 10:00:00', '',         '2026-07-22 10:00:00', '2026-07-22 10:00:00'),
(10, 8, 1, 1, '2026-07-23 10:00:00', '',         '2026-07-23 10:00:00', '2026-07-23 10:00:00'),
(10, 18, 1, 1, '2026-07-24 10:00:00', '',        '2026-07-24 10:00:00', '2026-07-24 10:00:00');

-- ============================================
-- 4. 补充封面图：活动表 cover / 小队表 squad_avatar
-- 封面图沿用项目 Mock 的 Unsplash 场景图，保证与前端展示一致
-- ============================================

-- 4.1 活动表 cover（按唯一 title 定位）
-- 篮球搭子 (squad 1)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80' WHERE title = '周末篮球友谊赛';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80' WHERE title = '周三夜场篮球';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=900&q=80' WHERE title = '投篮训练营';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=900&q=80' WHERE title = '3v3街头篮球赛';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80' WHERE title = '篮球新手教学';

-- 足球小队 (squad 2)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80' WHERE title = '周末五人制足球';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80' WHERE title = '足球战术训练';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80' WHERE title = '周二足球夜场';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80' WHERE title = '足球友谊赛';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80' WHERE title = '守门员特训';

-- 周末观影团 (squad 3)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80' WHERE title = '周末观影《流浪地球3》';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80' WHERE title = '恐怖片之夜';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80' WHERE title = '经典电影回顾展';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80' WHERE title = '纪录片放映会';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1560109945-7900effc5e93?auto=format&fit=crop&w=900&q=80' WHERE title = '动画电影专场';

-- 影迷俱乐部 (squad 4)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80' WHERE title = '院线新片观影';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80' WHERE title = '独立电影沙龙';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80' WHERE title = '科幻电影马拉松';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80' WHERE title = '悬疑片讨论会';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80' WHERE title = '喜剧之夜';

-- 登山爱好者 (squad 5)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80' WHERE title = '周末香山徒步';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80' WHERE title = '长城徒步挑战';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80' WHERE title = '夜爬香山看日出';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80' WHERE title = '春季登山节';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80' WHERE title = '户外露营体验';

-- 骑行小队 (squad 6)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80' WHERE title = '环湖骑行';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80' WHERE title = '城市夜骑';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=900&q=80' WHERE title = '山地车越野';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80' WHERE title = '周末休闲骑行';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80' WHERE title = '骑行摄影之旅';

-- 闲聊茶话会 (squad 7)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80' WHERE title = '周末茶话会';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80' WHERE title = '读书分享会';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80' WHERE title = '桌游之夜';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80' WHERE title = '话题讨论会';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' WHERE title = '美食分享会';

-- 游戏开黑群 (squad 8)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80' WHERE title = '王者荣耀开黑';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80' WHERE title = '吃鸡组队';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80' WHERE title = '原神联机活动';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80' WHERE title = '主机游戏之夜';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80' WHERE title = '桌游+电子游戏';

-- 绘画工坊 (squad 9)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80' WHERE title = '水彩画入门';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80' WHERE title = '素描基础课';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80' WHERE title = '油画体验课';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80' WHERE title = '户外写生';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80' WHERE title = '数字绘画分享';

-- 摄影俱乐部 (squad 10)
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80' WHERE title = '城市街拍';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=80' WHERE title = '人像摄影教学';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80' WHERE title = '风光摄影之旅';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80' WHERE title = '手机摄影技巧';
UPDATE activities SET cover = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80' WHERE title = '夜景摄影实战';

-- 4.2 小队表 squad_avatar（按 squad_name 定位）
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '篮球搭子';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '足球小队';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '周末观影团';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '影迷俱乐部';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '登山爱好者';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '骑行小队';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '闲聊茶话会';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '游戏开黑群';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '绘画工坊';
UPDATE squad SET squad_avatar = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=80' WHERE squad_name = '摄影俱乐部';

-- ============================================
-- 5. 用户头像：更新 user_profiles.avatar（user_id 1-20）
-- 头像沿用 Unsplash 人物肖像图，尺寸 300 便于列表展示
-- ============================================
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' WHERE user_id = 1;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' WHERE user_id = 2;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' WHERE user_id = 3;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' WHERE user_id = 4;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' WHERE user_id = 5;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' WHERE user_id = 6;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=300&q=80' WHERE user_id = 7;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80' WHERE user_id = 8;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80' WHERE user_id = 9;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' WHERE user_id = 10;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' WHERE user_id = 11;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=300&q=80' WHERE user_id = 12;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&q=80' WHERE user_id = 13;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' WHERE user_id = 14;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' WHERE user_id = 15;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' WHERE user_id = 16;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80' WHERE user_id = 17;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=300&q=80' WHERE user_id = 18;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' WHERE user_id = 19;
UPDATE user_profiles SET avatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80' WHERE user_id = 20;