# 会话日志

> 生成时间：2026-08-25
> 项目：HiGo-Frontend（uni-app / Vue 3）
> 主题：发布活动类型选择器分类名不显示修复、小队（squad）与小队员（squad_member）表设计与种子数据生成

---

## 一、会话概览

本次会话做了两件事：1) 修复「发布活动」页类型选择器无法显示分类目录名称的问题，定位为 `picker` 的 `range-key` 与实际选项字段名不一致；2) 面向后端设计「小队/小队员」两张表，历经多轮调整（两次大改角色模型后锁定“三角色、保留副队长”最终版），并据此生成 10 条小队数据、60 条成员数据。

---

## 二、修改文件

### `src/create-activity/create-activity.vue`
- 问题：活动类型 `picker` 的下拉列表中看不到分类目录的名称。
- 根因：`typeOptions` 每个选项是 `{ category_id, category_name }`（见 `loadTypeOptions`），而模板中 `picker` 写的 `range-key="name"`，读取不到 `category_name` 字段，pick 渲染项均为空。
- 修复：将 `picker` 的 `range-key` 由 `name` 改为 `category_name`。
- 数据流随之自洽：选择时 `onTypePickerChange` 用 `opt.category_name` / `opt.category_id` 回显并保存。

---

## 三、表结构设计（最终版）

### 1. `squad`（小队表）
| 字段 | 类型 | 说明 |
|------|------|------|
| `squad_id` | BIGINT UNSIGNED PK AUTO | 小队ID |
| `squad_name` | VARCHAR(50) | 小队名称 |
| `squad_avatar` | VARCHAR(255) | 小队头像 |
| `captain_id` | BIGINT UNSIGNED | 小队长用户ID（对应 user 表 id） |
| `vice_captain_id` | BIGINT UNSIGNED NULL | 副队长用户ID（第二负责人） |
| `intro` | VARCHAR(500) | 小队简介 |
| `category_id` | BIGINT UNSIGNED NULL | 所属分类ID（复用活动分类） |
| `max_members` | INT UNSIGNED | 最大成员数 |
| `member_count` | INT UNSIGNED | 当前成员数 |
| `join_type` | TINYINT | 加入方式：0自由/1需审核/2拒绝 |
| `status` | TINYINT | 有效状态：1启用/0禁用 |
| `invite_code` | VARCHAR(20) UNIQUE NULL | 邀请码 |
| `create_time` / `update_time` | DATETIME | 创建/更新时间 |
| `delete_flag` | TINYINT | 逻辑删除：0正常/1已删除 |

### 2. `squad_member`（小队员表，三角色最终版）
| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | BIGINT UNSIGNED PK AUTO | 记录ID |
| `squad_id` | BIGINT UNSIGNED | 小队ID（外键关联 squad） |
| `user_id` | BIGINT UNSIGNED | 队员用户ID（对应 user 表 id） |
| `member_role` | TINYINT | 角色：0队长/1队员/2副队长 |
| `member_status` | TINYINT | 状态：0待审核/1已加入/2已退出/3被踢出/4已拉黑 |
| `join_time` / `quit_time` | DATETIME | 加入/退出时间 |
| `remark` | VARCHAR(255) | 备注/自我介绍 |
| `create_time` / `update_time` | DATETIME | 创建/更新时间 |
| UNIQUE KEY `uk_squad_user (squad_id, user_id)` | — | 防止同一用户重复加入同一小队 |

---

## 四、关键决策与约定

| 决策 | 说明 |
|------|------|
| 角色模型 | 经过“两种角色 → 三角色”两轮调整，最终保留**队长/队员/副队长**三种角色，`member_role = 0/1/2` |
| 副队长保留 | 用户明确“仍想保留第二个负责人”，故 `squad.vice_captain_id` 不移除 |
| 角色与状态分离 | 角色放 `member_role`、生命周期状态放 `member_status`，职责分开 |
| 一致性要求 | `squad.captain_id / vice_captain_id` 与成员表 `member_role=0/2` 需保持一致；加入/转让/离职时需事务同步 |
| 成员数据规模 | 60 条成员数据，每队人数各不相同（5/7/4/5/9/7/4/10/5/4），含跨队复用（同一 user 属多个小队），user_id 覆盖 1–46 |
| 无副队长场景 | 小队10（游泳）仅队长 + 普通队员，`vice_captain_id = NULL` |

---

## 五、配套产物（SQL）

本次生成的 4 段 SQL（可独立执行的 DDL/DML）：
1. `squad` 表建表 SQL（含索引：`idx_captain`、`idx_category`、唯一键 `uk_invite_code`）。
2. `squad_member` 表建表 SQL（含唯一键 `uk_squad_user`、索引 `idx_user`）。
3. `squad` 表 10 条 INSERT + 校准 `member_count` 的 UPDATE。
4. `squad_member` 表 60 条 INSERT。

---

## 六、遗留事项

- 若需数据库层面强制“一个小队只有一个队长/副队长”，仅靠 `member_role` 0/1/2 无法加唯一约束，需改“队长存独立字段”或应用层校验。
- `user` 表 1–46 的种子数据尚未生成（本次 SQL 假定 user 表已存在这些用户）。
- SQL 尚未实际落库验证；如需可用于真实环境，建议先核对 `user`、`activity category` 相关字段名再执行。