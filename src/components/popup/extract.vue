<template>
  <view class="transferPopup_page">
    <view class="title"> {{ $t("user.wallet.extract") }}</view>
    <view class="content">
      <view class="fs"> {{ project.productName }}</view>
      <view class="flex_row_jus_betw">
        <view class="left">{{ $t("user.wallet.extract.amount") }}</view>
        <view class="right">
          <text class="f_26">{{ $t("user.wallet.extract.available") }}</text>
          ${{ project.available }}
        </view>
      </view>
      <view class="flex_row content-center">
        <text class="usa h-9">$</text>
        <view
          class="input_box h-9 flex-1 flex content-center border rounded px-2"
        >
          <u-input
            class="mr-1"
            clearable
            v-model="amount"
            :placeholder="$t('global.input')"
            type="number"
          >
          </u-input>
          <view class="py-2 code" @click="onExtractAll">{{
            $t("user.wallet.extract.all")
          }}</view>
        </view>
      </view>
    </view>
    <view class="tip"> {{ $t("user.wallet.extract.tips") }}</view>
    <view class="popup_bottom">
      <view class="confirm" @click="onConfirm">
        {{ $t("global.confirm") }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../mixins/page-frame";
import { defineProps, ref, defineEmits } from "vue";
import useWalletService from "../../service/wallet/walletService";
import type { ExtractForm } from "../../service/wallet/model/walletModel";
const walletService = useWalletService();
const { onBack, t, $u } = usePageFrame();

const props = defineProps({
  project: {
    type: Object,
    default: () => {
      return {
        // productName: "",
      }
    },
  },
});

const emit = defineEmits(["finished"]);

const amount = ref<number>();

const onExtractAll = () => {
  amount.value = props.project.available;
};

const onConfirm = async () => {
  if (amount.value! <= 0) {
    uni.showToast({
      title: t("global.input"),
      icon: "none",
      mask: true,
    });
    return;
  }
  const params = {
    amount: amount.value,
    projectWalletId: props.project.id,
  } as ExtractForm;
  await walletService.extract(params);
  emit("finished");
};
</script>

<style lang="scss" scoped>
.transferPopup_page {
  width: 650rpx;
  background-color: #fff;
  .fs {
    font-size: 32rpx;
    font-weight: 600;
    letter-spacing: 0.96rpx;
  }
  .title {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 40rpx;
    font-weight: 500;
    letter-spacing: 1.2rpx;
  }
  .content {
    height: 313rpx;
    padding: 30rpx 45rpx 0;
    .flex_row_jus_betw {
      margin: 55rpx 0 20rpx;
      font-size: 26rpx;
      .f_26 {
        font-weight: 400;
        letter-spacing: 0.42rpx;
      }
      .left {
        font-weight: 400;
        letter-spacing: 0.78rpx;
      }
    }
    .usa {
      line-height: 72rpx;
      margin-right: 20rpx;
    }
    .code {
      color: rgba(0, 80, 179, 1);
    }
  }
  .tip {
    padding: 8rpx 0;
    mix-blend-mode: normal;
    opacity: 1;
    background: rgba(79, 191, 255, 0.1);
    background-blend-mode: normal;
    line-height: 54rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    color: rgba(0, 80, 179, 1);
  }
  .popup_bottom {
    height: 132rpx;
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
