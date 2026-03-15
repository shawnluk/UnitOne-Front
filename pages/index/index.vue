<template>
	<view>
		<TopBar></TopBar>
		<view class="content">
			<view class="nvgContent">
				<picker :value="region" @change="onRegionChange">
					<view class="cityBox">
						<text class="cityText">{{ currentCity }}</text>
						<text class="cityArrow">▾</text>
					</view>
				</picker>
				<view class="searchBox">
					<image class="searchIcon" src="/static/search.png" mode="aspectFit"></image>
					<input
						v-model="searchKeyword"
						class="searchInput"
						placeholder="搜索活动/圈子"
						placeholder-class="searchPlaceholder"
						confirm-type="search"
						@confirm="onSearchConfirm"
					/>
				</view>
			</view>
		</view>

		<!-- 轮播图组件 -->
		<view>
			<Swiper/>
		</view>

		<!-- 分类列表 -->
		<view>
			<HomeCategoryBar :items="categoryItems" @select="onSelectCategory" ></HomeCategoryBar>
			<view class="section-head">
				<view class="head-left">
					<text class="head-title" @click="onclickHeadTitle">热门</text>
					<text class="head-max">MAX</text>
				</view>
				<view class="head-right" @click="onClickFilter">
					<text class="filter-text">筛选</text>
					<text class="filter-arrow">▾</text>
				</view>
			</view>

		</view>
		<!-- 活动列表 -->
		<view class="activitylist">
			<HomeActivityCard @select="onSelectCard" :items="NewActivityList"></HomeActivityCard>
		</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="0" />
	</view>


</template>

<script>
	
	import TopBar from '@/components/TopBar.vue'
	import HomeCategoryBar from '@/components/HomeCategoryBar.vue'
	import HomeActivityCard from '@/components/HomeActivityCard.vue'
	import Swiper from '@/components/Swiper.vue'
	import BottomTabBar from '@/components/BottomTabBar.vue'


		export default {
		components:{ TopBar,Swiper,HomeActivityCard, HomeCategoryBar, BottomTabBar },
		data() {
			return {
				title: 'Hello',
				Number : 0,
				currentCity: '深圳',
				// 省 / 市 / 区 初始值
				region: ['广东省', '深圳市', '南山区'],
				searchKeyword: '',
				categoryItems: [
					{ acid:1,key: 'sport', text: '约球', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/ball-0.png' ,isActive:false},
					{ acid:2,key: 'movie', text: '观影', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/movie-0.png' ,isActive:false},
					{ acid:3,key: 'outdoor', text: '户外', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/traval-0.png' ,isActive:false},
					{ acid:4,key: 'chat', text: '闲聊', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/table-0.png' ,isActive:false},
					{ acid:5,key: 'art', text: '艺术', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/art-0.png',isActive:false},
					{ acid:6,key: 'subscribe', text: '订阅', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/favor-0.png', badge: true,isActive:false },
				],
				activityList:[
					{
						acid:1,
						name:"1-1",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-1",
						locationText:"地址-1",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-1",
						joinCount:10,
						joinAvatars: ['https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						acid:1,
						name:"1-2",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-1-2",
						locationText:"地址-1-2",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-1",
						joinCount:10,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						acid:2,
						name:"2-2",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-2",
						locationText:"地址-2",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-2",
						joinCount:11,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						acid:3,
						name:"3-3",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-3",
						locationText:"地址-3",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-3",
						joinCount:12,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
                        ],
					},
					{
						acid:4,
						name:"4-4",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-4",
						locationText:"地址-4",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-4",
						joinCount:13,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						acid:5,
						name:"5-5",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"标题-5",
						locationText:"地址-5",
						timeText:"时间",
						orgAvatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						orgName:"作者-5",
						joinCount:14,
						joinAvatars: [
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
							'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
                        ],
					}
				],
				NewActivityList:[],
			}
		},
		onLoad() {
				this.activityList.forEach((value)=>{value.isActive = true})
				this.NewActivityList = this.activityList
		},
		methods: {
			onRegionChange(e) {
				// e.detail.value 是 [省, 市, 区]
				const value = e.detail.value || []
				this.region = value
				// 只显示城市名（第二个）
				if (value.length >= 2) {
					// 例如 value[1] 是 “杭州市”，只要“杭州”的话可以再去掉“市”
					const city = value[1].replace(/市$/, '')
					this.currentCity = city
				}
			},
			onSearchConfirm() {
				const keyword = (this.searchKeyword || '').trim()
				if (!keyword) return
				uni.showToast({ title: `搜索：${keyword}`, icon: 'none' })
			},
			onSelectCategory(item,index) {
				this.NewActivityList=[]
				this.Number = item.acid
				this.categoryItems.forEach((value)=>{ value.isActive = false })
				this.NewActivityList = this.activityList.filter( e=>e.acid === item.acid)
				this.categoryItems[index].isActive = !this.categoryItems[index].isActive
				this.NewActivityList.forEach((value)=>{ value.isActive = true })
			},
			onClickFilter() {
				uni.showToast({ title: '点击了筛选', icon: 'none' })
			},
			onSelectCard(item) {
				uni.navigateTo({
				  url: "/src/ActivityDetail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item))
				})
				// console.log("/src/ActivityDetail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item)))
			},
			onclickHeadTitle(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			goto(i){
				if(i === 1){
					uni.navigateTo({
						url:"/components/ButtonList"
					})
				}
				if(i === 2){
					uni.navigateTo({
						url:"/components/Swiper"
					})
				}
			}
		}
	}
</script>

<style>
	.nvgContent{
		display: flex;
		margin-top: 20rpx;
		align-items: center;
		padding: 0 24rpx;
		gap: 16rpx;
	}

	.cityBox{
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		height: 76rpx;
		padding: 0 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(12rpx);
		border: 1rpx solid burlywood;
	}
	.cityText{
		font-size: 30rpx;
		font-weight: 700;
		color: #111;
	}
	.cityArrow{
		margin-left: 10rpx;
		font-size: 26rpx;
		color: #777;
		margin-top: 2rpx;
	}

	.searchBox{
		flex: 1;
		display: flex;
		align-items: center;
		height: 76rpx;
		padding: 0 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.92);
		border: 1rpx solid burlywood;
	}
	.searchIcon{
		width: 55rpx;
		height: 55rpx;
		opacity: 0.7;
		margin-right: 14rpx;
	}
	.searchInput{
		flex: 1;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 28rpx;
		color: #111;
	}
	.searchPlaceholder{
		color: #bbb;
	}
	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rpx 24rpx 10rpx;
	}

	.head-left {
		display: flex;
		align-items: center;
		gap: 14rpx;
	}

	.head-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #111;
	}

	.head-max {
		font-size: 30rpx;
		font-weight: 900;
		color: #ff7a00;
		letter-spacing: 2rpx;
	}

	.head-right {
		display: flex;
		align-items: center;
		gap: 10rpx;
		padding: 10rpx 14rpx;
		border-radius: 18rpx;
		background: rgba(255, 255, 255, 0.7);
	}

	.filter-text {
		font-size: 28rpx;
		color: #888;
	}

	.filter-arrow {
		font-size: 26rpx;
		color: #bbb;
		margin-top: -2rpx;
	}
	.activitylist {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		padding: 10rpx 24rpx 24rpx;
	}
</style>
