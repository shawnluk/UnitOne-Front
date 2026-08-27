<template>
	<view class="loginPage">
		<view class="blob blobA" />
		<view class="blob blobB" />
		<view class="blob blobC" />

		<view class="hero">
			<text class="heroEmoji">👋</text>
			<text class="heroTitle">{{ mode === 'login' ? '欢迎回来' : '创建账号' }}</text>
			<text class="heroSub">{{ mode === 'login' ? '登录后继续你的搭子时刻' : '注册后开启你的搭子时刻' }}</text>
		</view>

		<view class="card">
			<view class="modeTabs">
				<view
					class="modeTab"
					:class="{ active: mode === 'login' }"
					@tap="switchMode('login')"
				>登录</view>
				<view
					class="modeTab"
					:class="{ active: mode === 'register' }"
					@tap="switchMode('register')"
				>注册</view>
			</view>
			<view class="cardInner">
				<view class="field">
					<view class="labelRow">
						<text class="labelIco">👤</text>
						<text class="label">用户名</text>
					</view>
					<input
						class="input"
						type="text"
						:value="form.username"
						placeholder="怎么称呼你？"
						placeholder-class="ph"
						:adjust-position="true"
						:cursor-spacing="24"
						@input="onUsernameInput"
					/>
				</view>
				<view class="field">
					<view class="labelRow">
						<text class="labelIco">🔒</text>
						<text class="label">密码</text>
					</view>
					<view class="inputWrap">
						<input
							class="input"
							:password="!showPassword"
							:value="form.password"
							placeholder="悄悄输入密码"
							placeholder-class="ph"
							:adjust-position="true"
							:cursor-spacing="24"
							@input="onPasswordInput"
						/>
						<text class="eyeBtn" @tap="showPassword = !showPassword">{{ showPassword ? '🙈' : '👁' }}</text>
					</view>
				</view>
				<view v-if="mode === 'register'" class="field">
					<view class="labelRow">
						<text class="labelIco">🔒</text>
						<text class="label">确认密码</text>
					</view>
					<view class="inputWrap">
						<input
							class="input"
							:password="!showConfirmPassword"
							:value="form.confirmPassword"
							placeholder="再输入一次密码"
							placeholder-class="ph"
							:adjust-position="true"
							:cursor-spacing="24"
							@input="onConfirmPasswordInput"
						/>
						<text class="eyeBtn" @tap="showConfirmPassword = !showConfirmPassword">{{ showConfirmPassword ? '🙈' : '👁' }}</text>
					</view>
				</view>

				<view class="submitWrap">
					<view class="submit" hover-class="submitHover" @tap="handleSubmit">
						<text class="submitText">{{ mode === 'login' ? '出发！' : '注册！' }}</text>
						<text class="submitArrow">→</text>
					</view>
				</view>

				<view class="tips">
					<text class="tipsDot">✨</text>
					<text class="tipsTxt">{{ mode === 'login' ? '新用户？随便填个账号密码先体验～' : '请牢记你的账号密码，用于后续登录～' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { loginWithPassword, register } from '@/api/modules/auth.js'

export default {
	data() {
		return {
			mode: 'login',
			showPassword: false,
			showConfirmPassword: false,
			form: {
				username: '',
				password: '',
				confirmPassword: '',
			},
		}
	},
	methods: {
		/** 提取输入框的值，兼容不同端的事件结构
		 * @param {Object} e 输入事件对象
		 * @returns {String} 输入的值
		 */
		inputValue(e) {
			if (e && e.detail && e.detail.value !== undefined) return e.detail.value
			if (e && e.target && e.target.value !== undefined) return e.target.value
			return ''
		},
		/** 用户名输入处理：同步到表单 */
		onUsernameInput(e) {
			this.form.username = this.inputValue(e)
		},
		/** 密码输入处理：同步到表单 */
		onPasswordInput(e) {
			this.form.password = this.inputValue(e)
		},
		/** 确认密码输入处理：同步到表单 */
		onConfirmPasswordInput(e) {
			this.form.confirmPassword = this.inputValue(e)
		},
		/** 切换登录/注册模式，并清空密码输入
		 * @param {String} mode 目标模式：login 或 register
		 */
		switchMode(mode) {
			if (mode === this.mode) return
			this.mode = mode
			this.form.password = ''
			this.form.confirmPassword = ''
		},
		async handleRegister() {
			const u = (this.form.username || '').trim()
			const p = (this.form.password || '').trim()
			const cp = (this.form.confirmPassword || '').trim()
			if (!u || !p) {
				uni.showToast({ title: '用户名和密码都要填哦', icon: 'none' })
				return
			}
			if (!cp) {
				uni.showToast({ title: '请再次输入确认密码', icon: 'none' })
				return
			}
			if (p !== cp) {
				uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
				return
			}
			try {
				const confirmed = await new Promise((resolve) => {
					uni.showModal({
						title: '确认注册',
						content: `确定以「${u}」注册账号并提交吗？`,
						confirmText: '确认提交',
						cancelText: '再想想',
						success: (res) => resolve(res.confirm === true),
						fail: () => resolve(false),
					})
				})
				if (!confirmed) return
				await register({ username: u, password: p })
				uni.showToast({ title: '注册成功，请登录', icon: 'none' })
				this.switchMode('login')
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '注册失败',
					icon: 'none'
				})
			}
		},
		/** 提交处理：注册走注册流程，登录则校验后调用登录接口并跳转 */
		async handleSubmit() {
			if (this.mode === 'register') {
				await this.handleRegister()
				return
			}
			const u = (this.form.username || '').trim()
			const p = (this.form.password || '').trim()
			if (!u || !p) {
				uni.showToast({ title: '用户名和密码都要填哦', icon: 'none' })
				return
			}
			try {
				const res = await loginWithPassword({ username: u, password: p })
				// console.log(res)
				const userId = res && res.user_id !== undefined ? res.user_id : ''
				uni.redirectTo({
					url: `/pages/user/user?user_id=${userId}`,
					fail: () => {
						uni.navigateBack()
					},
				})
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '登录失败',
					icon: 'none'
				})
			}
		},
	},
}
</script>

<style scoped>
.loginPage {
	min-height: 100vh;
	padding: 24rpx 36rpx 56rpx;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
	background: linear-gradient(
		165deg,
		#e0f4ff 0%,
		#f5e8ff 38%,
		#fff0f3 72%,
		#fff9e6 100%
	);
}

.blob {
	position: absolute;
	border-radius: 50%;
	filter: blur(2rpx);
	pointer-events: none;
}

.blobA {
	width: 320rpx;
	height: 320rpx;
	right: -80rpx;
	top: 120rpx;
	background: radial-gradient(
		circle,
		rgba(99, 102, 241, 0.35) 0%,
		rgba(236, 72, 153, 0.12) 60%,
		transparent 70%
	);
}

.blobB {
	width: 260rpx;
	height: 260rpx;
	left: -100rpx;
	bottom: 180rpx;
	background: radial-gradient(
		circle,
		rgba(251, 191, 36, 0.45) 0%,
		rgba(52, 211, 153, 0.15) 55%,
		transparent 70%
	);
}

.blobC {
	width: 180rpx;
	height: 180rpx;
	right: 40rpx;
	bottom: 400rpx;
	background: radial-gradient(
		circle,
		rgba(56, 189, 248, 0.4) 0%,
		transparent 65%
	);
}

.hero {
	position: relative;
	z-index: 1;
	padding: 32rpx 8rpx 40rpx;
}

.heroEmoji {
	font-size: 64rpx;
	display: block;
	line-height: 1.2;
	margin-bottom: 12rpx;
}

.heroTitle {
	display: block;
	font-size: 52rpx;
	font-weight: 800;
	letter-spacing: 2rpx;
	color: #1e1b4b;
	line-height: 1.25;
}

.heroSub {
	display: block;
	margin-top: 16rpx;
	font-size: 28rpx;
	color: #6366f1;
	font-weight: 600;
	opacity: 0.95;
}

.card {
	position: relative;
	z-index: 1;
	border-radius: 36rpx;
	padding: 4rpx;
	background: linear-gradient(
		135deg,
		rgba(99, 102, 241, 0.45),
		rgba(236, 72, 153, 0.35),
		rgba(251, 191, 36, 0.4)
	);
	box-shadow: 0 24rpx 64rpx rgba(99, 102, 241, 0.18);
}

.cardInner {
	background: #ffffff;
	border-radius: 34rpx;
	padding: 44rpx 36rpx 40rpx;
}

.modeTabs {
	display: flex;
	background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
	border-radius: 24rpx;
	padding: 8rpx;
	margin-bottom: 40rpx;
}

.modeTab {
	flex: 1;
	text-align: center;
	padding: 20rpx 0;
	font-size: 30rpx;
	font-weight: 700;
	color: #64748b;
	border-radius: 18rpx;
	transition: all 0.2s ease;
}

.modeTab.active {
	color: #ffffff;
	background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%);
	box-shadow: 0 10rpx 24rpx rgba(99, 102, 241, 0.35);
}

.field {
	margin-bottom: 36rpx;
}

.labelRow {
	display: flex;
	align-items: center;
	gap: 10rpx;
	margin-bottom: 14rpx;
}

.labelIco {
	font-size: 30rpx;
}

.label {
	font-size: 28rpx;
	font-weight: 700;
	color: #312e81;
}

.input {
	width: 100%;
	min-height: 92rpx;
	line-height: 46rpx;
	padding: 22rpx 28rpx;
	border: 2rpx solid transparent;
	border-radius: 22rpx;
	font-size: 32rpx;
	color: #1e1b4b;
	background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
	box-sizing: border-box;
	box-shadow: inset 0 2rpx 8rpx rgba(99, 102, 241, 0.06);
}

.inputWrap {
	position: relative;
}

.inputWrap .input {
	padding-right: 100rpx;
}

.eyeBtn {
	position: absolute;
	right: 16rpx;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 64rpx;
	height: 64rpx;
	font-size: 36rpx;
	line-height: 1;
}

.ph {
	color: #a5b4fc;
}

.submitWrap {
	margin-top: 12rpx;
}

.submit {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	padding: 28rpx 32rpx;
	border-radius: 999rpx;
	background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%);
	box-shadow: 0 16rpx 40rpx rgba(99, 102, 241, 0.45);
}

.submitHover {
	opacity: 0.9;
	transform: scale(0.98);
}

.submitText {
	font-size: 34rpx;
	font-weight: 800;
	color: #ffffff;
	letter-spacing: 4rpx;
}

.submitArrow {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: bold;
}

.tips {
	margin-top: 36rpx;
	display: flex;
	align-items: flex-start;
	gap: 10rpx;
	padding: 0 8rpx;
}

.tipsDot {
	font-size: 26rpx;
	line-height: 1.5;
}

.tipsTxt {
	flex: 1;
	font-size: 24rpx;
	line-height: 1.55;
	color: #64748b;
}
</style>
