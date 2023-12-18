<template>
  <view class="Privacy_page">
    <view class="pages">
      <u-skeleton
        :loading="loading"
        :animation="true"
        bgColor="#FFF"
      ></u-skeleton>
      <view class="u-skeleton">
        <view class="Privacy_page_content">
          <view class="Privacy_page_conten_title">
            {{ $t("user.privacy.title") }}</view
          >
          <view>{{ $t("user.privacy.content") }}</view>
          <view class="bottom flex">
            <view>
              <u-switch
                v-model="checked"
                size="40"
                activeColor="#18A058"
                @change="onSwitchChange"
              >
              </u-switch>
            </view>
            <text
              class="switch_state"
              :style="{ color: checked ? '#18A058' : 'rgba(0, 0, 0, 0.5)' }"
              >{{ $t("user.privacy.tips") }}</text
            >
          </view>
        </view>
        <u-popup
          v-model="showMultiVerifyPopup"
          mode="center"
          closeable
          border-radius="16"
          width="90%"
          @close="onMultiVerifyPopClose"
        >
          <ComPopupMultiVerify
            :types="multiVerifyTypes"
            @confirm="onMultiVerifyConfirm"
          />
        </u-popup>
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import usePageFrame from "../../../mixins/page-frame";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import useUserStore from "../../../store/modules/user";
import ComPopupMultiVerify from "../../../components/popup/multi-verify.vue";
import type { EnablePrivacyForm } from "../../../service/user/model/userModel";

const { onBack, t, $u } = usePageFrame();
const loading = ref<boolean>(true);
const checked = ref<boolean>(false);
const status = ref<number>();
const showMultiVerifyPopup = ref<boolean>(false);
const userStore = useUserStore();
const multiVerifyTypes = ref<Array<string>>([]);

onLoad(async () => {
  uni.setNavigationBarTitle({
    title: t("user.menu.privacy"),
  });
  loading.value = false;
});

const toggleMultiVerifyPopup = () => {
  showMultiVerifyPopup.value = !showMultiVerifyPopup.value;
};

onShow(() => {
  userStore.privacyStatus === 1
    ? (checked.value = true)
    : (checked.value = false);
  if (userStore.twoFaStatus === 1) {
    multiVerifyTypes.value.push("email");
  }
  if (userStore.twoFaGoogleStatus === 1) {
    multiVerifyTypes.value.push("google");
  }
  if (userStore.twoFaPhoneStatus === 1) {
    multiVerifyTypes.value.push("phone");
  }
});

const onMultiVerifyConfirm = async () => {
  const params = {
    status: status.value,
  } as EnablePrivacyForm;
  await userStore.enablePrivacy(params);
  await userStore.getUserInfo();
  userStore.privacyStatus === 1
    ? (checked.value = true)
    : (checked.value = false);
  toggleMultiVerifyPopup();
};

const onSwitchChange = (value: boolean) => {
  toggleMultiVerifyPopup();
  value ? (status.value = 1) : (status.value = 0);
};

const onMultiVerifyPopClose = () => {
  userStore.privacyStatus === 1
    ? (checked.value = true)
    : (checked.value = false);
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.Privacy_page_content {
  background: rgba(255, 255, 255, 1);
  padding: 80rpx 60rpx 28rpx;
  margin: 80rpx 32rpx;
  font-size: 28rpx;
  font-weight: 400;
  letter-spacing: 0.84rpx;
  color: rgba(0, 0, 0, 0.5);
  .Privacy_page_conten_title {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 32rpx;
    margin-bottom: 30rpx;
  }
  .switch_state {
    font-size: 24rpx;
    margin-left: 26rpx;
  }
  .bottom {
    margin-top: 105rpx;
    align-items: center;
  }
}
</style>
