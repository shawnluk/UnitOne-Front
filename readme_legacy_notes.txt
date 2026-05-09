【从 README.md 迁移的内容】
说明：该文件用于保留原先 README 中的运行报错与临时备忘，便于后续排查与继续落地，不作为对外展示文档。

====================
运行时报错（原始粘贴）
====================
19:30:22.950 [Vue warn]: Unhandled error during execution of async component loader \n at <AsyncComponentWrapper>\nat <PageBody>\nat <Page>\nat <Anonymous>\nat <KeepAlive>\nat <RouterView>\nat <Layout>\nat <App>
19:30:23.007 ‍[⁠SyntaxError⁠]‍ {message: "Unexpected token ."}

====================
临时备忘（组件化建议 / TODO）
====================
<!-- 更改裁剪组件-->

我先快速看一下你当前页面/组件分布，再给你一份“优先级排序”的可复用组件清单，尽量都是你现在就能落地的。

非常适合继续做组件化，你现在项目已经有这个趋势了。按复用价值给你一版建议（从高到低）：

页面容器骨架组件（最高优先）
把 TopBar + 页面主体 + BottomTabBar 抽成统一壳组件，比如 components/PageScaffold.vue。
你在 index/message/moment/user 都有类似结构，后续每页只管内容区，减少重复布局代码。

列表卡片基类组件
你现在有 HomeActivityCard、SystemPushMessage、MomentFeed，都属于“列表 + 卡片项”。
可以抽一个通用 BaseCardList（支持 v-for、empty 状态、loading、slot 自定义 item），业务组件只包一层样式和字段映射。

通用 SectionHeader 组件
index.vue 的“热门 MAX + 筛选”、user.vue 的“小队管理 + 更多”是同一类模块头。
建议做 components/SectionHeader.vue，支持左标题、副标、右操作文字/图标、点击事件。

统计宫格/功能宫格组件
user.vue 里 stats-section、nav-section、data-section 都是“图标/数字+文案宫格”。
可抽成 StatsGrid.vue / ActionGrid.vue，通过 items 配置渲染，页面只传数据。

用户头部信息组件
user.vue 顶部用户卡（头像、昵称、ID、badge）建议抽 UserProfileHeader.vue。
这块通常会在“我的主页/他人主页/编辑资料”复用，后面接接口也更集中。

浮动发布按钮组件
user.vue 的 publish-btn 可独立成 FloatingActionButton.vue，支持 icon/text/position。
后面活动页、小队相关页、消息页都可能复用这个入口。

<!-- 20260415 -->

<!-- 下一步可以继续把 user.vue 里已经无用的旧样式（原本内联区域样式）清理掉 -->

基本功能UI展示确定，考虑先建立虚拟数据库，对接口进行优化
