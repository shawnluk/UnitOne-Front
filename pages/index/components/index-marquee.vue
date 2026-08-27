<template>
	<view class="marquee">
		<view class="marqueeIcon">📢</view>
		<view class="marqueeTrack">
			<view class="marqueeInner" :style="{ animationDuration: duration + 's' }">
				<!-- 复制一份实现无缝循环：位移 -50% 即回到起点 -->
				<text class="marqueeText">{{ loopText }}</text>
				<text class="marqueeText">{{ loopText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { MOCK_INDEX_BROADCAST } from '@/mock/index-page.js'

export default {
	name: 'IndexMarquee',
	props: {
		/** 广播消息数组，每条消息用分隔符拼接后整体滚动 */
		messages: {
			type: Array,
			default: () => MOCK_INDEX_BROADCAST,
		},
		/** 分隔符 */
		separator: {
			type: String,
			default: ' · ',
		},
		/** 单圈滚动时长（秒） */
		duration: {
			type: Number,
			default: 12,
		},
	},
	computed: {
		/** 拼接所有广播消息为一条滚动文本，副本间距由 padding-right 提供 */
		loopText() {
			const list = Array.isArray(this.messages) ? this.messages : []
			return list.join(this.separator)
		},
	},
}
</script>

<style scoped>
.marquee {
	display: flex;
	align-items: center;
	margin: 12rpx 24rpx 6rpx;
	padding: 14rpx 20rpx;
	border-radius: 16rpx;
	background: linear-gradient(120deg, rgba(125, 95, 255, 0.1) 0%, rgba(255, 95, 179, 0.08) 100%);
	border: 1rpx solid rgba(125, 95, 255, 0.16);
}

.marqueeIcon {
	font-size: 30rpx;
	flex-shrink: 0;
	margin-right: 14rpx;
}

.marqueeTrack {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	white-space: nowrap;
}

.marqueeInner {
	display: inline-flex;
	white-space: nowrap;
	will-change: transform;
	animation: marqueeMove 12s linear infinite;
}

.marqueeText {
	font-size: 24rpx;
	color: #7a5cff;
	font-weight: 500;
	flex-shrink: 0;
	white-space: nowrap;
	/* 副本间额外间隔：属于盒子宽度的一部分，两份副本对称，-50% 位移仍无缝 */
	padding-right: 100rpx;
}

/* 弹幕式循环：位移 -50% 后瞬间回到起点形成无缝滚动 */
@keyframes marqueeMove {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-50%);
	}
}
</style>
