<template>
  <view>
    <view class="content">
      <view class="top">
        <!-- #ifdef H5 -->
        <image
          @click="onBack"
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/nav_icon_back.png"
          class="nav_icon_back"
        >
        </image>
        <!-- #endif -->
        <!-- userinfo -->
        <view class="user-info flex p-3">
          <u-avatar
            :src="userStore.signAvatar"
            mode="circle"
            size="120"
          ></u-avatar>

          <!-- #ifdef MP-WEIXIN -->
          <view class="relative ml-2" v-if="!userStore.token">
            <view>
              <text class="font-bold font-44" style="color: #26364e">{{
                $t("user.login.at-once")
              }}</text>
            </view>
            <view class="mt-1">
              <text
                class="font-24 leading-4"
                style="color: rgba(38, 54, 78, 0.5)"
                >{{ $t("user.login.logined-can-use-more-func") }}</text
              >
            </view>
            <u-button
              :custom-style="customStyle"
              open-type="getPhoneNumber"
              @getphonenumber="onGetPhoneNumber"
              >{{ $t("user.login.login") }}</u-button
            >
          </view>
          <!-- #endif -->
          <!-- #ifdef APP || H5 -->
          <view class="pl-2" v-if="userStore.token">
            <text class="user-name">
              {{ userStore.firstName }}
              {{ userStore.middleName }}
              {{ userStore.lastName }}
            </text>
            <view class="email_text">
              {{ tools.cryptoEmail(userStore.email) }}
            </view>
          </view>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="pl-2" v-if="userStore.token">
            <view>
              <text class="font-bold font-44" style="color: #26364e"
                >{{ $t("user.mine.hello") }},{{
                  tools.phoneDesensitize(userStore.phone)
                }}</text
              >
            </view>
            <view class="mt-1">
              <text
                class="font-24 leading-4"
                style="color: rgba(38, 54, 78, 0.5)"
                >{{ $t("user.mine.btm-tips") }}</text
              >
            </view>
          </view>
          <!-- #endif -->
        </view>
        <!-- userinfo -->

        <!-- menu -->
        <view
          class="pl-3 pr-3 pt-2 pb-10 gap-4 flex items-center justify-between"
        >
          <view
            class="p-2 flex rounded"
            style="background: #f4f7ff"
            @click="onGoMyAppointment"
          >
            <view class="flex items-center justify-center menu-icon-wrapper">
              <u-image
                width="32"
                height="32"
                src="../../../static/images/mine/menu-appointment.png"
              ></u-image>
            </view>
            <view class="pl-3">
              <view>
                <text class="font-32 font-bold" style="color: #26364e">{{
                  $t("user.mine.appointment")
                }}</text>
              </view>
              <view class="mt-0.5">
                <text class="font-22" style="color: rgba(38, 54, 78, 0.5)">{{
                  $t("user.mine.appointment.desc")
                }}</text>
              </view>
            </view>
          </view>
          <view
            class="p-2 flex rounded"
            style="background: #f4f7ff"
            @click="onGoMyEvaluate"
          >
            <view class="flex items-center justify-center menu-icon-wrapper">
              <u-image
                width="32"
                height="32"
                src="../../../static/images/mine/menu-evaluate.png"
              ></u-image>
            </view>
            <view class="pl-3">
              <view>
                <text class="font-32 font-bold" style="color: #26364e">{{
                  $t("user.mine.evaluate")
                }}</text>
              </view>
              <view class="mt-0.5">
                <text class="font-22" style="color: rgba(38, 54, 78, 0.5)">{{
                  $t("user.mine.evaluate.desc")
                }}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- menu -->
      </view>
      <!-- u-cell-group -->
      <u-cell-group>
        <u-cell-item
          v-for="(item, index) in menuList"
          :index="index"
          :key="index"
          @click="onSelectMenu"
          :value="
            item.rightTitle != undefined
              ? item.rightTitle +
                (item.rightTip != undefined ? ': ' + item.rightTip : '')
              : item.regSorD
              ? getMenuRegSDRightTip()
              : ''
          "
        >
          <template v-slot:icon>
            <u-image
              width="40rpx"
              height="40rpx"
              :src="item.icon"
              class="relative -top-0.5"
              :class="{ active: currentIndex === index }"
            ></u-image>
          </template>
          <template v-slot:title>
            <view
              class="ml-3 font-30 font-bold"
              :class="{ active: currentIndex === index }"
              >{{ item.title }}</view
            >
          </template>
        </u-cell-item>
        <!-- #ifdef H5 -->
        <u-gap height="100"></u-gap>
        <!-- #endif -->
      </u-cell-group>
      <!-- u-cell-group -->
    </view>
    <!-- popup 确认身份 -->
    <u-popup
      v-model="showConfirmIdentityPopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
    >
      <ComPopupConfirmIdentity
        @chooseRegSDIdentityFinish="onConfirmIdentityFinished"
      />
    </u-popup>
    <!-- popup 确认身份 -->
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from "@dcloudio/uni-app";
import useUserStore from "../../../store/modules/user";
import useTools from "../../../mixins/tools";
import usePageFrame from "../../../mixins/page-frame";
import { computed, ref } from "vue";
import { InvestorIdentityType, RegDVerifyStatus } from "../../../types/enum";
import type { WXLoginForm } from "../../../service/user/model/userModel";
import ComPopupConfirmIdentity from "../../../components/popup/confirm-identity.vue";

const userStore = useUserStore();
const tools = useTools();
const { onBack, t, $u } = usePageFrame();

const currentIndex = ref<number>(-1);
const identityData = ref<any>();
const showConfirmIdentityPopup = ref<boolean>(false);
const walletData = ref<Array<any>>([]);
const customStyle = ref({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0,
});

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.mine.personal-center"),
  });
});
onShow(async () => {
  try {
    userStore.getUserInfo();
    identityData.value = await userStore.identity();
    walletData.value = await userStore.walletInfo();
  } catch (error) {
    console.log(error);
  }
});
const onGetPhoneNumber = async (e: any) => {
  const detail = e.detail;
  const phoneCode = detail.code;
  const loginResult: any = await uni.login({
    provider: "weixin",
  });
  const loginCode = loginResult && loginResult.code;
  const result = await userStore.wxlogin({
    phoneCode,
    loginCode,
  } as WXLoginForm);
  userStore.setToken(result && result.token);
  $u.toast(t("user.login.success"));
  try {
    userStore.getUserInfo();
    identityData.value = await userStore.identity();
    walletData.value = await userStore.walletInfo();
    if (identityData.value.type === InvestorIdentityType.UNSELECTED) {
      toggleConfirmIdentityPopup();
    }
  } catch (error) {
    console.log(error);
  }
};
const toggleConfirmIdentityPopup = () => {
  showConfirmIdentityPopup.value = !showConfirmIdentityPopup.value;
};

const onConfirmIdentityFinished = () => {
  toggleConfirmIdentityPopup();
  uni.reLaunch({
    url: "/pages/tabbar/personal-info/index",
  });
};

const getMenuRegSDRightTip = () => {
  if (
    identityData.value &&
    identityData.value.type === InvestorIdentityType.RegS
  ) {
    return "Reg S";
  } else if (
    identityData.value &&
    identityData.value.type === InvestorIdentityType.RegD
  ) {
    if (
      identityData.value.regDVerifyStatus === RegDVerifyStatus.CHECKPENGDING
    ) {
      return t("user.menu.regd.check-pending");
    } else if (
      identityData.value.regDVerifyStatus === RegDVerifyStatus.REJECTED
    ) {
      return t("user.menu.regd.rejected");
    } else if (
      identityData.value.regDVerifyStatus === RegDVerifyStatus.PASSED
    ) {
      return t("user.menu.regd.passed");
    } else if (
      identityData.value.regDVerifyStatus === RegDVerifyStatus.TOBESBUMITTED
    ) {
      return t("user.menu.regd.to-be-submitted");
    }
  } else if (
    identityData.value &&
    identityData.value.type === InvestorIdentityType.UNSELECTED
  ) {
    return "";
  }
};
const onSelectMenu = (index: number) => {
  currentIndex.value = index;
  const menu = menuList.value[index];
  uni.navigateTo({
    url: menu.pagePath,
    fail: () => {
      uni.switchTab({
        url: menu.pagePath,
      });
    },
  });
};
const getWalletInfo = computed(() => {
  const root =
    walletData.value.find((item) => item.walletType === "ROOT") || {};
  const total = walletData.value.reduce((prev, current) => {
    return prev + current.available;
  }, 0);
  const projects =
    walletData.value.filter((item) => item.walletType === "PROJECT") || [];
  return {
    root, //根钱包
    total, //全部余额
    projects, //子钱包
  };
});
const menuList = computed(() => {
  return [
    {
      pagePath: "/pages/personal-info/collection/collection",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_11.png",
      title: t("user.menu.collection"),
    },
    // #ifdef H5
    {
      pagePath: "/pages/tabbar/order/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_12.png",
      title: t("user.menu.order.ma"),
    },
    // #endif
    {
      pagePath: "/pages/personal-info/lawyer/lawyer",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_1.png",
      title: t("user.menu.lawyer"),
    },
    {
      pagePath: "/pages/personal-info/broker/broker",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_2.png",
      title: t("user.menu.agent"),
    },
    {
      pagePath: "/pages/personal-info/moneybag/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_3.png",
      title: t("user.menu.wallet"),
      showRight: true,
      rightTitle: t("user.menu.wallet.root-available-balance"),
      rightTip: "$ " + tools.formatNum(getWalletInfo.value.total),
    },
    {
      pagePath: "/pages/personal-info/userinfo/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_4.png",
      title: t("user.menu.profile"),
    },
    {
      pagePath: "/pages/personal-info/privacy/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_5.png",
      title: t("user.menu.privacy"),
      rightTitle: t("common.current-status"),
      rightTip:
        userStore.privacyStatus === 0
          ? t("global.closed")
          : userStore.privacyStatus === 1
          ? t("global.opened")
          : "",
    },
    {
      pagePath: "/pages/personal-info/reg/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_6.png",
      title: t("user.menu.reg-sd"),
      regSorD: true,
    },
    {
      pagePath: "/pages/personal-info/account-safe/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_7.png",
      title: t("user.menu.mine"),
      rightTitle: userStore.email ? "" : t("global.email.unbind"),
    },
    {
      pagePath: "/pages/personal-info/two-verifications/two-verifications",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_8.png",
      title: t("user.menu.two-step"),
      rightTitle: t("common.current-status"),
      rightTip:
        userStore.twoFaStatus === 0
          ? t("global.closed")
          : userStore.twoFaStatus === 1
          ? t("global.opened")
          : "",
    },
    {
      pagePath: "/pages/personal-info/signature/signature",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_9.png",
      title: t("user.menu.stamp"),
    },
    {
      pagePath: "/pages/setting/index",
      icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/my_10.png",
      title: t("user.menu.setting"),
    },
  ];
});

const onGoMyAppointment = () => {
  uni.navigateTo({
    url: "/pages/personal-info/appointment/index",
  });
};

const onGoMyEvaluate = () => {
  uni.navigateTo({
    url: "/pages/personal-info/evaluate/test",
  });
};
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  .top {
    padding-top: var(--status-bar-height);
    .nav_icon_back {
      width: 14rpx;
      height: 28rpx;
      padding: 32rpx;
    }
    .user-info {
      align-items: center;
      /* # ifndef H5 */
      padding-top: 100rpx;
      /* # endif */
      .user-avatar {
        display: inline-block;
        width: 90rpx;
        height: 90rpx;
        border-radius: 90rpx;
        margin-left: 20rpx;
        margin-right: 24rpx;
        vertical-align: middle;
      }
      .user-name {
        padding-top: 16rpx;
        line-height: 47rpx;
        color: rgba(0, 0, 0, 0.9);
        font-size: 40rpx;
      }
      .email_text {
        font-size: 24rpx;
        font-weight: 400;
        letter-spacing: 0.48rpx;
        line-height: 45rpx;
        color: rgba(52, 119, 201, 1);
      }
    }
  }
  .menu-icon-wrapper {
    width: 60rpx;
    height: 60rpx;
    background: #36539f;
    border-radius: 50%;
  }
  .active {
    opacity: 0.5;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
