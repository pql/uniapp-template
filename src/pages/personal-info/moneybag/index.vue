<template>
  <view class="moneybag_page">
    <u-skeleton
      :loading="loading"
      :animation="true"
      bgColor="#FFF"
    ></u-skeleton>
    <view class="pages u-skeleton">
      <view class="content">
        <view class="root_wallet">
          <view class="title font_title">{{ $t("user.wallet.root") }}</view>
          <view class="info">
            <view class="moneybag_main_info">
              <view>{{ $t("user.wallet.all") }}</view>
              <view class="total_amount">{{
                tools.formatNum(getWalletInfo.total)
              }}</view>
            </view>
          </view>
          <view class="able_frozen flex_row">
            <view class="left">
              <view>{{ $t("user.wallet.available") }}</view>
              <view>${{ tools.formatNum(getWalletInfo.root.available) }}</view>
            </view>
            <view class="right">
              <view>{{ $t("user.wallet.frozen") }}</view>
              <view>${{ tools.formatNum(getWalletInfo.root.frozen) }}</view>
            </view>
          </view>
          <view class="recharge-btn flex_row">
            <view class="recharge" @click="onDeposit">
              {{ $t("user.wallet.deposit") }}
            </view>
            <view class="ti_xian" @click="onWithdrawal">
              {{ $t("user.wallet.withdrawal") }}
            </view>
          </view>
        </view>
        <!-- 项目子钱包 -->
        <view class="sub_wallet" v-if="getWalletInfo.projects.length">
          <swiper
            :autoplay="false"
            class="swiper"
            next-margin="50rpx"
            :indicator-dots="false"
          >
            <swiper-item
              v-for="(item, index) in getWalletInfo.projects"
              :key="index"
            >
              <view class="swiper_item">
                <view class="title font_title">
                  {{ $t("user.wallet.child") }}
                </view>
                <view class="flex_row">
                  <image
                    class="swiper_item_img"
                    src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/text_icon.png"
                    mode="scaleToFill"
                  />
                  <view class="info">
                    <view class="moneybag_name font-title">
                      {{ item.productName }}
                    </view>
                    <text class="available font_size"
                      >${{ tools.formatNum(item.available) }}</text
                    >
                  </view>
                </view>
                <view class="bottom flex_row">
                  <view class="grid_0">
                    <view class="font_size">{{
                      $t("user.wallet.invested")
                    }}</view>
                    <view class="price1">{{ item.invested }}</view>
                    <view class="font_size">{{
                      $t("user.wallet.issued-to-broker")
                    }}</view>
                    <view class="price2">${{ item.issuedToBroker }}</view>
                  </view>
                  <view class="grid_1">
                    <view class="font_size">{{
                      $t("user.wallet.issued-to-fundraiser")
                    }}</view>
                    <view class="price1">${{ item.issuedToFundraiser }}</view>
                    <view class="font_size">{{
                      $t("user.wallet.issued-to-lawyer")
                    }}</view>
                    <view class="price2">${{ item.issuedToLawyer }}</view>
                  </view>
                </view>
                <view class="showPopup_btn" @click="onExtract(item)">{{
                  $t("user.wallet.extract")
                }}</view>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <!-- 项目子钱包 -->
        <ComRecordList ref="recordListRef" />
      </view>

      <!-- popup deposit-->
      <u-popup
        v-model="showDepositPopup"
        mode="center"
        closeable
        border-radius="16"
        width="90%"
      >
        <ComPopupDeposit @finished="toggleDepositPopup" />
      </u-popup>
      <!-- popup deposit-->
      <!-- popup extract-->
      <u-popup
        v-model="showExtractPopup"
        mode="center"
        closeable
        border-radius="16"
        width="90%"
      >
        <ComPopupExtract :project="project" @finished="onExtractFinished" />
      </u-popup>
      <!-- popup extract-->
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, computed } from "vue";
import ComPopupDeposit from "../../../components/popup/deposit.vue";
import ComPopupExtract from "../../../components/popup/extract.vue";
import ComFooter from "../../../components/layout/footer/footer.vue";
import ComRecordList from "./components/record-list.vue";
import usePageFrame from "../../../mixins/page-frame";
import useUserStore from "../../../store/modules/user";
import useTools from "../../../mixins/tools";
import { deviceType } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";
const userStore = useUserStore();
const { onBack, t, $u } = usePageFrame();
const tools = useTools();

const loading = ref<boolean>(true);
const walletData = ref<Array<any>>([]);
const showDepositPopup = ref<boolean>(false);
const showExtractPopup = ref<boolean>(false);
const project = ref<any>();
const recordListRef = ref();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.wallet"),
  });
});

onShow(async () => {
  walletData.value = await userStore.walletInfo();
  loading.value = false;
});

const getWalletInfo = computed(() => {
  const root =
    walletData.value.find((item) => item.walletType === "ROOT") || {};
  const total = walletData.value.reduce((prev, current) => {
    return prev + current.available + current.frozen;
  }, 0);
  const projects =
    walletData.value.filter((item) => item.walletType === "PROJECT") || [];
  return {
    root, //根钱包
    total, //全部余额
    projects, //子钱包
  };
});

const toggleDepositPopup = () => {
  showDepositPopup.value = !showDepositPopup.value;
};

const toggleExtractPopup = () => {
  showExtractPopup.value = !showExtractPopup.value;
};

const onDeposit = () => {
  toggleDepositPopup();
};

const onWithdrawal = () => {
  uni.navigateTo({
    url: "/pages/personal-info/moneybag/withdraw",
  });
};

const onExtract = (project: any) => {
  project.value = project;
  toggleExtractPopup();
};

const onExtractFinished = async () => {
  toggleExtractPopup();
  walletData.value = await userStore.walletInfo();
  recordListRef.value.onQuery();
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.font_size {
  font-size: 24rpx;
  color: rgba(0, 0, 0, 0.5);
}
.font_title {
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 32rpx;
  color: rgba(0, 0, 0, 0.9);
}
.moneybag_page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.9);
  .content {
    padding: 0 32rpx;
  }
  .root_wallet {
    width: 686rpx;
    height: 572rpx;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    background-blend-mode: normal;
    border: 1px solid rgba(0, 0, 0, 0.07);
    margin-bottom: 20rpx;
    .title {
      padding: 32rpx 0 0 32rpx;
    }
    .info {
      padding: 0 32rpx;
    }
    .moneybag_main_info {
      width: 100%;
      height: 220rpx;
      text-align: center;
      border-bottom: 1rpx solid rgba(235, 235, 235, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      :nth-of-type(1) {
        opacity: 1;
        font-size: 24rpx;
        font-weight: 400;
        letter-spacing: 0.72rpx;
        line-height: 24rpx;
      }
      .total_amount {
        opacity: 1;
        font-size: 72rpx;
        font-weight: 500;
        letter-spacing: 2.16rpx;
        line-height: 120rpx;
        color: rgba(0, 80, 179, 1);
      }
    }
    .able_frozen {
      height: 158rpx;
      border-bottom: 1rpx solid rgba(235, 235, 235, 1);
      justify-content: center;
      align-items: center;
      .left,
      .right {
        flex: 1;
        text-align: center;
        :nth-of-type(1) {
          color: rgba(0, 0, 0, 0.5);
          font-size: 26rpx;
          letter-spacing: 0.42rpx;
          line-height: 70rpx;
        }
        :nth-of-type(2) {
          font-size: 28rpx;
          font-weight: 500;
        }
      }
    }
    .recharge-btn {
      height: 120rpx;
      padding: 0 32rpx;
      align-items: center;
      justify-content: flex-end;
      view {
        width: 170rpx;
        height: 68rpx;
        line-height: 68rpx;
        text-align: center;
      }
      .recharge {
        margin-right: 18rpx;
        background-color: rgba(0, 80, 179, 1);
        color: #fff;
      }
      .ti_xian {
        border: 1rpx solid rgba(235, 235, 235, 1);
      }
    }
  }
}
.swiper {
  height: 690rpx !important;
}

.sub_wallet {
  margin-bottom: 20rpx;
  .swiper_item {
    width: 615rpx !important;
    height: 690rpx !important;
    mix-blend-mode: normal;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    background-blend-mode: normal;
    padding: 40rpx 32rpx 0;
    .title {
      margin-bottom: 36rpx;
    }
    .swiper_item_img {
      width: 128rpx;
      height: 128rpx;
      margin-right: 32rpx;
    }
    .info {
      margin-top: 20rpx;
      .moneybag_name {
        font-size: 32rpx;
        line-height: 26rpx;
        margin-bottom: 27rpx;
      }
      .available {
        margin-right: 12rpx;
      }
      .total_amount {
        font-size: 40rpx;
        letter-spacing: 0px;
        line-height: 40rpx;
      }
    }
    .bottom {
      margin-top: 50rpx;
      border-top: 1rpx solid rgba(0, 0, 0, 0.07);
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.07);
      // border-top: 1rpx solid red;
      height: 295rpx;
      justify-content: space-around;
      align-items: center;
      .price1 {
        font-size: 28rpx;
        margin: 22rpx 0 40rpx;
      }
      .price2 {
        font-size: 28rpx;
        margin-top: 22rpx;
      }
    }
    .showPopup_btn {
      float: right;
      margin-top: 32rpx;
      width: 168rpx;
      height: 68rpx;
      border: 1rpx solid rgba(224, 224, 230, 1);
      text-align: center;
      line-height: 68rpx;
    }
  }
}
</style>
