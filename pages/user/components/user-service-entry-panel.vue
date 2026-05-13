<template>
	<view class="navSection">
		<view class="navInner">
			<view class="navItem" v-for="item in items" :key="item.label">
				<text class="navIcon">{{ item.icon }}</text>
				<text class="navLabel">{{ item.label }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { MOCK_USER_SERVICE_ENTRIES } from '@/mock/user-display.js'

export default {
	name: 'UserServiceEntryPanel',
	data() {
		return {
			items: MOCK_USER_SERVICE_ENTRIES.map((row) => ({ ...row })),
		}
	},
}
</script>

<style scoped>
.navSection {
	margin-top: 30rpx;
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	padding: 26rpx 12rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.navSection::before {
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

.navInner {
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: space-around;
}

.navItem {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.navIcon {
	font-size: 48rpx;
}

.navLabel {
	font-size: 24rpx;
	font-weight: 500;
	color: #5d547f;
}
</style>
