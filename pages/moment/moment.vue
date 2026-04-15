<template>
	<view class="moment-page">
		<TopBar></TopBar>
		<MomentFeed
			:posts="posts"
			:nickname="nickname"
			:profile-avatar="profileAvatar"
			:cover-image="coverImage"
		/>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="1" />
	</view>
</template>

<script>
	import BottomTabBar from '@/components/BottomTabBar.vue'
	import TopBar from '@/components/TopBar.vue'
	import MomentFeed from '@/components/MomentFeed.vue'

	export default {
		components: {
			TopBar,
			BottomTabBar,
			MomentFeed
		},
		data() {
			return {
				nickname: '小明的朋友圈',
				profileAvatar: 'https://picsum.photos/120/120?random=100',
				coverImage: 'https://picsum.photos/900/360?random=99',
				posts: [
					{
						id: 1,
						name: '张三',
						avatar: 'https://picsum.photos/96/96?random=11',
						content: '今天的夕阳很好看，和朋友在江边散步，随手拍了几张。',
						images: [
							'https://picsum.photos/240/240?random=1',
							'https://picsum.photos/240/240?random=2',
							'https://picsum.photos/240/240?random=3'
						],
						time: '10分钟前',
						likes: ['李四', '王五', '赵六'],
						comments: [
							{ user: '李四', text: '太美了！' },
							{ user: '王五', text: '下次一起去。' }
						]
					},
					{
						id: 2,
						name: '小红',
						avatar: 'https://picsum.photos/96/96?random=12',
						content: '新买的绿植到家啦，感觉房间瞬间有了生机。',
						images: ['https://picsum.photos/240/240?random=4'],
						time: '1小时前',
						likes: ['小明', '阿杰'],
						comments: [{ user: '小明', text: '摆放得真好看。' }]
					},
					{
						id: 3,
						name: '阿杰',
						avatar: 'https://picsum.photos/96/96?random=13',
						content: '周末打卡新开的咖啡店，拿铁很香。',
						images: [],
						time: '昨天',
						likes: [],
						comments: []
					}
				]
			}
		}
	}
</script>

<style scoped>
.moment-page {
	min-height: 100vh;
	background-color: #f2f2f2;
	padding-bottom: 140rpx;
}
</style>
