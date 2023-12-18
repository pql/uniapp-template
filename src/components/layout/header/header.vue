<template>
  <view class="setting_padding">
    <view class="header_title">
      <view @click="onBack">
        <image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/nav_icon_back.png"
          class="nav_icon_back"
        >
        </image>
        <slot class="title"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
const { onBack, t, $u } = usePageFrame();
</script>

<style lang="scss" scoped>
.setting_padding {
  background: #f5f5f5;
  padding-top: var(--status-bar-height);
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 99;
}
.header_title {
  box-sizing: border-box;
  color: #000000;
  font-size: 40rpx;
  height: 147rpx;
  line-height: 147rpx;
  padding-left: 38rpx;
}
.nav_icon_back {
  width: 14rpx;
  height: 28rpx;
  margin-right: 28rpx;
  vertical-align: middle;
}
.title {
  font-size: 40rpx;
  font-weight: 600;
  letter-spacing: 0.48rpx;
}
</style>
