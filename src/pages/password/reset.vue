<template>
  <view>
    <!-- form-->
    <view class="p-3">
      <view class="mb-2 text-base">{{ $t("user.login.password") }}</view>
      <u-input
        v-model="password"
        type="password"
        :placeholder="$t('user.login.password-warn')"
        :custom-style="{ height: '92rpx' }"
        border
      />
      <view class="mt-5 mb-2 text-base">{{
        $t("user.reset.confirm-password")
      }}</view>
      <u-input
        v-model="repassword"
        type="password"
        :placeholder="$t('user.reset.confirm-password')"
        :custom-style="{ height: '92rpx' }"
        border
      />
      <view class="mt-8">
        <ComButton
          :title="$t('user.reset.confirm')"
          :custom-style="customStyle"
          @onTap="onResetPassword"
        />
        <view class="mt-8 text-green-400">{{ $t("user.forgot.tips") }}</view>
      </view>
    </view>
    <!-- form-->
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import ComButton from "../../components/button/button.vue";
import usePageFrame from "../../mixins/page-frame";
import useUserStore from "../../store/modules/user";
import type { ResetPasswordForm } from "../../service/base-model/form";

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const password = ref<string>();
const repassword = ref<string>();
const code = ref<string>();
const { onBack, t, $u } = usePageFrame();
const userStore = useUserStore();

onLoad((option: any) => {
  code.value = option.code;

  uni.setNavigationBarTitle({
    title: t("user.reset.title"),
  });
});

const isValidate = () => {
  let bool = true;
  if ($u.test.isEmpty(password.value)) {
    $u.toast(t("user.login.password-warn"));
    bool = false;
  }
  if ($u.test.isEmpty(repassword.value)) {
    $u.toast(t("user.reset.confirm-password"));
    bool = false;
  }
  if (password.value !== repassword.value) {
    $u.toast(t("user.mine.password.repeat-warning"));
    bool = false;
  }
  return bool;
};

const onResetPassword = async () => {
  const passed = isValidate();
  if (passed) {
    const resetForm = {
      code: code.value,
      password: password.value,
    } as ResetPasswordForm;
    await userStore.resetPassword(resetForm);
    uni.showToast({
      title: t("global.success"),
      icon: "none",
      mask: true,
      success: () => {
        uni.reLaunch({
          url: "/pages/login/index",
        });
      },
    });
  }
};
</script>
