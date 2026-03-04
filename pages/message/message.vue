<template>
	<view>
		<view class="topIndex">
			<image class="topImg" src="https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg" mode="widthFix"></image>
		</view>
		<view>message</view>
		<!-- 配置轮播图属性 -->
		<view class="banner">
			<swiper
				:indicator-dots="true"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
				circular
			>
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="2" />
	</view>
</template>

<script>
	import BottomTabBar from '@/components/BottomTabBar.vue'

	export default {
		components: {
			BottomTabBar
		},
		data(){
			return{
				bannerList: [
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png"},
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png"},
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png" }
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
	}
</style>
