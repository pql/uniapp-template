<template>
  <view class="pages">
    <view class="lang_content">
      <view
        v-for="(lang, index) in langs"
        :key="index"
        class="item flex_row_jus_betw"
        :class="lang.isSelected ? 'set_border' : ''"
        @click="onChangeLanguage(lang.lang)"
      >
        <text>{{ lang.value }}</text>
        <image
          v-show="lang.isSelected"
          class="selected_icon"
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_selected.png"
          mode="aspectFill"
        />
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import { deviceType } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
import type { Locale } from "../../types/enum";
import ComFooter from "../../components/layout/footer/footer.vue";

import { ref } from "vue";
import { getLocale, onLocaleChange } from "../../locale";
const { onBack, t, $u } = usePageFrame();
const langs = ref<Array<any>>([
  {
    id: 0,
    value: "中文",
    lang: "zh-Hans",
    isSelected: false,
  },
  {
    id: 1,
    value: "English",
    lang: "en",
    isSelected: false,
  },
]);

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("setting.locale"),
  });

  const lang = getLocale();
  langs.value.forEach((item) => {
    if (item.lang === lang) {
      item.isSelected = true;
    }
  });
});

const onChangeLanguage = (language: Locale) => {
  onLocaleChange(language);
  langs.value.forEach((item) => {
    if (item.lang === language) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.lang_content {
  .item {
    align-items: center;
    padding: 0 32rpx;
    background-color: #fff;
    height: 100rpx;
    line-height: 100rpx;
  }
  .set_border {
    border-bottom: 1rpx solid rgba(235, 235, 235, 1);
  }
  .selected_icon {
    width: 36rpx;
    height: 24rpx;
  }
}
</style>
