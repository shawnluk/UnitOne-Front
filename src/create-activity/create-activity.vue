<template>
	<!-- 发布活动详情弹窗 -->
	<view class="activityModal" v-if="showActivityModal">
		<view class="modalContent">
		<!-- 弹窗头部 -->
		<view class="modalHeader">
			<text class="modalTitle">发布活动</text>
			<text class="modalClose" @click="closeActivityModal">✕</text>
		</view>

		<!-- 活动封面 -->
		<view class="activityCoverSection">
			<view class="coverPlaceholder" @click="selectCoverImage">
			<text class="coverIcon">📷</text>
			<text class="coverText">添加活动封面</text>
			</view>
		</view>

		<!-- 活动信息表单 -->
		<view class="activityForm">
			<!-- 活动标题 -->
			<view class="formItem">
			<text class="formLabel">活动标题</text>
			<input class="formInput" placeholder="请输入活动标题" v-model="activityForm.title" />
			</view>

			<!-- 活动类型 -->
			<view class="formItem">
			<text class="formLabel">活动类型</text>
			<view class="formSelect" @click="showTypeSelector = true">
				<text>{{ activityForm.type || '请选择活动类型' }}</text>
				<text class="selectArrow">▼</text>
			</view>
			</view>

			<!-- 活动时间 -->
			<view class="formItem">
			<text class="formLabel">活动时间</text>
			<view class="formSelect" @click="showTimeSelector = true">
				<text>{{ activityForm.time || '请选择活动时间' }}</text>
				<text class="selectArrow">▼</text>
			</view>
			</view>

			<!-- 活动地点 -->
			<view class="formItem">
			<text class="formLabel">活动地点</text>
			<input class="formInput" placeholder="请输入活动地点" v-model="activityForm.location" />
			</view>

			<!-- 活动费用 -->
			<view class="formItem">
			<text class="formLabel">活动费用</text>
			<input class="formInput" placeholder="请输入活动费用" v-model="activityForm.price" type="number" />
			</view>

			<!-- 活动描述 -->
			<view class="formItem">
			<text class="formLabel">活动描述</text>
			<editor
				id="descEditor"
				class="formEditor"
				placeholder="请详细描述活动内容，支持插入图片"
				show-img-size
				show-img-toolbar
				show-img-resize
				@ready="onEditorReady"
				@input="onDescInput"
			></editor>
			<button class="insertImgBtn" type="default" @click="insertDescImage">插入图片</button>
			<!-- <view class="iconfont icon-charutupian" @tap="insertImage"></view> -->
			</view>
		</view>	        
		<!-- 发布按钮 -->
		<button class="submitBtn" @click="submitActivity">发布活动</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 发布活动弹窗控制
			showActivityModal: true,
			// 活动表单数据
			activityForm: {
				title: '',
				type: '',
				time: '',
				location: '',
				price: '',
				description: ''
			},
			editorCtx: null,
			// 选择器控制
			showTypeSelector: false,
			showTimeSelector: false
		};
	},
	methods: {
	closeActivityModal(){
		// this.showActivityModal = false;
		uni.navigateTo({
			url:"/pages/user/user"
		})
	},
	selectCoverImage(){
		// 这里可以添加选择图片的逻辑
		console.log('选择活动封面');
	},
	onEditorReady() {
		// 获取富文本编辑器上下文
		uni.createSelectorQuery().in(this).select('#descEditor').context(res => {
			this.editorCtx = res.context;
			// 初始化时写入已有描述
			if (this.activityForm.description) {
				this.editorCtx.setContents({ html: this.activityForm.description });
			}
		}).exec();
	},
	onDescInput(e) {
		// 同步富文本内容到表单
		this.activityForm.description = e.detail.html || '';
	},
	insertDescImage() {
		if (!this.editorCtx) {
			uni.showToast({ title: '编辑器尚未就绪', icon: 'none' });
			return;
		}
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			success: res => {
				const filePath = res.tempFilePaths && res.tempFilePaths[0];
				if (filePath) {
					this.editorCtx.insertImage({
						src: filePath,
						alt: '活动图片'
					});
				}
			},
			fail: () => {
				uni.showToast({ title: '选择图片失败', icon: 'none' });
			}
		});
	},
	submitActivity(){
		// 这里可以添加提交活动的逻辑
		console.log('提交活动', this.activityForm);
		// 提交成功后关闭弹窗
		// this.showActivityModal = false;
		// 重置表单
		this.activityForm = {
			title: '',
			type: '',
			time: '',
			location: '',
			price: '',
			description: ''
		};
	}
	}
};
</script>

<style>
	/* 发布活动弹窗 */
	.activityModal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modalContent {
		background-color: white;
		width: 90%;
		max-height: 90vh;
		border-radius: 16rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* 弹窗头部 */
	.modalHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.modalTitle {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.modalClose {
		font-size: 32rpx;
		color: #999;
	}

	/* 活动封面 */
	.activityCoverSection {
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.coverPlaceholder {
		width: 100%;
		height: 300rpx;
		background-color: #f5f5f5;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.coverIcon {
		font-size: 64rpx;
		margin-bottom: 20rpx;
	}

	.coverText {
		font-size: 28rpx;
		color: #999;
	}

	/* 活动表单 */
	.activityForm {
		padding: 30rpx;
		flex: 1;
		overflow-y: auto;
	}

	.formItem {
		margin-bottom: 30rpx;
	}

	.formLabel {
		display: block;
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 12rpx;
	}

	.formInput {
		width: 100%;
		padding: 20rpx;
		border: 1rpx solid #e8e8e8;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-color: #fafafa;
	}

	.formSelect {
		width: 100%;
		padding: 20rpx;
		border: 1rpx solid #e8e8e8;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-color: #fafafa;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.selectArrow {
		font-size: 20rpx;
		color: #999;
	}

	.formTextarea {
		width: 100%;
		padding: 20rpx;
		border: 1rpx solid #e8e8e8;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-color: #fafafa;
		min-height: 200rpx;
		resize: none;
	}

	.formEditor {
		width: 100%;
		min-height: 200rpx;
		padding: 20rpx;
		border: 1rpx solid #e8e8e8;
		border-radius: 8rpx;
		background-color: #fafafa;
		box-sizing: border-box;
	}

	.insertImgBtn {
		margin-top: 16rpx;
		padding: 18rpx;
		font-size: 26rpx;
		color: #ff6b00;
		border: 1rpx solid #ff6b00;
		background-color: #fff7f0;
		border-radius: 8rpx;
	}

	/* 发布按钮 */
	.submitBtn {
		margin: 0 30rpx 30rpx;
		background-color: #ff6b00;
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		padding: 24rpx;
		border-radius: 12rpx;
		border: none;
	}
</style>