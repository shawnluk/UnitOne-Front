		<!-- v-for生成5个按钮示例 -->
		<view class="button-example">
			<button 
				v-for="(btn, index) in buttonList" 
				:key="index"
				@click="changeButtonColor(index)"
				:style="{ backgroundColor: btn.isActive ? 'red' : '#f0f0f0' }"
				class="example-button"
			>
				按钮 {{ index + 1 }}
			</button>
		</view>
		
						buttonList: [
							{ isActive: false },
							{ isActive: false },
							{ isActive: false },
							{ isActive: false },
							{ isActive: false }
						]
						
						
						
							.button-example {
								display: flex;
								flex-direction: column;
								gap: 20rpx;
								padding: 20rpx;
								margin-top: 40rpx;
							}
							.example-button {
								width: 100%;
								height: 80rpx;
								line-height: 80rpx;
								border-radius: 8rpx;
								border: 1px solid #ddd;
								color: #333;
								font-size: 28rpx;
								transition: background-color 0.3s;
							}
							
							
										changeButtonColor(index) {
											// 点击按钮时改变背景颜色为红色
											this.buttonList[index].isActive = !this.buttonList[index].isActive;
										}
										
									
									
									
	···········································································								
									
									
									
									<template>
										<view class="button-container">
											<button 
												v-for="(item, index) in buttonList" 
												:key="index"
												@click="changeColor(index)"
												:style="{ backgroundColor: item.isActive ? 'red' : '#f0f0f0' }"
												class="custom-button"
											>
												按钮 {{ index + 1 }}
											</button>
										</view>
									</template>
									
									<script>
									export default {
										data() {
											return {
												buttonList: [
													{ isActive: false },
													{ isActive: false },
													{ isActive: false },
													{ isActive: false },
													{ isActive: false }
												]
											}
										},
										methods: {
											changeColor(index) {
												// 切换按钮的激活状态
												this.buttonList[index].isActive = !this.buttonList[index].isActive;
											}
										}
									}
									</script>
									
									<style scoped>
									.button-container {
										display: flex;
										flex-direction: column;
										gap: 20rpx;
										padding: 20rpx;
									}
									
									.custom-button {
										width: 100%;
										height: 80rpx;
										line-height: 80rpx;
										border-radius: 8rpx;
										border: 1px solid #ddd;
										color: #333;
										font-size: 28rpx;
										transition: background-color 0.3s;
									}
									</style>