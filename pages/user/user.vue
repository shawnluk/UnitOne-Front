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
	<button class="publish-btn" @click="CreateActivity">
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

    CreateActivity(){
      uni.redirectTo({
        url:"/src/CreateAct/createAct"
      })
    }
  }
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
	  background-color: #ff6b00;
	  color: white;
	  width: 120rpx;
	  height: 120rpx;
	  border-radius: 50%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  box-shadow: 0 4rpx 12rpx rgba(255, 107, 0, 0.3);
	}

	.publish-icon {
	  font-size: 48rpx;
	  line-height: 48rpx;
	}

	.publish-text {
	  font-size: 20rpx;
	  line-height: 20rpx;
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
