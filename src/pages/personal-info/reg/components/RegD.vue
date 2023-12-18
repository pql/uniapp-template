<template>
  <view class="regs_page">
    <view class="regs_content">
      <block
        v-if="item && item.regDVerifyStatus === RegDVerifyStatus.TOBESBUMITTED"
      >
        <view class="state">{{ $t("user.reg.status0") }}</view>
        <view class="regs_title"
          >{{ $t("user.reg.auth-tips-3") }}
          <text class="color_blue"> Reg D </text>
          {{ $t("user.reg.auth-tips-2") }}
        </view>
        <view class="tip_info">{{ $t("user.reg.regd-tips") }}</view>
        <view class="color_blue goAuth" @click="onAuth">{{
          $t("user.reg.regd-auth")
        }}</view>
        <view class="color_blue" @click="onShowPopup">
          {{ $t("user.reg.not-regd") }}</view
        >
      </block>

      <block v-if="item && item.regDVerifyStatus === RegDVerifyStatus.REJECTED">
        <view class="state1 state">{{ $t("user.reg.status2") }}</view>
        <view class="regs_title">{{ $t("user.reg.status2.title") }}</view>
        <view class="tip_info">{{ $t("user.reg.status2.tips") }}</view>
        <view class="color_blue" @click="onRejectDetail">
          {{ $t("user.reg.status2.button") }}</view
        >
      </block>

      <block v-if="item && item.regDVerifyStatus === RegDVerifyStatus.PASSED">
        <view class="regs_title" style="margin-top: 40rpx"
          >{{ $t("user.reg.auth-tips-3") }}
          <text class="color_blue"> Reg D</text>
          {{ $t("user.reg.auth-tips-2") }}</view
        >
        <view class="tip_info"
          >{{ $t("user.reg.time")
          }}{{
            dayjs(item && item.verifyTime).format("YYYY-MM-DD HH:mm")
          }}</view
        >
      </block>

      <block
        v-if="item && item.regDVerifyStatus === RegDVerifyStatus.CHECKPENGDING"
      >
        <view class="state0 state">{{ $t("user.reg.status1") }}</view>
        <view class="regs_title">{{ $t("user.reg.status1.title") }}</view>
        <view class="tip_info">{{ $t("user.reg.status1.tips") }}</view>
      </block>

      <u-popup
        v-model="showPopup"
        mode="center"
        closeable
        border-radius="16"
        width="90%"
      >
        <ComTip reg-type="Reg D" @confirm="onTipConfirm" />
      </u-popup>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import dayjs from "dayjs";
import { RegDVerifyStatus } from "../../../../types/enum";
import ComTip from "./Tip.vue";
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const showPopup = ref<boolean>(false);

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const onAuth = () => {
  uni.navigateTo({
    url: "/pages/personal-info/reg/verify",
  });
};

const onShowPopup = () => {
  togglePopup();
};

const onTipConfirm = () => {
  togglePopup();
};

const onRejectDetail = () => {
  uni.navigateTo({
    url: "/pages/personal-info/reg/reject",
  });
};
</script>

<style lang="scss" scoped>
.color_blue {
  color: rgba(0, 80, 179, 1);
}
.regs_page {
  .regs_content {
    background-color: #fff;
    margin: 0 32rpx;
    padding: 40rpx 60rpx 99rpx;
    font-size: 28rpx;
    letter-spacing: 0.84rpx;
    .regs_title {
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 0px;
    }

    .tip_info {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 50rpx;
      margin: 23rpx 0 84rpx;
    }
    .goAuth {
      margin-bottom: 29rpx;
    }
  }
  .state {
    color: rgba(0, 0, 0, 0.5);
    text-align: right;
    line-height: 50rpx;
  }
  .state1 {
    color: rgba(217, 54, 62, 0.8);
  }
  .state0 {
    color: rgba(0, 80, 179, 1);
  }
}
</style>
