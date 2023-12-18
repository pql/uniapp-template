<template>
  <view class="content">
    <view>当前应用语言: {{ applicationLocale }}</view>
    <view>{{ $t("locale.zh-hans") }}</view>
    <view>{{ $t("locale.en") }}</view>
    <u-button type="primary" @click="onLocaleChange('zh-Hans')">{{
      $t("locale.zh-hans")
    }}</u-button>
    <u-button type="success" @click="onLocaleChange('en')">{{
      $t("locale.en")
    }}</u-button>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReady } from "@dcloudio/uni-app";
import { getLocale, onLocaleChange } from "../../locale";
import { ref } from "vue";
import { t } from "../../locale";
const applicationLocale = ref<string>();
onReady(() => {
  // 动态设置当前页面的标题。
  uni.setNavigationBarTitle({
    title: t("index.home"),
  });
})
onLoad(() => {
  const systemInfo = uni.getSystemInfoSync();
  const systemLocale = systemInfo.language;
  applicationLocale.value = getLocale();
  uni.onLocaleChange((e) => {
    applicationLocale.value = e.locale;
  });
});
</script>
