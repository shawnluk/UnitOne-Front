<template>
	<view class="dataSection">
		<view class="dataItem" v-for="item in items" :key="item.label">
			<view class="dataNumber">{{ item.value }}</view>
			<view class="dataLabel">{{ item.label }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserDataPanel',
	data() {
		return {
			items: [
				{ label: '圈子', value: 4 },
				{ label: '好友', value: 1 },
				{ label: '历史活动', value: 0 },
				{ label: '相册', value: 0 },
			],
		}
	},
}
</script>

<style scoped>
.dataSection {
	background-color: white;
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 16rpx;
	display: flex;
	justify-content: space-around;
}

.dataItem {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.dataNumber {
	font-size: 32rpx;
	font-weight: bold;
}

.dataLabel {
	font-size: 24rpx;
	color: #666;
}
</style>
