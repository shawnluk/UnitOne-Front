<template>
	<PageScaffold class="messagePage" :tab-index="2">
		<!-- 消息分类切换：系统推送 / 聊天室 -->
		<view class="tabBar">
			<view
				class="tabItem"
				:class="{ active: currentTab === 'system' }"
				@click="switchTab('system')"
			>系统消息</view>
			<view
				class="tabItem"
				:class="{ active: currentTab === 'chat' }"
				@click="switchTab('chat')"
			>聊天室</view>
		</view>

		<SystemPushMessage v-if="currentTab === 'system'" :list="messageList"></SystemPushMessage>
		<ChatRoomMessage v-else :list="chatList"></ChatRoomMessage>
	</PageScaffold>
</template>

<script>
	import PageScaffold from '@/components/page-scaffold.vue'
	import SystemPushMessage from '@/components/system-push-message.vue'
	import ChatRoomMessage from '@/components/chat-room-message.vue'
	import { fetchMessageList, fetchChatMessageList } from '@/api/modules/message.js'

	export default {
		components: {
			PageScaffold,
			SystemPushMessage,
			ChatRoomMessage
		},
		data() {
			return {
				currentTab: 'system',
				messageList: [],
				chatList: []
			}
		},
		/** 页面加载：拉取系统消息与聊天室消息 */
		async onLoad() {
			await this.loadMessages()
			await this.loadChatMessages()
		},
		/** 下拉刷新：重新拉取两类消息并停止刷新动画 */
		async onPullDownRefresh() {
			try {
				await this.loadMessages()
				await this.loadChatMessages()
			} finally {
				uni.stopPullDownRefresh()
			}
		},
		methods: {
			/** 切换消息分类 tab */
			switchTab(tab) {
				this.currentTab = tab
			},
			/** 拉取系统消息列表并更新视图 */
			async loadMessages() {
				try {
					const list = await fetchMessageList()
					this.messageList = Array.isArray(list) ? list : []
				} catch (e) {
					uni.showToast({
						title: (e && e.message) || '消息加载失败',
						icon: 'none'
					})
				}
			},
			/** 拉取聊天室消息列表并更新视图 */
			async loadChatMessages() {
				try {
					const list = await fetchChatMessageList()
					this.chatList = Array.isArray(list) ? list : []
				} catch (e) {
					uni.showToast({
						title: (e && e.message) || '聊天室加载失败',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style scoped>
.messagePage {
	min-height: 100vh;
	background: #f4f5f7;
	padding: 0 24rpx 140rpx;
	box-sizing: border-box;
}

.tabBar {
	display: flex;
	background: #ffffff;
	border-radius: 16rpx;
	padding: 8rpx;
	margin: 20rpx 0 10rpx;
	box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.05);
}

.tabItem {
	flex: 1;
	text-align: center;
	padding: 16rpx 0;
	font-size: 28rpx;
	color: #5d6470;
	border-radius: 12rpx;
	transition: all 0.2s;
}

.tabItem.active {
	background: #3f75ff;
	color: #ffffff;
	font-weight: 600;
}
</style>
