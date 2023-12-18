<template>
  <view>
    <!-- form -->
    <view class="p-3">
      <view class="mt-3 text-green-400">{{ $t("user.forgot.tips") }}</view>
      <view class="mt-6 mb-2 text-base">{{ $t("user.login.email") }}</view>
      <u-input
        v-model="email"
        :placeholder="$t('user.login.email-input-warn')"
        :custom-style="{ height: '92rpx' }"
        border
      />
      <view class="mt-3">
        <ComButton
          :title="$t('user.forgot.reset-send')"
          :custom-style="customStyle"
          @onTap="onForgetPassword"
        />
      </view>
    </view>
    <!-- form -->
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import usePageFrame from "../../mixins/page-frame";
import useUserStore from "../../store/modules/user";
import type { ForgetPasswordForm } from "../../service/base-model/form";
import { UserOperatorType } from "../../types/enum";
import { onLoad } from "@dcloudio/uni-app";
import ComButton from "../../components/button/button.vue";

const email = ref<string>();
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const { onBack, t, $u } = usePageFrame();
const userStore = useUserStore();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.login.forgot-findƒ"),
  });
});

const isValidate = () => {
  let bool = true;
  if ($u.test.isEmpty(email.value)) {
    $u.toast(t("user.login.email-input-warn"));
    bool = false;
  }
  if (!$u.test.email(email.value)) {
    $u.toast(t("user.login.email-warn"));
    bool = false;
  }
  return bool;
};

const onForgetPassword = async () => {
  const passed = isValidate();
  if (passed) {
    const forgetForm = {
      email: email.value,
      operatorType: UserOperatorType.INVESTOR,
    } as ForgetPasswordForm;
    await userStore.forgetPassword(forgetForm);
    uni.showToast({
      title: t("global.success"),
      icon: "none",
      mask: true,
      success: () => {
        uni.navigateBack();
      },
    });
  }
};
</script>
