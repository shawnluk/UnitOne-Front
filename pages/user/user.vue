<template>
	<view>
		<PageScaffold :tab-index="3" :show-bottom-tab-bar="!showCropper">
			<view class="userList">
				<UserHeaderPanel
					:avatar-url="avatarUrl"
					:display-name="displayName"
					:is-logged-in="isLoggedIn"
					@avatar-click="handleCrop"
					@username-click="onUsernameClick"
				/>
				<!-- <UserStatsPanel /> -->
				<UserDataPanel />
				<UserServiceEntryPanel />
				<UserSquadPanel />
			</view>
		</PageScaffold>
		<UserPublishButton :isBubbling="isBubbling" @click="createActivity" />

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
import PageScaffold from '@/components/page-scaffold.vue'
import UserHeaderPanel from './components/user-header-panel.vue'
// import UserStatsPanel from './components/user-stats-panel.vue'
import UserServiceEntryPanel from './components/user-service-entry-panel.vue'
import UserDataPanel from './components/user-data-panel.vue'
import UserSquadPanel from './components/user-squad-panel.vue'
import UserPublishButton from './components/user-publish-button.vue'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'
import {
	MOCK_USER_DEFAULT_AVATAR,
	MOCK_USER_DISPLAY_NAME_GUEST,
	MOCK_USER_DISPLAY_NAME_LOGGED_IN,
} from '@/mock/user-display.js'

export default {
	components: {
		PageScaffold,
		UserHeaderPanel,
		// UserStatsPanel,
		UserServiceEntryPanel,
		UserDataPanel,
		UserSquadPanel,
		UserPublishButton,
		QfImageCropper
	},
	data() {
		return {
			avatarUrl: MOCK_USER_DEFAULT_AVATAR,
			showCropper: false,
			cropperImg: '',
			cropCanceled: false,
			isLoggedIn: false,
			isBubbling: false,
			isNavigating: false,
			bubbleTimer: null,
		};
	},

	computed: {
		displayName() {
			return this.isLoggedIn
				? MOCK_USER_DISPLAY_NAME_LOGGED_IN
				: MOCK_USER_DISPLAY_NAME_GUEST
		},
	},

	onLoad() {
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

		handleCrop() {
			this.showCropper = true
			this.cropperImg = ''
			this.cropCanceled = false
			this.$nextTick(() => {
				this.$refs.cropper && this.$refs.cropper.chooseImage()
			})
		},

		cancelCrop() {
			this.cropCanceled = true
			if (this.$refs.cropper && this.$refs.cropper.resetData) {
				this.$refs.cropper.resetData()
			}
			this.showCropper = false
			this.cropperImg = ''
		},

		onCropperCrop(e) {
			if (this.cropCanceled) return
			if (e && e.tempFilePath) {
				this.avatarUrl = e.tempFilePath
			}
			this.showCropper = false
			this.cropperImg = ''
			this.cropCanceled = false
		},

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

<style>
/* 与首页 activityList 一致，底部多留一截给悬浮「发布」 */
.userList {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
	padding: 10rpx 24rpx 24rpx;
	padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
}

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
