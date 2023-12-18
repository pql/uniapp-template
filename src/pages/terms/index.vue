<template>
  <view class="privacy_word_page">
    <view class="pages">
      <view class="title"> {{ $t("terms.title-1") }}</view>
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

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("terms.title-1"),
  });
});

const list = ref<Array<any>>([
  {
    title: "terms.title-1",
    content: "terms.content-1",
    other: { value: "www.usaeb5.com" },
  },
  { title: "terms.title-2", content: "terms.content-2" },
  { title: "terms.title-3", content: "terms.content-3" },
  {
    title: "terms.title-4",
    content: "terms.content-4",
    other: { value: "USAeb5@btm.us" },
  },
  { title: "terms.title-5", content: "terms.content-5" },
  {
    title: "terms.title-6",
    content: "terms.content-6",
    other: { value: "USAeb5@btm.us" },
  },
  { title: "terms.title-7", content: "terms.content-7" },
  { title: "terms.title-8", content: "terms.content-8" },
  { title: "terms.title-9", content: "terms.content-9" },
  { title: "terms.title-10", content: "terms.content-10" },
  { title: "terms.title-11", content: "terms.content-11" },
  { title: "terms.title-12", content: "terms.content-12" },
  { title: "terms.title-13", content: "terms.content-13" },
  { title: "terms.title-14", content: "terms.content-14" },
  { title: "terms.title-15", content: "terms.content-15" },
  { title: "terms.title-16", content: "terms.content-16" },
  { title: "terms.title-17", content: "terms.content-17" },
]);
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
