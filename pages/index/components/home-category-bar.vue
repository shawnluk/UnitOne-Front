<template>
	<view class="hcWrap">
		<scroll-view scroll-x class="hcScroll" :show-scrollbar="false">
			<view class="hcRow">
				<view
					v-for="(item, idx) in items"
					:key="idx"
					class="hcItem"
					:class="{ hcItemActive: item.isActive }"
					@click="handleSelect(item, idx)"
				>
					<view class="hcIconBox">
						<image class="hcIcon" :src="item.icon" mode="aspectFit" />
						<view v-if="item.badge" class="hcBadge" />
					</view>
					<text class="hcText">{{ item.text }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'HomeCategoryBar',
	data() {
		return {
			items: [
				{ category_id: 1, key: 'sport', text: '约球', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/ball-0.png', isActive: false },
				{ category_id: 2, key: 'movie', text: '观影', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/movie-0.png', isActive: false },
				{ category_id: 3, key: 'outdoor', text: '户外', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/traval-0.png', isActive: false },
				{ category_id: 4, key: 'chat', text: '闲聊', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/table-0.png', isActive: false },
				{ category_id: 5, key: 'art', text: '艺术', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/art-0.png', isActive: false },
				{ category_id: 6, key: 'subscribe', text: '订阅', icon: 'https://unitone-1310134019.cos.ap-guangzhou.myqcloud.com/HomeCategoryBar-icon/favor-0.png', badge: true, isActive: false },
			],
		}
	},
	methods: {
		handleSelect(_, idx) {
			const nextItems = this.items.map((item, itemIdx) => ({
				...item,
				isActive: itemIdx === idx ? !item.isActive : false,
			}))
			this.items = nextItems
			const selectedItem = nextItems[idx]
			const categoryId = selectedItem && selectedItem.isActive ? selectedItem.category_id : null
			if (uni && typeof uni.$emit === 'function') {
				uni.$emit('index:category-change', { categoryId })
			}
		},
	},
}
</script>

<style scoped>
.hcWrap {
	padding: 12rpx 24rpx 18rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(248, 243, 255, 0.45) 100%);
}

.hcScroll {
	white-space: nowrap;
}

.hcRow {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	padding-right: 8rpx;
}

.hcItem {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 124rpx;
	flex-shrink: 0;
	padding: 10rpx 6rpx 12rpx;
	border-radius: 24rpx;
	background: rgba(255, 255, 255, 0.72);
	border: 2rpx solid rgba(255, 255, 255, 0.9);
	box-shadow: 0 10rpx 28rpx rgba(105, 62, 255, 0.08);
	transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.hcItemActive {
	background: linear-gradient(145deg, #ffffff 0%, rgba(125, 95, 255, 0.14) 48%, rgba(255, 95, 179, 0.1) 100%);
	border-color: rgba(125, 95, 255, 0.35);
	box-shadow: 0 14rpx 32rpx rgba(125, 95, 255, 0.22);
}

.hcIconBox {
	position: relative;
	width: 100rpx;
	height: 76rpx;
	border-radius: 22rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 242, 255, 0.9) 100%);
	border: 1rpx solid rgba(125, 95, 255, 0.18);
	box-shadow: 0 8rpx 20rpx rgba(125, 95, 255, 0.12);
}

.hcItemActive .hcIconBox {
	background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(232, 224, 255, 0.95) 100%);
	border-color: rgba(125, 95, 255, 0.32);
	box-shadow: 0 10rpx 22rpx rgba(125, 95, 255, 0.2);
}

.hcIcon {
	width: 56rpx;
	height: 56rpx;
}

.hcText {
	margin-top: 10rpx;
	font-size: 24rpx;
	line-height: 1.2;
	font-weight: 500;
	color: #6c6392;
	text-align: center;
	max-width: 112rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.hcItemActive .hcText {
	font-weight: 600;
	color: #5d37ff;
}

.hcBadge {
	position: absolute;
	top: 8rpx;
	right: 10rpx;
	width: 14rpx;
	height: 14rpx;
	border-radius: 50%;
	background: linear-gradient(135deg, #ff5fb3 0%, #ff3b6e 100%);
	border: 2rpx solid #fff;
	box-shadow: 0 4rpx 10rpx rgba(255, 95, 179, 0.45);
}
</style>
