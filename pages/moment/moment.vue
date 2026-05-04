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
	import { HOME_ACTIVITY_LIST } from '@/data/activity-list.js'

	export default {
		components: {
			TopBar,
			BottomTabBar,
			MomentFeed
		},
		data() {
			return {
				profileAvatar: 'https://picsum.photos/120/120?random=100',
				/** 与首页同源；后续可改为接口赋值 */
				activityListForStories: HOME_ACTIVITY_LIST,
				posts: [
					{
						id: 1,
						name: '张三',
						avatar: 'https://picsum.photos/96/96?random=11',
						activityTitle: '周末滨江徒步 · 已签到',
						content: '活动结束后和大家在江边等日落，风很轻，随便拍了几张都特别出片。',
						images: [
							'https://picsum.photos/800/800?random=1',
							'https://picsum.photos/800/800?random=2',
							'https://picsum.photos/800/800?random=3'
						],
						time: '10 分钟前',
						likeCount: 24,
						likes: ['李四', '王五', '赵六'],
						comments: [
							{ user: '李四', text: '构图绝了！' },
							{ user: '王五', text: '下次活动继续约～' }
						]
					},
					{
						id: 2,
						name: '小红',
						avatar: 'https://picsum.photos/96/96?random=12',
						activityTitle: '社区绿植工作坊',
						content: '工作坊领回来的多肉摆好啦，房间一下子有了生气。',
						images: ['https://picsum.photos/800/800?random=4'],
						time: '1 小时前',
						likeCount: 8,
						likes: ['小明', '阿杰'],
						comments: [{ user: '小明', text: '摆放得好有层次感。' }]
					},
					{
						id: 3,
						name: '阿杰',
						avatar: 'https://picsum.photos/96/96?random=13',
						activityTitle: '咖啡品鉴局 · 同城',
						content: '打卡活动合作咖啡馆，老板亲手拉的爱心拿铁，全场最佳。',
						images: [],
						time: '昨天',
						likeCount: 0,
						likes: [],
						comments: []
					}
				]
			}
		}
	}
</script>

<style scoped>
.momentPage {
	min-height: 100vh;
	background-color: #fafafa;
	padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}
</style>
