<template>
	<view class="circleSection">
		<view class="circleHeader">
			<text class="circleTitle">{{ title }}</text>
			<text class="circleMore">{{ moreText }}</text>
		</view>
		<view class="circleItem">
			<image class="circleCover" :src="item.cover" mode="aspectFill"></image>
			<view class="circleInfo">
				<view class="circleName">{{ item.name }}</view>
				<view class="circleStats">{{ item.stats }}</view>
			</view>
			<view class="circleBadge">{{ item.badge }}</view>
			<view class="circleTop">{{ item.topTag }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserClubPanel',
	data() {
		return {
			title: '圈子管理 1',
			moreText: '更多 >',
			item: {
				cover: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg',
				name: '皇马球迷足球活动',
				stats: '0活动 1成员',
				badge: '圈子主',
				topTag: '置顶',
			},
		}
	},
}
</script>

<style scoped>
.circleSection {
	background-color: white;
	margin: 0 20rpx 20rpx;
	padding: 30rpx;
	border-radius: 16rpx;
}

.circleHeader {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.circleTitle {
	font-size: 32rpx;
	font-weight: bold;
}

.circleMore {
	font-size: 24rpx;
	color: #999;
}

.circleItem {
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 20rpx;
	background-color: #f9f9f9;
	border-radius: 12rpx;
}

.circleCover {
	width: 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
}

.circleInfo {
	flex: 1;
}

.circleName {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.circleStats {
	font-size: 20rpx;
	color: #999;
}

.circleBadge {
	background-color: #e6f7ff;
	color: #1890ff;
	font-size: 20rpx;
	padding: 4rpx 12rpx;
	border-radius: 12rpx;
}

.circleTop {
	background-color: #fff3cd;
	color: #ff6b00;
	font-size: 20rpx;
	padding: 4rpx 12rpx;
	border-radius: 12rpx;
}
</style>
