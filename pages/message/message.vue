<template>
	<PageScaffold class="messagePage" :tab-index="2">
		<SystemPushMessage :list="messageList"></SystemPushMessage>
	</PageScaffold>
</template>

<script>
	import PageScaffold from '@/components/page-scaffold.vue'
	import SystemPushMessage from '@/components/system-push-message.vue'
	import { fetchMessageList } from '@/api/modules/message.js'

	export default {
		components: {
			PageScaffold,
			SystemPushMessage
		},
		data() {
			return {
				messageList: []
			}
		},
		async onLoad() {
			await this.loadMessages()
		},
		async onPullDownRefresh() {
			try {
				await this.loadMessages()
			} finally {
				uni.stopPullDownRefresh()
			}
		},
		methods: {
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
