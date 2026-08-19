<template>
	<view class="statsSection">
		<view class="statsInner">
			<view class="statsItem" v-for="item in stats" :key="item.label">
				<view class="statsNumber">{{ item.value }}</view>
				<view class="statsLabel">
					<text class="statsIcon">{{ item.icon }}</text>
					{{ item.label }}
				</view>
			</view>
			<view class="statsItem starItem">
				<view class="starContent">
					<view class="starTitle">
						<text class="starIcon">⭐</text>
						伙星
					</view>
					<view class="starNumber">{{ starValue }}</view>
				</view>
				<view class="starBtn">待领取</view>
			</view>
		</view>
	</view>
</template>

<script>
import { MOCK_USER_STATS_ITEMS, MOCK_USER_STAR_VALUE } from '@/mock/user-display.js'

export default {
	name: 'UserStatsPanel',
	props: {
		stats: {
			type: Array,
			default: () => MOCK_USER_STATS_ITEMS.map((row) => ({ ...row })),
		},
		starValue: {
			type: Number,
			default: MOCK_USER_STAR_VALUE,
		},
	},
}
</script>

<style scoped>
.statsSection {
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	padding: 22rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.statsSection::before {
	content: '';
	position: absolute;
	top: -50rpx;
	right: -36rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(125, 95, 255, 0.18) 0%, rgba(125, 95, 255, 0) 70%);
	pointer-events: none;
}

.statsInner {
	position: relative;
	z-index: 1;
	display: flex;
	gap: 16rpx;
}

.statsItem {
	flex: 1;
	text-align: center;
	padding: 22rpx 12rpx;
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.08) 0%, rgba(95, 190, 255, 0.06) 100%);
	border-radius: 22rpx;
	border: 1rpx solid rgba(125, 95, 255, 0.18);
}

.statsNumber {
	font-size: 36rpx;
	font-weight: 700;
	color: #1b1732;
	margin-bottom: 10rpx;
}

.statsLabel {
	font-size: 24rpx;
	color: #6c6392;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
}

.statsIcon {
	font-size: 24rpx;
}

.starItem {
	background: linear-gradient(145deg, rgba(255, 245, 230, 0.95) 0%, rgba(255, 232, 200, 0.88) 100%);
	border: 1rpx solid rgba(255, 149, 0, 0.28);
	position: relative;
	padding-bottom: 52rpx;
}

.starContent {
	text-align: center;
}

.starTitle {
	font-size: 24rpx;
	font-weight: 700;
	margin-bottom: 10rpx;
	color: #b35a00;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
}

.starIcon {
	font-size: 24rpx;
}

.starNumber {
	font-size: 36rpx;
	font-weight: 700;
	color: #c65d07;
	margin-bottom: 10rpx;
}

.starBtn {
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	color: #ffffff;
	font-size: 20rpx;
	font-weight: 600;
	padding: 8rpx 20rpx;
	border-radius: 999rpx;
	position: absolute;
	bottom: 14rpx;
	left: 50%;
	transform: translateX(-50%);
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
}
</style>
