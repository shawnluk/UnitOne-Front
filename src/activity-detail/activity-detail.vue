<template>
	<view class="page">
		<!-- 顶部导航 -->
		<view class="navBar" :style="{ paddingTop: statusBarPadding }">
			<view
				class="navBack"
				hover-class="navBack--pressed"
				hover-stay-time="120"
				@click="goHome"
			>
				<!-- 动态渐变描边：旋转色环 -->
				<view class="navBackClip">
					<view class="navBackSpin"></view>
				</view>
				<view class="navBackFace">
					<view class="navBackShine" aria-hidden="true"></view>
					<view class="navBackParticle navBackParticle--1" aria-hidden="true"></view>
					<view class="navBackParticle navBackParticle--2" aria-hidden="true"></view>
					<view class="navBackParticle navBackParticle--3" aria-hidden="true"></view>
					<view class="navBackParticle navBackParticle--4" aria-hidden="true"></view>
					<text class="navBackChevron">‹</text>
				</view>
				<!-- 外侧漂浮粒子 -->
				<view class="navBackOrb navBackOrb--1" aria-hidden="true"></view>
				<view class="navBackOrb navBackOrb--2" aria-hidden="true"></view>
				<view class="navBackOrb navBackOrb--3" aria-hidden="true"></view>
			</view>
			<text class="navTitle">活动详情</text>
			<view class="navRight"></view>
		</view>

		<scroll-view scroll-y class="scrollBody" :show-scrollbar="false">
			<!-- 头图 -->
			<view class="hero">
				<image class="heroImg" :src="detail.cover" mode="aspectFill" />
				<view class="heroMask"></view>
				<view class="heroChip">
					<text class="heroChipText">{{ detail.joinCount }}人热度</text>
				</view>
				<view class="heroBottom">
					<view v-if="tagLabel" class="tag">{{ tagLabel }}</view>
					<text class="heroTitle">{{ detail.title }}</text>
				</view>
			</view>

			<view class="sheet">
				<text class="statusLine">{{ statusHint }}</text>

				<view v-if="feeLine" class="feeCard">
					<text class="feeLabel">费用说明</text>
					<text class="feeValue">{{ feeLine }}</text>
				</view>

				<view class="timePill">
					<text class="timePillIco">⏰</text>
					<text class="timePillLabel">活动时间</text>
					<text class="timePillText">{{ displayTime }}</text>
				</view>

				<view class="locationPill">
					<text class="locationPillIco">📍</text>
					<text class="locationPillLabel">活动地点</text>
					<text class="locationPillText">{{ detail.location_text }}</text>
				</view>

				<view class="orgCard">
					<image class="orgAva" :src="detail.org_avatar" mode="aspectFill" />
					<view class="orgText">
						<text class="orgLabel">主办方</text>
						<text class="orgName">{{ detail.org_name }}</text>
					</view>
				</view>

				<view class="joinHead">
					<text class="joinTitle">已报名 {{ detail.joinCount }} 人</text>
				</view>
				<scroll-view scroll-x class="avaScroll" :show-scrollbar="false">
					<view class="avaRow">
						<image
							v-for="(ava, idx) in joinList"
							:key="idx"
							class="joinAva"
							:src="ava"
							mode="aspectFill"
						/>
					</view>
				</scroll-view>

				<view class="sectionHead">
					<text class="sectionTitle">活动说明</text>
				</view>
				<view class="detailBody">
					<text v-for="(line, i) in detailLines" :key="i" class="detailPara">{{ line }}</text>
				</view>

				<view class="hintCard">
					<text class="hintTitle">报名须知</text>
					<text class="hintLine">报名即表示同意遵守现场秩序与安全提示；如有变动以主办方通知为准。</text>
				</view>
			</view>
		</scroll-view>

		<view class="bottomBar" :style="{ paddingBottom: safeBottom }">
			<button class="ghostBtn" type="default" @click="onShare">分享</button>
			<button class="primaryBtn" type="default" @click="onRegister">立即报名</button>
		</view>
	</view>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const CATEGORY_TAG = {
	1: '约球',
	2: '观影',
	3: '户外',
	4: '闲聊',
	5: '艺术',
	6: '订阅',
}

const actDetail = reactive({
	data: {},
})

function normalizeActivity(raw) {
	if (!raw || typeof raw !== 'object') return {}
	const joinAvatars = Array.isArray(raw.joinAvatars)
		? raw.joinAvatars
		: Array.isArray(raw.join_avatars)
			? raw.join_avatars
			: []
	return {
		...raw,
		cover: raw.cover || '',
		title: raw.title || '活动',
		location_text: raw.location_text || '',
		time_text: raw.time_text || '',
		org_avatar: raw.org_avatar || '',
		org_name: raw.org_name || '',
		joinCount: Number(raw.joinCount) || joinAvatars.length || 0,
		joinAvatars,
		tag_text: raw.tag_text || '',
		description: raw.description || '',
		fee_note: raw.fee_note || '',
		category_id: raw.category_id,
		activity_id: raw.activity_id || '',
	}
}

function formatActivityTime(str) {
	if (!str || typeof str !== 'string') return ''
	const m = str.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/)
	if (!m) return str
	const y = m[1]
	const mo = Number(m[2])
	const d = Number(m[3])
	return `${y}年${mo}月${d}日 ${m[4]}:${m[5]}`
}

const detail = computed(() => actDetail.data)

const joinList = computed(() => {
	const list = detail.value.joinAvatars || []
	return list.length ? list : []
})

const tagLabel = computed(() => {
	const t = detail.value.tag_text
	if (t) return t
	const id = detail.value.category_id
	return id != null ? CATEGORY_TAG[id] || '' : ''
})

const displayTime = computed(() => formatActivityTime(detail.value.time_text))

const feeLine = computed(() => detail.value.fee_note || '')

const statusHint = computed(() => {
	const n = Number(detail.value.joinCount) || 0
	return n >= 12 ? `报名火热 · 还剩少量名额` : `招募中 · 欢迎加入`
})

const detailLines = computed(() => {
	const desc = detail.value.description
	if (desc && typeof desc === 'string') {
		return desc.split('\n').filter(line => line.trim())
	}
	const title = detail.value.title || '本场活动'
	return [
		`欢迎参加「${title}」。以下为活动简介，具体安排以现场为准。`,
		`时间：${displayTime.value || '待定'}`,
		`地点：${detail.value.location_text || '待定'}`,
	]
})

const statusBarPadding = computed(() => {
	try {
		const sys = uni.getSystemInfoSync()
		const h = sys.statusBarHeight || 0
		return `${h}px`
	} catch {
		return '0px'
	}
})

const safeBottom = computed(() => 'calc(24rpx + env(safe-area-inset-bottom))')

onLoad((option) => {
	try {
		const raw = option && option.item ? JSON.parse(decodeURIComponent(option.item)) : null
		actDetail.data = normalizeActivity(raw)
	} catch {
		uni.showToast({ title: '活动信息加载失败', icon: 'none' })
	}
})

const goHome = () => {
	uni.redirectTo({ url: '/pages/index/index' })
}

const onRegister = () => {
	uni.showToast({ title: '报名流程即将接入', icon: 'none' })
}

const onShare = () => {
	uni.showToast({ title: '分享能力即将接入', icon: 'none' })
}
</script>

<style scoped>
.page {
	display: flex;
	flex-direction: column;
	--card-bg: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	--title-color: #1b1732;
	--tag-bg: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	--time-pill-bg: linear-gradient(90deg, rgba(125, 95, 255, 0.13) 0%, rgba(255, 95, 179, 0.12) 100%);
	--time-pill-border: rgba(125, 95, 255, 0.26);
	--time-pill-label: #7b65d9;
	--time-pill-text: #4a3f7d;
	--loc-pill-bg: linear-gradient(90deg, rgba(95, 190, 255, 0.12) 0%, rgba(95, 152, 255, 0.1) 100%);
	--loc-pill-border: rgba(95, 152, 255, 0.26);
	--loc-label: #4f82d8;
	--loc-text: #3f5f93;
	--muted: #6c6392;
	--accent: #5d37ff;
	min-height: 100vh;
	background: var(--card-bg);
	box-sizing: border-box;
}

.navBar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12rpx 24rpx 16rpx;
	position: sticky;
	top: 0;
	z-index: 20;
	background: rgba(255, 255, 255, 0.86);
	backdrop-filter: blur(12rpx);
	border-bottom: 1rpx solid rgba(125, 95, 255, 0.12);
}

/* 二次元返回键：旋转糖果描边 + 星屑粒子 + 外侧光点 */
.navBack {
	position: relative;
	width: 96rpx;
	height: 96rpx;
	overflow: visible;
	transition: transform 0.15s ease, opacity 0.15s ease;
	filter: drop-shadow(0 12rpx 28rpx rgba(125, 95, 255, 0.38));
}

.navBackClip {
	position: absolute;
	left: 0;
	top: 0;
	width: 96rpx;
	height: 96rpx;
	border-radius: 32rpx;
	overflow: hidden;
	z-index: 0;
	box-shadow: inset 0 0 0 1rpx rgba(255, 255, 255, 0.35);
}

.navBackSpin {
	position: absolute;
	width: 240%;
	height: 240%;
	left: -70%;
	top: -70%;
	background: linear-gradient(
		140deg,
		#ffb8ec 0%,
		#c4b5ff 18%,
		#8cebff 38%,
		#fff4b8 58%,
		#ffb8ec 78%,
		#dda9ff 100%
	);
	animation: navEdgeRotate 2.6s linear infinite;
}

.navBackFace {
	position: absolute;
	left: 7rpx;
	top: 7rpx;
	right: 7rpx;
	bottom: 7rpx;
	border-radius: 26rpx;
	background: linear-gradient(155deg, #7a63ff 0%, #c06dff 42%, #ff5aad 100%);
	box-shadow:
		inset 0 3rpx 0 rgba(255, 255, 255, 0.42),
		inset 0 -8rpx 20rpx rgba(120, 60, 160, 0.18);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	z-index: 2;
}

.navBackShine {
	position: absolute;
	top: -42%;
	left: -28%;
	width: 78%;
	height: 140%;
	border-radius: 50%;
	background: linear-gradient(
		125deg,
		rgba(255, 255, 255, 0.58) 0%,
		rgba(255, 255, 255, 0.14) 42%,
		rgba(255, 255, 255, 0) 70%
	);
	pointer-events: none;
	z-index: 0;
}

.navBackParticle {
	position: absolute;
	pointer-events: none;
	z-index: 3;
}

/* 菱形星屑 · 闪烁节奏错落 */
.navBackParticle--1 {
	width: 11rpx;
	height: 11rpx;
	top: 16rpx;
	left: 20rpx;
	border-radius: 2rpx;
	background: linear-gradient(135deg, #ffffff 0%, #fef08a 100%);
	transform: rotate(45deg);
	animation: navSparkTwinkle 1.35s ease-in-out infinite;
	box-shadow: 0 0 10rpx rgba(255, 240, 180, 0.95);
}

.navBackParticle--2 {
	width: 8rpx;
	height: 8rpx;
	bottom: 22rpx;
	right: 24rpx;
	border-radius: 50%;
	background: radial-gradient(circle at 35% 35%, #ffffff 0%, #67e8f9 70%);
	animation: navSparkTwinkleRound 1.1s ease-in-out 0.35s infinite;
	box-shadow: 0 0 12rpx rgba(103, 232, 249, 0.9);
}

.navBackParticle--3 {
	width: 9rpx;
	height: 9rpx;
	top: 26rpx;
	right: 18rpx;
	border-radius: 1rpx;
	background: linear-gradient(145deg, #fce7f3, #fda4ff);
	transform: rotate(45deg) scale(0.95);
	animation: navSparkTwinkle 1.55s ease-in-out 0.2s infinite;
	opacity: 0.92;
}

.navBackParticle--4 {
	width: 6rpx;
	height: 6rpx;
	bottom: 30rpx;
	left: 22rpx;
	border-radius: 50%;
	background: #fff;
	animation: navSparkTwinkleRound 1.05s ease-in-out 0.55s infinite;
	box-shadow: 0 0 8rpx rgba(255, 255, 255, 0.95);
}

.navBackChevron {
	position: relative;
	z-index: 4;
	font-size: 56rpx;
	font-weight: 200;
	color: #ffffff;
	line-height: 1;
	margin-left: -10rpx;
	margin-top: -4rpx;
	text-shadow:
		0 0 18rpx rgba(255, 182, 255, 0.65),
		0 4rpx 12rpx rgba(60, 30, 100, 0.4);
}

.navBackOrb {
	position: absolute;
	pointer-events: none;
	z-index: 5;
	border-radius: 50%;
}

.navBackOrb--1 {
	width: 16rpx;
	height: 16rpx;
	top: -8rpx;
	right: -6rpx;
	background: radial-gradient(circle at 30% 30%, #ffffff 0%, #a5f3fc 55%, #38bdf8 100%);
	box-shadow:
		0 0 18rpx rgba(165, 243, 252, 1),
		0 0 6rpx rgba(56, 189, 248, 0.8);
	animation: navOrbDrift 2.4s ease-in-out infinite;
}

.navBackOrb--2 {
	width: 11rpx;
	height: 11rpx;
	bottom: -2rpx;
	left: -10rpx;
	background: radial-gradient(circle at 40% 40%, #fff 0%, #f9a8d4 65%, #ec4899 100%);
	box-shadow: 0 0 14rpx rgba(249, 168, 212, 0.95);
	animation: navOrbDrift 2s ease-in-out 0.5s infinite reverse;
}

.navBackOrb--3 {
	width: 9rpx;
	height: 9rpx;
	top: 40%;
	left: -14rpx;
	margin-top: -5rpx;
	background: radial-gradient(circle, #fef9c3 0%, #fde047 50%, #facc15 100%);
	opacity: 0.95;
	animation: navOrbDrift 1.8s ease-in-out 0.25s infinite;
	box-shadow: 0 0 12rpx rgba(253, 224, 71, 0.85);
}

.navBack--pressed {
	transform: scale(0.93);
	opacity: 0.88;
}

@keyframes navEdgeRotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes navSparkTwinkle {
	0%,
	100% {
		opacity: 0.45;
		transform: rotate(45deg) scale(0.82);
	}
	40% {
		opacity: 1;
		transform: rotate(45deg) scale(1.12);
	}
	70% {
		opacity: 0.75;
		transform: rotate(45deg) scale(0.95);
	}
}

@keyframes navSparkTwinkleRound {
	0%,
	100% {
		opacity: 0.4;
		transform: scale(0.78);
	}
	45% {
		opacity: 1;
		transform: scale(1.18);
	}
}

@keyframes navOrbDrift {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
		opacity: 0.85;
	}
	35% {
		transform: translate(4rpx, -8rpx) scale(1.15);
		opacity: 1;
	}
	70% {
		transform: translate(-3rpx, 5rpx) scale(0.92);
		opacity: 0.75;
	}
}

.navTitle {
	font-size: 32rpx;
	font-weight: 700;
	color: var(--title-color);
}

.navRight {
	width: 96rpx;
	height: 96rpx;
}

.scrollBody {
	flex: 1;
	height: 0;
	min-height: 0;
}

.hero {
	position: relative;
	margin: 0 24rpx;
	height: 420rpx;
	border-radius: 32rpx;
	overflow: hidden;
	box-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
}

.heroImg {
	width: 100%;
	height: 100%;
	background: #eaeaea;
}

.heroMask {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 220rpx;
	background: linear-gradient(to top, rgba(10, 7, 30, 0.75), rgba(10, 7, 30, 0));
}

.heroChip {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	height: 40rpx;
	padding: 0 18rpx;
	border-radius: 20rpx;
	background: rgba(255, 255, 255, 0.22);
	border: 1rpx solid rgba(255, 255, 255, 0.45);
	display: flex;
	align-items: center;
}

.heroChipText {
	font-size: 22rpx;
	font-weight: 600;
	color: #ffffff;
}

.heroBottom {
	position: absolute;
	left: 24rpx;
	right: 24rpx;
	bottom: 24rpx;
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.tag {
	align-self: flex-start;
	height: 44rpx;
	padding: 0 18rpx;
	border-radius: 22rpx;
	font-size: 22rpx;
	font-weight: 600;
	color: #ffffff;
	background: var(--tag-bg);
	box-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
	line-height: 44rpx;
}

.heroTitle {
	font-size: 36rpx;
	font-weight: 700;
	color: #ffffff;
	line-height: 48rpx;
	text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.35);
}

.sheet {
	margin-top: 24rpx;
	padding: 0 24rpx;
	/* 与固定底栏高度对齐：顶 padding + 按钮 + 底 padding + 安全区，避免报名须知被挡住 */
	padding-bottom: calc(180rpx + env(safe-area-inset-bottom));
}

.statusLine {
	display: block;
	font-size: 26rpx;
	font-weight: 600;
	color: #c45a1a;
	margin-bottom: 20rpx;
}

.feeCard {
	background: rgba(255, 255, 255, 0.72);
	border: 1rpx solid rgba(255, 255, 255, 0.9);
	border-radius: 24rpx;
	padding: 22rpx 24rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 12rpx 32rpx rgba(105, 62, 255, 0.08);
}

.feeLabel {
	display: block;
	font-size: 22rpx;
	font-weight: 600;
	color: var(--time-pill-label);
	margin-bottom: 8rpx;
}

.feeValue {
	font-size: 28rpx;
	font-weight: 600;
	color: var(--title-color);
	line-height: 40rpx;
}

.timePill,
.locationPill {
	width: 100%;
	border-radius: 24rpx;
	padding: 18rpx 20rpx;
	margin-bottom: 16rpx;
	display: flex;
	align-items: flex-start;
	gap: 10rpx;
	box-sizing: border-box;
}

.timePill {
	background: var(--time-pill-bg);
	border: 1rpx solid var(--time-pill-border);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.12);
}

.locationPill {
	background: var(--loc-pill-bg);
	border: 1rpx solid var(--loc-pill-border);
	box-shadow: 0 8rpx 20rpx rgba(95, 152, 255, 0.1);
}

.timePillIco,
.locationPillIco {
	font-size: 22rpx;
	line-height: 36rpx;
	flex-shrink: 0;
}

.timePillLabel,
.locationPillLabel {
	font-size: 22rpx;
	font-weight: 600;
	flex-shrink: 0;
	line-height: 36rpx;
}

.timePillLabel {
	color: var(--time-pill-label);
}

.locationPillLabel {
	color: var(--loc-label);
}

.timePillText {
	flex: 1;
	font-size: 26rpx;
	font-weight: 500;
	color: var(--time-pill-text);
	line-height: 36rpx;
}

.locationPillText {
	flex: 1;
	font-size: 26rpx;
	font-weight: 500;
	color: var(--loc-text);
	line-height: 36rpx;
}

.orgCard {
	display: flex;
	align-items: center;
	gap: 18rpx;
	padding: 22rpx 24rpx;
	background: rgba(255, 255, 255, 0.78);
	border-radius: 24rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.95);
	margin-bottom: 28rpx;
	box-shadow: 0 12rpx 28rpx rgba(50, 40, 90, 0.06);
}

.orgAva {
	width: 88rpx;
	height: 88rpx;
	border-radius: 28rpx;
	background: #f2f2f2;
	border: 2rpx solid #fff;
	flex-shrink: 0;
}

.orgText {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	min-width: 0;
}

.orgLabel {
	font-size: 22rpx;
	color: var(--muted);
}

.orgName {
	font-size: 30rpx;
	font-weight: 600;
	color: var(--title-color);
}

.joinHead {
	margin-bottom: 16rpx;
}

.joinTitle {
	font-size: 28rpx;
	font-weight: 700;
	color: var(--title-color);
}

.avaScroll {
	width: 100%;
	margin-bottom: 36rpx;
	white-space: nowrap;
}

.avaRow {
	display: inline-flex;
	flex-direction: row;
	gap: 16rpx;
	padding-bottom: 8rpx;
}

.joinAva {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	border: 3rpx solid #ffffff;
	box-shadow: 0 3rpx 10rpx rgba(50, 40, 90, 0.12);
	flex-shrink: 0;
	background: #eee;
}

.sectionHead {
	margin-bottom: 16rpx;
}

.sectionTitle {
	font-size: 32rpx;
	font-weight: 700;
	color: var(--title-color);
}

.detailBody {
	background: rgba(255, 255, 255, 0.72);
	border-radius: 24rpx;
	padding: 24rpx 26rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.9);
	margin-bottom: 24rpx;
}

.detailPara {
	display: block;
	font-size: 28rpx;
	line-height: 44rpx;
	color: #4a4570;
	margin-bottom: 18rpx;
}

.detailPara:last-child {
	margin-bottom: 0;
}

.hintCard {
	background: linear-gradient(90deg, rgba(125, 95, 255, 0.08) 0%, rgba(255, 95, 179, 0.06) 100%);
	border-radius: 24rpx;
	padding: 22rpx 24rpx;
	border: 1rpx solid rgba(125, 95, 255, 0.18);
	margin-bottom: 24rpx;
}

.hintTitle {
	display: block;
	font-size: 26rpx;
	font-weight: 700;
	color: var(--time-pill-label);
	margin-bottom: 10rpx;
}

.hintLine {
	font-size: 24rpx;
	line-height: 38rpx;
	color: var(--muted);
	word-break: break-word;
}

.bottomBar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 20rpx 24rpx;
	padding-top: 16rpx;
	background: rgba(255, 255, 255, 0.94);
	backdrop-filter: blur(14rpx);
	border-top: 1rpx solid rgba(125, 95, 255, 0.12);
	box-shadow: 0 -8rpx 32rpx rgba(105, 62, 255, 0.08);
}

.ghostBtn {
	flex: 0 0 200rpx;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: var(--accent);
	background: rgba(125, 95, 255, 0.12);
	border-radius: 24rpx;
	border: 1rpx solid rgba(125, 95, 255, 0.28);
}

.primaryBtn {
	flex: 1;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 30rpx;
	font-weight: 700;
	color: #ffffff;
	background: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	border-radius: 24rpx;
	border: none;
	box-shadow: 0 12rpx 28rpx rgba(125, 95, 255, 0.35);
}
</style>
