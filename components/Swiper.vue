<template>
	<view>
		<!-- 配置轮播图属性 -->
		<view class="banner">
			<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			circular>			
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<!-- <image :src="item.url" mode="aspectFill" /> -->
				<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 轮播图数据
    swiperList: {
      type: Array,
      default: () => [
		  {url:"/static/e_000102_r_ll.png"},
		  {url:"/static/e_000103_r.png"},
		  {url:"/static/e_000100_r_w.png"},
	  ]
    },
  },
  data() {
    return {
      // currentIndex: 0
    }
  },
  methods: {
	  // 点击轮播图项
	  onItemClick(item, index) {
	    this.$emit('itemClick', {
	      item,
	      index
	    })
	  }
	}
}
</script>

<style scoped>
	.banner {
		padding-top: 10rpx;
		width: 100%;
		/* height: 280rpx; */
	}
	.banner image {
		width: 100%;
		height: 100%;
	}	

</style> 