<template>
	<view class="statsSection">
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
</template>

<script>
export default {
	name: 'UserStatsPanel',
	data() {
		return {
			stats: [
				{ icon: '🔥', label: '伙柴', value: 0 },
				{ icon: '🎫', label: '伙卡', value: 0 },
			],
			starValue: 5,
		}
	},
}
</script>

<style scoped>
.statsSection {
	background-color: white;
	margin: 0 20rpx;
	padding: 30rpx;
	border-radius: 16rpx;
	display: flex;
	gap: 20rpx;
}

.statsItem {
	flex: 1;
	text-align: center;
	padding: 20rpx;
	background-color: #f9f9f9;
	border-radius: 12rpx;
}

.statsNumber {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.statsLabel {
	font-size: 24rpx;
	color: #666;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
}

.statsIcon {
	font-size: 24rpx;
}

.starItem {
	background-color: #fff3cd;
	position: relative;
}

.starContent {
	text-align: center;
}

.starTitle {
	font-size: 24rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	color: #ff6b00;
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
	font-weight: bold;
	color: #ff6b00;
	margin-bottom: 10rpx;
}

.starBtn {
	background-color: #ff6b00;
	color: white;
	font-size: 20rpx;
	padding: 6rpx 16rpx;
	border-radius: 16rpx;
	position: absolute;
	bottom: 10rpx;
	left: 50%;
	transform: translateX(-50%);
}
</style>
