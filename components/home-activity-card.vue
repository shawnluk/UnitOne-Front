<template>
	<view class="cardList">
		<view
			v-for="(data, index) in filteredItems"
			:key="data.activity_id || data.id || index"
			:class="['card', themeClass]"
			@click="handleCardClick(data)"
		>
		<view class="coverWrap">
			<image class="cover" :src="data.cover" mode="aspectFill" />
			<view class="coverMask"></view>
			<view class="coverChip">
				<text class="coverChipText">🔥 {{ displayHot(data) }} 热度</text>
			</view>
		</view>

		<view class="main">
			<view class="titleRow">
				<text class="title" :number-of-lines="2">{{ data.title }}</text>
			</view>

			<view class="tagRow" v-if="data.category_name">
				<text class="tag">{{ data.category_name }}</text>
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
			<view class="org" @click.stop>
				<!-- 展示所属小队头像/名称（后端从小队表带出） -->
				<image class="orgAva" :src="data.squad_avatar" mode="aspectFill" />
				<text class="orgName" :number-of-lines="1">{{ data.squad_name }}</text>
			</view>

			<view class="join" @click.stop>
				<!-- 参与成员头像：一屏约显示 3 个，超出宽度横向滑动浏览（PC 端显示细滚动条可拖动） -->
				<scroll-view scroll-x class="joinScroll" :show-scrollbar="true">
					<view class="joinList">
						<image
							v-for="(m, idx) in getActivityMembers(data)"
							:key="idx"
							class="ava"
							:src="m.avatar || m"
							mode="aspectFill"
						/>
					</view>
				</scroll-view>
				<!-- 右下角最右边：参与人数 -->
				<text class="joinText">{{ getActivityJoinCount(data) }}人参加</text>
			</view>
			</view>
		</view>

		<view class="loadStatus" v-if="filteredItems.length">
			<view class="loadingRow" v-if="loading">
				<view class="spinner"></view>
				<text class="loadingText">加载中...</text>
			</view>
			<text v-else-if="!hasMore">没有更多了</text>
		</view>
	</view>
</template>

<script>
import { fetchHomeActivityList, reportActivityView, applyHotResult } from '@/api/modules/activity.js'
import { cacheActivities, getCachedActivity } from '@/utils/activity-cache.js'

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
			activityList: [],
			filteredItems: [],
			/** 当前选中的分类，下拉刷新后沿用 */
			currentCategoryId: null,
			/** 每页加载条数 */
			pageSize: 10,
			/** 当前偏移量 */
			offset: 0,
			/** 是否还有下一页 */
			hasMore: true,
			/** 是否正在加载 */
			loading: false,
		}
	},
	/** 页面创建：加载首页活动数据并监听分类切换事件 */
	async created() {
		await this.refresh()
		if (uni && typeof uni.$on === 'function') {
			uni.$on('index:category-change', this.handleCategoryFilter)
		}
	},
	/** 组件销毁：解绑全局分类切换事件监听 */
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
		/** 下拉刷新：重置偏移量并重新加载，保留当前分类筛选状态 */
		async refresh() {
			this.offset = 0
			this.hasMore = true
			this.activityList = []
			await this.fetchPage()
		},
		/** 上拉加载下一页（底部"加载中"持续 3 秒后再加载） */
		async loadMore() {
			if (!this.hasMore || this.loading) return
			this.offset += this.pageSize
			this.loading = true
			try {
				await this.delay(3000)
				await this.fetchPage()
			} finally {
				this.loading = false
			}
		},
		/** 按当前偏移量请求一页活动数据 */
		async fetchPage() {
			try {
				const res = await fetchHomeActivityList({
					offset: this.offset,
					limit: this.pageSize,
				})
				const { items, total } = this.normalizeActivityResult(res)
				// 首页列表接口已返回 squad_avatar/squad_name/activity_member，写入本地缓存时显式补齐默认值，
				// 保证详情页从缓存读取的数据携带所属小队信息与报名成员列表
				const cacheItems = items.map((item) => ({
					...item,
					squad_avatar: item.squad_avatar || '',
					squad_name: item.squad_name || '',
					activity_member: item.activity_member || [],
				}))
				cacheActivities(cacheItems)
				if (items.length <= this.pageSize) {
					// 情况一：后端已实现分页，返回当前页数据（不超过一页）
					this.activityList = this.offset === 0 ? items : this.activityList.concat(items)
					console.log('[HiGo] activityList(后端已分页) =>', this.activityList)
					this.hasMore = total != null
						? this.offset + this.pageSize < total
						: items.length >= this.pageSize
				} else {
					// 情况二：后端未做分页，返回全量数据，前端本地切片
					const pageItems = items.slice(this.offset, this.offset + this.pageSize)
					this.activityList = this.offset === 0 ? pageItems : this.activityList.concat(pageItems)
					console.log('[HiGo] 首页活动列表(后端未分页，本地切片) =>')
					console.log('[HiGo] activityList =>', this.activityList)
					this.hasMore = this.offset + this.pageSize < items.length
				}
				this.applyCategoryFilter(this.currentCategoryId)
			} catch (e) {
				uni.showToast({
					title: (e && e.message) || '活动列表加载失败',
					icon: 'none',
				})
			}
		},
		/** 延时工具，返回 Promise */
		delay(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		/** 兼容后端返回数组或 { list/records/items, total } 两种分页结构 */
		normalizeActivityResult(res) {
			if (Array.isArray(res)) {
				return { items: res, total: null }
			}
			if (res && typeof res === 'object') {
				const list = res.list || res.records || res.items || res.rows || []
				const rawTotal = res.total != null ? res.total : res.totalCount
				return {
					items: Array.isArray(list) ? list : [],
					total: rawTotal != null ? Number(rawTotal) : null,
				}
			}
			return { items: [], total: null }
		},
		/** 解析活动参与成员列表：兼容后端返回的 members 与 activity_member 两种字段 */
		getActivityMembers(data) {
			const list = data && (data.members || data.activity_member)
			return Array.isArray(list) ? list : []
		},
		/** 参与人数：优先取成员列表长度，其次取后端 member_count / joinCount */
		getActivityJoinCount(data) {
			const members = this.getActivityMembers(data)
			if (members.length) return members.length
			if (data && data.member_count != null) return Number(data.member_count) || 0
			if (data && data.joinCount != null) return Number(data.joinCount) || 0
			return 0
		},
		/** 热度显示：读取 data.hot，缺失时兼容 data.heat/0 避免空白 */
		displayHot(data) {
			const hot = data && (data.hot != null ? data.hot : data.heat)
			return Number(hot) || 0
		},
		/** 点击活动卡片：跳转到活动详情页，并异步上报一次热度（fire-and-forget，失败静默） */
		handleCardClick(item) {
			console.log('[HiGo] 点击活动卡片 activity_id =>', item.activity_id || item.id)
			const activity_id = item.activity_id || item.id
			this.reportHot(activity_id)
			uni.redirectTo({
				url: `/src/activity-detail/activity-detail?activity_id=${activity_id}`
			})
		},
		/** 上报热度：成功后按返回结果反写当前列表与本地缓存中的该项 hot，营造“热度跳动”反馈 */
		async reportHot(activityId) {
			let result
			try {
				result = await reportActivityView(activityId)
			} catch (_) {
				result = null
			}
			if (!result) return
			const item = this.findActivityById(activityId)
			const updated = applyHotResult(item, result)
			if (updated && updated !== item) this.replaceActivity(updated)
		},
		/** 在列表与筛选结果中按活动 ID 定位当前条目 */
		findActivityById(activityId) {
			const id = String(activityId)
			const find = (arr) => arr.find((it) => String(it.activity_id || it.id) === id)
			return find(this.activityList) || find(this.filteredItems) || null
		},
		/** 用更新后的条目替换内存列表中的对应项，保持热度实时同步显示 */
		replaceActivity(updated) {
			if (!updated) return
			const id = String(updated.activity_id || updated.id)
			const replaceIn = (arr) => {
				const idx = arr.findIndex((it) => String(it.activity_id || it.id) === id)
				if (idx !== -1) arr.splice(idx, 1, updated)
			}
			replaceIn(this.activityList)
			replaceIn(this.filteredItems)
		},
		/** 按当前分类筛选活动列表并标记选中态 */
		applyCategoryFilter(categoryId) {
			if (!categoryId) {
				this.filteredItems = this.activityList.map((item) => ({
					...item,
					isActive: true,
				}))
				return
			}
			this.filteredItems = this.activityList
				.filter((item) => item.category_id === categoryId)
				.map((item) => ({ ...item, isActive: true }))
		},
		/** 接收分类切换事件并应用筛选 */
		handleCategoryFilter(payload) {
			console.log('[HiGo] 分类切换事件 payload =>', payload)
			const category_id = payload && payload.category_id ? payload.category_id : null
			// console.log(categoryId)
			this.currentCategoryId = category_id
			this.applyCategoryFilter(category_id)
		},
		/** 返回首页时调用：从本地缓存读取最新热度并同步到列表，实现"返回后热度 +1"的反馈 */
		syncHotFromCache() {
			const sync = (arr) => {
				if (!Array.isArray(arr)) return false
				let changed = false
				arr.forEach((it) => {
					if (!it) return
					const key = String(it.activity_id != null ? it.activity_id : it.id)
					if (!key) return
					const cached = getCachedActivity(key)
					if (cached && cached.hot != null && Number(cached.hot) !== Number(it.hot || 0)) {
						it.hot = Number(cached.hot)
						changed = true
					}
				})
				return changed
			}
			const changed = sync(this.activityList)
			// 仅当热度有变化时才整体替换以触发视图更新，避免无谓重渲
			if (changed) {
				this.activityList = this.activityList.map((it) => ({ ...it }))
				this.applyCategoryFilter(this.currentCategoryId)
			}
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

.loadStatus {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16rpx 0 8rpx;
	font-size: 24rpx;
	color: #9b9b9b;
}

.loadingRow {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.loadingText {
	font-size: 24rpx;
	color: #9b9b9b;
}

.spinner {
	width: 28rpx;
	height: 28rpx;
	border: 4rpx solid #e6e1f7;
	border-top-color: #7d5fff;
	border-radius: 50%;
	animation: load-spin 0.8s linear infinite;
}

@keyframes load-spin {
	to {
		transform: rotate(360deg);
	}
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
	max-width: 45%;
	flex-shrink: 0;
}

.joinText {
	font-size: 23rpx;
	color: var(--join-text-color);
	font-weight: 700;
	flex-shrink: 0;
}

/* 参与成员头像横滑区：一屏约 3 个头像，超出横向滑动 */
.joinScroll {
	width: 132rpx;
	white-space: nowrap;
	flex-shrink: 0;
}

.joinList {
	display: inline-flex;
	align-items: center;
}

.ava {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	border: 2rpx solid #ffffff;
	margin-right: 6rpx;
	background: #f2f2f2;
	flex-shrink: 0;
}

/* H5 桌面端修复：uni-app 把 scroll-view 渲染为内层 .uni-scroll-view 滚动容器，
   需 deep 选择器让其原生横向溢出并显示可拖动的细滚动条；
   小程序端无这些 web 类名与滚动条样式，不受影响 */
.joinScroll ::v-deep .uni-scroll-view {
	overflow-x: auto;
	white-space: nowrap;
}
.joinScroll ::v-deep .uni-scroll-view-content {
	display: inline-block;
	white-space: nowrap;
}
.joinScroll ::v-deep ::-webkit-scrollbar {
	height: 4rpx;
}
.joinScroll ::v-deep ::-webkit-scrollbar-thumb {
	border-radius: 2rpx;
	background: rgba(125, 95, 255, 0.35);
}
.joinScroll ::v-deep ::-webkit-scrollbar-track {
	background: transparent;
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

