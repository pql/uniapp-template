<template>
  <view class="regs_page">
    <view class="regs_content">
      <view class="regs_title">
        {{ $t("user.reg.auth-tips-1") }}
        <text class="color_blue"> Reg S</text>
        {{ $t("user.reg.auth-tips-2") }}
      </view>
      <view class="create_time">
        {{ $t("user.reg.time") }}
        <text v-if="item">
          {{ dayjs(item.verifyTime).format("YYYY-MM-DD HH:mm") }}
        </text>
      </view>
      <view class="color_blue" @click="onShowPopup"
        >{{ $t("user.reg.not-regs") }}></view
      >
    </view>
    <u-popup
      v-model="showPopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
    >
      <ComTip reg-type="Reg S" @confirm="onTipConfirm" />
    </u-popup>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../../mixins/page-frame";
import ComTip from "./Tip.vue";
import dayjs from "dayjs";
import { ref } from "vue";

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const showPopup = ref<boolean>(false);
const { onBack, t, $u } = usePageFrame();

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const onTipConfirm = () => {
  togglePopup();
};

const onShowPopup = () => {
  togglePopup();
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
    padding: 90rpx 30rpx 99rpx;
    font-size: 28rpx;
    .regs_title {
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 0px;
    }
    .create_time {
      font-weight: 400;
      letter-spacing: 0.84rpx;
      color: rgba(0, 0, 0, 0.5);
      line-height: 50rpx;
      margin-bottom: 84rpx;
    }
  }
}
</style>
