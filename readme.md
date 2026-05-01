## UnitOne Front（UniApp / Vue 3）

UnitOne 的前端项目，基于 **uni-app（Vue 3）** 开发，可编译到 **微信小程序 / H5 / App（5+App）** 等多端。

---

## 功能与页面

路由与页面入口以 `pages.json` 为准。当前页面可以按“主 Tab / 业务功能页”这样理解：

```text
pages.json
├─ 主 Tab（底部导航）
│  ├─ pages/index/index                首页
│  ├─ pages/moment/moment              动态 / 圈子
│  ├─ pages/message/message            消息
│  └─ pages/user/user                  我的
└─ 业务功能页
   ├─ src/login/login                  登录
   ├─ src/activity-detail/activity-detail  活动详情
   └─ src/create-activity/create-activity  创建活动
```

---

## 开发环境

- **HBuilderX**：建议使用最新版（支持 uni-app Vue3）
- **微信开发者工具**：运行/预览微信小程序
- **Node.js**：如需使用 uni-app CLI 或安装依赖（按你的团队工作流决定）

> 说明：本仓库以 HBuilderX 打开即可运行；如后续引入 CLI 脚本，请在 README 增补对应命令。

---

## 本地运行（推荐：HBuilderX）

1. 用 HBuilderX 打开项目根目录（包含 `pages.json`、`manifest.json` 的目录）
2. 运行到目标平台：
   - 运行到 **微信开发者工具**
   - 运行到 **浏览器（H5）**
   - 运行到 **App（云打包/本地基座）**

---

## 配置说明

- **应用基础信息**：`manifest.json`
  - 项目名：`UnitOne`
  - Vue 版本：`vueVersion: "3"`
  - 微信小程序 AppID：见 `manifest.json -> mp-weixin -> appid`
- **页面与全局样式**：`pages.json`
  - 当前全局 `navigationStyle` 为 `custom`（页面自行实现 TopBar/导航栏样式）

---

## 开发约定（建议）

- **导航栏**：既然全局使用 `custom`，各页面的顶部栏建议统一抽组件，避免重复实现与交互不一致
- **列表页**：统一 empty/loading/error 状态与骨架屏，减少每页重复逻辑

---

## Roadmap（组件化优先级）

下面是基于当前页面结构，按“复用价值从高到低”的组件化建议（从你之前的备忘整理而来）：

1. **页面容器骨架**：`PageScaffold`（TopBar + 内容区 + BottomTabBar）
2. **列表卡片基类**：`BaseCardList`（empty/loading/slot-item）
3. **模块标题栏**：`SectionHeader`（左标题/副标/右侧操作）
4. **统计/功能宫格**：`StatsGrid` / `ActionGrid`（items 配置驱动）
5. **用户头部信息**：`UserProfileHeader`（头像/昵称/ID/badge）
6. **浮动操作按钮**：`FloatingActionButton`（icon/text/position）

同时建议逐步清理页面中已无用的旧样式（例如 `user` 页遗留的内联/旧区域样式）。

---

## 接口与数据

当前以 UI 展示为主。下一步建议：

- **先补一套可控的 Mock 数据层**（便于联调与状态管理落地）
- 再逐步替换为真实接口，并统一错误码/重试/鉴权与缓存策略