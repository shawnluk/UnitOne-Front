<template>
	<view class="pageRoot">
		<scroll-view scroll-y class="scroll" :show-scrollbar="false">
			<view class="hero">
				<image class="heroImg" :src="detail.cover" mode="aspectFill" />
				<view class="heroMask" />
				<!-- <view class="heroChips">
					<text v-if="detail.topTag" class="chip chip--soft">{{ detail.topTag }}</text>
					<text class="chip chip--accent">{{ detail.badge }}</text>
				</view> -->
				<view class="heroBottom">
					<text class="heroTitle">{{ detail.name }}</text>
					<text class="heroMeta">{{ detail.createdAtLabel }}</text>
				</view>
			</view>

			<view class="sheet">
				<view class="statRow">
					<view class="statCell">
						<text class="statNum">{{ detail.activityCount }}</text>
						<text class="statLab">小队活动</text>
					</view>
					<view class="statDivider" />
					<view class="statCell">
						<text class="statNum">{{ detail.memberCount }}</text>
						<text class="statLab">成员</text>
					</view>
				</view>

				<view class="block">
					<text class="blockTitle">小队简介</text>
					<text class="blockBody">{{ detail.intro }}</text>
				</view>

				<view class="block">
					<text class="blockTitle">成员（{{ detail.members.length }}）</text>
					<!-- 所有成员同一排展示，超出宽度横向滑动浏览；PC 端显示滚动条以便拖动 -->
					<scroll-view scroll-x class="memberScroll" :show-scrollbar="true">
						<view class="memberList">
							<view v-for="(m, i) in detail.members" :key="i" class="memberCard">
								<image class="memberAva" :src="m.avatar" mode="aspectFill" />
								<view class="memberText">
									<text class="memberName">{{ m.name }}</text>
									<!-- 仅显示队长/副队长角色，普通成员不显示「成员」文字，名称自然居中 -->
									<text v-if="m.role !== '成员'" class="memberRole">{{ m.role }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="block">
					<text class="blockTitle">近期活动</text>
					<view v-if="detail.recentActivities.length" class="actList">
						<view
							v-for="(a, j) in detail.recentActivities"
							:key="a.id || j"
							class="actCard"
							hover-class="actCardHover"
							@click="onActivityTap(a)"
						>
							<image v-if="a.cover" class="actCover" :src="a.cover" mode="aspectFill" />
							<view class="actInfo">
								<text class="actTitle">{{ a.title }}</text>
								<text v-if="a.timeLabel" class="actMeta">{{ a.timeLabel }}</text>
								<text v-if="a.location" class="actMeta">{{ a.location }}</text>
								<view class="actFooter">
									<text class="actFee">{{ a.fee || '免费' }}</text>
									<text v-if="a.orgName" class="actOrg">{{ a.orgName }}</text>
								</view>
							</view>
						</view>
					</view>
					<view v-else class="emptyAct">
						<text class="emptyActIco">📅</text>
						<text class="emptyActTxt">暂无小队活动，去发起一场吧</text>
					</view>
				</view>

				<view v-if="detail.notice" class="hintCard">
					<text class="hintTitle">提示</text>
					<text class="hintBody">{{ detail.notice }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {
	getMockUserSquadDetail,
	MOCK_USER_SQUAD_DEFAULT_ID,
	normalizeSquadDetail,
} from '@/mock/user-display.js'
import { fetchSquadDetail } from '@/api/modules/user.js'

export default {
	name: 'UserSquadDetail',
	data() {
		return {
			squadId: MOCK_USER_SQUAD_DEFAULT_ID,
			detail: getMockUserSquadDetail(MOCK_USER_SQUAD_DEFAULT_ID),
		}
	},
	/** 页面加载：解析路由参数 squadId，先用 Mock 兜底渲染，再请求后端详情覆盖 */
	onLoad(options) {
		const raw = options && options.squadId ? String(options.squadId) : ''
		const id = decodeURIComponent(raw) || MOCK_USER_SQUAD_DEFAULT_ID
		this.squadId = id
		this.detail = getMockUserSquadDetail(id)
		this.loadSquadDetail(id)
	},
	methods: {
		/**
		 * 加载小队详情。
		 * 发送 GET /api/v1/squads/:id（squadId 由调用方传入），
		 * 后端鉴权通过后返回基础信息 + 成员 + 活动，经 normalizeSquadDetail
		 * 映射为详情页视图结构；请求失败时保留 Mock 兜底数据。
		 * @param {string|number} id 小队 ID
		 */
		async loadSquadDetail(id) {
			try {
				const data = await fetchSquadDetail(id)
				if (data) {
					// 后端返回结构 → 详情页视图结构
					this.detail = normalizeSquadDetail(data)
				}
			} catch (_) {}
		},
		/**
		 * 点击活动卡片：跳转到活动详情页。
		 * 活动数据仅在首页加载活动列表时写入本地缓存（含完整 squad 字段），
		 * 这里不再写缓存，详情页会先读缓存、未命中则请求 GET /api/v1/activities/:id（带 squad 字段），
		 * 避免写入不含 squad 字段的不完整缓存导致详情页丢失小队头像/名称。
		 * @param {Object} activity recentActivities 中的活动条目
		 */
		onActivityTap(activity) {
			if (!activity || !activity.id) return
			uni.navigateTo({
				url: `/src/activity-detail/activity-detail?activity_id=${activity.id}`,
			})
		},
	},
}
</script>

<style scoped>
.pageRoot {
	min-height: 100vh;
	background: #f3f5fb;
}

.scroll {
	height: 100vh;
	box-sizing: border-box;
}

.hero {
	position: relative;
	height: 420rpx;
	overflow: hidden;
}

.heroImg {
	width: 100%;
	height: 100%;
}

.heroMask {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 220rpx;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(27, 23, 50, 0.72) 100%);
}

/* .heroChips {
	position: absolute;
	top: 24rpx;
	right: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 12rpx;
} */

/* .chip {
	font-size: 22rpx;
	font-weight: 600;
	padding: 8rpx 18rpx;
	border-radius: 999rpx;
}

.chip--soft {
	color: #5d37ff;
	background: rgba(255, 255, 255, 0.92);
	border: 1rpx solid rgba(125, 95, 255, 0.28);
}

.chip--accent {
	color: #ffffff;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.35);
} */

.heroBottom {
	position: absolute;
	left: 28rpx;
	right: 28rpx;
	bottom: 28rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.heroTitle {
	font-size: 36rpx;
	font-weight: 700;
	color: #ffffff;
	text-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.35);
}

.heroMeta {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.88);
}

.sheet {
	margin-top: -28rpx;
	position: relative;
	z-index: 1;
	padding: 0 24rpx 48rpx;
	padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.statRow {
	display: flex;
	align-items: stretch;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	padding: 28rpx 12rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	margin-bottom: 22rpx;
}

.statCell {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.statNum {
	font-size: 40rpx;
	font-weight: 700;
	color: #1b1732;
}

.statLab {
	font-size: 24rpx;
	color: #6c6392;
}

.statDivider {
	width: 2rpx;
	align-self: stretch;
	margin: 8rpx 0;
	background: linear-gradient(
		180deg,
		rgba(125, 95, 255, 0) 0%,
		rgba(125, 95, 255, 0.22) 50%,
		rgba(125, 95, 255, 0) 100%
	);
}

.block {
	background: #ffffff;
	border-radius: 28rpx;
	padding: 26rpx 24rpx;
	margin-bottom: 22rpx;
	box-shadow: 0 12rpx 32rpx rgba(50, 40, 90, 0.08);
	border: 1rpx solid rgba(255, 255, 255, 0.95);
}

.blockTitle {
	display: block;
	font-size: 28rpx;
	font-weight: 700;
	color: #1b1732;
	margin-bottom: 16rpx;
}

.blockBody {
	font-size: 26rpx;
	line-height: 1.65;
	color: #4a4468;
}

.memberScroll {
	width: 100%;
	/* 关键：scroll-view 横向滚动需 nowrap，否则部分端（H5/小程序）不触发滚动 */
	white-space: nowrap;
}

/* H5 桌面端修复：uni-app 把 scroll-view 渲染为内层 .uni-scroll-view 滚动容器，
   需 deep 选择器让其原生横向溢出并显示可拖动的细滚动条；
   小程序端无这些 web 类名与滚动条样式，不受影响 */
.memberScroll ::v-deep .uni-scroll-view {
	overflow-x: auto;
	white-space: nowrap;
}
.memberScroll ::v-deep .uni-scroll-view-content {
	display: inline-block;
	white-space: nowrap;
}
.memberScroll ::v-deep ::-webkit-scrollbar {
	height: 8rpx;
}
.memberScroll ::v-deep ::-webkit-scrollbar-thumb {
	border-radius: 4rpx;
	background: rgba(125, 95, 255, 0.35);
}
.memberScroll ::v-deep ::-webkit-scrollbar-track {
	background: transparent;
}

.memberList {
	/* 容器用 inline-block：宽度随内容收缩，超过容器宽度即可横向滚动（兼容性最好） */
	display: inline-block;
	vertical-align: top;
}

.memberCard {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	/* 正方形容器：高度与宽度一致 */
	width: 120rpx;
	height: 120rpx;
	/* 用 margin 代替容器 gap，避免部分端 flex gap 不生效导致宽度计算异常 */
	margin-right: 12rpx;
	padding: 12rpx 10rpx;
	background: rgba(125, 95, 255, 0.06);
	/* border: 1rpx solid rgba(125, 95, 255, 0.12); */
	border-radius: 20rpx;
	vertical-align: top;
}

.memberAva {
	width: 100rpx;
	height: 100rpx;
	border-radius: 22rpx;
	flex-shrink: 0;
	box-shadow: 0 10rpx 22rpx rgba(50, 40, 90, 0.15);
	/* margin-top: 10rpx; */
}

.memberText {
	/* 名称与角色同行展示 */
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
	max-width: 100%;
}

.memberName {
	max-width: 76rpx;
	font-size: 24rpx;
	font-weight: 600;
	color: #1b1732;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.memberRole {
	font-size: 20rpx;
	color: #5d37ff;
	font-weight: 600;
	flex-shrink: 0;
}

.actList {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.actCard {
	display: flex;
	gap: 20rpx;
	padding: 20rpx;
	border-radius: 20rpx;
	background: rgba(125, 95, 255, 0.06);
	border: 1rpx solid rgba(125, 95, 255, 0.12);
}

/* 活动卡片点击态 */
.actCardHover {
	opacity: 0.8;
}

.actCover {
	width: 140rpx;
	height: 140rpx;
	border-radius: 16rpx;
	flex-shrink: 0;
	background: #f1edff;
}

.actInfo {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 8rpx;
}

.actTitle {
	font-size: 28rpx;
	font-weight: 600;
	color: #1b1732;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.actMeta {
	font-size: 24rpx;
	color: #6c6392;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.actFooter {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
}

.actFee {
	font-size: 24rpx;
	font-weight: 600;
	color: #5d37ff;
}

.actOrg {
	font-size: 22rpx;
	color: #9a94b0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.emptyAct {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 36rpx 16rpx;
	gap: 12rpx;
	border-radius: 20rpx;
	background: rgba(125, 95, 255, 0.05);
	border: 1rpx dashed rgba(125, 95, 255, 0.22);
}

.emptyActIco {
	font-size: 44rpx;
}

.emptyActTxt {
	font-size: 24rpx;
	color: #6c6392;
	text-align: center;
	line-height: 1.5;
}

.hintCard {
	padding: 22rpx 24rpx;
	border-radius: 24rpx;
	background: rgba(232, 244, 255, 0.95);
	border: 1rpx solid rgba(125, 95, 255, 0.12);
}

.hintTitle {
	display: block;
	font-size: 24rpx;
	font-weight: 700;
	color: #1b1732;
	margin-bottom: 10rpx;
}

.hintBody {
	font-size: 24rpx;
	line-height: 1.55;
	color: #5a5478;
}
</style>
