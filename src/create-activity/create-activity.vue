<template>
	<view class="pageRoot" v-if="showActivityModal">
		<view class="backdrop"></view>
		<view class="sheet">
			<view class="sheetGrabBar"></view>

			<view class="sheetHeader">
				<view class="headerTopRow">
					<view class="headerTitles">
						<text class="headerTitle">发布活动</text>
						<text class="headerSubtitle">完善信息，和活动卡片展示风格一致</text>
					</view>
					<view class="closeBtn" @click="closeActivityModal">
						<text class="closeBtnText">✕</text>
					</view>
				</view>
				<view class="headerAccent"></view>
			</view>

			<!-- scroll-view 在小程序端必须设置明确高度，否则内部 input/editor 无法正常使用 -->
			<scroll-view
				scroll-y
				class="sheetScroll"
				:style="{ height: scrollAreaPx + 'px' }"
				:show-scrollbar="false"
				:enable-flex="true"
			>
				<!-- 封面 -->
				<view class="sectionCard coverCard">
					<view class="sectionHead">
						<text class="sectionTag">封面</text>
						<text class="sectionTitle">活动封面</text>
					</view>
					<view
						class="coverPlaceholder"
						:class="{ hasCover: !!coverTempPath }"
						@click="selectCoverImage"
					>
						<image
							v-if="coverTempPath"
							class="coverPreview"
							:src="coverTempPath"
							mode="aspectFill"
						/>
						<view v-if="coverTempPath" class="coverChangeTip">
							<text class="coverChangeTipText">点击更换封面</text>
						</view>
						<view v-else class="coverInner">
							<view class="coverIconWrap">
								<text class="coverGlyph">＋</text>
							</view>
							<text class="coverHint">点击上传封面图</text>
							<text class="coverSub">建议比例 4:5，更清晰更易被推荐</text>
						</view>
					</view>
				</view>

				<!-- 表单 -->
				<view class="sectionCard formCard">
					<view class="sectionHead">
						<text class="sectionTag">基础信息</text>
						<text class="sectionTitle">活动详情</text>
					</view>

					<view class="field">
						<text class="fieldLabel">活动标题</text>
						<input
							class="fieldInput"
							placeholder="起一个吸引人的标题"
							placeholder-class="fieldPh"
							v-model="activityForm.title"
							:adjust-position="true"
						/>
					</view>

					<view class="field">
						<text class="fieldLabel">活动类型</text>
						<picker mode="selector" :range="typeOptions" @change="onTypePickerChange">
							<view class="fieldSelect">
								<text :class="['fieldSelectText', !activityForm.type && 'isPlaceholder']">
									{{ activityForm.type || '请选择活动类型' }}
								</text>
								<text class="chevron">›</text>
							</view>
						</picker>
					</view>

					<view class="field">
						<text class="fieldLabel">活动时间</text>
						<input
							class="fieldInput fieldInputTime"
							placeholder="请输入或选择活动时间"
							placeholder-class="fieldPh"
							v-model="activityForm.time"
							:adjust-position="true"
						/>
						<view class="timePickRow">
							<picker mode="date" :value="timeDatePart" @change="onDatePickerChange">
								<view class="fieldSelect fieldSelectTime fieldSelectHalf">
									<text class="fieldSelectIco">📅</text>
									<text class="fieldSelectText">选日期</text>
									<text class="chevron">›</text>
								</view>
							</picker>
							<picker mode="time" :value="timeClockPart" @change="onTimePickerChange">
								<view class="fieldSelect fieldSelectTime fieldSelectHalf">
									<text class="fieldSelectIco">⏰</text>
									<text class="fieldSelectText">选时刻</text>
									<text class="chevron">›</text>
								</view>
							</picker>
						</view>
						<text class="timePickHint">可选：用下方按钮填入日期/时刻，仍可在上方自由修改</text>
					</view>

					<view class="field">
						<text class="fieldLabel">活动地点</text>
						<view class="fieldRowLoc">
							<text class="locPin">📍</text>
							<input
								class="fieldInput fieldInputFlex"
								placeholder="城市、场馆或线上链接"
								placeholder-class="fieldPh"
								v-model="activityForm.location"
								:adjust-position="true"
							/>
						</view>
					</view>

					<view class="field">
						<text class="fieldLabel">活动费用</text>
						<view class="fieldRowPrice">
							<text class="priceUnit">¥</text>
							<input
								class="fieldInput fieldInputFlex"
								placeholder="0 表示免费"
								placeholder-class="fieldPh"
								v-model="activityForm.price"
								type="number"
								:adjust-position="true"
							/>
						</view>
					</view>
				</view>

				<view class="sectionCard descCard">
					<view class="sectionHead">
						<text class="sectionTag">介绍</text>
						<text class="sectionTitle">活动描述</text>
					</view>
					<editor
						id="descEditor"
						class="formEditor"
						placeholder="详细说明流程、注意事项，支持配图"
						show-img-size
						show-img-toolbar
						show-img-resize
						@ready="onEditorReady"
						@input="onDescInput"
					></editor>
					<button class="insertImgBtn" type="default" @click="insertDescImage">插入图片</button>
				</view>

				<view class="scrollBottomPad"></view>
			</scroll-view>

			<view class="sheetFooter safeFooter">
				<button class="submitBtn" @click="submitActivity">发布活动</button>
			</view>
		</view>
	</view>
</template>

<script>
import { createActivity } from '@/api/modules/activity.js'

export default {
	data() {
		return {
			showActivityModal: true,
			scrollAreaPx: 480,
			typeOptions: ['线下聚会', '运动健身', '演出观赛', '户外出游', '线上活动', '其他'],
			timeDatePart: '',
			timeClockPart: '',
			coverTempPath: '',
			activityForm: {
				title: '',
				type: '',
				time: '',
				location: '',
				price: '',
				description: '',
				cover: '',
			},
			editorCtx: null,
		}
	},
	onReady() {
		this.updateScrollAreaHeight()
	},
	methods: {
		updateScrollAreaHeight() {
			try {
				const sys = uni.getSystemInfoSync()
				const winH = sys.windowHeight || sys.screenHeight || 667
				const winW = sys.windowWidth || 375
				const rpx2px = winW / 750
				const safeTop =
					sys.safeAreaInsets && typeof sys.safeAreaInsets.top === 'number'
						? sys.safeAreaInsets.top
						: typeof sys.statusBarHeight === 'number'
							? sys.statusBarHeight
							: 0
				// 与 .sheet 顶距一致：安全区顶 + 少量留白（px）
				const sheetTopGap = safeTop + 16
				const safeBottom =
					sys.safeAreaInsets && typeof sys.safeAreaInsets.bottom === 'number'
						? sys.safeAreaInsets.bottom
						: 0
				// 非滚动区高度（与样式一致；原 560rpx 严重偏大，会把 scroll 压得过矮）：
				// sheetGrabBar ~32rpx + sheetHeader ~118–160rpx + sheetFooter ~120rpx + 底部 safe（px）
				const chromeRpx = 320
				const chromeInsideSheet = Math.ceil(chromeRpx * rpx2px) + safeBottom
				const next = Math.floor(winH - sheetTopGap - chromeInsideSheet)
				this.scrollAreaPx = Math.max(320, next)
			} catch (e) {
				this.scrollAreaPx = 480
			}
		},
		/** 根据已选日期、时刻同步到输入框：避免「先选日期再选时刻」时把整段日期+时刻再次拼接导致日期重复 */
		mergeDateTimeIntoForm() {
			const d = (this.timeDatePart || '').trim()
			const t = (this.timeClockPart || '').trim()
			if (d && t) {
				this.activityForm.time = `${d} ${t}`
				return
			}
			if (d && !t) {
				this.activityForm.time = d
				return
			}
			if (!d && t) {
				const cur = (this.activityForm.time || '').trim()
				// 当前内容仅为日期时，只补上时刻
				if (/^\d{4}-\d{2}-\d{2}$/.test(cur)) {
					this.activityForm.time = `${cur} ${t}`
					return
				}
				this.activityForm.time = cur ? `${cur} ${t}`.trim() : t
			}
		},
		onTypePickerChange(e) {
			const i = Number(e.detail.value)
			if (!Number.isNaN(i) && this.typeOptions[i]) {
				this.activityForm.type = this.typeOptions[i]
			}
		},
		onDatePickerChange(e) {
			this.timeDatePart = e.detail.value || ''
			this.mergeDateTimeIntoForm()
		},
		onTimePickerChange(e) {
			this.timeClockPart = e.detail.value || ''
			this.mergeDateTimeIntoForm()
		},
		closeActivityModal() {
			uni.navigateTo({
				url: '/pages/user/user',
			})
		},
		selectCoverImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed', 'original'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const path = res.tempFilePaths && res.tempFilePaths[0]
					if (path) {
						this.coverTempPath = path
						this.activityForm.cover = path
					}
				},
				fail: (err) => {
					const msg = (err && err.errMsg) || ''
					if (msg.includes('cancel') || msg.includes('取消')) return
					uni.showToast({ title: '选择图片失败', icon: 'none' })
				},
			})
		},
		onEditorReady() {
			uni.createSelectorQuery()
				.in(this)
				.select('#descEditor')
				.context((res) => {
					this.editorCtx = res.context
					if (this.activityForm.description) {
						this.editorCtx.setContents({ html: this.activityForm.description })
					}
				})
				.exec()
		},
		onDescInput(e) {
			this.activityForm.description = e.detail.html || ''
		},
		insertDescImage() {
			if (!this.editorCtx) {
				uni.showToast({ title: '编辑器尚未就绪', icon: 'none' })
				return
			}
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: (res) => {
					const filePath = res.tempFilePaths && res.tempFilePaths[0]
					if (filePath) {
						this.editorCtx.insertImage({
							src: filePath,
							alt: '活动图片',
						})
					}
				},
				fail: () => {
					uni.showToast({ title: '选择图片失败', icon: 'none' })
				},
			})
		},
		async submitActivity() {
			const title = (this.activityForm.title || '').trim()
			if (!title) {
				uni.showToast({ title: '请填写活动标题', icon: 'none' })
				return
			}
			try {
				await createActivity({ ...this.activityForm })
				uni.showToast({ title: '发布成功', icon: 'success' })
				this.timeDatePart = ''
				this.timeClockPart = ''
				this.coverTempPath = ''
				this.activityForm = {
					title: '',
					type: '',
					time: '',
					location: '',
					price: '',
					description: '',
					cover: '',
				}
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '发布失败',
					icon: 'none',
				})
			}
		},
	},
}
</script>

<style scoped>
.pageRoot {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
}

.backdrop {
	position: absolute;
	inset: 0;
	background: rgba(27, 23, 50, 0.45);
}

.sheet {
	position: absolute;
	left: 0;
	right: 0;
	/* 贴近全屏高度，顶部仅留安全区 + 一点空隙 */
	top: calc(16px + constant(safe-area-inset-top));
	top: calc(16px + env(safe-area-inset-top, 0px));
	/* 贴屏幕底边，避免整块面板上浮导致按钮离屏底过远；底部安全区由 footer 内边距承担 */
	bottom: 0;
	background: linear-gradient(180deg, #f6f4ff 0%, #f5f5f8 28%, #ededf2 100%);
	border-radius: 28rpx 28rpx 0 0;
	box-shadow: 0 -12rpx 48rpx rgba(105, 62, 255, 0.12), 0 16rpx 40rpx rgba(105, 62, 255, 0.06);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border: 2rpx solid rgba(255, 255, 255, 0.95);
}

.sheetGrabBar {
	align-self: center;
	width: 72rpx;
	height: 8rpx;
	border-radius: 999rpx;
	background: rgba(125, 95, 255, 0.22);
	margin-top: 16rpx;
	margin-bottom: 8rpx;
}

.sheetHeader {
	position: relative;
	padding: 12rpx 28rpx 24rpx;
	flex-shrink: 0;
}

.headerTopRow {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 20rpx;
}

.headerTitles {
	flex: 1;
	min-width: 0;
}

.headerTitle {
	display: block;
	font-size: 38rpx;
	font-weight: 700;
	color: #1b1732;
	letter-spacing: 0.5rpx;
}

.headerSubtitle {
	display: block;
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #6c6392;
	line-height: 34rpx;
}

.closeBtn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.92);
	border: 2rpx solid rgba(125, 95, 255, 0.18);
	box-shadow: 0 8rpx 20rpx rgba(105, 62, 255, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.closeBtn:active {
	opacity: 0.85;
	transform: scale(0.96);
}

.closeBtnText {
	font-size: 28rpx;
	color: #7b65d9;
	font-weight: 600;
	line-height: 1;
}

.headerAccent {
	position: absolute;
	left: 28rpx;
	right: 28rpx;
	bottom: 0;
	height: 6rpx;
	border-radius: 999rpx;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 55%, #5fbeff 100%);
	opacity: 0.35;
}

.sheetScroll {
	width: 100%;
	padding: 0 24rpx;
	box-sizing: border-box;
}

.sectionCard {
	position: relative;
	background: linear-gradient(145deg, #ffffff 0%, #faf8ff 48%, #f5f9ff 100%);
	border-radius: 28rpx;
	padding: 26rpx 24rpx 28rpx;
	margin-bottom: 22rpx;
	box-shadow: 0 16rpx 40rpx rgba(105, 62, 255, 0.1);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	/* 不要用 overflow:hidden，部分端上会影响原生 input / editor 聚焦与绘制 */
	overflow: visible;
}

.sectionCard::before {
	content: '';
	position: absolute;
	top: -50rpx;
	right: -36rpx;
	width: 140rpx;
	height: 140rpx;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(125, 95, 255, 0.14) 0%, rgba(125, 95, 255, 0) 70%);
	pointer-events: none;
}

.sectionHead {
	margin-bottom: 22rpx;
	position: relative;
	z-index: 1;
}

.sectionTag {
	display: inline-flex;
	align-items: center;
	height: 40rpx;
	padding: 0 14rpx;
	border-radius: 20rpx;
	font-size: 22rpx;
	font-weight: 600;
	color: #ffffff;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
}

.sectionTitle {
	display: block;
	margin-top: 14rpx;
	font-size: 30rpx;
	font-weight: 700;
	color: #1b1732;
}

.coverPlaceholder {
	position: relative;
	z-index: 1;
	width: 100%;
	height: 280rpx;
	border-radius: 24rpx;
	overflow: hidden;
	border: 2rpx dashed rgba(125, 95, 255, 0.35);
	background: linear-gradient(
		135deg,
		rgba(125, 95, 255, 0.06) 0%,
		rgba(95, 190, 255, 0.08) 50%,
		rgba(255, 95, 179, 0.06) 100%
	);
}

.coverPlaceholder:active {
	opacity: 0.92;
}

.coverPlaceholder.hasCover {
	border-style: solid;
	border-color: rgba(125, 95, 255, 0.22);
}

.coverPreview {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.coverChangeTip {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	padding: 16rpx;
	background: linear-gradient(to top, rgba(27, 23, 50, 0.55), transparent);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	pointer-events: none;
}

.coverChangeTipText {
	font-size: 24rpx;
	color: #ffffff;
	font-weight: 600;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.35);
}

.coverInner {
	position: relative;
	z-index: 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 24rpx;
}

.coverIconWrap {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.95);
	border: 2rpx solid rgba(125, 95, 255, 0.2);
	box-shadow: 0 12rpx 28rpx rgba(105, 62, 255, 0.15);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 18rpx;
}

.coverGlyph {
	font-size: 44rpx;
	font-weight: 300;
	color: #7d5fff;
	line-height: 1;
}

.coverHint {
	font-size: 28rpx;
	font-weight: 600;
	color: #4a3f7d;
}

.coverSub {
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #8d79c4;
	text-align: center;
	line-height: 32rpx;
}

.field {
	margin-bottom: 26rpx;
	position: relative;
	z-index: 1;
}

.field:last-child {
	margin-bottom: 0;
}

.fieldLabel {
	display: block;
	font-size: 24rpx;
	font-weight: 600;
	color: #7b65d9;
	margin-bottom: 12rpx;
}

.fieldInput {
	width: 100%;
	box-sizing: border-box;
	min-height: 88rpx;
	padding: 22rpx 24rpx;
	border-radius: 22rpx;
	font-size: 28rpx;
	color: #1b1732;
	background: rgba(255, 255, 255, 0.92);
	border: 2rpx solid rgba(125, 95, 255, 0.14);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.06);
}

.fieldPh {
	color: #a59bcc;
	font-size: 28rpx;
}

.fieldInputFlex {
	flex: 1;
	width: auto;
	min-width: 0;
}

.fieldSelect {
	min-height: 88rpx;
	padding: 22rpx 20rpx 22rpx 24rpx;
	border-radius: 22rpx;
	background: rgba(255, 255, 255, 0.92);
	border: 2rpx solid rgba(125, 95, 255, 0.14);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.06);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12rpx;
}

.fieldSelectTime {
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.08) 0%, rgba(255, 95, 179, 0.06) 100%);
	border-color: rgba(125, 95, 255, 0.22);
}

.timePickRow {
	display: flex;
	align-items: stretch;
	gap: 16rpx;
}

.fieldSelectHalf {
	flex: 1;
	min-width: 0;
	box-sizing: border-box;
}

.fieldInputTime {
	margin-bottom: 16rpx;
}

.timePickHint {
	display: block;
	margin-top: 12rpx;
	font-size: 22rpx;
	color: #8d79c4;
	line-height: 32rpx;
}

.fieldSelectIco {
	font-size: 26rpx;
	flex-shrink: 0;
}

.fieldSelectText {
	flex: 1;
	min-width: 0;
	font-size: 28rpx;
	color: #4a3f7d;
	font-weight: 500;
}

.fieldSelectText.isPlaceholder {
	color: #a59bcc;
	font-weight: 400;
}

.chevron {
	font-size: 36rpx;
	color: #b8aee0;
	font-weight: 300;
	transform: rotate(0deg);
	line-height: 1;
	flex-shrink: 0;
}

.fieldRowLoc,
.fieldRowPrice {
	display: flex;
	align-items: center;
	gap: 14rpx;
	min-height: 88rpx;
	padding: 0 20rpx 0 22rpx;
	border-radius: 22rpx;
	background: linear-gradient(90deg, rgba(95, 190, 255, 0.08) 0%, rgba(95, 152, 255, 0.06) 100%);
	border: 2rpx solid rgba(95, 152, 255, 0.2);
	box-shadow: 0 8rpx 20rpx rgba(95, 152, 255, 0.08);
}

.fieldRowPrice {
	background: rgba(255, 255, 255, 0.92);
	border-color: rgba(125, 95, 255, 0.14);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.06);
}

.locPin {
	font-size: 26rpx;
	flex-shrink: 0;
}

.priceUnit {
	font-size: 30rpx;
	font-weight: 700;
	color: #7d5fff;
	flex-shrink: 0;
}

.formEditor {
	width: 100%;
	min-height: 220rpx;
	padding: 20rpx;
	border-radius: 22rpx;
	background: rgba(255, 255, 255, 0.95);
	border: 2rpx solid rgba(125, 95, 255, 0.14);
	box-sizing: border-box;
	box-shadow: inset 0 2rpx 12rpx rgba(125, 95, 255, 0.04);
}

.insertImgBtn {
	margin-top: 18rpx;
	height: 76rpx;
	line-height: 76rpx;
	padding: 0;
	font-size: 26rpx;
	font-weight: 600;
	color: #5d37ff;
	border: 2rpx solid rgba(125, 95, 255, 0.35);
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.1) 0%, rgba(255, 95, 179, 0.08) 100%);
	border-radius: 999rpx;
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.12);
}

.insertImgBtn::after {
	border: none;
}

.scrollBottomPad {
	height: 24rpx;
}

.sheetFooter {
	flex-shrink: 0;
	padding: 12rpx 28rpx 12rpx;
	padding-bottom: calc(12rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(12rpx + env(safe-area-inset-bottom, 0px));
	background: linear-gradient(180deg, rgba(245, 245, 248, 0) 0%, #ebebf0 36%);
	border-top: 2rpx solid rgba(255, 255, 255, 0.85);
}

.submitBtn {
	width: 100%;
	height: 96rpx;
	line-height: 96rpx;
	padding: 0;
	margin: 0;
	border-radius: 999rpx;
	font-size: 32rpx;
	font-weight: 700;
	color: #ffffff;
	border: none;
	background: linear-gradient(145deg, #56b6ff 0%, #7d5fff 45%, #1677ff 100%);
	box-shadow: 0 14rpx 32rpx rgba(22, 119, 255, 0.28), 0 8rpx 20rpx rgba(125, 95, 255, 0.18);
}

.submitBtn::after {
	border: none;
}

.submitBtn:active {
	opacity: 0.94;
	transform: scale(0.99);
}
</style>
