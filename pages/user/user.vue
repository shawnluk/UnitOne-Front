<template>
	<view>
		<PageScaffold :tab-index="3" :show-bottom-tab-bar="!showCropper">
			<view class="userList">
				<UserHeaderPanel
					:avatar-url="avatarUrl"
					:display-name="displayName"
					:is-logged-in="isLoggedIn"
					:partner-id="header.partnerId"
					:partner-id-tag="header.partnerIdTag"
					:badges="header.badges"
					:member-title="header.memberTitle"
					:member-desc="header.memberDesc"
					:member-link="header.memberLink"
					@avatar-click="handleCrop"
					@username-click="onUsernameClick"
				/>
				<!-- <UserStatsPanel
					:stats="statsItems"
					:star-value="starValue"
				/> -->
				<UserDataPanel :items="dataItems" />
				<UserServiceEntryPanel />
				<UserSquadPanel
					:title="squad.title"
					:more-text="squad.moreText"
					:item="squad.item"
				/>
				<view v-if="isLoggedIn" class="logoutCard" @tap="handleLogout">
					<text class="logoutText">退出登录</text>
				</view>
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
import UserStatsPanel from './components/user-stats-panel.vue'
import UserServiceEntryPanel from './components/user-service-entry-panel.vue'
import UserDataPanel from './components/user-data-panel.vue'
import UserSquadPanel from './components/user-squad-panel.vue'
import UserPublishButton from './components/user-publish-button.vue'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'
import {
	MOCK_USER_DEFAULT_AVATAR,
	MOCK_USER_DISPLAY_NAME_GUEST,
	MOCK_USER_DISPLAY_NAME_LOGGED_IN,
	MOCK_USER_HEADER,
	MOCK_USER_DATA_ITEMS,
	MOCK_USER_SQUAD_PANEL,
} from '@/mock/user-display.js'
import {
	fetchUserProfile,
	fetchUserSquadPanel,
} from '@/api/modules/user.js'
import { isTokenExpired } from '@/utils/token.js'

export default {
	components: {
		PageScaffold,
		UserHeaderPanel,
		UserStatsPanel,
		UserServiceEntryPanel,
		UserDataPanel,
		UserSquadPanel,
		UserPublishButton,
		QfImageCropper
	},
	data() {
		return {
			avatarUrl: MOCK_USER_DEFAULT_AVATAR,
			displayNameGuest: MOCK_USER_DISPLAY_NAME_GUEST,
			displayNameLoggedIn: MOCK_USER_DISPLAY_NAME_LOGGED_IN,
			header: { ...MOCK_USER_HEADER },
			dataItems: MOCK_USER_DATA_ITEMS.map((row) => ({ ...row })),
			squad: { ...MOCK_USER_SQUAD_PANEL },
			showCropper: false,
			cropperImg: '',
			cropCanceled: false,
			isLoggedIn: false,
			userId: '',
			user_no: '',
			isBubbling: false,
			isNavigating: false,
			bubbleTimer: null,
		};
	},

	computed: {
		displayName() {
			return this.isLoggedIn
				? this.displayNameLoggedIn
				: this.displayNameGuest
		},
	},

	onLoad(options) {
		if (options && options.user_id) {
			this.userId = options.user_id
		}
		if (this.checkTokenExpired()) return
		this.loadLocalUser()
		this.loadUserData()
	},

	methods: {
		checkTokenExpired() {
			let token = ''
			try {
				token = uni.getStorageSync('token') || ''
			} catch (_) {}
			if (!token) return false
			if (!isTokenExpired(token)) return false
			this.clearLoginCache()
			this.loadLocalUser()
			uni.showModal({
				title: '请重新登录',
				content: '登录已过期，请重新登录后再操作',
				confirmText: '去登录',
				showCancel: false,
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/src/login/login',
						})
					}
				},
			})
			return true
		},
		clearLoginCache() {
			try {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('username')
				uni.removeStorageSync('userInfo')
			} catch (_) {}
		},
		loadLocalUser() {
			let userId = ''
			let username = ''
			let userInfo = null
			try {
				userId = uni.getStorageSync('userId')
				username = uni.getStorageSync('username')
				userInfo = uni.getStorageSync('userInfo')
			} catch (_) {}
			if (!userId && !userInfo) {
				this.isLoggedIn = false
				return
			}
			this.userId = userId !== undefined && userId !== '' ? userId : this.userId
			this.user_no = userInfo.user_no !== undefined && userInfo !== '' ? userInfo.user_no  : this.user_no
			this.isLoggedIn = true
			if (this.userId) {
				this.header = { ...this.header, partnerId: String(this.user_no) }
			}
			if (userInfo) {
				this.avatarUrl = userInfo.avatar || this.avatarUrl
				this.displayNameLoggedIn =
					userInfo.nickname || userInfo.username || username || this.displayNameLoggedIn
			} else if (username) {
				this.displayNameLoggedIn = username
			}
		},
		async loadUserData() {
			if (!this.isLoggedIn) {
				try {
					const profile = await fetchUserProfile()
					if (profile) {
						this.avatarUrl = profile.avatarUrl || this.avatarUrl
						this.displayNameGuest = profile.displayNameGuest || this.displayNameGuest
						this.displayNameLoggedIn = profile.displayNameLoggedIn || this.displayNameLoggedIn
						this.isLoggedIn = profile.isLoggedIn || false
						if (profile.header) {
							this.header = { ...this.header, ...profile.header }
						}
						if (Array.isArray(profile.dataItems) && profile.dataItems.length) {
							this.dataItems = profile.dataItems
						}
					}
				} catch (_) {}
			}

			try {
				const squad = await fetchUserSquadPanel()
				if (squad) {
					this.squad = { ...this.squad, ...squad }
				}
			} catch (_) {}
		},

		onUsernameClick() {
			if (this.isLoggedIn) return
			uni.navigateTo({
				url: '/src/login/login',
			})
		},

		handleLogout() {
			uni.showModal({
				title: '退出登录',
				content: '确定要退出当前账号吗？',
				confirmText: '退出',
				confirmColor: '#e54d42',
				success: (res) => {
					if (!res.confirm) return
					this.clearLoginCache()
					uni.redirectTo({
						url: '/pages/user/user',
					})
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

.logoutCard {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100rpx;
	border-radius: 32rpx;
	background: linear-gradient(145deg, #ffffff 0%, #fff1f3 100%);
	box-shadow: 0 20rpx 48rpx rgba(255, 95, 120, 0.1);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.logoutText {
	font-size: 30rpx;
	font-weight: 600;
	color: #e54d42;
	letter-spacing: 4rpx;
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
