<template>
  <view>
    <!-- form-->
    <view class="p-3">
      <view class="mb-2 text-base">{{ $t("user.login.email") }}</view>
      <u-input
        v-model="email"
        height="80"
        :placeholder="$t('user.login.email-input-warn')"
        border
      />
      <view class="mt-5 mb-2 text-base">{{ $t("user.login.password") }}</view>
      <u-input
        v-model="password"
        height="80"
        type="password"
        :placeholder="$t('user.login.password-warn')"
        border
      />
      <view class="flex justify-between mt-2 text-sm">
        <text @click="onForgetPassword" style="color: #0050b3">{{
          $t("user.login.forgot")
        }}</text>
        <text @click="onSignUp" style="color: #0050b3">{{
          $t("user.register.register")
        }}</text>
      </view>
      <view class="mt-8">
        <ComButton
          :title="$t('user.login.login')"
          :custom-style="customStyle"
          @onTap="onLogin"
        />
      </view>
    </view>
    <!-- form-->

    <!-- popup 邀请注册-->
    <u-popup
      v-model="showRegisterPopup"
      mode="bottom"
      closeable
      border-radius="16"
    >
      <ComPopupRegister />
    </u-popup>
    <!-- popup 邀请注册-->

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

    <u-popup
      v-model="showTwoVerifyPopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
      @close="onTwoVerifyPopClose"
    >
      <ComPopupTwoVerify type="google" @confirm="onTwoVerifyConfirm" />
    </u-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { LoginForm } from "../../service/base-model/form";
import ComPopupRegister from "../../components/popup/register.vue";
import ComPopupConfirmIdentity from "../../components/popup/confirm-identity.vue";
import ComButton from "../../components/button/button.vue";
import useUserStore from "../../store/modules/user";

import { $u } from "../../vk-uview";
import { InvestorIdentityType } from "../../types/enum";
import usePageFrame from "../../mixins/page-frame";
import ComPopupTwoVerify from "../../components/popup/two-verify.vue";
import { onLoad } from "@dcloudio/uni-app";
const showTwoVerifyPopup = ref<boolean>(false);
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const { onBack, t } = usePageFrame();
const email = ref<string>();
const password = ref<string>();
const showRegisterPopup = ref<boolean>(false);
const showConfirmIdentityPopup = ref<boolean>(false);
const userStore = useUserStore();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.login.login"),
  });
});

const onTwoVerifyPopClose = () => {
  showTwoVerifyPopup.value = false;
};

const toggleTwoVerifyPopup = () => {
  showTwoVerifyPopup.value = !showTwoVerifyPopup.value;
};

const onTwoVerifyConfirm = async () => {
  toggleTwoVerifyPopup();
  $u.toast(t("global.verification.passed"));
  const userinfo = await userStore.getUserInfo();
  if (
    userinfo.type === InvestorIdentityType.RegD ||
    userinfo.type === InvestorIdentityType.RegS
  ) {
    toggleConfirmIdentityPopup();
  } else {
    uni.showToast({
      title: t("user.login.success"),
      icon: "none",
      mask: true,
      success: () => {
        uni.reLaunch({
          url: "/pages/tabbar/index/index",
        });
      },
    });
  }
};

const toggleRegisterPopup = () => {
  showRegisterPopup.value = !showRegisterPopup.value;
};

const toggleConfirmIdentityPopup = () => {
  showConfirmIdentityPopup.value = !showConfirmIdentityPopup.value;
};

const onForgetPassword = () => {
  uni.navigateTo({
    url: "/pages/password/forget",
  });
};

const onSignUp = () => {
  toggleRegisterPopup();
};

const onConfirmIdentityFinished = () => {
  toggleConfirmIdentityPopup();
  uni.reLaunch({
    url: "/pages/tabbar/index/index",
  });
};

const isValidate = () => {
  let bool = true;
  if ($u.test.isEmpty(email.value)) {
    $u.toast(t("user.login.email-input-warn"));
    bool = false;
  }
  if ($u.test.isEmpty(password.value)) {
    $u.toast(t("user.login.password-warn"));
    bool = false;
  }
  if (!$u.test.email(email.value)) {
    $u.toast(t("user.login.email-warn"));
    bool = false;
  }
  return bool;
};

const onLogin = async () => {
  const passed = isValidate();
  if (passed) {
    const loginForm = {
      email: email.value,
      password: password.value,
    } as LoginForm;
    const info = await userStore.touristLogin(loginForm);
    // 是否开启谷歌验证登录
    if (info.googleCode) {
      toggleTwoVerifyPopup();
    } else {
      const userinfo = await userStore.getUserInfo();
      if (
        userinfo.type === InvestorIdentityType.RegD ||
        userinfo.type === InvestorIdentityType.RegS
      ) {
        toggleConfirmIdentityPopup();
      } else {
        uni.showToast({
          title: t("user.login.success"),
          icon: "none",
          mask: true,
          success: () => {
            uni.reLaunch({
              url: "/pages/tabbar/index/index",
            });
          },
        });
      }
    }
  }
};
</script>
