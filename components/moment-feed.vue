<template>
	<view class="momentFeed">
		<!-- Stories：与首页同源活动列表（封面 + 标题），首项为发布入口 -->
		<scroll-view class="storiesScroll" scroll-x :show-scrollbar="false" enable-flex>
			<view class="storiesRow">
				<view
					v-for="s in storyList"
					:key="s.id"
					class="storyCell"
					@click="onStoryTap(s)"
				>
					<view class="storyRing" :class="{ storyRingAdd: s.isAdd }">
						<image class="storyAvatar" :src="s.avatar" mode="aspectFill"></image>
					</view>
					<text class="storyName">{{ s.name }}</text>
				</view>
			</view>
		</scroll-view>

		<view class="hairline"></view>

		<!-- 信息流 -->
		<view class="posts">
			<view class="postCard" v-for="item in posts" :key="item.id">
				<!-- 帖头 -->
				<view class="postHead">
					<view class="postHeadLeft">
						<image class="postHeadAvatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="postHeadMeta">
							<text class="postUserName">{{ item.name }}</text>
							<text v-if="item.activityTitle" class="postActivity">{{ item.activityTitle }}</text>
						</view>
					</view>
					<view class="postMore" @click="onMore(item)">
						<uni-icons type="more-filled" size="18" color="#262626"></uni-icons>
					</view>
				</view>

				<!-- 媒体区：多图轮播 / 单图 / 纯文字 -->
				<view v-if="item.images && item.images.length > 1" class="mediaWrap">
					<swiper
						class="postSwiper"
						:circular="false"
						indicator-dots
						indicator-color="rgba(255,255,255,0.45)"
						indicator-active-color="#ffffff"
					>
						<swiper-item v-for="(img, idx) in item.images" :key="item.id + '-img-' + idx">
							<image class="postImage" :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
				<view v-else-if="item.images && item.images.length === 1" class="mediaWrap">
					<image class="postImage" :src="item.images[0]" mode="aspectFill"></image>
				</view>
				<view v-else class="textOnlyWrap">
					<text class="textOnlyBody">{{ item.content }}</text>
				</view>

				<!-- 操作栏 -->
				<view class="actionRow">
					<view class="actionLeft">
						<view class="actionHit" @click="toggleLike(item.id)">
							<uni-icons
								:type="likedMap[item.id] ? 'heart-filled' : 'heart'"
								size="26"
								:color="likedMap[item.id] ? '#ff3040' : '#262626'"
							></uni-icons>
						</view>
						<view class="actionHit" @click="onCommentTap(item)">
							<uni-icons type="chatbubble" size="24" color="#262626"></uni-icons>
						</view>
						<view class="actionHit" @click="onShareTap(item)">
							<uni-icons type="paperplane" size="24" color="#262626"></uni-icons>
						</view>
					</view>
					<view class="actionHit" @click="onSaveTap(item)">
						<uni-icons type="star" size="24" color="#262626"></uni-icons>
					</view>
				</view>

				<!-- 点赞摘要 -->
				<view v-if="likeSummary(item)" class="likeLine">
					<text class="likeLineText">{{ likeSummary(item) }}</text>
				</view>

				<!-- 配文（有图时显示用户名 + 文案） -->
				<view v-if="item.images && item.images.length" class="captionBlock">
					<text class="captionUser">{{ item.name }}</text>
					<text class="captionText"> {{ item.content }}</text>
				</view>

				<!-- 评论预览 -->
				<view v-if="item.comments && item.comments.length" class="commentsPreview">
					<text
						v-if="item.comments.length > 2"
						class="viewAllComments"
						@click="onCommentTap(item)"
					>
						查看全部 {{ item.comments.length }} 条评论
					</text>
					<view
						v-for="(c, cidx) in visibleComments(item)"
						:key="item.id + '-c-' + cidx"
						class="commentRow"
					>
						<text class="commentUser">{{ c.user }}</text>
						<text class="commentTxt"> {{ c.text }}</text>
					</view>
				</view>

				<text class="timeRow">{{ item.time }}</text>
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
			profileAvatar: {
				type: String,
				default: ''
			},
			/** 与首页活动卡片同源；接口返回后由页面传入 */
			activities: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				likedMap: {}
			}
		},
		computed: {
			storyList() {
				const fallbackAva =
					this.profileAvatar ||
					'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png'
				const head = [
					{
						id: '__publish__',
						name: '发布',
						avatar: fallbackAva,
						isAdd: true
					}
				]
				const list = Array.isArray(this.activities) ? this.activities : []
				const rest = list.map((a, i) => ({
					id: String(a.name || a.id || `activity-${i}`),
					name: this.shortStoryTitle(a.title),
					avatar: a.cover || a.org_avatar || fallbackAva,
					isAdd: false,
					activity: a
				}))
				return head.concat(rest)
			}
		},
		methods: {
			toggleLike(id) {
				this.likedMap[id] = !this.likedMap[id]
			},
			visibleComments(item) {
				if (!item.comments || !item.comments.length) return []
				return item.comments.slice(0, 2)
			},
			likeSummary(item) {
				const names = item.likes || []
				const base =
					item.likeCount != null ? Number(item.likeCount) : names.length
				let count = Math.max(base, names.length)
				if (this.likedMap[item.id] && count === 0) count = 1
				if (count <= 0) return ''
				if (names.length >= 2 && count <= 12 && !this.likedMap[item.id]) {
					return `${names.slice(0, 2).join('、')} 等人赞过`
				}
				return `${count} 次赞`
			},
			onMore(_item) {
				uni.showActionSheet({
					itemList: ['举报', '不感兴趣', '复制链接'],
					fail: () => {}
				})
			},
			onCommentTap(_item) {
				uni.showToast({ title: '评论功能开发中', icon: 'none' })
			},
			onShareTap(_item) {
				uni.showToast({ title: '分享功能开发中', icon: 'none' })
			},
			onSaveTap(_item) {
				uni.showToast({ title: '已收藏', icon: 'none' })
			},
			onCreateTap() {
				uni.showToast({ title: '发布活动时刻', icon: 'none' })
			},
			shortStoryTitle(title) {
				if (!title) return '活动'
				const s = String(title).trim()
				return s.length > 11 ? `${s.slice(0, 11)}…` : s
			},
			openActivityDetail(activity) {
				if (!activity) return
				try {
					uni.redirectTo({
						url:
							'/src/activity-detail/activity-detail?item=' +
							encodeURIComponent(JSON.stringify(activity))
					})
				} catch (_e) {
					uni.showToast({ title: '无法打开活动', icon: 'none' })
				}
			},
			onStoryTap(s) {
				if (s.isAdd) {
					this.onCreateTap()
					return
				}
				if (s.activity) {
					this.openActivityDetail(s.activity)
				}
			}
		}
	}
</script>

<style scoped>
.momentFeed {
	width: 100%;
	background-color: #fafafa;
	padding-bottom: 24rpx;
}

.storiesScroll {
	width: 100%;
	background-color: #ffffff;
	white-space: nowrap;
}

.storiesRow {
	display: flex;
	flex-direction: row;
	padding: 20rpx 16rpx 24rpx;
	gap: 28rpx;
}

.storyCell {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	width: 132rpx;
	flex-shrink: 0;
	vertical-align: top;
}

.storyRing {
	width: 112rpx;
	height: 112rpx;
	border-radius: 50%;
	padding: 4rpx;
	box-sizing: border-box;
	background: linear-gradient(
		45deg,
		#f09433 0%,
		#e6683c 25%,
		#dc2743 50%,
		#cc2366 75%,
		#bc1888 100%
	);
}

.storyRingAdd {
	background: #dbdbdb;
	padding: 4rpx;
}

.storyAvatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 4rpx solid #ffffff;
	background-color: #efefef;
}

.storyName {
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #262626;
	max-width: 132rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}

.hairline {
	height: 1rpx;
	background-color: #dbdbdb;
}

.posts {
	background-color: #fafafa;
}

.postCard {
	background-color: #ffffff;
	margin-bottom: 16rpx;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #efefef;
}

.postHead {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 24rpx 16rpx;
}

.postHeadLeft {
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
}

.postHeadAvatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	margin-right: 20rpx;
	flex-shrink: 0;
	background-color: #efefef;
}

.postHeadMeta {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.postUserName {
	font-size: 28rpx;
	font-weight: 600;
	color: #262626;
}

.postActivity {
	margin-top: 4rpx;
	font-size: 22rpx;
	color: #8e8e8e;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.postMore {
	padding: 8rpx 4rpx 8rpx 16rpx;
}

.mediaWrap {
	width: 100%;
	background-color: #000000;
}

.postSwiper {
	width: 100%;
	height: 750rpx;
}

.postImage {
	width: 100%;
	height: 750rpx;
	display: block;
	background-color: #1a1a1a;
}

.textOnlyWrap {
	margin: 0 24rpx 8rpx;
	padding: 36rpx 28rpx;
	background: linear-gradient(145deg, #f5f5f5 0%, #fafafa 100%);
	border-radius: 8rpx;
	border: 1rpx solid #efefef;
}

.textOnlyBody {
	font-size: 30rpx;
	line-height: 1.55;
	color: #262626;
}

.actionRow {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16rpx 16rpx 8rpx;
}

.actionLeft {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.actionHit {
	padding: 8rpx 12rpx;
}

.likeLine {
	padding: 0 24rpx 8rpx;
}

.likeLineText {
	font-size: 26rpx;
	font-weight: 600;
	color: #262626;
}

.captionBlock {
	padding: 0 24rpx 8rpx;
	font-size: 28rpx;
	line-height: 1.5;
}

.captionUser {
	font-weight: 600;
	color: #262626;
}

.captionText {
	color: #262626;
}

.commentsPreview {
	padding: 4rpx 24rpx 0;
}

.viewAllComments {
	display: block;
	font-size: 26rpx;
	color: #8e8e8e;
	margin-bottom: 8rpx;
}

.commentRow {
	font-size: 26rpx;
	line-height: 1.45;
	margin-bottom: 6rpx;
}

.commentUser {
	font-weight: 600;
	color: #262626;
}

.commentTxt {
	color: #262626;
}

.timeRow {
	display: block;
	padding: 12rpx 24rpx 0;
	font-size: 22rpx;
	color: #8e8e8e;
	text-transform: uppercase;
	letter-spacing: 0.5rpx;
}
</style>
