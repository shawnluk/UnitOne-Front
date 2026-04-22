<template>
	<view class="systemMessage">
		<view class="pageTitle">
			<text class="titleText">{{ title }}</text>
			<text class="titleDesc">{{ description }}</text>
		</view>

		<view class="messageList">
			<view class="messageCard" v-for="item in list" :key="item.id">
				<view class="messageHead">
					<view class="messageLeft">
						<view class="unreadDot" v-if="!item.read"></view>
						<text class="messageType">{{ item.type }}</text>
					</view>
					<text class="messageTime">{{ item.time }}</text>
				</view>

				<text class="messageTitle">{{ item.title }}</text>
				<text class="messageContent">{{ item.content }}</text>

				<view class="messageFooter">
					<text class="messageLink">{{ detailText }}</text>
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
.systemMessage {
	width: 100%;
}

.pageTitle {
	padding: 24rpx 0 14rpx;
	display: flex;
	flex-direction: column;
}

.titleText {
	font-size: 38rpx;
	font-weight: 700;
	color: #1f2329;
}

.titleDesc {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #8b919a;
}

.messageList {
	margin-top: 10rpx;
}

.messageCard {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 20rpx 22rpx;
	margin-bottom: 18rpx;
	box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.05);
}

.messageHead {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.messageLeft {
	display: flex;
	align-items: center;
}

.unreadDot {
	width: 14rpx;
	height: 14rpx;
	border-radius: 50%;
	background: #ff4d4f;
	margin-right: 10rpx;
}

.messageType {
	font-size: 24rpx;
	color: #3f75ff;
	background: #edf3ff;
	padding: 4rpx 12rpx;
	border-radius: 999rpx;
}

.messageTime {
	font-size: 23rpx;
	color: #9aa1ab;
}

.messageTitle {
	display: block;
	margin-top: 14rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #222222;
}

.messageContent {
	display: block;
	margin-top: 10rpx;
	font-size: 26rpx;
	line-height: 1.6;
	color: #5d6470;
}

.messageFooter {
	margin-top: 16rpx;
	padding-top: 14rpx;
	border-top: 1rpx solid #f0f1f3;
}

.messageLink {
	font-size: 24rpx;
	color: #3f75ff;
}
</style>
