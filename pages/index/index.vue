<template>
	<PageScaffold :tab-index="0">
		<view class="indexContent">
			<!-- logo吐泡泡 -->
			<IndexLogoBubble></IndexLogoBubble>
			<!-- 首页搜索框 -->
			<IndexSearchBox @search="onSearch"></IndexSearchBox>
		</view>

		<!-- 轮播图组件 -->
		<SwiperBar></SwiperBar>

		<!-- 分类列表 -->
		<HomeCategoryBar></HomeCategoryBar>

		<!-- 活动列表 -->
		<view class="activityList">
			<view class="refreshingBar" v-if="refreshing">
				<view class="spinner"></view>
				<text class="refreshingText">刷新中...</text>
			</view>
			<HomeActivityCard ref="activityCard"></HomeActivityCard>
		</view>
	</PageScaffold>
</template>

<script>
import PageScaffold from '@/components/page-scaffold.vue'
import HomeActivityCard from '@/components/home-activity-card.vue'
import SwiperBar from '@/components/swiper-bar.vue'
import IndexLogoBubble from './components/index-logo-bubble.vue'
import IndexSearchBox from './components/index-search-box.vue'
import HomeCategoryBar from './components/home-category-bar.vue'

export default {
	components: { PageScaffold, SwiperBar, HomeActivityCard, HomeCategoryBar, IndexLogoBubble, IndexSearchBox },
	data() {
		return {
			/** 下拉刷新中标记，用于显示自定义转圈 */
			refreshing: false,
		}
	},
	async onPullDownRefresh() {
		this.refreshing = true
		try {
			const card = this.$refs.activityCard
			const refreshTask = card && typeof card.refresh === 'function'
				? card.refresh()
				: Promise.resolve()
			// 保证下拉刷新的转圈动画至少持续 3 秒
			await Promise.all([refreshTask, this.delay(3000)])
		} finally {
			this.refreshing = false
			uni.stopPullDownRefresh()
		}
	},
	onReachBottom() {
		const card = this.$refs.activityCard
		if (card && typeof card.loadMore === 'function') {
			card.loadMore()
		}
	},
	methods: {
		delay(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		onSearch(payload) {
			const keyword = payload && payload.keyword ? payload.keyword : ''
			if (!keyword) return
			uni.showToast({ title: `搜索：${keyword}`, icon: 'none' })
		}
	}
}
</script>

<style>
	.indexContent{
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		gap: 12rpx;
	}

	.activityList {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		padding: 10rpx 24rpx 24rpx;
		padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
	}

	.refreshingBar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
		padding: 12rpx 0;
	}

	.spinner {
		width: 32rpx;
		height: 32rpx;
		border: 4rpx solid #e6e1f7;
		border-top-color: #7d5fff;
		border-radius: 50%;
		animation: refreshing-spin 0.8s linear infinite;
	}

	.refreshingText {
		font-size: 24rpx;
		color: #9b9b9b;
	}

	@keyframes refreshing-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
