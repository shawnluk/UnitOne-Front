<template>
	<view>
		<TopBar></TopBar>
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
		<view class="activitylist">
			<HomeActivityCard></HomeActivityCard>
			<view class="noMoreText">
				<text>没有更多了</text>
			</view>
		</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="0"></BottomTabBar>
	</view>
</template>

<script>
import TopBar from '@/components/top-bar.vue'
import HomeActivityCard from '@/components/home-activity-card.vue'
import SwiperBar from '@/components/swiper-bar.vue'
import BottomTabBar from '@/components/bottom-tab-bar.vue'
import IndexLogoBubble from './components/index-logo-bubble.vue'
import IndexSearchBox from './components/index-search-box.vue'
import HomeCategoryBar from './components/home-category-bar.vue'

export default {
	components: { TopBar, SwiperBar, HomeActivityCard, HomeCategoryBar, BottomTabBar, IndexLogoBubble, IndexSearchBox },
	data() {
		return {
			title: 'Hello',
		}
	},
	methods: {
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

	.activitylist {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		padding: 10rpx 24rpx 24rpx;
		padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
	}

	.noMoreText{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16rpx 0 8rpx;
		font-size: 24rpx;
		color: #9b9b9b;
	}
</style>
