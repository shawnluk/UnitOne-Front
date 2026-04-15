<template>
	<view class="system-message">
		<view class="page-title">
			<text class="title-text">{{ title }}</text>
			<text class="title-desc">{{ description }}</text>
		</view>

		<view class="message-list">
			<view class="message-card" v-for="item in list" :key="item.id">
				<view class="message-head">
					<view class="message-left">
						<view class="unread-dot" v-if="!item.read"></view>
						<text class="message-type">{{ item.type }}</text>
					</view>
					<text class="message-time">{{ item.time }}</text>
				</view>

				<text class="message-title">{{ item.title }}</text>
				<text class="message-content">{{ item.content }}</text>

				<view class="message-footer">
					<text class="message-link">{{ detailText }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SystemPushMessage',
		props: {
			list: {
				type: Array,
				default: () => []
			},
			title: {
				type: String,
				default: '系统消息'
			},
			description: {
				type: String,
				default: '及时查看公告、活动与账号提醒'
			},
			detailText: {
				type: String,
				default: '查看详情'
			}
		}
	}
</script>

<style scoped>
.system-message {
	width: 100%;
}

.page-title {
	padding: 24rpx 0 14rpx;
	display: flex;
	flex-direction: column;
}

.title-text {
	font-size: 38rpx;
	font-weight: 700;
	color: #1f2329;
}

.title-desc {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #8b919a;
}

.message-list {
	margin-top: 10rpx;
}

.message-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 20rpx 22rpx;
	margin-bottom: 18rpx;
	box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.05);
}

.message-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.message-left {
	display: flex;
	align-items: center;
}

.unread-dot {
	width: 14rpx;
	height: 14rpx;
	border-radius: 50%;
	background: #ff4d4f;
	margin-right: 10rpx;
}

.message-type {
	font-size: 24rpx;
	color: #3f75ff;
	background: #edf3ff;
	padding: 4rpx 12rpx;
	border-radius: 999rpx;
}

.message-time {
	font-size: 23rpx;
	color: #9aa1ab;
}

.message-title {
	display: block;
	margin-top: 14rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #222222;
}

.message-content {
	display: block;
	margin-top: 10rpx;
	font-size: 26rpx;
	line-height: 1.6;
	color: #5d6470;
}

.message-footer {
	margin-top: 16rpx;
	padding-top: 14rpx;
	border-top: 1rpx solid #f0f1f3;
}

.message-link {
	font-size: 24rpx;
	color: #3f75ff;
}
</style>
