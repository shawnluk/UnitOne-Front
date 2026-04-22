<template>
	<view class="momentFeed">
		<view class="coverSection">
			<image class="coverImage" :src="coverImage" mode="aspectFill"></image>
			<view class="profile">
				<text class="nickname">{{ nickname }}</text>
				<image class="avatar" :src="profileAvatar" mode="aspectFill"></image>
			</view>
		</view>

		<view class="feed">
			<view class="post" v-for="item in posts" :key="item.id">
				<image class="postAvatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="postBody">
					<text class="postName">{{ item.name }}</text>
					<text class="postContent">{{ item.content }}</text>

					<view class="photoGrid" v-if="item.images && item.images.length">
						<image
							class="photoItem"
							v-for="(img, index) in item.images"
							:key="item.id + '-' + index"
							:src="img"
							mode="aspectFill"
						></image>
					</view>

					<view class="postMeta">
						<text class="postTime">{{ item.time }}</text>
						<view class="actionBtn">···</view>
					</view>

					<view class="interaction" v-if="item.likes.length || item.comments.length">
						<view class="likes" v-if="item.likes.length">
							<text class="icon">❤</text>
							<text class="likesText">{{ item.likes.join('、') }}</text>
						</view>
						<view class="comment" v-for="(comment, idx) in item.comments" :key="item.id + '-c-' + idx">
							<text class="commentName">{{ comment.user }}：</text>
							<text class="commentText">{{ comment.text }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MomentFeed',
		props: {
			posts: {
				type: Array,
				default: () => []
			},
			nickname: {
				type: String,
				default: '小明的朋友圈'
			},
			profileAvatar: {
				type: String,
				default: 'https://picsum.photos/120/120?random=100'
			},
			coverImage: {
				type: String,
				default: 'https://picsum.photos/900/360?random=99'
			}
		}
	}
</script>

<style scoped>
.momentFeed {
	width: 100%;
}

.coverSection {
	position: relative;
	margin-bottom: 24rpx;
}

.coverImage {
	width: 100%;
	height: 360rpx;
}

.profile {
	position: absolute;
	right: 24rpx;
	bottom: -36rpx;
	display: flex;
	align-items: center;
}

.nickname {
	color: #ffffff;
	font-size: 30rpx;
	font-weight: 600;
	margin-right: 16rpx;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.45);
}

.avatar {
	width: 96rpx;
	height: 96rpx;
	border-radius: 12rpx;
	border: 4rpx solid #ffffff;
}

.feed {
	padding: 56rpx 24rpx 0;
}

.post {
	display: flex;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #e6e6e6;
}

.postAvatar {
	width: 76rpx;
	height: 76rpx;
	border-radius: 8rpx;
	margin-right: 16rpx;
	flex-shrink: 0;
}

.postBody {
	flex: 1;
}

.postName {
	color: #576b95;
	font-size: 30rpx;
	font-weight: 600;
}

.postContent {
	display: block;
	margin-top: 10rpx;
	color: #222222;
	font-size: 28rpx;
	line-height: 1.6;
}

.photoGrid {
	margin-top: 14rpx;
	display: flex;
	flex-wrap: wrap;
}

.photoItem {
	width: 190rpx;
	height: 190rpx;
	border-radius: 8rpx;
	margin-right: 8rpx;
	margin-bottom: 8rpx;
	background-color: #ececec;
}

.postMeta {
	margin-top: 12rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.postTime {
	color: #9a9a9a;
	font-size: 24rpx;
}

.actionBtn {
	color: #576b95;
	font-size: 34rpx;
	line-height: 1;
	padding: 0 10rpx;
}

.interaction {
	margin-top: 10rpx;
	background-color: #f7f7f7;
	border-radius: 8rpx;
	padding: 12rpx;
}

.likes {
	display: flex;
	align-items: flex-start;
}

.icon {
	color: #576b95;
	font-size: 22rpx;
	margin-right: 8rpx;
	margin-top: 2rpx;
}

.likesText {
	color: #576b95;
	font-size: 25rpx;
	line-height: 1.5;
}

.comment {
	margin-top: 8rpx;
	font-size: 25rpx;
	line-height: 1.5;
}

.commentName {
	color: #576b95;
}

.commentText {
	color: #333333;
}
</style>
