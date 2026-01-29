<template>
	<!-- 发布活动详情弹窗 -->
	<view class="activity-modal" v-if="showActivityModal">
	  <view class="modal-content">
		<!-- 弹窗头部 -->
		<view class="modal-header">
		  <text class="modal-title">发布活动</text>
		  <text class="modal-close" @click="closeActivityModal">✕</text>
		</view>
		
		<!-- 活动封面 -->
		<view class="activity-cover-section">
		  <view class="cover-placeholder" @click="selectCoverImage">
			<text class="cover-icon">📷</text>
			<text class="cover-text">添加活动封面</text>
		  </view>
		</view>
		
		<!-- 活动信息表单 -->
		<view class="activity-form">
		  <!-- 活动标题 -->
		  <view class="form-item">
			<text class="form-label">活动标题</text>
			<input class="form-input" placeholder="请输入活动标题" v-model="activityForm.title" />
		  </view>
		  
		  <!-- 活动类型 -->
		  <view class="form-item">
			<text class="form-label">活动类型</text>
			<view class="form-select" @click="showTypeSelector = true">
			  <text>{{ activityForm.type || '请选择活动类型' }}</text>
			  <text class="select-arrow">▼</text>
			</view>
		  </view>
		  
		  <!-- 活动时间 -->
		  <view class="form-item">
			<text class="form-label">活动时间</text>
			<view class="form-select" @click="showTimeSelector = true">
			  <text>{{ activityForm.time || '请选择活动时间' }}</text>
			  <text class="select-arrow">▼</text>
			</view>
		  </view>
		  
		  <!-- 活动地点 -->
		  <view class="form-item">
			<text class="form-label">活动地点</text>
			<input class="form-input" placeholder="请输入活动地点" v-model="activityForm.location" />
		  </view>
		  
		  <!-- 活动费用 -->
		  <view class="form-item">
			<text class="form-label">活动费用</text>
			<input class="form-input" placeholder="请输入活动费用" v-model="activityForm.price" type="number" />
		  </view>
		  
		  <!-- 活动描述 -->
		  <view class="form-item">
			<text class="form-label">活动描述</text>
			<textarea class="form-textarea" placeholder="请详细描述活动内容" v-model="activityForm.description" rows="4"></textarea>
		  </view>
		</view>	        
		<!-- 发布按钮 -->
		<button class="submit-btn" @click="submitActivity">发布活动</button>
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
      // 选择器控制
      showTypeSelector: false,
      showTimeSelector: false
    };
  },
  methods: {
	closeActivityModal(){
		// this.showActivityModal = false;
		uni.switchTab({
			url:"/pages/user/user"
		})
	},
	selectCoverImage(){
		// 这里可以添加选择图片的逻辑
		console.log('选择活动封面');
	},
	submitActivity(){
		// 这里可以添加提交活动的逻辑
		console.log('提交活动', this.activityForm);
		// 提交成功后关闭弹窗
		this.showActivityModal = false;
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
	.activity-modal {
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
	
	.modal-content {
	  background-color: white;
	  width: 90%;
	  max-height: 90vh;
	  border-radius: 16rpx;
	  overflow: hidden;
	  display: flex;
	  flex-direction: column;
	}
	
	/* 弹窗头部 */
	.modal-header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 30rpx;
	  border-bottom: 1rpx solid #f0f0f0;
	}
	
	.modal-title {
	  font-size: 32rpx;
	  font-weight: bold;
	  color: #333;
	}
	
	.modal-close {
	  font-size: 32rpx;
	  color: #999;
	}
	
	/* 活动封面 */
	.activity-cover-section {
	  padding: 30rpx;
	  border-bottom: 1rpx solid #f0f0f0;
	}
	
	.cover-placeholder {
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
	
	.cover-icon {
	  font-size: 64rpx;
	  margin-bottom: 20rpx;
	}
	
	.cover-text {
	  font-size: 28rpx;
	  color: #999;
	}
	
	/* 活动表单 */
	.activity-form {
	  padding: 30rpx;
	  flex: 1;
	  overflow-y: auto;
	}
	
	.form-item {
	  margin-bottom: 30rpx;
	}
	
	.form-label {
	  display: block;
	  font-size: 28rpx;
	  font-weight: bold;
	  color: #333;
	  margin-bottom: 12rpx;
	}
	
	.form-input {
	  width: 100%;
	  padding: 20rpx;
	  border: 1rpx solid #e8e8e8;
	  border-radius: 8rpx;
	  font-size: 28rpx;
	  background-color: #fafafa;
	}
	
	.form-select {
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
	
	.select-arrow {
	  font-size: 20rpx;
	  color: #999;
	}
	
	.form-textarea {
	  width: 100%;
	  padding: 20rpx;
	  border: 1rpx solid #e8e8e8;
	  border-radius: 8rpx;
	  font-size: 28rpx;
	  background-color: #fafafa;
	  min-height: 200rpx;
	  resize: none;
	}
	
	/* 发布按钮 */
	.submit-btn {
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