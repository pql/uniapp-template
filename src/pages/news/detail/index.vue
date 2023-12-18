<template>
  <view class="p-3">
    <view class="font-38 font-bold leading-7 text-black">{{
      newsInfo.title
    }}</view>
    <view
      class="mt-3 mb-4 font-26 flex items-center justify-between"
      style="color: #b2b2b2"
    >
      <text>{{
        dayjs(newsInfo.publishDate).format("YYYY-MM-DD hh:mm:ss")
      }}</text>
      <text>{{ newsInfo.category }}</text>
      <text>{{ $t("news.detail.visit-count") }}：{{ newsInfo.viewNum }} </text>
    </view>
    <view>
      <video
        class="w-full my-2"
        v-if="newsInfo.type === 1"
        :src="newsInfo.videoUrl"
        object-fit="fill"
      ></video>
      <u-parse class="my-2" :html="newsInfo.content"></u-parse>
    </view>
    <view
      v-if="newsInfo"
      class="my-2 p-2 rounded font-24"
      style="background: #eaeaea; color: #b2b2b2"
    >
      <view class="leading-5">{{ $t("news.detail.copyright.title") }}：</view>
      <view class="leading-5">{{ $t("news.detail.copyright.desc") }}</view>
    </view>
    <view class="my-3">
      <view class="text-black font-30 font-bold">{{
        $t("global.more.content")
      }}</view>
      <view class="my-3">
        <view
          class="u-body-item u-flex u-p-b-0 my-2"
          v-for="(item, index) in newsInfo.related"
          :key="index"
          @click="onGoNewsDetail(item)"
        >
          <image :src="item.imgUrl" mode="aspectFill"></image>
          <view class="u-body-item-title u-line-2 px-2 font-26 leading-5">{{
            item.title
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import useNewsService from "../../../service/news/newsService";
import { ref } from "vue";
import dayjs from "dayjs";

const { t } = usePageFrame();
const newsService = useNewsService();
const newsInfo = ref();

onLoad(async (options: any) => {
  uni.setNavigationBarTitle({
    title: t("news.detail.title"),
  });

  if (options.id) {
    getNewsDetail(options.id);
  }
});

const getNewsDetail = async (id: string) => {
  const result = await newsService.newsDetail(id);
  const data = result.data;
  newsInfo.value = data;
};

const onGoNewsDetail = (news: any) => {
  getNewsDetail(news.id);
  uni.pageScrollTo({ scrollTop: 0, duration: 100 });
};
</script>

<style scoped lang="scss">
.u-body-item {
  font-size: 32rpx;
  color: #333;
}

.u-body-item image {
  width: 100rpx;
  flex: 0 0 100rpx;
  height: 100rpx;
  border-radius: 8rpx;
}
</style>
