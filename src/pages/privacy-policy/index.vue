<template>
  <view class="privacy_word_page">
    <view class="pages">
      <view class="title"> {{ $t("footer.privacy-policy") }}</view>
      <view class="privacy_word_content">
        <view v-for="(item, index) in list" :key="index">
          <view class="text1 pre-line">{{ $t(item.title) }}</view>
          <view class="text">{{ $t(item.content, item.other) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../mixins/page-frame";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const { onBack, t, $u } = usePageFrame();

const list = ref<Array<any>>([
  { title: "privacy.title-1", content: "privacy.content-1" },
  { title: "privacy.title-2", content: "privacy.content-2" },
  { title: "privacy.title-3", content: "privacy.content-3" },
  { title: "privacy.title-4", content: "privacy.content-4" },
  { title: "privacy.title-5", content: "privacy.content-5" },
  { title: "privacy.title-6", content: "privacy.content-6" },
  {
    title: "privacy.title-7",
    content: "privacy.content-7",
    other: { email: "USAeb5@btm.us" },
  },
]);

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("terms.title-1"),
  });
});
</script>

<style lang="scss" scoped>
.privacy_word_page {
  background: #fff;
  height: 100%;

  .title {
    margin-bottom: 20rpx;
    text-align: center;
    font-weight: 500;
    font-size: 32rpx;
    line-height: 48rpx;
  }
  .privacy_word_content {
    padding: 30rpx;
  }
  .text {
    line-height: 45rpx;
    font-size: 24rpx;
  }
  .text1 {
    font-weight: 500;
    line-height: 45rpx;
    font-size: 26rpx;
  }
  .pre-line {
    white-space: pre-line;
    margin-top: 8rpx;
    margin-bottom: 10rpx;
  }
}
</style>
