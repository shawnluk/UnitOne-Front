<template>
  <view class="login-page">
    <view class="blob blob-a" />
    <view class="blob blob-b" />
    <view class="blob blob-c" />

    <view class="hero">
      <text class="hero-emoji">👋</text>
      <text class="hero-title">欢迎回来</text>
      <text class="hero-sub">登录后继续你的搭子时刻</text>
    </view>

    <view class="card">
      <view class="card-inner">
        <view class="field">
          <view class="label-row">
            <text class="label-ico">👤</text>
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
          <view class="label-row">
            <text class="label-ico">🔒</text>
            <text class="label">密码</text>
          </view>
          <input
            class="input"
            password
            :value="form.password"
            placeholder="悄悄输入密码"
            placeholder-class="ph"
            :adjust-position="true"
            :cursor-spacing="24"
            @input="onPasswordInput"
          />
        </view>

        <view class="submit-wrap">
          <view class="submit" hover-class="submit-hover" @tap="handleSubmit">
            <text class="submit-text">出发！</text>
            <text class="submit-arrow">→</text>
          </view>
        </view>

        <view class="tips">
          <text class="tips-dot">✨</text>
          <text class="tips-txt">新用户？随便填个账号密码先体验～</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    inputValue(e) {
      if (e && e.detail && e.detail.value !== undefined) return e.detail.value
      if (e && e.target && e.target.value !== undefined) return e.target.value
      return ''
    },
    onUsernameInput(e) {
      this.form.username = this.inputValue(e)
    },
    onPasswordInput(e) {
      this.form.password = this.inputValue(e)
    },
    handleSubmit() {
      const u = (this.form.username || '').trim()
      const p = (this.form.password || '').trim()
      if (!u || !p) {
        uni.showToast({ title: '用户名和密码都要填哦', icon: 'none' })
        return
      }
      const ec =
        typeof this.getOpenerEventChannel === 'function'
          ? this.getOpenerEventChannel()
          : null
      if (ec && ec.emit) {
        ec.emit('loginSuccess', { displayName: 'shawn' })
      }
      uni.navigateBack()
    },
  },
}
</script>

<style scoped>
.login-page {
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

.blob-a {
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

.blob-b {
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

.blob-c {
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

.hero-emoji {
  font-size: 64rpx;
  display: block;
  line-height: 1.2;
  margin-bottom: 12rpx;
}

.hero-title {
  display: block;
  font-size: 52rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
  color: #1e1b4b;
  line-height: 1.25;
}

.hero-sub {
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

.card-inner {
  background: #ffffff;
  border-radius: 34rpx;
  padding: 44rpx 36rpx 40rpx;
}

.field {
  margin-bottom: 36rpx;
}

.label-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 14rpx;
}

.label-ico {
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

.ph {
  color: #a5b4fc;
}

.submit-wrap {
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

.submit-hover {
  opacity: 0.9;
  transform: scale(0.98);
}

.submit-text {
  font-size: 34rpx;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 4rpx;
}

.submit-arrow {
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

.tips-dot {
  font-size: 26rpx;
  line-height: 1.5;
}

.tips-txt {
  flex: 1;
  font-size: 24rpx;
  line-height: 1.55;
  color: #64748b;
}
</style>
