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
					<view class="memberList">
						<view v-for="(m, i) in detail.members" :key="i" class="memberRow">
							<image class="memberAva" :src="m.avatar" mode="aspectFill" />
							<view class="memberText">
								<text class="memberName">{{ m.name }}</text>
								<text class="memberRole">{{ m.role }}</text>
							</view>
						</view>
					</view>
				</view>

				<view class="block">
					<text class="blockTitle">近期活动</text>
					<view v-if="detail.recentActivities.length" class="actList">
						<view
							v-for="(a, j) in detail.recentActivities"
							:key="j"
							class="actRow"
						>
							<text class="actTitle">{{ a.title }}</text>
							<text class="actTime">{{ a.timeLabel }}</text>
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
import { getMockUserSquadDetail, MOCK_USER_SQUAD_DEFAULT_ID } from '@/mock/user-display.js'

export default {
	name: 'UserSquadDetail',
	data() {
		return {
			squadId: MOCK_USER_SQUAD_DEFAULT_ID,
			detail: getMockUserSquadDetail(MOCK_USER_SQUAD_DEFAULT_ID),
		}
	},
	onLoad(options) {
		const raw = options && options.squadId ? String(options.squadId) : ''
		const id = decodeURIComponent(raw) || MOCK_USER_SQUAD_DEFAULT_ID
		this.squadId = id
		this.detail = getMockUserSquadDetail(id)
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

.memberList {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.memberRow {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.memberAva {
	width: 88rpx;
	height: 88rpx;
	border-radius: 22rpx;
	flex-shrink: 0;
	box-shadow: 0 10rpx 22rpx rgba(50, 40, 90, 0.15);
}

.memberText {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.memberName {
	margin-left: 20rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #1b1732;
}

.memberRole {
	margin-left: 20rpx;
	font-size: 24rpx;
	color: #5d37ff;
	font-weight: 600;
}

.actList {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.actRow {
	padding: 18rpx 20rpx;
	border-radius: 20rpx;
	background: rgba(125, 95, 255, 0.06);
	border: 1rpx solid rgba(125, 95, 255, 0.12);
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.actTitle {
	font-size: 26rpx;
	font-weight: 600;
	color: #1b1732;
}

.actTime {
	font-size: 22rpx;
	color: #6c6392;
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
