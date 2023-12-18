<template>
  <view class="set_psw">
    <view class="pages">
      <view class="from_area p-3">
        <view class="title">{{ $t("user.mine.password") }}</view>
        <u-form
          :model="form"
          label-position="top"
          label-width="100%"
          ref="formRef"
        >
          <!-- oldpassword -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.password.old')"
            prop="oldPassword"
          >
            <u-input
              type="password"
              v-model="form.oldPassword"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- oldpassword -->
          <!-- newpassword -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.password.new')"
            prop="newPassword"
          >
            <u-input
              type="password"
              v-model="form.newPassword"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- newpassword -->
          <!-- confirm password -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.password.repeat')"
            prop="confirmPassword"
          >
            <u-input
              type="password"
              v-model="form.confirmPassword"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- confirm password -->
        </u-form>
      </view>
      <view class="bottom_area">
        <ComButton
          :title="$t('global.confirm')"
          :custom-style="customStyle"
          @onTap="onSubmit"
        />
      </view>
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
      <u-popup
        v-model="showTwoVerifyPopup"
        mode="center"
        closeable
        border-radius="16"
      >
        <ComPopupTwoVerify
          :type="targetAuthType"
          @confirm="onTwoVerifyConfirm"
        />
      </u-popup>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import ComPopupTwoVerify from "../../../components/popup/two-verify.vue";
import ComButton from "../../../components/button/button.vue";
import usePageFrame from "../../../mixins/page-frame";
import useUserStore from "../../../store/modules/user";
import { deviceType } from "../../../utils/platform";
import { DeviceType, MultiAuthType } from "../../../types/enum";
import type { ModifyPasswordForm } from "../../../service/user/model/userModel";
const { onBack, t, $u } = usePageFrame();

const defaultForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const targetAuthType = ref<MultiAuthType>(MultiAuthType.EMAIL);
const form = ref<any>(defaultForm);
const formRef = ref<any>(null);
const showTwoVerifyPopup = ref<boolean>(false);
const userStore = useUserStore();
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

const rules = {
  oldPassword: {
    required: true,
    min: 8,
    max: 16,
    message: t("global.input"),
    trigger: ["change", "blur"],
  },
  newPassword: {
    //  pattern: /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/g,
    pattern:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,./]).{6,16}$/g,
    transform(value: string) {
      return String(value);
    },
    required: true,
    message: t("user.mine.password.new-warning"),
    trigger: ["change", "blur"],
  },
  confirmPassword: {
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      return form.value.newPassword === form.value.confirmPassword;
    },
    message: t("user.mine.password.repeat-warning"),
    trigger: ["change", "blur"],
  },
};

onReady(() => {
  formRef.value.setRules(rules);
});

onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("user.mine.password"),
  });
});

const toggleTwoVerifyPopup = () => {
  showTwoVerifyPopup.value = !showTwoVerifyPopup.value;
};

const onSubmit = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    if (userStore.twoFaStatus === 1) {
      toggleTwoVerifyPopup();
      return;
    }
    onConfirmChangePasswordSubmit();
  }
};

const onConfirmChangePasswordSubmit = async () => {
  const params = {
    oldPassword: form.value.oldPassword,
    newPassword: form.value.newPassword,
  } as ModifyPasswordForm;
  await userStore.modifyPassword(params);
  uni.showToast({
    title: t("global.submit.success"),
    icon: "none",
    mask: true,
  });
  setTimeout(() => {
    uni.navigateTo({ url: "/pages/login/index" });
  }, 800);
};

const onTwoVerifyConfirm = () => {
  onConfirmChangePasswordSubmit();
  toggleTwoVerifyPopup();
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.title {
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 32rpx;
}
.from_area {
  background: #fff;
}
.bottom_area {
  height: 144rpx;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  padding: 32rpx;
}
</style>
