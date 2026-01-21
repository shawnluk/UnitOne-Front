<template>
	<view class="topIndex"><image class="topImg" src="/static/real-madrid-ucl-1024x1024.jpg" mode="widthFix"></image></view>
	<view>message</view>
	<image src="/static/e_000103_r.png"></image>
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
</template>

<script>
	export default {
		data(){
			return{
				bannerList: [
					{url:"/static/e_000100_r_w.png"},
					{url:"/static/e_000102_r_ll.png"},
					{url:"/static/e_000103_r.png" }
				],
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
			/* height: rpx; */
		}
</style>