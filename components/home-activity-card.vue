<template>
	<view class="cardList">
		<view
			v-for="(data, index) in filteredItems"
			:key="data.name || data.id || index"
			:class="['card', themeClass]"
			@click="handleCardClick(data)"
		>
		<view class="coverWrap">
			<image class="cover" :src="data.cover" mode="aspectFill" />
			<view class="coverMask"></view>
			<view class="coverChip">
				<text class="coverChipText">{{ data.joinCount }}人热度</text>
			</view>
		</view>

		<view class="main">
			<view class="titleRow">
				<text class="title" :number-of-lines="2">{{ data.title }}</text>
			</view>

			<view class="tagRow" v-if="data.tagText || data.tag_text">
				<text class="tag">{{ data.tagText || data.tag_text }}</text>
			</view>

			<view class="meta">
				<view class="metaRow timeRow">
					<view class="timePill">
						<text class="timePillIco">⏰</text>
						<text class="timePillLabel">活动时间:</text>
						<text class="timePillText" :number-of-lines="1">{{ data.time_text }}</text>
					</view>
				</view>
				<view class="metaRow locationRow">
					<view class="locationPill">
						<text class="locationPillIco">📍</text>
						<text class="locationPillLabel">活动地点:</text>
						<text class="locationPillText">{{ data.location_text }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="org">
				<image class="orgAva" :src="data.org_avatar" mode="aspectFill" />
				<text class="orgName" :number-of-lines="1">{{ data.org_name }}</text>
			</view>

			<view class="join">
				<view class="avaGroup">
					<image
						v-for="(a, idx) in data.joinAvatars.slice(0, 3)"
						:key="idx"
						class="ava"
						:style="{ zIndex: 10 - idx }"
						:src="a"
						mode="aspectFill"
					/>
				</view>
				<text class="joinText">{{ data.joinCount }}人参加</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'HomeActivityCard',
	props: {
		theme: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'cream', 'spring'].includes(value),
		},
	},
	data() {
		return {
			activityList: [
				{
					category_id: 1,
					name: "1-1",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "周三晚南山羽毛球局（新手友好）",
					location_text: "深圳市南山区科苑路15号 深圳湾体育中心羽毛球馆",
					time_text: "2026-04-24 19:30:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "阿Ken",
					joinCount: 10,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
					],
				},
				{
					category_id: 1,
					name: "1-2",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "福田5v5篮球夜场（缺2人）",
					location_text: "深圳市福田区福华三路88号 市民中心篮球公园",
					time_text: "2026-04-26 20:00:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "Mia篮球手",
					joinCount: 10,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
					],
				},
				{
					category_id: 2,
					name: "2-2",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "IMAX观影《沙丘2》拼单场",
					location_text: "深圳市南山区海德三道85号 万象天地百老汇影城",
					time_text: "2026-04-27 15:10:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "电影小牧",
					joinCount: 11,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
					],
				},
				{
					category_id: 3,
					name: "3-3",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "梧桐山轻徒步看日落（8km）",
					location_text: "深圳市罗湖区莲塘街道 梧桐山风景名胜区北门",
					time_text: "2026-04-28 14:30:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "山野阿泽",
					joinCount: 12,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
					],
				},
				{
					category_id: 4,
					name: "4-4",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "下班后Coffee Chat：产品x设计交流",
					location_text: "深圳市南山区粤海街道 科技园南区星巴克臻选店",
					time_text: "2026-04-25 19:00:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "Luna产品喵",
					joinCount: 13,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
					],
				},
				{
					category_id: 5,
					name: "5-5",
					isActive: false,
					cover: "https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
					title: "周末油画体验课：莫兰迪静物",
					location_text: "深圳市福田区华强北街道 深业上城L2 艺术工坊",
					time_text: "2026-04-27 10:00:00",
					org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
					org_name: "木子画室",
					joinCount: 14,
					joinAvatars: [
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
						'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
					],
				}
			],
			filteredItems: [],
		}
	},
	created() {
		this.filteredItems = this.activityList.map(item => ({ ...item, isActive: true }))
		if (uni && typeof uni.$on === 'function') {
			uni.$on('index:category-change', this.handleCategoryFilter)
		}
	},
	beforeDestroy() {
		if (uni && typeof uni.$off === 'function') {
			uni.$off('index:category-change', this.handleCategoryFilter)
		}
	},
	computed: {
		themeClass() {
			return `theme${this.theme.charAt(0).toUpperCase()}${this.theme.slice(1)}`
		},
	},
	methods: {
		handleCategoryFilter(payload) {
			const categoryId = payload && payload.categoryId ? payload.categoryId : null
			if (!categoryId) {
				this.filteredItems = this.activityList.map(item => ({ ...item, isActive: true }))
				return
			}
			this.filteredItems = this.activityList
				.filter(item => item.category_id === categoryId)
				.map(item => ({ ...item, isActive: true }))
		},
		handleCardClick(item) {
			uni.redirectTo({
				url: "/src/activity-detail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item))
			})
		},
	},
}
</script>

<style scoped>
.cardList {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.card {
	--card-bg: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	--card-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	--card-before-bg: radial-gradient(circle, rgba(125, 95, 255, 0.22) 0%, rgba(125, 95, 255, 0) 70%);
	--cover-shadow: 0 14rpx 28rpx rgba(50, 40, 90, 0.2);
	--cover-mask-bg: linear-gradient(to top, rgba(10, 7, 30, 0.6), rgba(10, 7, 30, 0));
	--cover-chip-bg: rgba(255, 255, 255, 0.24);
	--cover-chip-border: rgba(255, 255, 255, 0.45);
	--cover-chip-text: #ffffff;
	--title-color: #1b1732;
	--tag-color: #ffffff;
	--tag-bg: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	--tag-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
	--meta-dot-color: #8d79ff;
	--meta-text-color: #6c6392;
	--time-pill-bg: linear-gradient(90deg, rgba(125, 95, 255, 0.13) 0%, rgba(255, 95, 179, 0.12) 100%);
	--time-pill-border: rgba(125, 95, 255, 0.26);
	--time-pill-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.15);
	--time-pill-label-color: #7b65d9;
	--time-pill-text-color: #4a3f7d;
	--location-pill-bg: linear-gradient(90deg, rgba(95, 190, 255, 0.12) 0%, rgba(95, 152, 255, 0.1) 100%);
	--location-pill-border: rgba(95, 152, 255, 0.26);
	--location-pill-shadow: 0 8rpx 20rpx rgba(95, 152, 255, 0.14);
	--location-pill-label-color: #4f82d8;
	--location-pill-text-color: #3f5f93;
	--footer-bg: rgba(255, 255, 255, 0.72);
	--footer-border: rgba(255, 255, 255, 0.86);
	--org-name-color: #5d547f;
	--join-text-color: #5d37ff;
	--ava-shadow: 0 3rpx 10rpx rgba(50, 40, 90, 0.12);
	position: relative;
	overflow: hidden;
	background: var(--card-bg);
	border-radius: 32rpx;
	padding: 22rpx;
	padding-bottom: 96rpx;
	box-shadow: var(--card-shadow);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 20rpx;
}

.card::before {
	content: '';
	position: absolute;
	top: -60rpx;
	right: -40rpx;
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
	background: var(--card-before-bg);
}

.coverWrap {
	width: 164rpx;
	height: 206rpx;
	border-radius: 24rpx;
	overflow: hidden;
	position: relative;
	flex-shrink: 0;
	box-shadow: var(--cover-shadow);
	margin-right: 16rpx;
}

.cover {
	width: 100%;
	height: 100%;
	background: #eaeaea;
}

.coverMask {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 66rpx;
	background: var(--cover-mask-bg);
}

.coverChip {
	position: absolute;
	left: 10rpx;
	bottom: 10rpx;
	height: 34rpx;
	border-radius: 17rpx;
	padding: 0 12rpx;
	display: flex;
	align-items: center;
	background: var(--cover-chip-bg);
	border: 1rpx solid var(--cover-chip-border);
	backdrop-filter: blur(8rpx);
}

.coverChipText {
	font-size: 20rpx;
	font-weight: 600;
	color: var(--cover-chip-text);
}

.main {
	position: relative;
	z-index: 1;
	flex: 1;
	min-width: 0;
}

.titleRow {
	display: flex;
}

.title {
	font-size: 28rpx;
	line-height: 38rpx;
	font-weight: 600;
	letter-spacing: 0.2rpx;
	color: var(--title-color);
	opacity: 0.92;
}

.tagRow {
	margin-top: 12rpx;
}

.tag {
	display: inline-flex;
	align-items: center;
	height: 40rpx;
	font-size: 22rpx;
	color: var(--tag-color);
	font-weight: 600;
	background: var(--tag-bg);
	padding: 0 16rpx;
	border-radius: 20rpx;
	box-shadow: var(--tag-shadow);
}

.meta {
	margin-top: 16rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.metaRow {
	display: flex;
	align-items: center;
	gap: 10rpx;
	min-width: 0;
}

.timeRow {
	margin-bottom: 4rpx;
}

.timePill {
	width: 100%;
	min-width: 0;
	min-height: 48rpx;
	border-radius: 24rpx;
	padding: 10rpx 14rpx;
	display: flex;
	align-items: flex-start;
	gap: 8rpx;
	background: var(--time-pill-bg);
	border: 1rpx solid var(--time-pill-border);
	box-shadow: var(--time-pill-shadow);
	overflow: hidden;
	margin-bottom: 4rpx;
}

.timePillIco {
	font-size: 20rpx;
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	height: 28rpx;
	line-height: 28rpx;
	margin-top: 0;
}

.timePillLabel {
	font-size: 20rpx;
	font-weight: 600;
	color: var(--time-pill-label-color);
	flex-shrink: 0;
	line-height: 28rpx;
	margin-right: 8rpx;
}

.timePillText {
	flex: 1;
	min-width: 0;
	font-size: 22rpx;
	line-height: 28rpx;
	color: var(--time-pill-text-color);
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.locationRow {
	margin-top: 2rpx;
}

.locationPill {
	width: 100%;
	min-width: 0;
	min-height: 48rpx;
	border-radius: 24rpx;
	padding: 10rpx 14rpx;
	display: flex;
	align-items: flex-start;
	gap: 8rpx;
	background: var(--location-pill-bg);
	border: 1rpx solid var(--location-pill-border);
	box-shadow: var(--location-pill-shadow);
}

.locationPillIco {
	font-size: 20rpx;
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	height: 28rpx;
	line-height: 28rpx;
	margin-top: 0;
}

.locationPillLabel {
	font-size: 20rpx;
	font-weight: 600;
	color: var(--location-pill-label-color);
	flex-shrink: 0;
	line-height: 28rpx;
	margin-right: 8rpx;
}

.locationPillText {
	flex: 1;
	min-width: 0;
	font-size: 22rpx;
	line-height: 28rpx;
	color: var(--location-pill-text-color);
	font-weight: 500;
	white-space: normal;
}

.metaDot {
	font-size: 18rpx;
	color: var(--meta-dot-color);
	transform: scale(0.95);
}

.metaText {
	font-size: 25rpx;
	color: var(--meta-text-color);
	min-width: 0;
}

.footer {
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	bottom: 16rpx;
	height: 60rpx;
	border-radius: 18rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 14rpx;
	background: var(--footer-bg);
	border: 1rpx solid var(--footer-border);
}

.org {
	display: flex;
	align-items: center;
	gap: 10rpx;
	min-width: 0;
	max-width: 52%;
}

.orgAva {
	width: 44rpx;
	height: 44rpx;
	border-radius: 14rpx;
	background: #f2f2f2;
	border: 2rpx solid #ffffff;
	margin-right: 8rpx;
}

.orgName {
	font-size: 24rpx;
	color: var(--org-name-color);
	max-width: 240rpx;
}

.join {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.joinText {
	font-size: 23rpx;
	color: var(--join-text-color);
	font-weight: 700;
}

.avaGroup {
	display: flex;
	align-items: center;
	padding-left: 12rpx;
}

.ava {
	width: 38rpx;
	height: 38rpx;
	border-radius: 50%;
	border: 3rpx solid #ffffff;
	margin-left: -12rpx;
	background: #f2f2f2;
	box-shadow: var(--ava-shadow);
}

.themeDefault {
	--card-bg: linear-gradient(145deg, #ffffff 0%, #f8f3ff 52%, #f0faff 100%);
	--card-shadow: 0 20rpx 48rpx rgba(105, 62, 255, 0.13);
	--card-before-bg: radial-gradient(circle, rgba(125, 95, 255, 0.22) 0%, rgba(125, 95, 255, 0) 70%);
	--cover-shadow: 0 14rpx 28rpx rgba(50, 40, 90, 0.2);
	--cover-mask-bg: linear-gradient(to top, rgba(10, 7, 30, 0.6), rgba(10, 7, 30, 0));
	--cover-chip-bg: rgba(255, 255, 255, 0.24);
	--cover-chip-border: rgba(255, 255, 255, 0.45);
	--cover-chip-text: #ffffff;
	--title-color: #1b1732;
	--tag-color: #ffffff;
	--tag-bg: linear-gradient(90deg, #7d5fff 0%, #ff5fb3 100%);
	--tag-shadow: 0 8rpx 18rpx rgba(125, 95, 255, 0.28);
	--meta-dot-color: #8d79ff;
	--meta-text-color: #6c6392;
	--time-pill-bg: linear-gradient(90deg, rgba(125, 95, 255, 0.13) 0%, rgba(255, 95, 179, 0.12) 100%);
	--time-pill-border: rgba(125, 95, 255, 0.26);
	--time-pill-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.15);
	--time-pill-label-color: #7b65d9;
	--time-pill-text-color: #4a3f7d;
	--location-pill-bg: linear-gradient(90deg, rgba(95, 190, 255, 0.12) 0%, rgba(95, 152, 255, 0.1) 100%);
	--location-pill-border: rgba(95, 152, 255, 0.26);
	--location-pill-shadow: 0 8rpx 20rpx rgba(95, 152, 255, 0.14);
	--location-pill-label-color: #4f82d8;
	--location-pill-text-color: #3f5f93;
	--footer-bg: rgba(255, 255, 255, 0.72);
	--footer-border: rgba(255, 255, 255, 0.86);
	--org-name-color: #5d547f;
	--join-text-color: #5d37ff;
	--ava-shadow: 0 3rpx 10rpx rgba(50, 40, 90, 0.12);
}

.themeCream {
	--card-bg: linear-gradient(150deg, #fffdf8 0%, #fff7ef 50%, #f7fbf7 100%);
	--card-shadow: 0 18rpx 40rpx rgba(182, 151, 124, 0.16);
	--card-before-bg: radial-gradient(circle, rgba(255, 211, 170, 0.5) 0%, rgba(255, 211, 170, 0) 72%);
	--cover-shadow: 0 12rpx 24rpx rgba(168, 132, 107, 0.2);
	--cover-mask-bg: linear-gradient(to top, rgba(91, 67, 50, 0.46), rgba(91, 67, 50, 0));
	--cover-chip-bg: rgba(255, 245, 234, 0.7);
	--cover-chip-border: rgba(255, 255, 255, 0.78);
	--cover-chip-text: #8a5e3b;
	--title-color: #473426;
	--tag-color: #6a4a2f;
	--tag-bg: linear-gradient(90deg, #ffe4bd 0%, #ffd3cf 100%);
	--tag-shadow: 0 6rpx 14rpx rgba(220, 177, 136, 0.32);
	--meta-dot-color: #e3b07e;
	--meta-text-color: #836957;
	--time-pill-bg: linear-gradient(90deg, rgba(255, 214, 171, 0.3) 0%, rgba(255, 233, 204, 0.44) 100%);
	--time-pill-border: rgba(230, 183, 143, 0.36);
	--time-pill-shadow: 0 8rpx 18rpx rgba(220, 177, 136, 0.18);
	--time-pill-label-color: #bf8557;
	--time-pill-text-color: #7f5e47;
	--location-pill-bg: linear-gradient(90deg, rgba(255, 223, 186, 0.24) 0%, rgba(255, 242, 220, 0.42) 100%);
	--location-pill-border: rgba(224, 183, 141, 0.34);
	--location-pill-shadow: 0 8rpx 18rpx rgba(206, 167, 131, 0.18);
	--location-pill-label-color: #ae7a54;
	--location-pill-text-color: #785a47;
	--footer-bg: rgba(255, 252, 247, 0.8);
	--footer-border: rgba(255, 243, 229, 0.95);
	--org-name-color: #7a6556;
	--join-text-color: #cf8d53;
	--ava-shadow: 0 3rpx 10rpx rgba(172, 139, 114, 0.16);
}

.themeSpring {
	--card-bg: linear-gradient(150deg, #fdfef8 0%, #f3faef 52%, #eefaf3 100%);
	--card-shadow: 0 18rpx 40rpx rgba(126, 168, 118, 0.18);
	--card-before-bg: radial-gradient(circle, rgba(173, 232, 183, 0.56) 0%, rgba(173, 232, 183, 0) 72%);
	--cover-shadow: 0 12rpx 24rpx rgba(117, 152, 111, 0.2);
	--cover-mask-bg: linear-gradient(to top, rgba(52, 77, 53, 0.44), rgba(52, 77, 53, 0));
	--cover-chip-bg: rgba(246, 255, 241, 0.72);
	--cover-chip-border: rgba(255, 255, 255, 0.78);
	--cover-chip-text: #4f7b4e;
	--title-color: #2f4d33;
	--tag-color: #3f6a43;
	--tag-bg: linear-gradient(90deg, #dff7d8 0%, #f7ffd8 100%);
	--tag-shadow: 0 6rpx 14rpx rgba(137, 188, 127, 0.32);
	--meta-dot-color: #89bb79;
	--meta-text-color: #5f785f;
	--time-pill-bg: linear-gradient(90deg, rgba(184, 230, 172, 0.26) 0%, rgba(224, 246, 202, 0.42) 100%);
	--time-pill-border: rgba(126, 181, 112, 0.34);
	--time-pill-shadow: 0 8rpx 18rpx rgba(126, 168, 118, 0.2);
	--time-pill-label-color: #699760;
	--time-pill-text-color: #456947;
	--location-pill-bg: linear-gradient(90deg, rgba(179, 230, 217, 0.24) 0%, rgba(214, 246, 236, 0.42) 100%);
	--location-pill-border: rgba(114, 176, 159, 0.34);
	--location-pill-shadow: 0 8rpx 18rpx rgba(117, 170, 153, 0.2);
	--location-pill-label-color: #5c8e83;
	--location-pill-text-color: #40655f;
	--footer-bg: rgba(248, 255, 245, 0.8);
	--footer-border: rgba(234, 247, 229, 0.95);
	--org-name-color: #5d735e;
	--join-text-color: #7dad5f;
	--ava-shadow: 0 3rpx 10rpx rgba(126, 163, 117, 0.16);
}
</style>

