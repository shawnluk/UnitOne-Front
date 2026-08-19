<template>
	<view class="dataSection">
		<view class="dataInner">
			<view class="dataItem" v-for="item in items" :key="item.label">
				<view class="dataNumber">{{ item.value }}</view>
				<view class="dataLabel">{{ item.label }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { MOCK_USER_DATA_ITEMS } from '@/mock/user-display.js'

export default {
	name: 'UserDataPanel',
	props: {
		items: {
			type: Array,
			default: () => MOCK_USER_DATA_ITEMS.map((row) => ({ ...row })),
		},
	},
}
</script>

<style scoped>
.dataSection {
	margin-top: 30rpx;
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	padding: 22rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.dataSection::before {
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

.dataInner {
	position: relative;
	z-index: 1;
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
	font-weight: 700;
	color: #1b1732;
}

.dataLabel {
	font-size: 24rpx;
	color: #6c6392;
}
</style>
