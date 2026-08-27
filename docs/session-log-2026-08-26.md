# 会话日志

> 生成时间：2026-08-26
> 项目：HiGo-Frontend（uni-app / Vue 3）+ HiGo-Backend（Node.js / Express / MySQL）
> 主题：登录后小队数据链路打通、小队面板多小队渲染、角色标签、置顶功能、种子数据 SQL、后端小队数据字段对齐

---

## 一、会话概览

本次会话围绕「用户登录后小队数据的展示链路」展开，完成了从后端登录返回我的小队 → 本地缓存 → user.vue 小队面板多小队渲染 → 角色标签（队长/副队长/成员）→ 单置顶交互的一整条链路，并生成小队/活动/小队成员三表的种子数据 SQL。

---

## 二、修改文件（前端）

### 1. `mock/user-display.js`
- 新增 `MOCK_USER_SQUAD_EMPTY_ITEM`（无小队时的占位条目，用于展示「点击创建小队」入口）。
- 新增 `mapSquadsToPanelItems(squads)` 纯函数：把登录返回的 squads 数组映射为小队面板可渲染的 item 列表；空数组返回占位条目。
- 映射字段与后端对齐：`squad_id`→`id`、`squad_avatar`→`cover`、`squad_name`→`name`、`member_count`→统计数据、`member_role`→角色标签。
- 新增 `mapMemberRole(role)`：0=小队长、2=副队长、1=成员，用于动态角色标签。
- **移除**硬编码的 `MOCK_USER_SQUADS` 常量（避免写死每个用户的数据），小队数据一律由后端返回后经登录存储体提供。
- item 增加 `pinned: false` 字段，作为置顶状态。

### 2. `api/modules/user.js`
- `fetchUserSquadPanel` 改为「多个小队」语义：读取本地存储的 `squads`（登录时 `persistLogin` 写入），经 `mapSquadsToPanelItems` 返回面板列表；不再返回固定单卡片，也不再用 mock 常量。
- 新增 `readStoredSquads()`：从 `uni.getStorageSync('squads')` 读取并规整为数组。

### 3. `pages/user/user.vue`
- 小队字段由单对象 `squad` 改为数组 `squadItems: []`，模板改为 `<UserSquadPanel :items="squadItems" />`。
- `loadLocalUser` 修正：原 `squads` 未声明即为隐式全局量，改为 `let squads = []` 读取并存入 `this.squads`。
- `loadUserData` 接收数组并赋给 `squadItems`。
- `clearLoginCache` 补充 `removeStorageSync('squads')`，修复退出登录后小队仍残留的问题。
- 新增 `onTogglePin(item)` 置顶逻辑，模板绑定 `@toggle-pin`。
- `onTogglePin` 实现**单置顶**：置顶时先取消其他小队的 `pinned`、再将该小队移到列表首位；取消逻辑仅处理自身。

### 4. `pages/user/components/user-squad-panel.vue`
- `item` 单对象 prop 改为 `items` 数组 prop，模板 `v-for` 渲染多条小队，新增相邻条目间距。
- `goSquadDetail(item)` 改为点击对应小队跳详情（空 id 提示「请先创建小队」）。
- 「置顶」标签改为可点击按钮：点击触发 `toggle-pin` 事件（emit）；置顶后文案变「已置顶」。
- 新增 `.squadTop--pinned` 置顶黄色样式（黄色渐变背景/边框/深黄色文字），并为按钮增加 `cursor: pointer` 与过渡动画。

---

## 三、修改文件（后端 HiGo-Backend）

### 1. `src/db/queries.js`
- `LIST_MY_SQUADS`：`SELECT s.*` 增加 `sm.member_role`，使登录返回的小队包含「当前用户在该小队的角色」。

### 2. `src/services/squad-service.js`
- `mapSquad(row)` 增加 `member_role: row.member_role ?? 1`，确保角色随登录 squads 项透传前端。

> 说明：会话中途曾尝试调整这两处，最终确认后端 SQL 与 `mapSquad` 均已包含 `member_role`，链路完整。

---

## 四、新增文件

| 文件 | 说明 |
|------|------|
| `scripts/sql-seed-data.sql` | 种子数据：小队表(10条)、活动表(50条)、小队成员表(63条)，与活动分类(约球/观影/户外/闲聊/艺术，category_id 1–5)及小队关联 |

---

## 五、种子数据 `sql-seed-data.sql` 要点

- 5 个分类各对应 2 个小队，共 10 个小队；队长来自 user 2–17。
- 每个小队 5 条活动，共 50 条；`category_id`/`squad_id`/`creator_id` 与小队成员对应。
- 18 个用户（user 1–18）加入小队，共 63 条成员记录；每个用户可加入不同的小队（跨队复用）。
- 约束自洽校验：
  - `squad.member_count` 与 `squad_member` 实际人数一致（每队 6 或 7 人）。
  - `captain_id`→`member_role=0`、`vice_captain_id`→`member_role=2`、其余 `member_role=1`。
  - `(squad_id, user_id)` 无重复，满足 `uk_squad_user` 唯一索引。
  - 用户覆盖：user 1–18 至少加入 1 个小队，user 19–20 未加入任何小队。

---

## 六、登录 → 小队展示完整链路

1. 后端 `auth-service.login` 调 `listMySquads(user_id)`，返回含 `member_role` 的 squads 项。
2. 前端 `persistLogin(data)` 将 `squads` 写入 `uni.setStorageSync('squads', ...)`。
3. `user.vue` 加载时 `readStoredSquads()` 读取存储 → `mapSquadsToPanelItems` 映射为 item 列表 → 赋给 `squadItems`。
4. `UserSquadPanel` 用 `v-for` 渲染多条小队，`badge` 按 `member_role` 显示角色，`squadTop` 支持单置顶排序与标黄。
5. 退出登录 / token 过期时 `clearLoginCache` 顺带清除 `squads`。

---

## 七、遗留事项

- 置顶状态当前为**前端内存态**，刷新页面或重新登录后不保留；如需持久化需后端增加小队排序/置顶字段（如 `sort_order` 或 `is_pinned`）。
- 小队详情页 `pages/user/components/squad-detail.vue` 仍为单独 mock/接口逻辑，尚未与本次 `squadItems` 数据源合并。
- 种子数据 SQL 尚未实际落库验证，执行前请确认 `user`、`activity_categories` 表已存在对应 id（user 1–20、category 1–5）。