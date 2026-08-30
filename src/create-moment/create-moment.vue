<template>
	<view class="pageRoot">
		<!-- 顶栏 -->
		<view class="topBar">
			<view class="topBarClose" @click="onBack">
				<uni-icons type="left" size="22" color="#5f5a6e"></uni-icons>
			</view>
			<text class="topBarTitle">发布时刻</text>
			<view class="topBarPublish" :class="{ disabled: publishing || !canPublish }" @click="submitPublish">
				<text class="topBarPublishText">{{ publishing ? '发布中…' : '发布' }}</text>
			</view>
		</view>

		<!-- 表单区 -->
		<scroll-view scroll-y class="formScroll" :show-scrollbar="false">
			<!-- 文字 -->
			<view class="sectionCard">
				<textarea
					v-model="publishContent"
					class="publishTextarea"
					placeholder="分享此刻的想法…"
					placeholder-class="textareaPh"
					maxlength="500"
					:show-confirm-bar="false"
					auto-height
				></textarea>
				<view class="countRow">
					<text class="countText">{{ publishContent.length }} / 500</text>
				</view>
			</view>

			<!-- 图片 -->
			<view class="sectionCard">
				<view class="imgGrid">
					<view v-for="(img, i) in publishImages" :key="'pi-' + i" class="imgItem">
						<image class="img" :src="img" mode="aspectFill"></image>
						<view class="imgDel" @click.stop="removePublishImage(i)">
							<uni-icons type="closeempty" size="16" color="#ffffff"></uni-icons>
						</view>
					</view>
					<view v-if="publishImages.length < 9" class="imgAdd" @click="choosePublishImages">
						<uni-icons type="plusempty" size="30" color="#9aa0ab"></uni-icons>
						<text class="imgAddText">添加图片</text>
					</view>
				</view>
			</view>

			<!-- 关联活动 -->
			<view class="sectionCard activityRow" @click="pickPublishActivity">
				<view class="activityLeft">
					<uni-icons type="flag" :size="18" :color="publishActivityTitle ? '#7D5FFF' : '#9aa0ab'"></uni-icons>
					<text class="activityLabel">关联活动</text>
				</view>
				<view class="activityRight">
					<text :class="['activityValue', !publishActivityTitle && 'muted']">
						{{ publishActivityTitle || '暂不关联' }}
					</text>
					<uni-icons type="right" size="16" color="#c2c6d0"></uni-icons>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { createMoment } from '@/api/modules/moment.js'
	import { fetchHomeActivityList } from '@/api/modules/activity.js'

	export default {
		name: 'CreateMoment',
		data() {
			return {
				publishContent: '',
				publishImages: [],
				publishActivityId: '',
				publishActivityTitle: '',
				activities: [],
				publishing: false
			}
		},
		computed: {
			canPublish() {
				return String(this.publishContent || '').trim().length > 0
			}
		},
		async onLoad() {
			// 未登录直接拦截返回
			if (!this.myUserId()) {
				uni.showToast({ title: '请先登录', icon: 'none' })
				setTimeout(() => this.onBack(), 400)
				return
			}
			this.loadActivities()
		},
		methods: {
			/** 当前用户 id（发布用），未登录返回空串 */
			myUserId() {
				try {
					return String(uni.getStorageSync('userId') || '')
				} catch (_) {
					return ''
				}
			},
			onBack() {
				const pages = getCurrentPages()
				if (pages.length > 1) {
					uni.navigateBack()
				} else {
					uni.switchTab({ url: '/pages/moment/moment' })
				}
			},
			/** 加载可关联的活动列表 */
			async loadActivities() {
				try {
					const list = await fetchHomeActivityList()
					this.activities = Array.isArray(list) ? list : []
				} catch (_) {
					this.activities = []
				}
			},
			/** 选择发布图片（本地路径，最多 9 张） */
			choosePublishImages() {
				uni.chooseImage({
					count: 9 - this.publishImages.length,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const paths = res.tempFilePaths || []
						this.publishImages = this.publishImages.concat(paths)
					},
				})
			},
			/** 移除一张已选图片 */
			removePublishImage(i) {
				this.publishImages.splice(i, 1)
			},
			/** 选择关联活动 */
			pickPublishActivity() {
				const list = Array.isArray(this.activities) ? this.activities : []
				if (!list.length) {
					uni.showToast({ title: '暂无可关联的活动', icon: 'none' })
					return
				}
				uni.showActionSheet({
					itemList: list.map((a) => a.title || '活动'),
					success: (res) => {
						const a = list[res.tapIndex]
						this.publishActivityId = a.activity_id || a.id || ''
						this.publishActivityTitle = a.title || ''
					},
				})
			},
			/** 提交发布动态 */
			async submitPublish() {
				const content = String(this.publishContent || '').trim()
				if (!content) {
					uni.showToast({ title: '说点什么再发布吧', icon: 'none' })
					return
				}
				if (this.publishing) return
				this.publishing = true
				try {
					await createMoment({
						user_id: this.myUserId() || undefined,
						activity_id: this.publishActivityId || undefined,
						content,
						image_urls: this.publishImages.length
							? this.publishImages
							: undefined,
					})
					uni.showToast({ title: '发布成功', icon: 'success' })
					setTimeout(() => this.onBack(), 400)
				} catch (e) {
					uni.showToast({
						title: (e && e.message) || '发布失败',
						icon: 'none'
					})
				} finally {
					this.publishing = false
				}
			}
		}
	}
</script>

<style scoped>
	.pageRoot {
		min-height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #f6f4ff 0%, #f0f2ff 50%, #f4f5f7 100%);
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 顶栏 */
	.topBar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 96rpx;
		padding: 0 24rpx;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(10rpx);
		border-bottom: 1rpx solid rgba(125, 95, 255, 0.08);
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.topBarClose {
		width: 64rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #f2f0fa;
	}
	.topBarTitle {
		font-size: 32rpx;
		font-weight: 600;
		color: #3d3750;
	}
	.topBarPublish {
		height: 64rpx;
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 999rpx;
		background: linear-gradient(120deg, #7d5fff 0%, #ff5fb3 100%);
		box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.28);
	}
	.topBarPublish.disabled {
		background: #d6d9e3;
		box-shadow: none;
	}
	.topBarPublishText {
		font-size: 28rpx;
		font-weight: 600;
		color: #ffffff;
	}

	/* 表单区 */
	.formScroll {
		flex: 1;
		min-height: 0;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.sectionCard {
		background: #ffffff;
		border-radius: 24rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 6rpx 24rpx rgba(125, 95, 255, 0.08);
	}

	.publishTextarea {
		width: 100%;
		min-height: 260rpx;
		font-size: 30rpx;
		line-height: 1.6;
		color: #2f2b3d;
	}
	.textareaPh {
		color: #b9bec9;
	}
	.countRow {
		display: flex;
		justify-content: flex-end;
		margin-top: 12rpx;
	}
	.countText {
		font-size: 24rpx;
		color: #b9bec9;
	}

	/* 图片 */
	.imgGrid {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
	}
	.imgItem {
		position: relative;
		width: 200rpx;
		height: 200rpx;
	}
	.img {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		background: #f2f0fa;
	}
	.imgDel {
		position: absolute;
		top: 6rpx;
		right: 6rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.imgAdd {
		width: 200rpx;
		height: 200rpx;
		border-radius: 16rpx;
		border: 2rpx dashed #d4d8e2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #faf9ff;
	}
	.imgAddText {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #9aa0ab;
	}

	/* 关联活动 */
	.activityRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.activityLeft {
		display: flex;
		align-items: center;
		gap: 14rpx;
	}
	.activityLabel {
		font-size: 28rpx;
		color: #3d3750;
		font-weight: 500;
	}
	.activityRight {
		display: flex;
		align-items: center;
		gap: 10rpx;
		flex: 1;
		justify-content: flex-end;
	}
	.activityValue {
		font-size: 28rpx;
		color: #7d5fff;
		max-width: 320rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.activityValue.muted {
		color: #9aa0ab;
	}
</style>