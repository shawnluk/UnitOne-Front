<template>
	<view class="profileCard">
		<view class="profileInner">
			<view class="profileHeader">
				<view class="userInfo">
					<image
						class="avatar"
						:src="avatarUrl"
						mode="aspectFill"
						@click="$emit('avatar-click')"
					/>
					<view class="userDetails">
						<view
							class="username"
							:class="{ guest: !isLoggedIn }"
							@click="$emit('username-click')"
						>{{ displayName }}</view>
						<view class="userId">取伙号：{{ partnerId }} <text class="idTag">{{ partnerIdTag }}</text></view>
						<view class="userBadges">
							<text v-for="(badge, idx) in badges" :key="idx" class="badge">{{ badge }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="memberStrip">
				<view class="memberText">
					<text class="memberTitle">{{ memberTitle }}</text>
					<text class="memberDesc">{{ memberDesc }}</text>
				</view>
				<text class="memberLink">{{ memberLink }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { MOCK_USER_HEADER } from '@/mock/user-display.js'

export default {
	name: 'UserHeaderPanel',
	props: {
		avatarUrl: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		isLoggedIn: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		const { badges, ...rest } = MOCK_USER_HEADER
		return {
			...rest,
			badges: [...badges],
		}
	},
}
</script>

<style scoped>
/* 与首页 HomeActivityCard 默认主题同系 */
.profileCard {
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 32rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
}

.profileCard::before {
	content: '';
	position: absolute;
	top: -60rpx;
	right: -40rpx;
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(125, 95, 255, 0.22) 0%, rgba(125, 95, 255, 0) 70%);
	pointer-events: none;
}

.profileInner {
	position: relative;
	z-index: 1;
}

.profileHeader {
	padding: 26rpx 22rpx 20rpx;
}

.userInfo {
	display: flex;
	align-items: center;
	gap: 22rpx;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border: 3rpx solid rgba(255, 255, 255, 0.95);
	box-shadow: 0 14rpx 28rpx rgba(50, 40, 90, 0.2);
	overflow: hidden;
}

.userDetails {
	flex: 1;
	min-width: 0;
}

.username {
	font-size: 36rpx;
	font-weight: 700;
	color: #1b1732;
	margin-bottom: 8rpx;
	letter-spacing: 0.2rpx;
}

.username.guest {
	text-decoration: underline;
	text-underline-offset: 6rpx;
	color: #5d37ff;
}

.userId {
	font-size: 24rpx;
	color: #6c6392;
	margin-bottom: 12rpx;
}

.idTag {
	font-size: 20rpx;
}

.userBadges {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.badge {
	display: inline-flex;
	align-items: center;
	height: 40rpx;
	font-size: 22rpx;
	font-weight: 600;
	color: #ffffff;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	padding: 0 16rpx;
	border-radius: 20rpx;
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
}

.memberStrip {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
	padding: 20rpx 22rpx 22rpx;
	margin: 0 6rpx 8rpx;
	border-radius: 24rpx;
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.12) 0%, rgba(255, 95, 179, 0.1) 100%);
	border: 1rpx solid rgba(125, 95, 255, 0.22);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.12);
}

.memberText {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.memberTitle {
	font-size: 30rpx;
	font-weight: 700;
	color: #1b1732;
}

.memberDesc {
	font-size: 24rpx;
	color: #6c6392;
	line-height: 1.45;
}

.memberLink {
	flex-shrink: 0;
	font-size: 24rpx;
	font-weight: 700;
	color: #5d37ff;
}
</style>
