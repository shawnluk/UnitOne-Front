<template>
	<view class="navSection">
		<view class="navItem" v-for="item in items" :key="item.label">
			<text class="navIcon">{{ item.icon }}</text>
			<text class="navLabel">{{ item.label }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserServiceEntryPanel',
	data() {
		return {
			items: [
				{ icon: '📋', label: '订单' },
				{ icon: '💰', label: '钱包' },
				{ icon: '🎧', label: '客服' },
				{ icon: '⚙️', label: '设置' },
			],
		}
	},
}
</script>

<style scoped>
.navSection {
	background-color: white;
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 16rpx;
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
	color: #666;
}
</style>
