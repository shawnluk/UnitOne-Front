<template>
	<view class="messagePage">
		<TopBar></TopBar>

		<SystemPushMessage :list="messageList"></SystemPushMessage>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="2"></BottomTabBar>
	</view>
</template>

<script>
	import TopBar from '@/components/top-bar.vue'
	import BottomTabBar from '@/components/bottom-tab-bar.vue'
	import SystemPushMessage from '@/components/system-push-message.vue'
	import { fetchMessageList } from '@/api/modules/message.js'

	export default {
		components: {
			TopBar,
			BottomTabBar,
			SystemPushMessage
		},
		data() {
			return {
				messageList: []
			}
		},
		async onLoad() {
			try {
				const list = await fetchMessageList()
				this.messageList = Array.isArray(list) ? list : []
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '消息加载失败',
					icon: 'none'
				})
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
</style>
