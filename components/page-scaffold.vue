<template>
	<view class="pageScaffold">
		<TopBar v-if="showTopBar" />
		<slot />
		<BottomTabBar v-show="showBottomTabBar" :current="tabIndex" />
	</view>
</template>

<script>
import TopBar from '@/components/top-bar.vue'
import BottomTabBar from '@/components/bottom-tab-bar.vue'

/**
 * 主 Tab 页统一骨架：顶栏 + 主内容 slot + 自定义底栏。
 * @prop {number} tabIndex 当前 Tab 下标 0~3，与 bottom-tab-bar 一致
 * @prop {boolean} showTopBar 是否显示顶图
 * @prop {boolean} showBottomTabBar 是否显示底栏（如裁剪全屏时可 false）
 */
export default {
	name: 'PageScaffold',
	components: { TopBar, BottomTabBar },
	props: {
		tabIndex: {
			type: Number,
			default: 0,
		},
		showTopBar: {
			type: Boolean,
			default: true,
		},
		showBottomTabBar: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style scoped>
.pageScaffold {
	min-height: 100%;
}
</style>
