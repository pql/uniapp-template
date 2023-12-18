<template>
  <view class="two_verifications_page">
    <view class="pages">
      <ComHeader>{{ $t("user.menu.two-step") }}</ComHeader>
      <view class="two_verifications_content">
        <view class="flex_row tip_info">
          <view>
            <image
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/shield_icon.png"
              mode="scaleToFill"
              class="img"
            />
          </view>
          <view class="right">
            <view class="content_title">{{ $t("user.menu.two-step") }}</view>
            <view class="right_info">{{ $t("user.2fa.content") }}</view>
          </view>
        </view>
        <view class="bottom flex">
          <view class="text-sm w-16">
            {{ $t("user.2fa.status-tips.email") }}
          </view>
          <view class="ml-2">
            <u-switch
              v-model="checkedEmail"
              size="40"
              activeColor="#18A058"
              @change="onSwitchEmailChange"
            >
            </u-switch>
          </view>
          <text
            class="switch_state"
            :style="{ color: checkedEmail ? '#18A058' : 'rgba(0, 0, 0, 0.5)' }"
            >{{ $t("user.privacy.tips") }}</text
          >
        </view>
        <view class="bottom flex">
          <view class="text-sm w-16">
            {{ $t("user.2fa.status-tips.google") }}
          </view>
          <view class="ml-2">
            <u-switch
              v-model="checkedGoogle"
              size="40"
              activeColor="#18A058"
              @change="onSwitchGoogleChange"
            >
            </u-switch>
          </view>
          <text
            class="switch_state"
            :style="{ color: checkedGoogle ? '#18A058' : 'rgba(0, 0, 0, 0.5)' }"
            >{{ $t("user.privacy.tips") }}</text
          >
        </view>
        <view class="bottom flex">
          <view class="text-sm w-16">
            {{ $t("user.2fa.status-tips.phone") }}
          </view>
          <view class="ml-2">
            <u-switch
              v-model="checkedPhone"
              size="40"
              activeColor="#18A058"
              @change="onSwitchPhoneChange"
            >
            </u-switch>
          </view>
          <text
            class="switch_state"
            :style="{ color: checkedPhone ? '#18A058' : 'rgba(0, 0, 0, 0.5)' }"
            >{{ $t("user.privacy.tips") }}</text
          >
        </view>
      </view>
      <u-popup
        v-model="showTwoVerifyPopup"
        mode="center"
        closeable
        border-radius="16"
        width="90%"
        @close="onTwoVerifyPopClose"
      >
        <ComPopupTwoVerify
          :type="targetAuthType"
          @confirm="onTwoVerifyConfirm"
        />
      </u-popup>
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
import ComHeader from "../../../components/layout/header/header.vue";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType, MultiAuthType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { ref } from "vue";
import useUserStore from "../../../store/modules/user";
import ComPopupTwoVerify from "../../../components/popup/two-verify.vue";
import type { MultAuthPutForm } from "../../../service/user/model/userModel";
import { onShow } from "@dcloudio/uni-app";
const { onBack, t, $u } = usePageFrame();

const checkedEmail = ref<boolean>(false);
const checkedGoogle = ref<boolean>(false);
const checkedPhone = ref<boolean>(false);
const status = ref<number>();
const showTwoVerifyPopup = ref<boolean>(false);
const userStore = useUserStore();
const targetAuthType = ref<MultiAuthType>(MultiAuthType.EMAIL);

onShow(async () => {
  await userStore.getUserInfo();
  if (userStore.twoFaStatus === 1) {
    checkedEmail.value = true;
  } else {
    checkedEmail.value = false;
  }
  if (userStore.twoFaGoogleStatus === 1) {
    checkedGoogle.value = true;
  } else {
    checkedGoogle.value = false;
  }
  if (userStore.twoFaPhoneStatus === 1) {
    checkedPhone.value = true;
  } else {
    checkedPhone.value = false;
  }
});

const toggleTwoVerifyPopup = () => {
  showTwoVerifyPopup.value = !showTwoVerifyPopup.value;
};

const onTwoVerifyConfirm = async () => {
  const params = {
    status: status.value,
    type: targetAuthType.value,
  } as MultAuthPutForm;
  await userStore.multiAuthPut(params);
  await userStore.getUserInfo();
  userStore.twoFaStatus === 1
    ? (checkedEmail.value = true)
    : (checkedEmail.value = false);
  userStore.twoFaGoogleStatus === 1
    ? (checkedGoogle.value = true)
    : (checkedGoogle.value = false);
  userStore.twoFaPhoneStatus === 1
    ? (checkedPhone.value = true)
    : (checkedPhone.value = false);
  toggleTwoVerifyPopup();
};

const onSwitchEmailChange = async (value: boolean) => {
  targetAuthType.value = MultiAuthType.EMAIL;
  value ? (status.value = 1) : (status.value = 0);
  if (!value) {
    toggleTwoVerifyPopup();
  } else {
    const params = {
      status: status.value,
      type: MultiAuthType.EMAIL,
    } as MultAuthPutForm;
    await userStore.multiAuthPut(params);
    await userStore.getUserInfo();
    userStore.twoFaStatus === 1
      ? (checkedEmail.value = true)
      : (checkedEmail.value = false);
  }
};

const onSwitchGoogleChange = async (value: boolean) => {
  targetAuthType.value = MultiAuthType.GOOGLE;
  value ? (status.value = 1) : (status.value = 0);
  if (!value) {
    toggleTwoVerifyPopup();
  } else {
    const params = {
      status: status.value,
      type: MultiAuthType.GOOGLE,
    } as MultAuthPutForm;
    await userStore.multiAuthPut(params);
    await userStore.getUserInfo();
    userStore.twoFaGoogleStatus === 1
      ? (checkedGoogle.value = true)
      : (checkedGoogle.value = false);
  }
};

const onSwitchPhoneChange = async (value: boolean) => {
  targetAuthType.value = MultiAuthType.PHONE;
  value ? (status.value = 1) : (status.value = 0);
  if (!value) {
    toggleTwoVerifyPopup();
  } else {
    const params = {
      status: status.value,
      type: MultiAuthType.PHONE,
    } as MultAuthPutForm;
    await userStore.multiAuthPut(params);
    await userStore.getUserInfo();
    userStore.twoFaPhoneStatus === 1
      ? (checkedPhone.value = true)
      : (checkedPhone.value = false);
  }
};

const onTwoVerifyPopClose = () => {
  if (targetAuthType.value === MultiAuthType.EMAIL) {
    userStore.twoFaStatus === 1
      ? (checkedEmail.value = true)
      : (checkedEmail.value = false);
  } else if (targetAuthType.value === MultiAuthType.GOOGLE) {
    userStore.twoFaGoogleStatus === 1
      ? (checkedGoogle.value = true)
      : (checkedGoogle.value = false);
  } else if (targetAuthType.value === MultiAuthType.PHONE) {
    userStore.twoFaPhoneStatus === 1
      ? (checkedPhone.value = true)
      : (checkedPhone.value = false);
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
  color: black;
}
.two_verifications_content {
  box-sizing: border-box;
  margin: 0 32rpx;
  padding: 60rpx 30rpx;
  margin-top: calc(147rpx + var(--status-bar-height));
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  background-blend-mode: normal;
  .tip_info {
    //column-gap: 28rpx;
    .right {
      margin-top: 20rpx;
      .right_info {
        margin-top: 30rpx;
        font-size: 28rpx;
        letter-spacing: 0.84px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .bottom {
    margin-top: 50rpx;
    line-height: 60rpx;
    font-size: 28rpx;
    .switch_state {
      margin-left: 28rpx;
    }
  }
  .img {
    margin-right: 28rpx;
    width: 64rpx;
    height: 80rpx;
  }
  .content_title {
    font-size: 32rpx;
    font-weight: 500;
  }
}
.popup_content {
  width: 650rpx;
  padding: 45rpx 45rpx;
  .popup_content_title {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 40rpx;
    font-weight: 600;
    letter-spacing: 1.2rpx;
    image {
      float: right;
      top: 32rpx;
    }
  }
  .form_tip_info {
    color: rgba(0, 0, 0, 0.5);
    font-size: 28rpx;
    font-weight: 400;
    font-family: PingFangSC;
  }
}
.popup_bottom {
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
.code {
  color: rgba(0, 80, 179, 1);
}
</style>
