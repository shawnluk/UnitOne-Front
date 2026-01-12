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
		<!-- 配置轮播图属性 -->
		<view class="banner">
			<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			circular>			
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<!-- <image :src="item.url" mode="aspectFill" /> -->
				<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类列表 -->
		<view class="activitylist">
<!-- 			<button class="tagBtn1">约球</button>
			<button class="tagBtn2">观影</button>
			<button class="tagBtn3">户外</button>
			<button class="tagBtn4">收藏</button> -->
			<!-- 分类标题 -->
			<view v-for="(item,index) in activityList" :key="index">
				<button>{{item.name}}</button>
			</view>
		</view>
	</view>
		

</template>

<script>
	// import Swiper from '@/components/Swiper.vue'
	

	export default {
		data() {
			return {
				title: 'Hello',
				bannerList: [
					{url:"/static/e_000100_r_w.png"},
					{url:"/static/e_000102_r_ll.png"},
					{url:"/static/e_000103_r.png" }
				],
				activityList:[
					{name:"约球"},
					{name:"观影"},
					{name:"户外"},
					{name:"订阅"}
				],
				activityContent:[
					{content:"1"},
					{content:"2"},
					{content:"3"},
					{content:"4"},
				]
			}
		},
		onLoad() {

		},
		methods: {

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
	
	.banner {
		padding-top: 10rpx;
		width: 100%;
		height: 200px;
	}
	.banner image {
		width: 100%;
		height: 100%;
	}
/* 	.TagList {
		display: flex;
	} */
	.activitylist {
		margin: 0 20rpx;
		display: flex;
		justify-content: space-between;
	}

</style>
