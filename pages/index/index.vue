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
		<view class="taglist">
<!-- 			<button class="tagBtn1">约球</button>
			<button class="tagBtn2">观影</button>
			<button class="tagBtn3">户外</button>
			<button class="tagBtn4">收藏</button> -->
			<view v-for="(item,index) in tagList" :key="index">
				<button  @click="getselectBtn(item,index)" hover-class="is-hover" :type="changeBtnType">
					{{item.name}}{{item.active}}
				</button>
			</view>
		</view>
		<view class="activitylist">
			<view v-for="(item,index) in activityList" :key="index" v-show="showContent" >
				{{item.name}}
			</view>
		</view>
	</view>
		

</template>

<script>
import { vShow } from 'vue';

	// import Swiper from '@/components/Swiper.vue'
	

	export default {
		data() {
			return {
				title: 'Hello',
				Number : 0,
				changeBtnType:"deafult",
				showContent:false,
				bannerList: [
					{url:"/static/e_000100_r_w.png"},
					{url:"/static/e_000102_r_ll.png"},
					{url:"/static/e_000103_r.png" }
				],
				tagList: [
					{id:1,name:"约球",active:1},
					{id:2,name:"观影",active:1},
					{id:3,name:"户外",active:1},
					{id:4,name:"闲聊",active:1},
					{id:5,name:"订阅",active:1}
				],
				activityList:[
					{id:1,name:"1-1"},
					{id:2,name:"2-2"},
					{id:3,name:"3-3"},
					{id:4,name:"4-4"},
					{id:5,name:"5-5"}
				]
			}
		},
		onLoad() {

		},
		methods: {
			getselectBtn(item,index){
				this.changeBtnType = "deafult"
				// const newBtnType = document.getElementById("id") 
				this.Number = item.id
				console.log(index,item.name,this.Number);
				if(this.activityList[index].id === this.Number){
					// console.log(this.changeVshow)
					// this.changeType.type = "primary"					
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
	
	.banner {
		padding-top: 10rpx;
		width: 100%;
		height: 200px;
	}
	.banner image {
		width: 100%;
		height: 100%;
	}
	.taglist {
		display: flex;
		justify-content: space-between;
		margin: 0 20rpx;
	}
	.activitylist {
		display: flex;
		justify-content: space-between;
		margin: 0 40rpx;
	}

</style>
