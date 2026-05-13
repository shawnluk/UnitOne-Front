## UnitOne Front（UniApp / Vue 3）

UnitOne 的前端项目，基于 **uni-app（Vue 3）** 开发，可编译到 **微信小程序 / H5 / App（5+App）** 等多端。

---

## 目录说明

两种粒度：**仓库总树**（物理目录与入口文件）、**路由子树**（`pages.json` 里 `pages[]` 的顺序与导航样式）。有说明的行在「路径」与「说明」之间只用**空格**补到同一列起点；说明若占多行，**续行左侧空格的宽度 = 路径列最大宽度 + 2**，在等宽字体下与**首行说明的第一个字**对齐。未列出 `.gitignore`、`.editorconfig` 等通用文件。

### 仓库总树（工程布局）

```text
UnitOne-Front/
│
├─ App.vue                      应用根组件；onLaunch / onShow / onHide；
                                可选全局样式
├─ main.js                      应用 JS 入口；
                                Vue 3 导出 createApp（含条件编译的 Vue 2 分支）
├─ pages.json                   路由与窗口样式（详见下一小节「路由子树」）
├─ manifest.json                应用清单；名称、版本、vueVersion、
                                各端 AppID / 权限 / 打包
├─ index.html                   H5 入口 HTML
├─ uni.scss                     全局 SCSS：uni 默认变量 + UnitOne 令牌 `$uo-*`（颜色、渐变、间距、圆角）
├─ uni.promisify.adaptor.js     部分 uni API Promise 化；由 main.js 条件引入
├─ project.config.json          微信开发者工具：项目级配置
├─ project.private.config.json  微信开发者工具：本机私有覆盖
│
├─ api/
│  ├─ http.js                   uni.request 封装；鉴权头；业务体解包；**Mock 拦截**（见下文「API 与 Mock」）
│  └─ modules/                  auth、activity、message、moment 等接口模块
├─ components/                  跨页公共 Vue 组件（top-bar、bottom-tab-bar、
                                page-scaffold 等）
├─ config/
│  └─ env.js                    API 根地址、useMock、请求超时等
├─ constants/
│  ├─ api-paths.js              接口路径常量
│  └─ uo-theme.js               与 `uni.scss` 中 `$uo-*` 对齐的色值，供模板属性绑定（如图标 color）
├─ mock/
│  ├─ activity-list.js          活动列表等假数据
│  ├─ messages.js               消息假数据
│  └─ moment-feed.js            动态流假数据
├─ pages/                       主包内页面（多为底部 Tab）；
                                子目录 components 为页内私有组件
│  ├─ index/
│  │  ├─ index.vue              首页
│  │  └─ components/            首页专用子组件
│  ├─ moment/
│  │  └─ moment.vue             动态 / 时刻
│  ├─ message/
│  │  └─ message.vue            消息
│  └─ user/
│     ├─ user.vue               我的
│     └─ components/            我的页专用子组件
├─ scripts/
│  └─ generate-changelog.js     变更说明等维护脚本（非运行时依赖）
├─ src/                         主包内、非 Tab 业务子页（均在 pages.json 注册）
│  ├─ login/
│  │  └─ login.vue              登录
│  ├─ activity-detail/
│  │  └─ activity-detail.vue    活动详情
│  ├─ create-activity/
│  │  └─ create-activity.vue    创建活动
│  └─ create-unit/
│     └─ create-unit.vue        创建小队
├─ uni_modules/                 插件市场依赖（icons、scss、load-more、图片裁剪等）
└─ utils/
   ├─ json.js                   JSON 工具
   └─ squad-name.js             小队名称展示宽度与校验等
```

### 路由子树（pages.json）

`pages[]` **数组顺序**即路由声明顺序，**首条为默认启动页**。全局 `globalStyle.navigationStyle` 为 **`custom`**（自绘顶栏、`PageScaffold` 等）；仅在单页 `style` 里写 **`navigationStyle: "default"`** 时使用系统导航栏（当前为登录、创建小队）。

```text
pages.json → pages[]
│
├─ 主 Tab 区（未单独写 style → 继承 custom）
│  ├─ [1] pages/index/index                    首页
│  ├─ [2] pages/moment/moment                  动态 / 时刻
│  ├─ [3] pages/message/message                消息
│  └─ [4] pages/user/user                      我的
│
└─ 业务功能页
   ├─ [5] src/login/login                      登录（default 导航栏；
                                               标题「登录」）
   ├─ [6] src/activity-detail/activity-detail  活动详情（继承 custom）
   ├─ [7] src/create-activity/create-activity  创建活动（继承 custom）
   └─ [8] src/create-unit/create-unit          创建小队（default；
                                               标题「创建小队」）
```

---

## 功能与页面

路由顺序与导航样式见上文**「目录说明 → 路由子树」**。产品称呼对照：**首页** `pages/index/index`，**动态** `pages/moment/moment`，**消息** `pages/message/message`，**我的** `pages/user/user`；**登录 / 活动详情 / 创建活动 / 创建小队** 对应 `src/` 下同名目录中的页面。

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
  - **首页、时刻、消息**三个 Tab 页已开启 **`enablePullDownRefresh`**（下拉刷新）；详见下文「下拉刷新」。

---

## 主题与样式（UnitOne 令牌）

- **`uni.scss`**：在官方变量之外定义项目令牌 **`$uo-*`**（品牌色、文字色、页面背景、常用渐变、间距与圆角等），便于换肤与统一视觉。
- **组件样式**：业务页面与组件使用 **`<style lang="scss">`**（按需加 `scoped`），可直接书写 **`$uo-*`**；uni-app 会注入 `uni.scss`，一般无需手动 `@import`。
- **`constants/uo-theme.js`**：导出与 SCSS 一致的十六进制常量（如 `UoTheme.textTertiary`），用于模板中无法使用 SCSS 变量的场景（例如 **`uni-icons` 的 `:color`**、`swiper` 的 **`indicator-active-color`**）。修改主题时请与 **`uni.scss` 同步**。

---

## API 与 Mock

- **`config/env.js`**：`useMock` 为 **`true`** 时不走真实网络；为 **`false`** 时使用 **`uni.request`**。
- **`api/http.js` 的 `request(options)`**：当 **`useMock === true`** 时，根据 **`options.mock`** 返回结果（对象、数组或 **`(ctx) => data`**，其中 `ctx` 含 `url`、`method`、`data`），并对返回值做深拷贝；**不再在各 `api/modules/*.js` 内分散写 `if (useMock)`**。
- **`useMock === true` 且未传 `mock`**：请求会 **reject**，避免静默遗漏 Mock。
- **`useMock === false`**：忽略 `mock` 字段，正常请求。

---

## 下拉刷新

- **`pages.json`**：为 **`pages/index/index`**、**`pages/moment/moment`**、**`pages/message/message`** 配置了 **`enablePullDownRefresh`**（及 **`backgroundTextStyle`**）。
- **首页**：`onPullDownRefresh` 调用 **`HomeActivityCard`** 的 **`refresh()`** 重新拉取活动列表；组件内维护 **`currentCategoryId`**，刷新后仍按当前分类筛选。
- **时刻 / 消息**：将数据加载抽成 **`loadFeed`** / **`loadMessages`**，供 **`onLoad`** 与 **`onPullDownRefresh`** 共用；在 **`finally`** 中调用 **`uni.stopPullDownRefresh()`**。

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

当前以 UI 展示为主。Mock 数据放在 **`mock/`** 目录，并通过 **`api/http.js`** 的 **`mock`** 选项在 **`useMock`** 模式下注入；联调真实后端时将 **`config/env.js`** 中 **`useMock`** 设为 **`false`** 并配置 **`apiBaseUrl`**。

下一步建议：逐步替换为真实接口，并统一错误码 / 重试 / 鉴权与缓存策略。

---

## 改动日志

### 2026-05-13

- **个人页 · 小队管理**：`pages/user/components/user-squad-panel.vue` 中小队主卡片可点击进入详情（`squadId` 查询参数）；H5 使用手型光标，各端带按压态；右上角「创建小队」仍跳转 `src/create-unit`。
- **小队详情页**：新增 `pages/user/components/squad-detail.vue`，沿用个人页卡片式 UI（渐变统计卡、白底区块、紫粉强调色），展示头图、创建时间、小队活动/成员数、简介、成员列表、近期活动（当前 Mock 为空时展示空状态）与底部提示。
- **Mock**：`mock/user-display.js` 为面板小队条目增加 `id`；新增 `MOCK_USER_SQUAD_DEFAULT_ID`、`MOCK_USER_SQUAD_DETAILS` 与 `getMockUserSquadDetail()`，供详情页按 id 读取（未知 id 回退默认小队）。
- **路由**：`pages.json` 注册 `pages/user/components/squad-detail`，单页使用 `navigationStyle: "default"`，标题「小队详情」。

### 2026-05-09（补充）

- **Mock 拦截**：在 **`api/http.js`** 的 **`request`** 中统一处理 **`useMock`**；各 **`api/modules/*.js`** 仅传入 **`mock`** 与真实请求参数，逻辑更清晰。
- **下拉刷新**：首页、时刻、消息三个 Tab 开启页面级下拉刷新；首页活动列表刷新保留分类筛选。
- **主题令牌**：**`uni.scss`** 增加 **`$uo-*`** 变量；业务样式改用 **`lang="scss"`** 引用令牌；**`constants/uo-theme.js`** 供模板属性绑定颜色。
- **代码清理**：删除未使用的 **`api/index.js`**、**`components/button-list.vue`**；移除 **`logoutLocal`** 及当时未接线的 API 路径占位；**`utils/squad-name.js`** 内部宽度函数改为模块内私有；**README** 仓库树去掉已删除的 **`api/index.js`** 条目。

### 2026-05-09

- **主 Tab 骨架**：新增 `components/page-scaffold.vue`（顶栏 + 内容 slot + 底栏），首页、动态、消息、我的等 Tab 页改为使用该骨架，布局与导航一致。
- **我的页**：移除 `user-club-panel`，新增 `user-squad-panel` 小队相关区域；`user-data-panel` 等随结构调整。
- **创建小队**（`src/create-unit/create-unit.vue`）：完善表单与校验；`pages.json` 中为该页配置独立导航栏标题「创建小队」等样式。
- **小队名称规则**：新增 `utils/squad-name.js`（展示宽度：汉字 2、英文/数字/空格 1，总宽上限 16）；名称输入支持「已用 / 16」计数、非法字符过滤、超宽截断与提示；受控 `input` 在多端（含小程序）缩短显示不一致时通过 `key` 强制同步展示。
- **小队简介**：上限 **100 个字符**（`maxlength` + 输入截断 + 提交校验），并补充说明文案。
- **工程整理**：删除 `components/index.js`、`pages/index/components/index.js`、`pages/user/components/index.js` 等聚合导出；`api/http.js`、`pages/index/components/index-search-box.vue`、`project.private.config.json` 等小幅调整。
- **README**：「仓库总树」改为 `<pre><code>` 包裹，项目根目录下各一级文件夹名（`api/`、`components/`、`config/` 等）使用 `<span style="color: red;">` 标红显示。