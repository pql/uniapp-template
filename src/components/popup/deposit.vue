<template>
  <view class="recharge_popup_page">
    <view class="px-4">
      <view class="recharge_popup_title">
        <text>{{ $t("user.wallet.deposit.title") }}</text>
      </view>
      <view class="recharge_list">
        <scroll-view scroll-y class="scroll">
          <u-skeleton
            :loading="loading"
            :animation="true"
            bgColor="#FFF"
          ></u-skeleton>
          <view
            class="u-skeleton account_bank_item"
            v-for="(item, index) in list"
            :key="index"
          >
            <view class="account_sort fa-overflow">{{ item.bankName }}</view>
            <view class="account_info flex_row">
              <view class="left">
                <view class="item_name">{{
                  $t("user.wallet.deposit.account")
                }}</view>
                <view>
                  {{ item.bankNumber }}
                  <u-image
                    @click="onCopy(item.bankNumber)"
                    src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_copy.png"
                    class="ml-1"
                    width="24"
                    height="26"
                  ></u-image>
                </view>
                <view class="item_name item_name1">{{
                  $t("user.wallet.deposit.bank-address")
                }}</view>
                <view>
                  {{ item.bankAddress }}
                  <u-image
                    @click="onCopy(item.bankAddress)"
                    src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_copy.png"
                    class="ml-1"
                    width="24"
                    height="26"
                  ></u-image>
                </view>
              </view>
              <view class="right">
                <view class="item_name">
                  {{ $t("user.wallet.deposit.swift-code") }}
                </view>
                <view>
                  {{ item.swiftCode }}
                  <u-image
                    @click="onCopy(item.swiftCode)"
                    src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_copy.png"
                    class="ml-1"
                    width="24"
                    height="26"
                  ></u-image>
                </view>
                <view class="item_name item_name1">
                  {{ $t("user.wallet.deposit.remark") }}
                </view>
                <view>
                  {{ item.remark }}
                  <u-image
                    @click="onCopy(item.remark)"
                    src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_copy.png"
                    class="ml-1"
                    width="24"
                    height="26"
                  ></u-image>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="popup_bottom p-4">
      <view class="confirm" @click="onConfirm">
        {{ $t("user.wallet.deposit.button") }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../mixins/page-frame";
import { ref, onMounted, defineEmits } from "vue";
import useWalletService from "../../service/wallet/walletService";
import type { DepositForm } from "../../service/wallet/model/walletModel";
import { isWeb, isAndroid, deviceType, isIOS } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
const walletService = useWalletService();
const { onBack, t, $u, copy } = usePageFrame();

const loading = ref<boolean>(true);
const list = ref<Array<any>>([]);
const emit = defineEmits(["finished"]);

onMounted(async () => {
  const result = await walletService.depositAccountList();
  const data = result.data;
  list.value = data;
  loading.value = false;
});

const onCopy = (data: any) => {
  copy(data);
};

const onConfirm = async () => {
  // 0-PC 1-MOBILE(H5) 2-IOS 3-ANDROID
  const params = {
    channel:
      deviceType === DeviceType.PC
        ? 0
        : deviceType === DeviceType.PHONE && isWeb
        ? 1
        : deviceType === DeviceType.PHONE && isAndroid
        ? 3
        : deviceType === DeviceType.PHONE && isIOS
        ? 2
        : 0,
  } as DepositForm;
  await walletService.deposit(params);
  uni.showToast({
    title: t("confirm.deposit.success"),
    icon: "none",
    mask: true,
  });
  emit("finished");
};
</script>

<style lang="scss" scoped>
.scroll {
  height: 628rpx;
}
.recharge_popup_page {
  background-color: #fff;
  .recharge_popup_title {
    text-align: center;
    margin-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: 600;
    letter-spacing: 1.2rpx;
    line-height: 100rpx;
    image {
      float: right;
      top: 32rpx;
    }
  }
  .recharge_list {
    height: 628rpx;
    .account_sort {
      height: 80rpx;
      background-color: rgba(0, 80, 179, 1);
      color: #fff;
      line-height: 80rpx;
      padding-left: 32rpx;
    }
    .account_info {
      background: rgba(79, 191, 255, 0.1);
      padding: 40rpx 32rpx 32rpx;
      justify-content: space-between;
      font-size: 28rpx;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 54rpx;
      column-gap: 18rpx;
      .left {
        width: 50%;
      }
      .item_name {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.5);
        line-height: 34rpx;
      }
      .item_name1 {
        margin-top: 30rpx;
      }
    }
  }
}
.popup_bottom {
  background-color: #fff;
  border-top: 1rpx solid rgba(237, 237, 237, 1);
  .confirm {
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
    background-color: rgba(0, 80, 179, 1);
  }
}
.account_bank_item {
  margin-bottom: 32rpx;
  padding-bottom: 18rpx;
}
</style>
