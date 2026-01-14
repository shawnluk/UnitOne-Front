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
		<view class="buttonlist">
			<view v-for="(item,index) in buttonList" :key="index">
				<button  @click="getselectBtn(item,index)" hover-class="is-hover" :style="{color:item.isActive ? 'blue' : 'red'}">
					{{item.name}}{{item.active}}
				</button>
			</view>
		</view>
		<view class="activitylist">
			<view v-for="(item,index) in NewActivityList" :key="index" :style="{display:item.isActive ? 'contents' : 'none' }">
				<view class="ActivityDeteil" @click="goto(item.acid)">
					<image :src="item.photo" class="activityImg"></image>
					<view class="activityText">
						<view>{{item.title}}</view>
						<view>{{item.time}}</view>
						<view>{{item.address}}</view>
					</view>
					<view class="activityAuthor">
						<view>
							{{item.author}}
						</view>
					</view>
					<view class="activityPeople">
						<view>
							"参与人数："{{item.people}}
						</view>
					</view>
				</view>
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
				btnStyleObj:{
					// background-color : #179b16
					color:"red"
				},
				bannerList: [
					{url:"/static/e_000100_r_w.png"},
					{url:"/static/e_000102_r_ll.png"},
					{url:"/static/e_000103_r.png" }
				],
				buttonList: [
					{acid:1,name:"约球",isActive:false},
					{acid:2,name:"观影",isActive:false},
					{acid:3,name:"户外",isActive:false},
					{acid:4,name:"闲聊",isActive:false},
					{acid:5,name:"订阅",isActive:false}
				],
				activityList:[
					{acid:1,name:"1-1",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-1",address:"地址-1",time:"时间",author:"作者-1",people:10},
					{acid:1,name:"1-2",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-1-2",address:"地址-1-2",time:"时间",author:"作者-1",people:10},
					{acid:2,name:"2-2",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-2",address:"地址-2",time:"时间",author:"作者-2",people:11},
					{acid:3,name:"3-3",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-3",address:"地址-3",time:"时间",author:"作者-3",people:12},
					{acid:4,name:"4-4",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-4",address:"地址-4",time:"时间",author:"作者-4",people:13},
					{acid:5,name:"5-5",isActive:false,photo:"/static/e_000100_r_w.png",title:"标题-5",address:"地址-5",time:"时间",author:"作者-5",people:14}
				],
				NewActivityList:[],
			}
		},
		onLoad() {
				this.activityList.forEach((value)=>{value.isActive = true})
				this.NewActivityList = this.activityList
				// console.log(this.NewActivityList)
								
		},
		methods: {
			getselectBtn(item,index){
				this.NewActivityList=[],
				this.Number = item.acid
				// console.log(index,item.name,this.Number);
				this.buttonList.forEach((value)=>{ value.isActive = false })
				// this.activityList.forEach((value)=>{value.isActive = false})
				this.NewActivityList = this.activityList.filter( e=>e.acid === item.acid)
				// console.log(this.NewActivityList)
				this.buttonList[index].isActive = !this.buttonList[index].isActive
				this.NewActivityList.forEach((value)=>{ value.isActive = true })
			},
			goto(i){
				// console.log(i)
				// uni.navigateTo({
				// 	url:"/components/ButtonList"
				// })
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
	
	.banner {
		padding-top: 10rpx;
		width: 100%;
		height: 200px;
	}
	.banner image {
		width: 100%;
		height: 100%;
	}
	.buttonlist {
		display: flex;
		justify-content: space-between;
		margin: 0 20rpx;
	}
	.activitylist {
		display: flex;
		justify-content: space-between;
		margin: 20rpx;
		flex-direction: column;
	}
	.ActivityDeteil {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-top: 20rpx;
		background-color: bisque;
		border-radius: 20rpx;
		height: 300rpx;
		
	}
	.activityImg {
	/* 	position: absolute; */
		height: 200rpx;
		width: 30%;
		margin-top: 10rpx;
	}
	.activityText {
		position: absolute;
		margin-top: 20rpx;
		margin-left: 20rpx;
		left:250rpx
	}
	.activityAuthor {
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	}
	.activityPeople {
		position: absolute;
		bottom: 0;
		right: 0;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
