<template>
	<view class="momentFeed">
		<!-- Stories：与首页同源活动列表（封面 + 标题），首项为发布入口 -->
		<view class="storiesStrip">
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
		</view>

		<view class="feedDivider"></view>

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
						<uni-icons type="more-filled" size="18" color="#5d547f"></uni-icons>
					</view>
				</view>

				<!-- 媒体区：多图可横滑切换；单图同用 swiper 保持布局一致 -->
				<view v-if="item.images && item.images.length" class="mediaWrap">
					<swiper
						class="postSwiper"
						:class="{ postSwiperPeek: item.images.length > 1 }"
						:circular="item.images.length > 1"
						:indicator-dots="item.images.length > 1"
						indicator-color="rgba(255,255,255,0.45)"
						indicator-active-color="#ffffff"
						:duration="280"
						:next-margin="item.images.length > 1 ? '28rpx' : '0'"
						:previous-margin="item.images.length > 1 ? '28rpx' : '0'"
						@touchmove.stop
					>
						<swiper-item v-for="(img, idx) in item.images" :key="item.id + '-img-' + idx">
							<image class="postImage" :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
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
								:color="likedMap[item.id] ? '#ff5fb3' : '#5d547f'"
							></uni-icons>
						</view>
						<view class="actionHit" @click="onCommentTap(item)">
							<uni-icons type="chatbubble" size="24" color="#5d547f"></uni-icons>
						</view>
						<view class="actionHit" @click="onShareTap(item)">
							<uni-icons type="paperplane" size="24" color="#5d547f"></uni-icons>
						</view>
					</view>
					<view class="actionHit" @click="onSaveTap(item)">
						<uni-icons type="star" size="24" color="#5d547f"></uni-icons>
					</view>
				</view>

				<!-- 点赞摘要 -->
				<view v-if="likeSummary(item)" class="likeLine">
					<text class="likeLineText">{{ likeSummary(item) }}</text>
				</view>

				<!-- 配文（有图时显示用户名 + 文案） -->
				<view
					v-if="item.images && item.images.length"
					class="captionBlock"
					:class="{ captionBlockDivided: item.comments && item.comments.length }"
				>
					<view class="captionUser">{{ item.name }}</view>
					<view class="captionText">{{ item.content }}</view>
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
						<view class="commentUser">{{ c.user }}</view>
						<view class="commentTxt">{{ c.text }}</view>
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
/* 与首页活动卡 / 分类栏一致的紫粉渐变与圆角体系 */
.momentFeed {
	width: 100%;
	background: linear-gradient(180deg, #f4f5f7 0%, #f0f2ff 55%, #f4f5f7 100%);
	padding-bottom: 24rpx;
	box-sizing: border-box;
}

.storiesStrip {
	margin: 10rpx 24rpx 0;
	padding: 4rpx 4rpx 2rpx;
	border-radius: 24rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 243, 255, 0.75) 100%);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	box-shadow: 0 10rpx 28rpx rgba(105, 62, 255, 0.1);
	box-sizing: border-box;
}

.storiesScroll {
	width: 100%;
	white-space: nowrap;
	background-color: transparent;
}

.storiesRow {
	display: flex;
	flex-direction: row;
	padding: 18rpx 14rpx 20rpx;
	gap: 24rpx;
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
	background: linear-gradient(135deg, #7d5fff 0%, #b8a0ff 42%, #ff5fb3 100%);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.28);
}

.storyRingAdd {
	background: linear-gradient(145deg, #e8e4f5 0%, #f0eef8 100%);
	box-shadow: 0 6rpx 14rpx rgba(50, 40, 90, 0.08);
}

.storyAvatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 4rpx solid #ffffff;
	background-color: #eae8f4;
}

.storyName {
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #5d547f;
	max-width: 132rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
	font-weight: 500;
}

.feedDivider {
	height: 2rpx;
	margin: 14rpx 24rpx 10rpx;
	border-radius: 2rpx;
	background: linear-gradient(
		90deg,
		rgba(125, 95, 255, 0) 0%,
		rgba(125, 95, 255, 0.22) 50%,
		rgba(125, 95, 255, 0) 100%
	);
}

.posts {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
	padding: 10rpx 24rpx 24rpx;
	background: transparent;
}

.postCard {
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	border-radius: 28rpx;
	padding-bottom: 20rpx;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	box-sizing: border-box;
}

.postCard::before {
	content: '';
	position: absolute;
	top: -48rpx;
	right: -32rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(125, 95, 255, 0.2) 0%, rgba(125, 95, 255, 0) 68%);
	pointer-events: none;
	z-index: 0;
}

.postHead {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 22rpx 14rpx;
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
	margin-right: 18rpx;
	flex-shrink: 0;
	background-color: #eae8f4;
	border: 2rpx solid rgba(255, 255, 255, 0.95);
	box-shadow: 0 4rpx 12rpx rgba(50, 40, 90, 0.1);
}

.postHeadMeta {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.postUserName {
	font-size: 28rpx;
	font-weight: 600;
	letter-spacing: 0.2rpx;
	color: #1b1732;
}

.postActivity {
	margin-top: 6rpx;
	font-size: 22rpx;
	color: #6c6392;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.postMore {
	padding: 8rpx 4rpx 8rpx 16rpx;
	opacity: 0.9;
}

.mediaWrap {
	position: relative;
	z-index: 1;
	width: 100%;
	background: linear-gradient(180deg, #0d0618 0%, #1a1430 100%);
}

.postSwiper {
	width: 100%;
	height: 750rpx;
}

.postSwiperPeek {
	touch-action: pan-x;
}

.postImage {
	width: 100%;
	height: 750rpx;
	display: block;
	background-color: #120a24;
}

.textOnlyWrap {
	position: relative;
	z-index: 1;
	margin: 0 22rpx 8rpx;
	padding: 32rpx 26rpx;
	background: linear-gradient(
		90deg,
		rgba(125, 95, 255, 0.08) 0%,
		rgba(255, 255, 255, 0.92) 40%,
		rgba(95, 190, 255, 0.08) 100%
	);
	border-radius: 20rpx;
	border: 2rpx solid rgba(125, 95, 255, 0.14);
	box-shadow: 0 8rpx 22rpx rgba(105, 62, 255, 0.08);
}

.textOnlyBody {
	font-size: 30rpx;
	line-height: 1.55;
	color: #1b1732;
}

.actionRow {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14rpx 14rpx 6rpx 18rpx;
	margin-top: 2rpx;
}

.actionLeft {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.actionHit {
	padding: 8rpx 12rpx;
	border-radius: 16rpx;
}

.actionHit:active {
	background: rgba(125, 95, 255, 0.08);
}

.likeLine {
	position: relative;
	z-index: 1;
	padding: 0 22rpx 8rpx;
}

.likeLineText {
	font-size: 26rpx;
	font-weight: 600;
	color: #4a3f7d;
}

.captionBlock {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	padding: 0 22rpx 8rpx;
	font-size: 28rpx;
	line-height: 1.5;
}

.captionUser {
	flex-shrink: 0;
	margin-right: 16rpx;
	font-weight: 600;
	color: #5d37ff;
}

.captionText {
	flex: 1;
	min-width: 0;
	color: #1b1732;
	overflow-wrap: anywhere;
	word-break: break-word;
}

.captionBlockDivided {
	padding-bottom: 16rpx;
	margin-bottom: 8rpx;
	border-bottom: 1rpx dashed rgba(125, 95, 255, 0.28);
}

.commentsPreview {
	position: relative;
	z-index: 1;
	padding: 4rpx 22rpx 0;
}

.viewAllComments {
	display: block;
	font-size: 26rpx;
	color: #7b65d9;
	font-weight: 500;
	margin-bottom: 10rpx;
}

.commentRow {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	font-size: 26rpx;
	line-height: 1.45;
	margin-bottom: 8rpx;
}

.commentUser {
	flex-shrink: 0;
	margin-right: 16rpx;
	font-weight: 600;
	color: #5d37ff;
}

.commentTxt {
	flex: 1;
	min-width: 0;
	color: #1b1732;
	overflow-wrap: anywhere;
	word-break: break-word;
}

.timeRow {
	position: relative;
	z-index: 1;
	display: block;
	padding: 12rpx 22rpx 0;
	font-size: 22rpx;
	color: #8b919a;
	letter-spacing: 0.3rpx;
}
</style>
