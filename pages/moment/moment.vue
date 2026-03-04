<template>
	<view>
		<view class="topIndex">
			<image class="topImg" src="https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg" mode="widthFix"></image>
		</view>
		<view>moment</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="1" />
	</view>
</template>

<script>
	import BottomTabBar from '@/components/BottomTabBar.vue'

	export default {
		components: {
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
