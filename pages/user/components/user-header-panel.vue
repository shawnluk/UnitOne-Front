<template>
	<view>
		<view class="userHeader">
			<view class="userInfo">
				<image
					class="avatar"
					:src="avatarUrl"
					mode="aspectFill"
					@click="$emit('avatar-click')"
				></image>
				<view class="userDetails">
					<view
						class="username"
						:class="{ guest: !isLoggedIn }"
						@click="$emit('username-click')"
					>{{ displayName }}</view>
					<view class="userId">取伙号：987627983 <text class="idTag">🟠</text></view>
					<view class="userBadges">
						<text class="badge">🔄1年</text>
						<text class="badge">🎪</text>
						<text class="badge">🛡️</text>
					</view>
				</view>
			</view>
		</view>

		<view class="memberSection">
			<view class="memberContent">
				<view class="memberTitle">成为会员</view>
				<view class="memberDesc">付费一场活动，立即成为取伙会员</view>
			</view>
			<view class="memberLink">查看会员权益 ></view>
		</view>
	</view>
</template>

<script>
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
}
</script>

<style scoped>
.userHeader {
	position: relative;
	background-image: url('https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/TopBar/TopBar.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	color: white;
	padding: 40rpx 30rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}

.userHeader::before {
	content: '';
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
	z-index: 0;
}

.userHeader {
	position: relative;
	z-index: 1;
}

.userInfo {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border: 2rpx solid white;
	overflow: hidden;
}

.userDetails {
	flex: 1;
}

.username {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.username.guest {
	text-decoration: underline;
	opacity: 0.95;
}

.userId {
	font-size: 24rpx;
	opacity: 0.8;
	margin-bottom: 10rpx;
}

.idTag {
	font-size: 20rpx;
}

.userBadges {
	display: flex;
	gap: 12rpx;
}

.badge {
	font-size: 20rpx;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 4rpx 8rpx;
	border-radius: 12rpx;
}

.memberSection {
	background-color: #e6f7ff;
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 16rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.memberContent {
	flex: 1;
}

.memberTitle {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.memberDesc {
	font-size: 24rpx;
	color: #666;
}

.memberLink {
	color: #1890ff;
	font-size: 24rpx;
}
</style>
