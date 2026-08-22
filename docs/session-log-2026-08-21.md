# 会话日志

> 生成时间：2026-08-21
> 项目：HiGo-Frontend（uni-app / Vue 3）
> 主题：活动详情页跳转链路改造、去除硬编码数据、分类目录复用后端接口、表单字段对齐后端

---

## 一、会话概览

本次会话围绕「活动详情页」链路做了三件事：1) 点击活动卡片跳转详情页时 URL 只携带 `activity_id`，且详情数据优先读取列表页已缓存的本地数据、不再请求后端；2) 排查并移除前端硬编码数据（`CATEGORY_TAG`、活动类型 `typeOptions` 写死数组）；3) 发布活动表单字段名与后端 `activities` 表字段对齐。

---

## 二、新建文件

| 文件 | 说明 |
|------|------|
| `utils/activity-cache.js` | 活动数据本地缓存工具：`cacheActivities(items)` 列表页写入、`getCachedActivity(id)` 详情页按 `activity_id` 读取，兼容 `activity_id` / `id` 两种主键 |

---

## 三、修改文件

### 1. `components/home-activity-card.vue`
- `handleCardClick` 跳转详情页 URL 只携带 `activity_id`（`item.activity_id || item.id`），不再拼接整条 item JSON。
- 引入 `cacheActivities`，`fetchPage` 拿到一页数据后写入本地缓存，供详情页直接读取。

### 2. `src/activity-detail/activity-detail.vue`
- `onLoad` 改为读取 `option.activity_id`，通过 `getCachedActivity(activityId)` 从本地缓存取该活动数据并渲染，不再发起后端详情请求。
- 删除硬编码的 `CATEGORY_TAG` 分类映射常量（约球/观影/户外/闲聊/艺术）。
- `tagLabel` 直接取缓存数据中的 `tag_text`（分类名称），不再用 `category_id` 本地映射。
- `normalizeActivity` 兼容 `activity_id || id`（真实数据库主键为 `id`）。

### 3. `api/modules/activity.js`
- 曾新增 `fetchActivityDetail`（`GET /api/v1/activities/:id`，不依赖 mock），后因详情页改读本地缓存而移除。

### 4. `src/create-activity/create-activity.vue`
- 删除写死的 `typeOptions: ['线下聚会', '运动健身', '演出观赛', '户外出游', '线上活动', '其他']`。
- 引入 `fetchCategories`（与首页分类栏同一接口），`created` 时加载分类，映射为 `{ category_id, name }`，选择器用 `range-key="name"` 展示名称，选中同时记录分类名称与 `category_id`。
- `activityForm` 字段名对齐后端 `activities` 表：`type → tag_text`、`time → time_text`、`location → location_text`、`price → fee_note`，新增 `category_id`。

---

## 四、关键决策与约定

| 决策 | 说明 |
|------|------|
| 详情页数据来源 | 列表页已加载数据写入本地缓存，详情页按 `activity_id` 读取，跳转详情不请求后端 |
| 跳转 URL 精简 | 详情页链接只携带 `activity_id`，数据不随 URL 传递 |
| 主键兼容 | 前端统一 `activity_id || id` 兼容 mock（`activity_id`）与真实数据库（`id`） |
| 分类目录复用 | 发布活动页分类选项复用首页 `fetchCategories`（`GET /api/v1/categories`），字段规范 `category_id || id`、`text || name` |
| 表单字段对齐 | `activityForm` 字段名 = 后端 `activities` 表字段（`title / tag_text / category_id / time_text / location_text / fee_note / description / cover`） |
| 硬编码清理原则 | 业务数据（分类标签、类型选项）从后端获取；页面导航、UI 文案等静态配置允许保留 |

---

## 五、遗留事项

- `components/bottom-tab-bar.vue` 的 `tabs`（4 个 Tab 的 `pagePath / text / iconPath`）为静态导航配置，未改（如需统一可考虑从 `pages.json` 派生）。
- `components/moment-feed.vue` 的 `itemList: ['举报', '不感兴趣', '复制链接']` 为操作菜单静态文案，未改。
- 真实数据库 `activities` 表无 `joinCount` / `joinAvatars` 字段，详情页「已报名人数 / 参与头像」将显示为空，如需展示可接入 `activity_participants` 统计。
