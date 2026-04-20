<template>
	<view>
		<TopBar></TopBar>
		<view class="content">
			<view class="nvgContent">
				<view class="logoBubbleWrap" @click="onClickLogo">
					<image src="/static/logo.png" mode="aspectFit" class="logoIcon"></image>
					<view
						v-for="bubble in bubbleList"
						:key="bubble.id"
						class="bubbleItem"
						:style="{
							left: bubble.left + 'rpx',
							animationDelay: bubble.delay + 'ms',
							animationDuration: bubble.duration + 'ms'
						}"
					>
						HiGo
					</view>
				</view>
				<view class="searchBox">
					<!-- <image class="searchIcon" src="/static/search.png" mode="aspectFit"></image> -->
					<picker :value="region" @change="onRegionChange">
						<view class="cityBox">
							<text class="cityText">{{ currentCity }}</text>
							<text class="cityArrow">▾</text>
						</view>
					</picker>
					<input
						v-model="searchKeyword"
						class="searchInput"
						placeholder="搜索活动/圈子"
						placeholder-class="searchPlaceholder"
						confirm-type="search"
						@confirm="onSearchConfirm"
					/>
				</view>
			</view>
		</view>

		<!-- 轮播图组件 -->
		<view>
			<Swiper/>
		</view>

		<!-- 分类列表 -->
		<view>
			<HomeCategoryBar :items="categoryItems" @select="onSelectCategory" ></HomeCategoryBar>
			<view class="section-head">
				<view class="head-left">
					<text class="head-title" @click="onclickHeadTitle">热门</text>
					<text class="head-max">MAX</text>
				</view>
				<view class="head-right" @click="onClickFilter">
					<text class="filter-text">筛选</text>
					<text class="filter-arrow">▾</text>
				</view>
			</view>

		</view>
		<!-- 活动列表 -->
		<view class="activitylist">
			<HomeActivityCard @select="onSelectCard" :items="NewActivityList"></HomeActivityCard>
			<view class="noMoreText" v-if="NewActivityList.length">
				<text>没有更多了</text>
			</view>
		</view>

		<!-- 自定义底部导航 -->
		<BottomTabBar :current="0" />
	</view>


</template>

<script>
	
	import TopBar from '@/components/TopBar.vue'
	import HomeCategoryBar from '@/components/HomeCategoryBar.vue'
	import HomeActivityCard from '@/components/HomeActivityCard.vue'
	import Swiper from '@/components/SwiperBar.vue'
	import BottomTabBar from '@/components/BottomTabBar.vue'


		export default {
		components:{ TopBar,Swiper,HomeActivityCard, HomeCategoryBar, BottomTabBar },
		data() {
			return {
				title: 'Hello',
				Number : 0,
				bubbleSeed: 0,
				bubbleList: [],
				currentCity: '深圳',
				// 省 / 市 / 区 初始值
				region: ['广东省', '深圳市', '南山区'],
				searchKeyword: '',
				categoryItems: [
					{ category_id:1,key: 'sport', text: '约球', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/ball-0.png' ,isActive:false},
					{ category_id:2,key: 'movie', text: '观影', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/movie-0.png' ,isActive:false},
					{ category_id:3,key: 'outdoor', text: '户外', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/traval-0.png' ,isActive:false},
					{ category_id:4,key: 'chat', text: '闲聊', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/table-0.png' ,isActive:false},
					{ category_id:5,key: 'art', text: '艺术', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/art-0.png',isActive:false},
					{ category_id:6,key: 'subscribe', text: '订阅', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/favor-0.png', badge: true,isActive:false },
				],
				activityList:[
					{
						category_id:1,
						name:"1-1",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"周三晚南山羽毛球局（新手友好）",
						location_text:"深圳市南山区科苑路15号 深圳湾体育中心羽毛球馆",
						time_text:"2026-04-24 19:30:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"阿Ken",
						joinCount:10,
						joinAvatars: ['https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						category_id:1,
						name:"1-2",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"福田5v5篮球夜场（缺2人）",
						location_text:"深圳市福田区福华三路88号 市民中心篮球公园",
						time_text:"2026-04-26 20:00:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"Mia篮球手",
						joinCount:10,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						category_id:2,
						name:"2-2",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"IMAX观影《沙丘2》拼单场",
						location_text:"深圳市南山区海德三道85号 万象天地百老汇影城",
						time_text:"2026-04-27 15:10:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"电影小牧",
						joinCount:11,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						category_id:3,
						name:"3-3",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"梧桐山轻徒步看日落（8km）",
						location_text:"深圳市罗湖区莲塘街道 梧桐山风景名胜区北门",
						time_text:"2026-04-28 14:30:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"山野阿泽",
						joinCount:12,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000100_r_w.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000102_r_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png'
                        ],
					},
					{
						category_id:4,
						name:"4-4",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"下班后Coffee Chat：产品x设计交流",
						location_text:"深圳市南山区粤海街道 科技园南区星巴克臻选店",
						time_text:"2026-04-25 19:00:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"Luna产品喵",
						joinCount:13,
						joinAvatars: [
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/flag_007_ll.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000108_r.png',
                          'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000103_r.png'
                        ],
					},
					{
						category_id:5,
						name:"5-5",
						isActive:false,
						cover:"https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/e_000109_r.png",
						title:"周末油画体验课：莫兰迪静物",
						location_text:"深圳市福田区华强北街道 深业上城L2 艺术工坊",
						time_text:"2026-04-27 10:00:00",
						org_avatar: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/test/logo.png',
						org_name:"木子画室",
						joinCount:14,
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
				NewActivityList:[],
			}
		},
		onLoad() {
				this.activityList.forEach((value)=>{value.isActive = true})
				this.NewActivityList = this.activityList
		},
		methods: {
			onClickLogo() {
				const now = Date.now()
				const bubbles = Array.from({ length: 6 }, (_, index) => {
					const id = `${now}-${this.bubbleSeed + index}`
					return {
						id,
						left: 10 + Math.round(Math.random() * 90),
						delay: index * 45,
						duration: 950 + Math.round(Math.random() * 300)
					}
				})
				this.bubbleSeed += bubbles.length
				this.bubbleList = [...this.bubbleList, ...bubbles]
				setTimeout(() => {
					const ids = new Set(bubbles.map((item) => item.id))
					this.bubbleList = this.bubbleList.filter((item) => !ids.has(item.id))
				}, 1400)
			},
			onRegionChange(e) {
				// e.detail.value 是 [省, 市, 区]
				const value = e.detail.value || []
				this.region = value
				// 只显示城市名（第二个）
				if (value.length >= 2) {
					// 例如 value[1] 是 “杭州市”，只要“杭州”的话可以再去掉“市”
					const city = value[1].replace(/市$/, '')
					this.currentCity = city
				}
			},
			onSearchConfirm() {
				const keyword = (this.searchKeyword || '').trim()
				if (!keyword) return
				uni.showToast({ title: `搜索：${keyword}`, icon: 'none' })
			},
			onSelectCategory(item,index) {
				this.NewActivityList=[]
				this.Number = item.category_id
				this.categoryItems.forEach((value)=>{ value.isActive = false })
				this.NewActivityList = this.activityList.filter( e=>e.category_id === item.category_id)
				this.categoryItems[index].isActive = !this.categoryItems[index].isActive
				this.NewActivityList.forEach((value)=>{ value.isActive = true })
			},
			onClickFilter() {
				uni.showToast({ title: '点击了筛选', icon: 'none' })
			},
			onSelectCard(item) {
				uni.redirectTo({
				  url: "/src/ActivityDetail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item))
				})
				// console.log("/src/ActivityDetail/activity-detail?item=" + encodeURIComponent(JSON.stringify(item)))
			},
			onclickHeadTitle(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			goto(i){
				if(i === 1){
					uni.redirectTo({
						url:"/components/ButtonList"
					})
				}
				if(i === 2){
					uni.redirectTo({
						url:"/components/Swiper"
					})
				}
			}
		}
	}
</script>

<style>
	.nvgContent{
		display: flex;
		/* margin-top: 20rpx; */
		align-items: center;
		padding: 0 24rpx;
		gap: 16rpx;
	}

	.cityBox{
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		height: 50rpx;
		padding: 0 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(12rpx);
		/* border: 1rpx solid burlywood; */
	}
	.cityText{
		font-size: 30rpx;
		font-weight: 700;
		color: #111;
	}
	.cityArrow{
		margin-left: 10rpx;
		font-size: 26rpx;
		color: #777;
		margin-top: 2rpx;
	}

	.searchBox{
		flex: 1;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 22rpx;
		border-radius: 999rpx;
		background: rgba(255, 255, 255, 0.92);
		border: 1rpx solid burlywood;
	}
	.logoIcon{
		/* margin-top: 20rpx; */
		/* padding-top: 20rpx; */
		width: 120rpx;
		height: 120rpx;
		/* opacity: 0.7; */
		margin-right: 14rpx;
		align-self: center;
		margin-top: 10rpx;
	}
	.logoBubbleWrap{
		position: relative;
		width: 120rpx;
		height: 120rpx;
		margin-top: 10rpx;
		margin-right: 14rpx;
		flex-shrink: 0;
	}
	.bubbleItem{
		position: absolute;
		bottom: 22rpx;
		padding: 6rpx 16rpx;
		border-radius: 999rpx;
		font-size: 20rpx;
		line-height: 1;
		font-weight: 700;
		color: #7f3dff;
		background: rgba(255, 255, 255, 0.95);
		border: 1rpx solid rgba(127, 61, 255, 0.25);
		box-shadow: 0 10rpx 20rpx rgba(127, 61, 255, 0.15);
		transform: translate(-50%, 0) scale(0.9);
		pointer-events: none;
		animation-name: logoBubbleFloat;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}
	@keyframes logoBubbleFloat{
		0%{
			opacity: 0;
			transform: translate(-50%, 0) scale(0.8);
		}
		15%{
			opacity: 1;
		}
		100%{
			opacity: 0;
			transform: translate(-50%, -150rpx) scale(1.18);
		}
	}
	.searchIcon{
		width: 55rpx;
		height: 55rpx;
		opacity: 0.7;
		margin-right: 14rpx;
	}
	.searchInput{
		flex: 1;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 28rpx;
		color: #111;
	}
	.searchPlaceholder{
		color: #bbb;
	}
	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rpx 24rpx 10rpx;
	}

	.head-left {
		display: flex;
		align-items: center;
		gap: 14rpx;
	}

	.head-title {
		font-size: 40rpx;
		font-weight: 800;
		color: #111;
	}

	.head-max {
		font-size: 30rpx;
		font-weight: 900;
		color: #ff7a00;
		letter-spacing: 2rpx;
	}

	.head-right {
		display: flex;
		align-items: center;
		gap: 10rpx;
		padding: 10rpx 14rpx;
		border-radius: 18rpx;
		background: rgba(255, 255, 255, 0.7);
	}

	.filter-text {
		font-size: 28rpx;
		color: #888;
	}

	.filter-arrow {
		font-size: 26rpx;
		color: #bbb;
		margin-top: -2rpx;
	}
	.activitylist {
		display: flex;
		flex-direction: column;
		gap: 18rpx;
		padding: 10rpx 24rpx 24rpx;
		padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
	}
	.noMoreText{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16rpx 0 8rpx;
		font-size: 24rpx;
		color: #9b9b9b;
	}
</style>
