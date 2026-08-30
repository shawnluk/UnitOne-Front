# 会话日志

> 生成时间：2026-08-28
> 项目：HiGo-Frontend（uni-app / Vue 3）+ HiGo-Backend（Node.js / Express / MySQL）
> 主题：活动热度（去重型浏览）前后端全链路、返回首页热度同步、全项目打印标记、发布活动登录拦截（多层防护）

---

## 一、会话概览

本次会话围绕「活动热度」与「发布活动登录拦截」两条主线展开。热度功能采用「点赞式去重」设计：登录用户按 `user_id` 去重、未登录按 `device_id` 去重，点击活动即上报、返回首页列表热度实时 +1，前端与后端（含数据库迁移脚本）全链路打通。随后为全项目业务打印统一加 `[HiGo]` 标记便于调试。最后针对发布活动做了多层登录拦截（入口 + 页面 onLoad 兜底 + 提交前判断），并修正了「退出登录后仍可点开发布页」的漏洞。

---

## 二、修改文件（前端）

### 1. `api/modules/activity.js`
- 新增 `reportActivityView(id)`：`POST /api/v1/activities/:id/views`，未登录自动携带本地生成的 `device_id`，失败静默返回 `null`。
- 新增 `applyHotResult(item, result)`：上报成功后按返回 `{hot, added}` 反写本地缓存，`added=false` 时不虚增。
- 新增 `getDeviceId()`：未登录设备去重指纹，持久化到 `higo:device-id`。

### 2. `api/http.js`
- 对 `POST *.../views` 免 token 过期拦截（登录/未登录均可上报）。

### 3. `components/home-activity-card.vue`
- 角标改为 `🔥 N 热度`（读取 `hot`，兼容 `heat`，缺失显示 0）。
- 点击卡片 fire-and-forget 上报，成功后本地 +1 刷新卡片热度。
- **修复关键 bug**：`handleCardClick` 曾被重复定义，后一个覆盖带上报的版本导致只跳转不上报——已删除重复方法。
- 新增 `syncHotFromCache()`：从本地缓存读取最新 `hot` 同步列表并触发视图更新（返回首页时调用）。

### 4. `src/activity-detail/activity-detail.vue`
- heroChip 显示热度、`normalize` 兜底 `hot`。
- 详情加载成功后上报一次热度（后端去重，重复进入不虚增），并调用 `updateCachedActivityHot` 写回缓存，供返回首页同步。
- 原 `[debug]` 打印统一改为 `[HiGo] activityDetail`。

### 5. `utils/activity-cache.js`
- 新增 `updateCachedActivityHot(activityId, hot)`：只更新缓存中某活动热度，不动其它字段。

### 6. `pages/index/index.vue`
- 新增 `onShow`：从详情返回首页时调用 `syncHotFromCache()`，实现热度 +1 反馈。

### 7. `src/create-activity/create-activity.vue`
- `submitActivity` 开头校验登录态（读 `userId`/`userInfo`），未登录弹 `uni.showModal`「请先登录后再发布活动」：确定跳登录页，取消返回首页。
- 新增 `cancelActivityModal()`：关闭发布面板并返回首页（保留原 `closeActivityModal` 去用户页）。
- 新增 `onLoad` 兜底拦截：直接读 storage 判断登录态，未登录弹窗引导（防 URL/分享/页面栈直接进入）。

### 8. `pages/user/user.vue`
- `createActivity()` 入口加 `if (!this.isLoggedIn)` 拦截，弹窗「去登录 / 取消」（取消留在当前页）。

### 9. 全项目打印标记
- 业务打印统一加 `[HiGo]` 前缀 + 中文描述（共 8 处）：`App.vue`（Launch/Show/Hide）、`home-activity-card.vue`（列表/点击/分类）、`activity-detail.vue`、`create-activity.vue`、`home-category-bar.vue`、`user-squad-panel.vue`。

---

## 三、修改文件（后端 HiGo-Backend）

### 1. `sql/activity-hot.sql`（新建，迁移脚本）
- `ALTER TABLE activities ADD COLUMN hot INT NOT NULL DEFAULT 0`（去重后的浏览人数）。
- `CREATE TABLE activity_views`：`uk_view_user (activity_id, user_id)` / `uk_view_device (activity_id, device_id)` 唯一键做去重，`ON DELETE CASCADE`。

### 2. `src/db/queries.js`
- 新增 `INSERT_ACTIVITY_VIEW`（`INSERT IGNORE` 用于判断是否新增计数）、`INC_ACTIVITY_HOT`、`GET_ACTIVITY_HOT`。

### 3. `src/services/activity-service.js`
- `mapActivity` 返回 `hot`。
- 新增 `reportActivityView(activityId, { userId, deviceId })`：校验活动存在（404）→ `INSERT IGNORE` → 若新增计数则 `hot+1` → 返回最新 `{hot, added}`；登录优先 user_id、未登录用 device_id，空串归一化为 NULL 避免误去重。

### 4. `src/routes/activities.js` + `src/app.js`
- 注册 `POST /api/v1/activities/:id/views`（免鉴权，token 可选解析用户）。
- `app.js` 新增 `isPublicPath()`：白名单精确匹配或 `/api/v1/activities/\d+/views` 正则放行。

---

## 四、新增文件

| 文件 | 说明 |
|------|------|
| `docs/session-log-2026-08-28.md` | 本次会话日志 |
| `sql/activity-hot.sql`（HiGo-Backend） | 活动热度迁移脚本（hot 列 + activity_views 表） |

---

## 五、关键问题与根因

1. **返回首页热度不 +1**：`handleCardClick` 在组件内重复定义，后一个覆盖带 `reportHot` 的版本，导致点击只跳转不上报。修复后新增「详情上报 → 写缓存 → 首页 onShow 同步」链路。
2. **建表 ERROR 1215 外键约束失败**：`activity_views` 外键 `fk_view_activity` 创建失败。给出排查建议（核对表存在/类型/引擎/字符集一致），并提供去掉外键的版本——去重功能完全不受影响，仅失去级联删除。
3. **退出登录后仍能点开发布页**：入口 `createActivity()` 原本只做跳转，无登录态检查；登录判断最初只放在提交时。已做三层防护：入口 `isLoggedIn` 判断 + 创建页 `onLoad` 兜底 + 提交前校验。

---

## 六、数据链路说明

### 活动热度（去重型浏览）
```
点击活动卡片 → POST /api/v1/activities/:id/views（未登录带 device_id，免鉴权）
  → 后端 INSERT IGNORE activity_views（按 user_id 或 device_id 唯一）
  → 新增计数则 activities.hot + 1
  → 返回 { hot, added }
  → 前端：详情页写回缓存 updateCachedActivityHot → 返回首页 onShow → syncHotFromCache
```

### 造数 SQL（演示/验证用）
```
清空 activity_views → 每活动插 5 条登录用户 + 1 条未登录设备 → UPDATE activities.hot = 明细数
```

---

## 七、遗留事项

- 数据库迁移脚本 `activity-hot.sql` 需用户手动执行；若遇外键 1215 可用去外键版本（建议确认 `activities` 表存在且 `activity_id` 为 INT 主键、引擎 InnoDB、字符集一致）。
- 热度 `hot` 为去重后的浏览人数，若后续要区分「浏览」与「点赞」语义，可复用 `activity_views` 表扩展 `type` 字段。
- 未登录设备指纹仅存本地 `higo:device-id`，清缓存/换设备会重新计数（设计如此）。
- 测试时若改动未生效，需重新编译/重启 dev server（uni-app H5 热更新或编译缓存问题）。
