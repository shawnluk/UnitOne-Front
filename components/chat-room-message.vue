<template>
	<view class="chatRoom">
		<view
			class="chatCard"
			hover-class="chatCard--pressed"
			hover-stay-time="120"
			v-for="item in list"
			:key="item.id"
			@click="openChat(item)"
		>
			<image class="chatAva" :src="item.squadAvatar" mode="aspectFill" />
			<view class="chatInfo">
				<view class="chatTop">
					<text class="chatName">{{ item.squadName }}</text>
					<text class="chatTime">{{ item.time }}</text>
				</view>
				<view class="chatBottom">
					<text class="chatMsg" :number-of-lines="1">{{ item.lastMsg }}</text>
					<view class="unreadBadge" v-if="item.unread">{{ item.unread }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ChatRoomMessage',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			/** 点击会话，跳转到对应小队的聊天室页面 */
			openChat(item) {
				uni.navigateTo({
					url: `/pages/chat/chat-room?squadId=${item.id}&squadName=${encodeURIComponent(item.squadName)}`
				})
			}
		}
	}
</script>

<style scoped>
.chatRoom {
	width: 100%;
}

.chatCard {
	display: flex;
	align-items: center;
	background: #ffffff;
	border-radius: 16rpx;
	padding: 22rpx;
	margin-bottom: 18rpx;
	box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.05);
}

.chatAva {
	width: 92rpx;
	height: 92rpx;
	border-radius: 50%;
	flex-shrink: 0;
	background: #f2f2f2;
}

.chatInfo {
	flex: 1;
	min-width: 0;
	margin-left: 20rpx;
}

.chatTop {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.chatName {
	font-size: 30rpx;
	font-weight: 600;
	color: #222222;
}

.chatTime {
	font-size: 23rpx;
	color: #9aa1ab;
	flex-shrink: 0;
	margin-left: 16rpx;
}

.chatBottom {
	margin-top: 10rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.chatMsg {
	flex: 1;
	min-width: 0;
	font-size: 26rpx;
	color: #5d6470;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.unreadBadge {
	min-width: 32rpx;
	height: 32rpx;
	line-height: 32rpx;
	text-align: center;
	padding: 0 8rpx;
	border-radius: 999rpx;
	background: #ff4d4f;
	color: #ffffff;
	font-size: 22rpx;
	flex-shrink: 0;
	margin-left: 16rpx;
}
</style>
