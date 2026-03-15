<template>
	<view>
		<TopBar></TopBar>
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
	import TopBar from '@/components/TopBar.vue'
	import BottomTabBar from '@/components/BottomTabBar.vue'

	export default {
		components: {
			TopBar,
			BottomTabBar
		},
		data(){
			return{
				bannerList: [
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/swiper/1.png"},
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/swiper/2.png"},
					{url:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/swiper/3.png" }
				],
			}
		}
	}
</script>

<style>
</style>
