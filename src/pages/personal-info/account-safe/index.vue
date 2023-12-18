<template>
  <view class="account_safe_page">
    <!-- <ComHeader>{{ $t("user.menu.mine") }}</ComHeader> -->
    <view class="content pages">
      <view class="set_padding">
        <view class="fs">
          <text>{{ $t("user.safe.welcome") }}</text
          >{{ tools.cryptoEmail(userStore.email) }}
        </view>
        <view class="uid">UID:{{ userStore.investorNo }}</view>
      </view>
      <view
        @click="onSetInfo"
        :class="[userStore.bindEmail ? 'bind-box' : 'unbind-box', 'box_height']"
      >
        <view>
          <image
            class="left_arrow_icon"
            mode="scaleToFill"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/email_icon.png"
          />
          {{ $t("user.safe.email") }}
        </view>
        <view>
          <text @click="onBinding('email', 'unbind')" v-if="userStore.email">
            {{ tools.cryptoEmail(userStore.email) }}
          </text>
          <text @click="onBinding('email', 'bind')" v-else>
            {{ $t("user.safe.not-bind") }}
          </text>
          <image
            class="right_arrow_icon"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/right_arrow_icon.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view @click="onSetInfo" class="box_height bind-box">
        <view>
          <image
            class="left_arrow_icon"
            mode="scaleToFill"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/google_icon.png"
          />
          {{ $t("user.safe.google") }}
        </view>
        <view>
          <text
            @click="onBinding('google', 'unbind')"
            v-if="userStore.bindGoogle === 1"
          >
            {{ $t("user.safe.binded") }}
          </text>
          <text @click="onBinding('google', 'bind')" v-else>
            {{ $t("user.safe.not-bind") }}
          </text>
          <image
            class="right_arrow_icon"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/right_arrow_icon.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view @click="onSetInfo" class="box_height bind-box">
        <view>
          <image
            class="left_arrow_icon"
            mode="scaleToFill"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/phones_icon.png"
          />
          {{ $t("user.safe.phone") }}
        </view>
        <view>
          <text
            @click="onBinding('phone', 'unbind')"
            v-if="userStore.bindPhone === 1"
          >
            {{ $t("user.safe.binded") }}
          </text>
          <text @click="onBinding('phone', 'bind')" v-else>
            {{ $t("user.safe.not-bind") }}
          </text>
          <image
            class="right_arrow_icon"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/right_arrow_icon.png"
            mode="scaleToFill"
          />
        </view>
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
import ComHeader from "../../../components/layout/header/header.vue";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { onLoad, onShow } from "@dcloudio/uni-app";
import useUserStore from "../../../store/modules/user";
import useTools from "../../../mixins/tools";
const { onBack, t, $u } = usePageFrame();
const userStore = useUserStore();
const tools = useTools();
onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.mine"),
  });
});

onShow(async () => {
  userStore.getUserInfo();
});

const onSetInfo = () => {};

const onBinding = (style: string, type: string) => {
  // style  google 谷歌    phone  手机号    email   邮箱
  if (userStore.registerType !== 1) {
    if (style === "email") {
      uni.navigateTo({
        url: "/pages/personal-info/account-safe/bind-email?type=" + type,
      });
    }
    if (style === "google") {
      uni.navigateTo({
        url: "/pages/personal-info/account-safe/bind-google?type=" + type,
      });
    }
    if (style === "phone") {
      uni.navigateTo({
        url: "/pages/personal-info/account-safe/bind-phone?type=" + type,
      });
    }
  }
  if (style === "google") {
    uni.navigateTo({
      url: "/pages/personal-info/account-safe/bind-google?type=" + type,
    });
  }
  if (style === "phone") {
    uni.navigateTo({
      url: "/pages/personal-info/account-safe/bind-phone?type=" + type,
    });
  }
};
</script>

<style lang="scss" scoped>
.set_padding {
  margin: 32rpx 45rpx 0 64rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  .fs {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0.96rpx;
  }
  .uid {
    line-height: 40rpx;
    font-size: 24rpx;
    font-weight: 400;
    letter-spacing: 0.72rpx;
  }
}
.box_height {
  height: 100rpx;
  margin: 20rpx 32rpx 0;

  font-size: 30rpx;
  // line-height: 100rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bind-box {
  background-color: #fff;
}
.unbind-box {
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
  background-blend-mode: normal;
}
.left_arrow_icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 28rpx;
  // vertical-align: middle;
}
.right_arrow_icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 10rpx;
  vertical-align: middle;
}
</style>
