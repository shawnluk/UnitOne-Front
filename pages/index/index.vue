<template>
	<view>
		<view class="topIndex"><image class="topImg" src="/static/real-madrid-ucl-1024x1024.jpg" mode="widthFix"></image></view>
		<view class="content">
			<view class="nvgContent">
				<button class="btn1">获取位置</button>
				<image src="/static/R-C.jpg" class="btn2"></image>
				<button class="btn3">搜索活动</button>
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
	</view>
		

</template>

<script>
	import { vShow } from 'vue';
	import HomeCategoryBar from '@/components/HomeCategoryBar.vue'
	import HomeActivityCard from '@/components/HomeActivityCard.vue'
	import Swiper from '@/components/Swiper.vue'
	

	export default {
		components:{ Swiper,HomeActivityCard, HomeCategoryBar },
		data() {
			return {
				title: 'Hello',
				Number : 0,
				categoryItems: [
					{ acid:1,key: 'sport', text: '约球', icon: '/static/e_000109_r.png' ,isActive:false},
					{ acid:2,key: 'movie', text: '观影', icon: '/static/e_000103_r.png' ,isActive:false},
					{ acid:3,key: 'outdoor', text: '户外', icon: '/static/e_000108_r.png' ,isActive:false},
					{ acid:4,key: 'chat', text: '闲聊', icon: '/static/e_000102_r_ll.png' ,isActive:false},
					{ acid:5,keykey: 'art', text: '艺术', icon: '/static/e_000100_r_w.png',isActive:false},
					{ acid:6,key: 'subscribe', text: '订阅', icon: '/static/e_000109_r.png', badge: true,isActive:false },
				],
				activityList:[
					{
						acid:1,
						name:"1-1",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-1",
						locationText:"地址-1",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-1",
						joinCount:10,
						joinAvatars: ['/static/flag_007_ll.png', '/static/e_000108_r.png', '/static/e_000103_r.png'],
					},
					{
						acid:1,
						name:"1-2",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-1-2",
						locationText:"地址-1-2",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-1",
						joinCount:10,
						joinAvatars: ['/static/flag_007_ll.png', '/static/e_000108_r.png', '/static/e_000103_r.png'],
					},
					{
						acid:2,
						name:"2-2",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-2",
						locationText:"地址-2",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-2",
						joinCount:11,
						joinAvatars: ['/static/flag_007_ll.png', '/static/e_000108_r.png', '/static/e_000103_r.png'],
					},
					{
						acid:3,
						name:"3-3",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-3",
						locationText:"地址-3",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-3",
						joinCount:12,
						joinAvatars: ['/static/e_000100_r_w.png', '/static/e_000102_r_ll.png', '/static/e_000109_r.png'],
					},
					{
						acid:4,
						name:"4-4",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-4",
						locationText:"地址-4",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-4",
						joinCount:13,
						joinAvatars: ['/static/flag_007_ll.png', '/static/e_000108_r.png', '/static/e_000103_r.png'],
					},
					{
						acid:5,
						name:"5-5",
						isActive:false,
						cover:"/static/e_000100_r_w.png",
						title:"标题-5",
						locationText:"地址-5",
						timeText:"时间",
						orgAvatar: '/static/logo.png',
						orgName:"作者-5",
						joinCount:14,
						joinAvatars: ['/static/e_000100_r_w.png', '/static/e_000100_r_w.png', '/static/e_000109_r.png','/static/e_000100_r_w.png', '/static/e_000102_r_ll.png', '/static/e_000109_r.png'],
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
			onSelectCategory(item,index) {
				this.NewActivityList=[],
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
				uni.showToast({ title: item.title, icon: 'none' })
				console.log(item)
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
	.topIndex {
		height: 200rpx;
		overflow: hidden;
	}
	.topImg{
		width:100%;
	}
	.nvgContent{
		display: flex;
		margin-top: 20rpx;
	}
	.nvgContent button {
		height: 100rpx;
		line-height: 100rpx;
	}
	.btn1{
		flex: 2;
		margin-left: 20rpx;
	}
	.btn2{
		flex: 4;
		height: 100rpx;
		margin: 0 10rpx;	
	}	
	.btn3{
		flex: 2;
		margin-right: 20rpx;
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
/* 	.activitylist {
		display: flex;
		justify-content: space-between;
		margin: 20rpx;
		flex-direction: column;
	} */
/* 	.ActivityDeteil {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-top: 20rpx;
		background-color: bisque;
		border-radius: 20rpx;
		height: 300rpx;
		
	} */
/* 	.activityImg {
		height: 200rpx;
		width: 30%;
		margin-top: 10rpx;
	} */
/* 	.activityText {
		position: absolute;
		margin-top: 20rpx;
		margin-left: 20rpx;
		left:250rpx
	} */
/* 	.activityAuthor {
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	} */
/* 	.activityPeople {
		position: absolute;
		bottom: 0;
		right: 0;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	} */
	.activitylist {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		padding: 10rpx 24rpx 24rpx;
	}
</style>
