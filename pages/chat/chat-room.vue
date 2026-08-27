<template>
	<view class="chatPage">
		<!-- 消息列表：类微信群聊气泡 -->
		<scroll-view scroll-y class="msgList" :scroll-into-view="scrollIntoView" :show-scrollbar="false">
			<view
				v-for="msg in messages"
				:id="'msg-' + msg.id"
				:key="msg.id"
				class="msgItem"
				:class="msg.from === 'me' ? 'row-me' : 'row-other'"
			>
				<!-- 对方头像（左侧） -->
				<image v-if="msg.from !== 'me'" class="msgAva" :src="msg.avatar" mode="aspectFill" />
				<view class="msgBody" :class="msg.from === 'me' ? 'body-me' : 'body-other'">
					<text v-if="msg.from !== 'me'" class="msgName">{{ msg.name }}</text>
					<view class="bubble" :class="msg.from === 'me' ? 'bubble-me' : 'bubble-other'">
						<text class="bubbleText">{{ msg.content }}</text>
					</view>
					<text class="msgTime">{{ msg.time }}</text>
				</view>
				<!-- 自己的头像（右侧） -->
				<image v-if="msg.from === 'me'" class="msgAva meAva" :src="meAvatar" mode="aspectFill" />
			</view>
		</scroll-view>

		<!-- 底部输入栏 -->
		<view class="inputBar">
			<input
				class="inputBox"
				v-model="draft"
				placeholder="说点什么…"
				confirm-type="send"
				:adjust-position="true"
				@confirm="send"
			/>
			<view class="sendBtn" hover-class="sendBtn--pressed" @click="send">发送</view>
		</view>
	</view>
</template>

<script>
	import { fetchChatThread } from '@/api/modules/message.js'
	import { MOCK_USER_DEFAULT_AVATAR } from '@/mock/user-display.js'

	export default {
		data() {
			return {
				squadId: '',
				squadName: '聊天室',
				messages: [],
				draft: '',
				scrollIntoView: '',
				meAvatar: MOCK_USER_DEFAULT_AVATAR
			}
		},
		/** 页面加载：解析会话参数、设置标题并加载聊天记录 */
		onLoad(options) {
			this.squadId = options.squadId || ''
			if (options.squadName) this.squadName = decodeURIComponent(options.squadName)
			uni.setNavigationBarTitle({ title: this.squadName })
			this.loadThread()
		},
		methods: {
			/** 加载聊天室消息记录并滚动到底部 */
			async loadThread() {
				const list = await fetchChatThread(this.squadId)
				this.messages = Array.isArray(list) ? list : []
				this.scrollToBottom()
			},
			/** 滚动到最后一条消息 */
			scrollToBottom() {
				this.$nextTick(() => {
					if (this.messages.length) {
						const last = this.messages[this.messages.length - 1]
						this.scrollIntoView = `msg-${last.id}`
					}
				})
			},
			/** 发送消息：追加到本地列表并回滚到底部 */
			send() {
				const text = (this.draft || '').trim()
				if (!text) return
				this.messages.push({
					id: Date.now(),
					from: 'me',
					name: '我',
					avatar: '',
					content: text,
					time: '刚刚'
				})
				this.draft = ''
				this.scrollToBottom()
			}
		}
	}
</script>

<style scoped>
.chatPage {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #ededed;
	box-sizing: border-box;
}

.msgList {
	flex: 1;
	padding: 20rpx 24rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.msgItem {
	display: flex;
	align-items: flex-start;
	margin-bottom: 28rpx;
}

.row-other {
	flex-direction: row;
}

.row-me {
	flex-direction: row-reverse;
}

.msgAva {
	width: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
	flex-shrink: 0;
	background: #e5e5e5;
}

.msgBody {
	max-width: 60%;
	display: flex;
	flex-direction: column;
}

.body-other {
	align-items: flex-start;
	margin-left: 16rpx;
}

.body-me {
	align-items: flex-end;
	margin-right: 16rpx;
}

.msgName {
	font-size: 22rpx;
	color: #8a8a8a;
	margin-bottom: 6rpx;
	margin-left: 4rpx;
}

.bubble {
	padding: 16rpx 22rpx;
	border-radius: 12rpx;
	position: relative;
	word-break: break-all;
}

.bubble-other {
	background: #ffffff;
	border-top-left-radius: 4rpx;
}

.bubble-me {
	background: #95ec69;
	border-top-right-radius: 4rpx;
}

.bubbleText {
	font-size: 28rpx;
	line-height: 1.5;
	color: #222222;
}

.msgTime {
	font-size: 20rpx;
	color: #b0b0b0;
	margin-top: 6rpx;
	padding: 0 4rpx;
}

.inputBar {
	display: flex;
	align-items: center;
	padding: 16rpx 20rpx calc(16rpx + env(safe-area-inset-bottom));
	background: #f7f7f7;
	border-top: 1rpx solid #e0e0e0;
}

.inputBox {
	flex: 1;
	height: 72rpx;
	background: #ffffff;
	border-radius: 36rpx;
	padding: 0 28rpx;
	font-size: 28rpx;
	color: #222222;
}

.sendBtn {
	margin-left: 18rpx;
	padding: 0 34rpx;
	height: 72rpx;
	line-height: 72rpx;
	border-radius: 36rpx;
	background: #3f75ff;
	color: #ffffff;
	font-size: 28rpx;
	font-weight: 600;
}

.sendBtn--pressed {
	opacity: 0.85;
}
</style>
