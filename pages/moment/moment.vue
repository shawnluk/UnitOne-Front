<template>
	<view>
		<TopBar></TopBar>
		<view>moment</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="1" />
	</view>
</template>

<script>
	import BottomTabBar from '@/components/BottomTabBar.vue'
	import TopBar from '@/components/TopBar.vue'

	export default {
		components: {
			TopBar,
			BottomTabBar
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
