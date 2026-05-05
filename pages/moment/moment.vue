<template>
	<view class="momentPage">
		<TopBar></TopBar>
		<MomentFeed
			:posts="posts"
			:profile-avatar="profileAvatar"
			:activities="activityListForStories"
		/>

		<BottomTabBar :current="1"></BottomTabBar>
	</view>
</template>

<script>
	import BottomTabBar from '@/components/bottom-tab-bar.vue'
	import TopBar from '@/components/top-bar.vue'
	import MomentFeed from '@/components/moment-feed.vue'
	import { fetchHomeActivityList } from '@/api/modules/activity.js'
	import { fetchMomentPosts } from '@/api/modules/moment.js'

	export default {
		components: {
			TopBar,
			BottomTabBar,
			MomentFeed
		},
		data() {
			return {
				profileAvatar: 'https://picsum.photos/120/120?random=100',
				activityListForStories: [],
				posts: []
			}
		},
		async onLoad() {
			try {
				const [activities, posts] = await Promise.all([
					fetchHomeActivityList(),
					fetchMomentPosts()
				])
				this.activityListForStories = Array.isArray(activities) ? activities : []
				this.posts = Array.isArray(posts) ? posts : []
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '加载失败',
					icon: 'none'
				})
			}
		}
	}
</script>

<style scoped>
.momentPage {
	min-height: 100vh;
	background: linear-gradient(180deg, #f4f5f7 0%, #f0f2ff 50%, #f4f5f7 100%);
	padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}
</style>
