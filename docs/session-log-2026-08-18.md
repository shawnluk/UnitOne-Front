# 会话日志

> 生成时间：2026-08-18
> 项目：HiGo-Frontend（uni-app / Vue 3）
> 主题：活动列表前后端对接、SQL 模板与建表、mock/真实数据分页改造

---

## 一、会话概览

本次会话围绕「活动」业务，完成了从 SQL 模板、建表 DDL、mock 数据扩充，到前端分页、下拉/上拉刷新、mock 与真实后端切换的完整链路。

---

## 二、新建文件

| 文件 | 说明 |
|------|------|
| `scripts/sql-queries.mjs` | SQL 查询模板（ES module export），含 Activity / Moment / User / Message / Squad / Auth / Stats 七个业务模块及 `sql` 模板标签函数 |
| `scripts/sql-tables.mjs` | 12 张表建表 DDL 语句 + `SeedData` 种子数据（分类 / 活动 / 参与记录） |

---

## 三、修改文件

### 1. `mock/activity-list.js`
- 活动列表数据由 **6 条** 扩充至 **46 条**，新增 40 条测试数据。
- 新增数据 `activity_id` 7~46，五个分类（约球 / 观影 / 户外 / 闲聊 / 艺术）各 8 条。
- 字段结构与原有数据保持一致（含 `joinCount` / `joinAvatars`）。

### 2. `components/home-activity-card.vue`
- 新增分页状态：`pageSize`、`offset`、`hasMore`、`loading`、`currentCategoryId`。
- 新增 `refresh()`（下拉刷新重置偏移）、`loadMore()`（上拉加载下一批，底部「加载中」持续 3 秒）、`fetchPage()`（按偏移量请求一页）。
- `fetchPage` 用 `if/else` 区分两种分页场景：
  - **情况一**（后端已分页，`items.length <= pageSize`）：直接用返回数据，`hasMore` 由 `total` 或本页是否满判断。
  - **情况二**（后端未分页，`items.length > pageSize`）：前端本地 `slice` 切片。
- 新增 `normalizeActivityResult()` 兼容后端返回「数组」或「`{ list/records/items/rows, total }`」。
- 列表底部新增 `loadStatus`：加载中转圈「加载中...」、加载完「没有更多了」。
- 分页参数由 `page/pageSize` 改为 `offset/limit`（对齐后端约定）。

### 3. `pages/index/index.vue`
- 新增 `onReachBottom` 触发 `loadMore`（上拉加载更多）。
- 新增 `onPullDownRefresh`：下拉刷新用 `Promise.all([刷新, delay(3000)])` 保证转圈至少 3 秒。
- 新增自定义下拉刷新转圈指示器（`refreshing` 状态 + `spinner` 圆环 + `@keyframes refreshing-spin`），因为 `navigationStyle: custom` 下原生转圈不渲染。

### 4. `api/modules/activity.js`
- `fetchHomeActivityList` 的 mock 支持分页切片，参数由 `page/pageSize` 改为 `offset/limit`（`slice(offset, offset + limit)`）。
- mock 与真实请求由 `http.js` 的 `useMock` 开关统一控制，本模块只提供 `mock` 回调。

### 5. `api/modules/auth.js` / `message.js` / `moment.js` / `user.js`
- 清理后恢复各接口的 `mock` 字段，与 `useMock` 开关机制对齐：`useMock: true` 走 mock，`useMock: false` 走真实后端。

### 6. `config/env.js`
- `apiBaseUrl` 改为 `http://127.0.0.1:3000`。
- `useMock` 作为唯一开关：`true` 用 mock，`false` 对接真实后端。

---

## 四、关键决策与约定

| 决策 | 说明 |
|------|------|
| mock/后端一键切换 | 通过 `config/env.js` 的 `useMock` 开关控制，各接口保留 `mock` 回调，避免每次增删代码 |
| 后端分页参数 | 采用 `offset` / `limit`（`GET /api/v1/activities?limit=10&offset=10`） |
| 前端分页兜底 | 后端未分页返回全量时，前端本地 `slice` 保证每页 10 条 |
| 一次 10 条 | `pageSize = 10`，上拉到底「加载中」3 秒后再加载下一批 |
| 下拉/上拉转圈 | 统一 3 秒延时，因自定义导航栏原生转圈不渲染，采用自定义 spinner |
| 建表/查询分离 | 建表 DDL 独立放 `sql-tables.mjs`，查询模板放 `sql-queries.mjs`，均用 ES module |
| SQL 占位符 | 使用 `?` 位置参数，由数据库驱动按顺序绑定实参自动转义防注入 |

---

## 五、表结构与数据

- 12 张表：`users`、`activity_categories`、`activities`、`activity_participants`、`moments`、`moment_comments`、`moment_likes`、`messages`、`squads`、`squad_members`、`squad_activities`、`login_logs`。
- 命名规范：`snake_case`，主键 `id BIGINT UNSIGNED AUTO_INCREMENT`，时间字段 `created_at` / `updated_at`，状态用 `VARCHAR(16)` 枚举字符串。
- 已生成活动列表 mock 数据（第 1~46 条）对应的 SQL 插入语句（第 7~46 条已去除 `joinCount` / `joinAvatars`）。

---

## 六、遗留事项

- `pages/user/components/squad-detail.vue` 页面组件内仍残留 mock 引用（`getMockUserSquadDetail` / `MOCK_USER_SQUAD_DEFAULT_ID`），尚未与 `useMock` 开关机制对齐。
- 后端接口尚未实现分页时，依赖前端本地切片兜底；建议后端按 `sql-queries.mjs` 中 `Activity.list` 的 `LIMIT ? OFFSET ?` 实现真正分页返回 `{ list, total }`。