<template>
  <view class="bottom-tabbar-wrapper">
    <view class="bottom-tabbar">
      <view
        v-for="(item, index) in tabs"
        :key="item.pagePath"
        class="tab-item"
        :class="{ 'tab-item-active': index === current }"
        @click="onTap(item, index)"
      >
        <image
          class="tab-icon"
          :src="index === current ? item.selectedIconPath : item.iconPath"
          mode="widthFix"
        />
        <text class="tab-text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BottomTabBar',
  props: {
    // 当前选中的 tab 下标（0~3）
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 直接复用 pages.json 中的图标配置
      tabs: [
        {
          pagePath: 'pages/index/index',
          text: '活动',
          iconPath: '/static/home-1.png',
          selectedIconPath: '/static/home-0.png'
        },
        {
          pagePath: 'pages/moment/moment',
          text: '时刻',
          iconPath: '/static/moment-1.png',
          selectedIconPath: '/static/moment-0.png'
        },
        {
          pagePath: 'pages/message/message',
          text: '消息',
          iconPath: '/static/message-1.png',
          selectedIconPath: '/static/message-0.png'
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
          iconPath: '/static/mine-1.png',
          selectedIconPath: '/static/mine-0.png'
        }
      ]
    };
  },
  methods: {
    onTap(item, index) {
      if (index === this.current) return;
      // 使用 reLaunch 切换主页面，避免系统 tabbar 依赖
      uni.reLaunch({
        url: '/' + item.pagePath
      });
    }
  }
};
</script>

<style scoped>
.bottom-tabbar-wrapper {
  position: fixed;
  left: 10rpx;
  right: 10rpx;
  bottom: 30rpx;
  display: flex;
  justify-content: center;
  z-index: 999;
  pointer-events: none;
  /* 外层做渐变圆角边框容器 */
  padding: 2rpx;
  border-radius: 80rpx;
  background-image: linear-gradient(90deg, #8f41e9, #578aef);
}

.bottom-tabbar {
  width: 92%;
  max-width: 700rpx;
  height: 120rpx;
  background: #ffffff;
  border-radius: 80rpx;
  box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40rpx;
  pointer-events: auto;
}

.tab-item {
  flex: 1;
  height: 88rpx;
  margin: 0 8rpx;
  border-radius: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: 24rpx;
}

.tab-item-active {
  background: #ebf1ff;
  color: #2f67ff;
}

.tab-icon {
  width: 40rpx;
  margin-bottom: 8rpx;
}

.tab-text {
  line-height: 1;
}
</style>

