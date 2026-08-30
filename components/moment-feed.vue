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
						<view class="actionHit" @click="toggleLike(item)">
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

				<!-- 评论预览（点击查看全部后原地展开） -->
				<view v-if="item.comments && item.comments.length" class="commentsPreview">
					<text
						v-if="item.comments.length > 2"
						class="viewAllComments"
						@click="onViewAllComments(item)"
					>
						{{ expandedMap[item.id] ? '收起评论' : '查看全部 ' + item.comments.length + ' 条评论' }}
					</text>

					<!-- 未展开：预览最近 2 条 -->
					<template v-if="!expandedMap[item.id]">
						<view
							v-for="(c, cidx) in visibleComments(item)"
							:key="item.id + '-c-' + cidx"
							class="commentRow"
						>
							<view class="commentUser">{{ c.user }}</view>
							<view class="commentTxt">{{ c.text }}</view>
						</view>
					</template>

					<!-- 展开：展示全部，超出 3 条可滚动查看（PC 端鼠标滚轮同样生效） -->
					<view v-else class="commentsExpandWrap">
						<view
							class="commentsExpandScroll"
						>
							<view
								v-for="(c, cidx) in item.comments"
								:key="item.id + '-ec-' + cidx"
								class="commentRow commentsExpandRow"
							>
								<view class="commentUser">{{ c.user }}</view>
								<view class="commentTxt">{{ c.text }}</view>
							</view>
						</view>
					</view>
				</view>

				<text class="timeRow">{{ item.time }}</text>
			</view>
		</view>

		</view>
</template>

<script>
	import { MOCK_MOMENT_STORY_FALLBACK_AVATAR } from '@/mock/moment-feed.js'
	import {
		likeMoment,
		unlikeMoment,
		addMomentComment
	} from '@/api/modules/moment.js'

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
				likedMap: {},
				/** 已展开全部评论的帖子 id 集合 */
				expandedMap: {}
			}
		},
		computed: {
			storyList() {
				const fallbackAva = this.profileAvatar || MOCK_MOMENT_STORY_FALLBACK_AVATAR
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
					id: String(a.activity_id || a.id || `activity-${i}`),
					name: this.shortStoryTitle(a.title),
					avatar: a.cover || a.squad_avatar || fallbackAva,
					isAdd: false,
					activity: a
				}))
				return head.concat(rest)
			}
		},
		watch: {
			/** 列表加载/刷新时，按后端返回的 likedByMe 精确标记红心状态 */
			posts: {
				handler(newPosts) {
					this.syncLikedMap(newPosts)
				}
			}
		},
		methods: {
			/** 按每帖的 likedByMe 字段（后端按 user_id 精确计算）重建 likedMap */
			syncLikedMap(posts) {
				const map = {}
				;(Array.isArray(posts) ? posts : []).forEach((p) => {
					if (p && p.likedByMe) map[p.id] = true
				})
				this.likedMap = map
			},
			/** 切换点赞状态：未登录拦截，已登录调用后端 */
			async toggleLike(item) {
				this.requireLogin(async () => {
					const id = item.id
					const willLike = !this.likedMap[id]
					const me = this.myNickname()
					const base =
						item.likeCount != null
							? Number(item.likeCount)
							: (item.likes || []).length
					// 乐观更新
					this.likedMap[id] = willLike
					item.likeCount = Math.max(0, base + (willLike ? 1 : -1))
					item.likes = item.likes || []
					if (willLike) {
						if (me && !item.likes.includes(me)) item.likes.push(me)
					} else {
						item.likes = item.likes.filter((n) => n !== me)
					}
					try {
						if (willLike) await likeMoment(id)
						else await unlikeMoment(id)
					} catch (e) {
						// 失败回滚
						this.likedMap[id] = !willLike
						item.likeCount = Math.max(0, Number(item.likeCount) - (willLike ? 1 : -1))
						if (willLike && me) {
							item.likes = item.likes.filter((n) => n !== me)
						} else if (!willLike && me && !item.likes.includes(me)) {
							item.likes.push(me)
						}
						uni.showToast({ title: (e && e.message) || '操作失败', icon: 'none' })
					}
				})
			},
			/** 返回评论预览（最多 2 条，取最近），新评论可见 */
			visibleComments(item) {
				if (!item.comments || !item.comments.length) return []
				return item.comments.slice(-2)
			},
			/** 生成点赞摘要文案 */
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
			/** 点击更多：弹出举报/不感兴趣/复制链接面板 */
			onMore(_item) {
				uni.showActionSheet({
					itemList: ['举报', '不感兴趣', '复制链接'],
					fail: () => {}
				})
			},
			/** 点击评论（发布评论）：需登录，弹窗输入后调用后端 */
			onCommentTap(item) {
				this.requireLogin(() => {
					uni.showModal({
						title: '发表评论',
						editable: true,
						placeholderText: '友善评论，温和表达…',
						success: (res) => {
							if (!res.confirm) return
							const text = String(res.content || '').trim()
							if (text) this.addComment(item, text)
						},
					})
				})
			},
			/** 通用：新增评论到指定动态，成功后本地插入并刷新 */
			async addComment(item, text) {
				try {
					await addMomentComment(item.id, text)
					uni.showToast({ title: '评论成功', icon: 'success' })
					const me = this.myNickname()
					item.comments = (item.comments || []).concat({
						user: me || '我',
						text
					})
					this.$emit('refresh')
					return true
				} catch (e) {
					uni.showToast({
						title: (e && e.message) || '评论失败',
						icon: 'none'
					})
					return false
				}
			},
			/** 校验登录态：未登录返回 false */
			isLoggedIn() {
				let userId = ''
				let userInfo = null
				try {
					userId = uni.getStorageSync('userId')
					userInfo = uni.getStorageSync('userInfo')
				} catch (_) {}
				return Boolean(userId || userInfo)
			},
			/** 需要登录的操作统一拦截：未登录弹窗询问登录或返回时刻 */
			requireLogin(next) {
				if (this.isLoggedIn()) {
					next && next()
					return
				}
				uni.showModal({
					title: '提示',
					content: '该操作需要登录，是否前往登录？',
					confirmText: '去登录',
					cancelText: '返回时刻',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({ url: '/src/login/login' })
						}
						// 取消（返回时刻）：停留在当前页面即可，无需处理
					},
				})
			},
			/** 点击查看全部评论：需登录，在帖子上原地展开/收起 */
			onViewAllComments(item) {
				this.requireLogin(() => {
					this.$set(this.expandedMap, item.id, !this.expandedMap[item.id])
				})
			},
			/** 点击分享/转发：需登录 */
			onShareTap(_item) {
				this.requireLogin(() => {
					uni.showToast({ title: '分享功能开发中', icon: 'none' })
				})
			},
			/** 点击收藏：提示已收藏 */
			onSaveTap(_item) {
				uni.showToast({ title: '已收藏', icon: 'none' })
			},
			/** 点击发布入口：需登录，跳转全屏发布页 */
			onCreateTap() {
				this.requireLogin(() => {
					uni.navigateTo({ url: '/src/create-moment/create-moment' })
				})
			},
			/** 当前用户昵称（用于点赞本地判定），未登录返回空串 */
			myNickname() {
				let info = null
				try {
					info = uni.getStorageSync('userInfo')
				} catch (_) {}
				return info && info.nickname ? String(info.nickname) : ''
			},
			/** 截断超长活动标题（最多 11 字） */
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
			/** 点击故事：发布入口或跳转对应活动详情 */
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

/* ===== 评论原地展开滚动区 ===== */
.commentsExpandWrap {
	position: relative;
	z-index: 1;
}

.commentsExpandScroll {
	height: 302rpx;
	box-sizing: border-box;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 16rpx 18rpx;
	background: rgba(125, 95, 255, 0.045);
	border: 2rpx solid rgba(125, 95, 255, 0.12);
	border-radius: 18rpx;
}

/* 展开区每条评论固定高度 + 单行省略，保证正好显示 3 条 */
.commentsExpandRow {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	height: 88rpx;
	line-height: 88rpx;
	margin: 0;
	padding: 0;
	border-bottom: 1rpx dashed rgba(125, 95, 255, 0.14);
}

.commentsExpandRow:last-child {
	border-bottom: none;
}

.commentsExpandRow .commentUser {
	flex-shrink: 0;
	line-height: 88rpx;
}

.commentsExpandRow .commentTxt {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
