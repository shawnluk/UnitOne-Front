<template>
	<view class="hcWrap">
		<scroll-view scroll-x class="hcScroll" :show-scrollbar="false">
			<view class="hcRow">
				<button
					v-for="(item, idx) in items"
					:key="idx"
					class="hcItem"
					:class="{ hcItemActive: item.isActive }"
					@click="handleSelect(item, idx)"
					:style="{color:item.isActive ? 'blue' : 'red'}"
				>
					<view class="hcIconBox">
						<image class="hcIcon" :src="item.icon" />
						<view v-if="item.badge" class="hcBadge"></view>
					</view>
					<text class="hcText">{{ item.text }}</text>
				</button>
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
	padding: 18rpx 24rpx 8rpx;
	background: #fff;
}

.hcScroll {
	white-space: nowrap;
}

.hcRow {
	display: flex;
	align-items: center;
	gap: 18rpx;
	padding-right: 12rpx;
}

.hcItem {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 120rpx;
}

.hcItemActive{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 120rpx;
	background: #ebf1ff;
}

.hcItem::after {
	border: none;
}

.hcIconBox {
	position: relative;
	width: 104rpx;
	height: 80rpx;
	border-radius: 28rpx;
	box-shadow: 0 10rpx 26rpx rgba(0, 0, 0, 0.06);
	display: flex;
	align-items: center;
	justify-content: center;
}

.hcIcon {
	width: 60rpx;
	height: 60rpx;
}

.hcText {
	line-height: 30rpx;
	font-size: 25rpx;
	width: 60rpx;
}

.hcBadge {
	position: absolute;
	top: 10rpx;
	right: 14rpx;
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background: #ff3b30;
	border: 3rpx solid #fff;
}
</style>
