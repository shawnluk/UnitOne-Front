<template>
  <!-- 登录页：src/login/login，此处用 view 滚动区 -->
  <view class="user-page">
  <view class="user-container">
    <view class="user-scroll">
    <UserHeaderPanel
      :avatar-url="avatarUrl"
      :display-name="displayName"
      :is-logged-in="isLoggedIn"
      @avatar-click="handleCrop"
      @username-click="onUsernameClick"
    />
    <UserStatsPanel :stats="userStats" :star-value="5" />
    <UserQuickNav :items="quickNavItems" />
    <UserDataPanel :items="profileDataItems" />
    <UserCirclePanel :item="circleItem" />

	<view class="bottom-safe-gap"></view>
    </view>

    <!-- 自定义底部导航：裁剪时隐藏 -->
    <BottomTabBar v-show="!showCropper" :current="3" />
	<!-- 底部发布按钮 -->
	<button class="publish-btn" :class="{ 'is-bubbling': isBubbling }" @click="CreateActivity">
	  <view class="bubble-layer">
	    <view v-for="n in 6" :key="n" class="bubble-item">
	      <text class="bubble-text">HiGo</text>
	    </view>
	  </view>
	  <text class="publish-icon">+</text>
	  <text class="publish-text">发布</text>
	</button>

    <QfImageCropper
      v-if="showCropper"
      ref="cropper"
      :src="cropperImg"
      :width="300"
      :height="300"
      :radius="150"
      fileType="png"
      @crop="onCropperCrop"
    >
      <view class="crop-cancel" @click="cancelCrop">取消</view>
    </QfImageCropper>
  </view>
  </view>
</template>

<script>
	import BottomTabBar from '@/components/BottomTabBar.vue'
	import UserHeaderPanel from '@/components/user/UserHeaderPanel.vue'
	import UserStatsPanel from '@/components/user/UserStatsPanel.vue'
	import UserQuickNav from '@/components/user/UserQuickNav.vue'
	import UserDataPanel from '@/components/user/UserDataPanel.vue'
	import UserCirclePanel from '@/components/user/UserCirclePanel.vue'
	import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'

export default {
  components: {
    BottomTabBar,
	UserHeaderPanel,
	UserStatsPanel,
	UserQuickNav,
	UserDataPanel,
	UserCirclePanel,
	QfImageCropper
  },
  data() {
    return {
      // 头像地址（初始可以写死，后续可从接口获取）
      avatarUrl: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/helloworld_01.jpg',
      // 是否显示裁剪弹窗
      showCropper: false,
      // 待裁剪的本地临时图片路径
      cropperImg: '',
      // 防止“取消时机与裁剪异步回调”竞态：取消后不再更新头像
      cropCanceled: false,
      isLoggedIn: false,
      isBubbling: false,
      isNavigating: false,
      bubbleTimer: null,
      userStats: [
        { icon: '🔥', label: '伙柴', value: 0 },
        { icon: '🎫', label: '伙卡', value: 0 },
      ],
      quickNavItems: [
        { icon: '📋', label: '订单' },
        { icon: '💰', label: '钱包' },
        { icon: '🎧', label: '客服' },
        { icon: '⚙️', label: '设置' },
      ],
      profileDataItems: [
        { label: '圈子', value: 4 },
        { label: '好友', value: 1 },
        { label: '历史活动', value: 0 },
        { label: '相册', value: 0 },
      ],
      circleItem: {
        cover: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/real-madrid-ucl-1024x1024.jpg',
        name: '皇马球迷足球活动',
        stats: '0活动 1成员',
        badge: '圈子主',
        topTag: '置顶',
      },
    };
  },

  computed: {
    displayName() {
      return this.isLoggedIn ? 'shawn' : 'HiGoer'
    },
  },

  onLoad() {
    // 仅内存态：页面重新加载后恢复未登录（不写本地存储）
    this.isLoggedIn = false
  },

  methods: {
    onUsernameClick() {
      if (this.isLoggedIn) return
      uni.navigateTo({
        url: '/src/login/login',
        events: {
          loginSuccess: () => {
            this.isLoggedIn = true
            uni.showToast({ title: '登录成功', icon: 'success' })
          },
        },
      })
    },

    // 点击头像，选择图片并进入裁剪
    handleCrop() {
      this.showCropper = true
      this.cropperImg = ''
      this.cropCanceled = false
      this.$nextTick(() => {
        this.$refs.cropper && this.$refs.cropper.chooseImage()
      })
    },

    // 取消裁剪：关闭裁剪组件并保持原头像不变
    cancelCrop() {
      this.cropCanceled = true
      // 尝试重置内部裁剪状态（如果组件方法可用）
      if (this.$refs.cropper && this.$refs.cropper.resetData) {
        this.$refs.cropper.resetData()
      }
      this.showCropper = false
      this.cropperImg = ''
    },

    // 裁剪完成回调
    onCropperCrop(e) {
      if (this.cropCanceled) return
      if (e && e.tempFilePath) {
        this.avatarUrl = e.tempFilePath
      }
      this.showCropper = false
      this.cropperImg = ''
      this.cropCanceled = false
    },

    // 示例：上传头像到后台（根据你自己的接口改）
    // uploadAvatar(filePath) {
    //   return new Promise((resolve, reject) => {
    //     uni.uploadFile({
    //       url: 'https://你的接口地址/api/uploadAvatar',
    //       filePath,
    //       name: 'file',
    //       success: (uploadFileRes) => {
    //         const data = JSON.parse(uploadFileRes.data || '{}')
    //         // 后端返回的头像地址
    //         if (data.url) {
    //           this.avatarUrl = data.url
    //           resolve(data)
    //         } else {
    //           reject(new Error('上传失败'))
    //         }
    //       },
    //       fail: reject
    //     })
    //   })
    // },

    CreateActivity() {
      if (this.isNavigating) return

      this.isNavigating = true
      this.isBubbling = false

      if (this.bubbleTimer) {
        clearTimeout(this.bubbleTimer)
      }

      this.$nextTick(() => {
        this.isBubbling = true
      })

      this.bubbleTimer = setTimeout(() => {
        uni.redirectTo({
          url: '/src/CreateAct/createAct',
          fail: () => {
            this.isNavigating = false
            this.isBubbling = false
          },
        })
      }, 3000)
    }
  },
  beforeDestroy() {
    if (this.bubbleTimer) {
      clearTimeout(this.bubbleTimer)
    }
  },
}
</script>

<style scoped>
	.user-page {
	  position: relative;
	  min-height: 100vh;
	}

	.user-container {
	  background-color: #f5f5f5;
	  height: 100vh;
	  overflow: hidden;
	  font-size: 28rpx;
	}

	.user-scroll {
	  height: 100vh;
	  overflow-y: auto;
	  -webkit-overflow-scrolling: touch;
	}

	/* 给底部固定按钮/底栏留出滚动空间 */
	.bottom-safe-gap {
	  height: 260rpx;
	}

	/* 底部发布按钮 */
	.publish-btn {
	  position: fixed;
	  bottom: 180rpx;
	  left: 30rpx;
	  background: linear-gradient(145deg, #56b6ff 0%, #2d8cff 58%, #1677ff 100%);
	  color: #ffffff;
	  width: 120rpx;
	  height: 120rpx;
	  border-radius: 50%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  border: 2rpx solid rgba(255, 255, 255, 0.7);
	  box-shadow: 0 14rpx 30rpx rgba(22, 119, 255, 0.26), 0 6rpx 14rpx rgba(86, 182, 255, 0.2);
	  overflow: visible;
	  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
	  z-index: 99;
	}

	.bubble-layer {
	  position: absolute;
	  left: 50%;
	  bottom: 88rpx;
	  width: 180rpx;
	  height: 160rpx;
	  transform: translateX(-50%);
	  pointer-events: none;
	  z-index: 1;
	}

	.bubble-item {
	  position: absolute;
	  bottom: 20rpx;
	  left: 50%;
	  min-width: 44rpx;
	  height: 28rpx;
	  padding: 0 10rpx;
	  border-radius: 999rpx;
	  opacity: 0;
	  transform: translateX(-50%) scale(0.6);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(222, 241, 255, 0.96) 60%, rgba(156, 209, 255, 0.9) 100%);
	  box-shadow: 0 4rpx 12rpx rgba(22, 119, 255, 0.28);
	  border: 1rpx solid rgba(255, 255, 255, 0.85);
	}

	.bubble-text {
	  font-size: 14rpx;
	  line-height: 1;
	  font-weight: 700;
	  color: #1677ff;
	  letter-spacing: 1rpx;
	}

	.publish-btn::before {
	  content: '';
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  width: 18rpx;
	  height: 18rpx;
	  border-radius: 50%;
	  background: radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 72%);
	  transform: translate(-50%, -50%) scale(0.6);
	  opacity: 0;
	  pointer-events: none;
	  transition: transform 0.24s ease, opacity 0.24s ease;
	}

	.publish-btn::after {
	  content: '';
	  position: absolute;
	  top: 8rpx;
	  left: 12rpx;
	  width: 52rpx;
	  height: 24rpx;
	  border-radius: 999rpx;
	  background: rgba(255, 255, 255, 0.75);
	  transform: rotate(-20deg);
	  pointer-events: none;
	  transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.publish-btn:active {
	  transform: scale(0.95);
	  box-shadow: 0 8rpx 18rpx rgba(22, 119, 255, 0.2), 0 4rpx 10rpx rgba(86, 182, 255, 0.16);
	  filter: brightness(1.03);
	}

	.publish-btn:active::before {
	  transform: translate(-50%, -50%) scale(10.5);
	  opacity: 0.42;
	}

	.publish-btn:active::after {
	  transform: rotate(-20deg) translateX(8rpx);
	  opacity: 0.9;
	}

	.publish-btn.is-bubbling .bubble-item {
	  animation-name: bubble-rise;
	  animation-duration: 3s;
	  animation-timing-function: cubic-bezier(0.2, 0.55, 0.2, 1);
	  animation-fill-mode: forwards;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(1) {
	  --dx: -56rpx;
	  --dy: -126rpx;
	  --s: 1.1;
	  animation-delay: 0s;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(2) {
	  --dx: -26rpx;
	  --dy: -148rpx;
	  --s: 0.95;
	  min-width: 40rpx;
	  height: 26rpx;
	  animation-delay: 0.15s;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(3) {
	  --dx: 0rpx;
	  --dy: -136rpx;
	  --s: 1.2;
	  min-width: 52rpx;
	  height: 30rpx;
	  animation-delay: 0.32s;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(4) {
	  --dx: 24rpx;
	  --dy: -154rpx;
	  --s: 0.9;
	  min-width: 38rpx;
	  height: 24rpx;
	  animation-delay: 0.55s;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(5) {
	  --dx: 50rpx;
	  --dy: -128rpx;
	  --s: 1;
	  min-width: 46rpx;
	  height: 28rpx;
	  animation-delay: 0.8s;
	}

	.publish-btn.is-bubbling .bubble-item:nth-child(6) {
	  --dx: 14rpx;
	  --dy: -116rpx;
	  --s: 0.78;
	  min-width: 34rpx;
	  height: 22rpx;
	  animation-delay: 1.05s;
	}

	.publish-icon {
	  position: relative;
	  z-index: 3;
	  font-size: 46rpx;
	  line-height: 44rpx;
	  font-weight: 700;
	  text-shadow: 0 2rpx 8rpx rgba(13, 71, 161, 0.2);
	  transition: transform 0.2s ease;
	}

	.publish-text {
	  position: relative;
	  z-index: 3;
	  margin-top: 2rpx;
	  font-size: 22rpx;
	  line-height: 22rpx;
	  font-weight: 600;
	  letter-spacing: 2rpx;
	  text-shadow: 0 2rpx 8rpx rgba(13, 71, 161, 0.18);
	  transition: transform 0.2s ease;
	}

	.publish-btn:active .publish-icon {
	  transform: scale(0.92) rotate(-8deg);
	}

	.publish-btn:active .publish-text {
	  transform: translateY(2rpx);
	}

	@keyframes bubble-rise {
	  0% {
	    opacity: 0;
	    transform: translate(-50%, 0) scale(0.5);
	  }
	  15% {
	    opacity: 1;
	  }
	  100% {
	    opacity: 0;
	    transform: translate(calc(-50% + var(--dx, 0rpx)), var(--dy, -120rpx)) scale(var(--s, 1));
	  }
	}

  /* 裁剪弹窗取消按钮（显示在组件内部 slot 中） */
  .crop-cancel {
    position: fixed;
    top: 30rpx;
    right: 30rpx;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 14rpx 20rpx;
    border-radius: 999rpx;
    font-size: 28rpx;
  }
</style>
