<template>
	<!-- 登录页：src/login/login，此处用 view 滚动区 -->
	<view class="userContainer">
		<view class="userScroll">
			<UserHeaderPanel
				:avatar-url="avatarUrl"
				:display-name="displayName"
				:is-logged-in="isLoggedIn"
				@avatar-click="handleCrop"
				@username-click="onUsernameClick"
			/>
			<UserStatsPanel></UserStatsPanel>
			<UserDataPanel></UserDataPanel>
			<UserServiceEntryPanel></UserServiceEntryPanel>
			<UserClubPanel></UserClubPanel>

			<view class="bottomSafeGap"></view>
		</view>

		<!-- 自定义底部导航：裁剪时隐藏 -->
		<BottomTabBar v-show="!showCropper" :current="3"></BottomTabBar>
		<!-- 底部发布按钮 -->
		<UserPublishButton :isBubbling="isBubbling" @click="createActivity"></UserPublishButton>

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
			<view class="cropCancel" @click="cancelCrop">取消</view>
		</QfImageCropper>
	</view>
</template>

<script>
import BottomTabBar from '@/components/bottom-tab-bar.vue'
import UserHeaderPanel from './components/user-header-panel.vue'
import UserStatsPanel from './components/user-stats-panel.vue'
import UserServiceEntryPanel from './components/user-service-entry-panel.vue'
import UserDataPanel from './components/user-data-panel.vue'
import UserClubPanel from './components/user-club-panel.vue'
import UserPublishButton from './components/user-publish-button.vue'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'

export default {
	components: {
		BottomTabBar,
		UserHeaderPanel,
		UserStatsPanel,
		UserServiceEntryPanel,
		UserDataPanel,
		UserClubPanel,
		UserPublishButton,
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

		createActivity() {
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
					url: '/src/create-activity/create-activity',
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
	.userContainer {
		background-color: #f5f5f5;
		height: 100vh;
		overflow: hidden;
		font-size: 28rpx;
	}

	.userScroll {
		height: 100vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	/* 给底部固定按钮/底栏留出滚动空间 */
	.bottomSafeGap {
		height: 260rpx;
	}

	/* 裁剪弹窗取消按钮（显示在组件内部 slot 中） */
	.cropCancel {
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
