<template>
  <view class="searchBox">
    <picker :value="innerRegion" @change="handleRegionChange">
      <view class="cityBox">
        <text class="cityText">{{ innerCity }}</text>
        <text class="cityArrow">▾</text>
      </view>
    </picker>
    <input
      :value="innerKeyword"
      class="searchInput"
      placeholder="搜索活动/圈子"
      placeholder-class="searchPlaceholder"
      confirm-type="search"
      @input="handleSearchInput"
      @confirm="handleSearchConfirm"
    />
  </view>
</template>

<script>
export default {
  name: 'IndexSearchBox',
  props: {
    initialCity: {
      type: String,
      default: '深圳',
    },
    initialRegion: {
      type: Array,
      default: () => ['广东省', '深圳市', '南山区'],
    },
    initialKeyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerCity: this.initialCity,
      innerRegion: this.initialRegion,
      innerKeyword: this.initialKeyword,
    }
  },
  methods: {
    handleRegionChange(e) {
      const value = (e && e.detail && e.detail.value) || []
      const nextCity = value.length >= 2 ? value[1].replace(/市$/, '') : this.innerCity
      this.innerRegion = value
      this.innerCity = nextCity
    },
    handleSearchInput(e) {
      const value = (e && e.detail && e.detail.value) || ''
      this.innerKeyword = value
    },
    handleSearchConfirm() {
      const keyword = (this.innerKeyword || '').trim()
      if (!keyword) return
      this.innerKeyword = keyword
      this.$emit('search', {
        keyword,
        region: this.innerRegion,
        city: this.innerCity,
      })
    },
  },
}
</script>

<style scoped>
.cityBox {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 50rpx;
  padding: 0 22rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12rpx);
}

.cityText {
  font-size: 30rpx;
  font-weight: 700;
  color: #111;
}

.cityArrow {
  margin-left: 10rpx;
  font-size: 26rpx;
  color: #777;
  margin-top: 2rpx;
}

.searchBox {
  flex: 1;
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 22rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.92);
  border: 1rpx solid burlywood;
}

.searchInput {
  flex: 1;
  height: 76rpx;
  line-height: 76rpx;
  font-size: 28rpx;
  color: #111;
}

.searchPlaceholder {
  color: #bbb;
}
</style>
