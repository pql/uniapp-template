<template>
  <view class="popup_content">
    <view class="popup_title">{{ $t("global.tip") }}</view>
    <view class="main_info">
      <view
        >{{ $t("user.reg.not") }} {{ regType }}
        {{ $t("user.reg.if-not-regs") }}</view
      >
      <view>
        {{ $t("user.reg.contact") }}
        <text class="color_blue">USAeb5@btm.us</text>
        {{ $t("user.reg.help") }}
      </view>
    </view>
    <view class="ok_btn" @click="onConfirm">{{ $t("user.reg.ok") }}</view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["confirm"]);
defineProps({
  regType: {
    type: String,
    default: "",
  },
});

const onConfirm = () => {
  emit("confirm");
};
</script>

<style lang="scss" scoped>
.color_blue {
  color: rgba(0, 80, 179, 1);
}
.popup_content {
  width: 650rpx;
  height: 465rpx;
  mix-blend-mode: normal;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  background-blend-mode: normal;
  .popup_title {
    width: 650rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 40rpx;
    font-weight: 600;
    letter-spacing: 1.2rpx;
  }
  .main_info {
    padding: 10rpx;
    height: 237rpx;
    text-align: center;
    line-height: 60rpx;
    border-bottom: 1rpx solid rgba(237, 237, 237, 1);
    font-size: 32rpx;
    font-weight: 400;
    letter-spacing: 0.96rpx;
  }
  .ok_btn {
    width: 560rpx;
    height: 80rpx;
    margin: auto;
    margin-top: 26rpx;
    background-color: rgba(0, 80, 179, 1);
    color: #fff;
    font-size: 32rpx;
    font-weight: 400;
    letter-spacing: 0.96rpx;
    text-align: center;
    line-height: 80rpx;
  }
}
</style>
