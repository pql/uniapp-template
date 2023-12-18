<template>
  <view class="setting_page">
    <view class="pages">
      <view class="title_area">{{ $t("setting.basic") }}</view>

      <!-- 语言 -->
      <view
        class="setting_content set_border flex_row_jus_betw"
        @click="onGoLocaleSetting"
      >
        <view class="language">{{ $t("common.language") }}</view>
        <u-icon name="arrow-right" color="#C4C4FF" size="28"></u-icon>
      </view>
      <!-- 语言 -->

      <!-- 缓存 -->
      <view
        class="setting_content set_border flex_row_jus_betw"
        @click="onShowClearCachePopup"
      >
        <view class="language">{{ $t("user.setting.cache") }}</view>
        <text>{{ cacheSize }}</text>
      </view>
      <!-- 缓存 -->

      <!-- 版本 -->
      <!-- #ifdef APP-PLUS -->
      <view class="setting_content set_border flex_row_jus_betw">
        <view class="language">{{ $t("user.setting.version") }}</view>
        <text>{{ version }}</text>
      </view>
      <!-- #endif -->
      <!-- 版本 -->

      <view class="title_area">{{ $t("setting.higher") }}</view>

      <view
        class="setting_content set_border flex_row_jus_betw"
        @click="onGoContactUs"
      >
        <view class="language">{{ $t("footer.contact-us") }}</view>
        <u-icon name="arrow-right" color="#C4C4FF" size="28"></u-icon>
      </view>

      <view
        class="setting_content set_border flex_row_jus_betw"
        @click="onGoPrivacyPolicy"
      >
        <view class="language">{{ $t("footer.privacy-policy") }}</view>
        <u-icon name="arrow-right" color="#C4C4FF" size="28"></u-icon>
      </view>

      <view
        class="setting_content set_border flex_row_jus_betw"
        @click="onGoTermOfUse"
      >
        <view class="language">{{ $t("footer.terms-of-use") }}</view>
        <u-icon name="arrow-right" color="#C4C4FF" size="28"></u-icon>
      </view>

      <!-- logout -->
      <view class="bottom" v-if="userStore.token">
        <ComButton
          :title="$t('user.logot')"
          :custom-style="customStyle"
          @on-tap="onSignOut"
        />
      </view>
      <!-- logout -->
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
    <!-- popup 清理缓存-->
    <u-popup
      v-model="showClearCachePopup"
      mode="center"
      closeable
      border-radius="16"
    >
      <view class="popup_content">
        <view class="info">{{
          $t("user.setting.cache.sure-to-clear-cache")
        }}</view>
        <view class="flex_row">
          <u-button class="btn" @click="onClearCache">{{
            $t("global.cancel")
          }}</u-button>
          <u-button class="btn confirm" @click="onConfirmClearCache">{{
            $t("global.confirm")
          }}</u-button></view
        >
      </view>
    </u-popup>
    <!-- popup 清理缓存-->
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import { deviceType } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
import ComFooter from "../../components/layout/footer/footer.vue";
import { ref } from "vue";
import useUserStore from "../../store/modules/user";
import ComButton from "../../components/button/button.vue";

const { onBack, t, $u } = usePageFrame();
const cacheSize = ref<string>();
const version = ref<string>();
const userStore = useUserStore();
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

const showClearCachePopup = ref<boolean>(false);
onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("setting"),
  });
  onCalculateCacheSize();

  //#ifdef APP-PLUS
  plus.runtime.getProperty(plus.runtime.appid as string, (info) => {
    version.value = info.version;
  });
  //#endif
});

const toggleClearCachePopup = () => {
  showClearCachePopup.value = !showClearCachePopup.value;
};

const onGoLocaleSetting = () => {
  uni.navigateTo({
    url: "/pages/setting/locale",
  });
};

const onGoContactUs = () => {
  uni.navigateTo({
    url: "/pages/contact-us/index",
  });
};

const onGoPrivacyPolicy = () => {
  uni.navigateTo({
    url: "/pages/privacy-policy/index",
  });
};

const onGoTermOfUse = () => {
  uni.navigateTo({
    url: "/pages/terms/index",
  });
};

const onSignOut = () => {
  uni.clearStorageSync();
  userStore.setToken("");
  uni.showToast({
    title: t("user.logout.success"),
    icon: "none",
    success: () => {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/tabbar/index/index",
        });
      }, 1500);
    },
  });
};

const onCalculateCacheSize = async () => {
  const storageInfo = await uni.getStorageInfoSync();
  cacheSize.value = storageInfo.currentSize + "KB";
};

const onShowClearCachePopup = () => {
  toggleClearCachePopup();
};

const onClearCache = () => {
  toggleClearCachePopup();
};

const onConfirmClearCache = () => {
  uni.clearStorageSync();
  uni.showToast({
    title: t("global.success"),
    icon: "none",
    mask: true,
    duration: 2000,
  });
  toggleClearCachePopup();
};
</script>

<style lang="scss" scoped>
.setting_content {
  padding: 0 32rpx;
  background-color: #fff;
  align-items: center;
  .language {
    height: 100rpx;
    line-height: 100rpx;
  }
}
.title_area {
  margin-top: 30rpx;
  height: 70rpx;
  line-height: 70rpx;
  padding: 0 32rpx;
  font-size: 30rpx;
  font-weight: 500;
  letter-spacing: 0.48rpx;
}
.set_border {
  border-bottom: 1rpx solid rgba(235, 235, 235, 1);
}
.bottom {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 144rpx;
  padding: 32rpx;
}
.popup_content {
  width: 650rpx;
  margin-top: 70rpx;
  padding: 32rpx;

  .info {
    text-align: center;
    font-size: 28rpx;
    min-height: 150rpx;
    font-weight: 500;
  }
  .btn {
    height: 80rpx;
    width: 210rpx;
  }
  .confirm {
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
    background-color: rgba(0, 80, 179, 1);
  }
}
</style>
