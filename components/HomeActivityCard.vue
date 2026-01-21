<template>
  <view class="card" @click="$emit('select',data,index)" v-for="(data,index) in items">
    <image class="cover" :src="data.cover" mode="aspectFill" />

    <view class="main">
      <view class="title-row">
        <text class="title" :number-of-lines="2">{{ data.title }}</text>
      </view>

      <view class="tag-row" v-if="data.tagText">
        <text class="tag">{{ data.tagText }}</text>
      </view>

      <view class="meta">
        <view class="meta-row">
          <text class="meta-ico">⏰</text>
          <text class="meta-text">{{ data.timeText }}</text>
        </view>
        <view class="meta-row">
          <text class="meta-ico">📍</text>
          <text class="meta-text" :number-of-lines="1">{{ data.locationText }}</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="org">
        <image class="org-ava" :src="data.orgAvatar" mode="aspectFill" />
        <text class="org-name" :number-of-lines="1">{{ data.orgName }}</text>
      </view>

      <view class="join">
        <text class="join-text">{{ data.joinCount }}人参加</text>
       <view class="ava-group">
          <image
            v-for="(a, idx) in data.joinAvatars.slice(0,3)"
            :key="idx"
            class="ava"
            :style="{ zIndex: 10 - idx }"
            :src="a"
            mode="aspectFill"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HomeActivityCard',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits:['select'],
  // computed: {
  //   avatarGroup() {
  //     const arr = Array.isArray(this.items[index].joinAvatars) ? this.items[index].joinAvatars : []
  //     return arr.slice(0, 3)
  //   },
  // },
}
</script>

<style scoped>
.card {
  position: relative;
  background: #fff;
  border-radius: 28rpx;
  padding: 20rpx;
  padding-bottom: 74rpx;
  box-shadow: 0 14rpx 34rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 18rpx;
}

.cover {
  width: 160rpx;
  height: 200rpx;
  border-radius: 18rpx;
  background: #f2f2f2;
  flex-shrink: 0;
}

.main {
  flex: 1;
  min-width: 0;
}

.title-row {
  display: flex;
}

.title {
  font-size: 34rpx;
  line-height: 44rpx;
  font-weight: 700;
  color: #111;
}

.tag-row {
  margin-top: 10rpx;
}

.tag {
  font-size: 24rpx;
  color: #fff;
  background: #8a56ff;
  padding: 6rpx 14rpx;
  border-radius: 12rpx;
}

.meta {
  margin-top: 12rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
  min-width: 0;
}

.meta-ico {
  width: 30rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}

.meta-text {
  font-size: 26rpx;
  color: #888;
  min-width: 0;
}

.footer {
  position: absolute;
  left: 20rpx;
  right: 20rpx;
  bottom: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rpx;
}

.org {
  display: flex;
  align-items: center;
  gap: 10rpx;
  min-width: 0;
}

.org-ava {
  width: 44rpx;
  height: 44rpx;
  border-radius: 12rpx;
  background: #f2f2f2;
}

.org-name {
  font-size: 26rpx;
  color: #999;
  max-width: 240rpx;
}

.join {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.join-text {
  font-size: 26rpx;
  color: #ff7a00;
  font-weight: 600;
  margin-right: 20rpx;
}

.ava-group {
  display: flex;
  align-items: center;
}

.ava {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  border: 3rpx solid #fff;
  margin-left: -14rpx;
  background: #f2f2f2;
}
</style>

