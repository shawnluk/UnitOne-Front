<template>
	<PageScaffold class="momentPage" :tab-index="1">
		<MomentFeed
			:posts="posts"
			:profile-avatar="profileAvatar"
			:activities="activityListForStories"
			@refresh="loadFeed"
		/>
	</PageScaffold>
</template>

<script>
	import PageScaffold from '@/components/page-scaffold.vue'
	import MomentFeed from '@/components/moment-feed.vue'
	import { fetchHomeActivityList } from '@/api/modules/activity.js'
	import { fetchMomentPosts } from '@/api/modules/moment.js'

	export default {
		components: {
			PageScaffold,
			MomentFeed
		},
		data() {
			return {
				profileAvatar: 'https://picsum.photos/120/120?random=100',
				activityListForStories: [],
				posts: []
			}
		},
		/** 页面显示/返回时加载动态信息流（覆盖首次进入与发布返回） */
		async onShow() {
			await this.loadFeed()
		},
		/** 下拉刷新：重新加载动态信息流并停止刷新动画 */
		async onPullDownRefresh() {
			try {
				await this.loadFeed()
			} finally {
				uni.stopPullDownRefresh()
			}
		},
		methods: {
			/** 并行加载活动与动态数据并更新视图 */
			async loadFeed() {
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
	}
</script>

<style scoped>
.momentPage {
	min-height: 100vh;
	background: linear-gradient(180deg, #f4f5f7 0%, #f0f2ff 50%, #f4f5f7 100%);
	padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}
</style>
