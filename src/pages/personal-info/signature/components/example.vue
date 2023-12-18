<template>
  <view class="seeSealDetail_popup">
    <view class="top">
      <text class="title fa-overflow">{{ $t("user.stamp.demo.title") }}</text>
    </view>
    <view class="content">
      <view class="content-title">{{ $t("user.stamp.manage-tips") }}</view>
      <view class="title_tip">
        <view>{{ $t("user.stamp.demo.tips1") }}</view>
        <view>{{ $t("user.stamp.demo.tips2") }}</view>
        <view>{{ $t("user.stamp.demo.tips3") }}</view>
      </view>
      <view class="fs">{{ $t("user.stamp.modal.upload") }}</view>
      <view class="demo_True">
        <image
          class="img1"
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/T_1.png"
          mode="scaleToFill"
        />
      </view>
      <view>
        <image
          class="demo_false"
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/F_1.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="popup_bottom">
      <view class="confirm" @click="onConfirm">{{ $t("global.confirm") }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
const emit = defineEmits(["confirm"]);
const onConfirm = () => {
  emit("confirm");
};
</script>

<style lang="scss" scoped>
.seeSealDetail_popup {
  .top {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    padding: 0 41rpx;
    width: 96%;
    .title {
      font-size: 40rpx;
      font-weight: 500;
    }
  }
  .content {
    margin: 40rpx 64rpx 0;
    height: calc(100vh - 88rpx - 100rpx - 172rpx);
    overflow-y: auto;
    padding-bottom: 132rpx;
    .content_title {
      font-size: 32rpx;
      font-weight: 600;
    }
    .fs {
      font-size: 32rpx;
      font-weight: 500;
      margin-bottom: 19rpx;
    }
    .title_tip {
      font-size: 28rpx;
      font-weight: 400;
      letter-spacing: 0.84rpx;
      color: rgba(0, 0, 0, 0.5);
      margin: 32rpx 0 80rpx;
    }
    .scroll {
      height: calc(100vh - 88rpx - 100rpx - 172rpx - 400rpx);
    }
    .demo_True {
      height: 752rpx;
      margin-bottom: 40rpx;
      .img1 {
        width: 622rpx;
        height: 752rpx;
      }
    }
    .demo_false {
      width: 622rpx;
      height: 1340rpx;
    }
  }
  .popup_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 132rpx;
    background-color: #fff;
    border-top: 1rpx solid rgba(237, 237, 237, 1);
    padding: 26rpx 45rpx;
    .confirm {
      height: 80rpx;
      color: #ffffff;
      line-height: 80rpx;
      text-align: center;
      background-color: rgba(0, 80, 179, 1);
    }
  }
}
</style>
