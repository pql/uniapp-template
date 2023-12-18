<template>
  <view>
    <u-image
      src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/hot-news-banner.png"
      width="100%"
      height="190"
    ></u-image>
    <view class="p-3">
      <view class="font-28 font-bold" style="color: #999999">直播活动</view>
      <view class="mt-3">
        <ComLiveSwiper source="wxapp_news_home" />
      </view>
      <view class="my-3">
        <view class="text-black font-30 font-bold">{{
          $t("index.hot-news")
        }}</view>
        <view class="my-3">
          <view
            class="u-body-item u-flex u-p-b-0 my-2"
            v-for="(item, index) in newsList"
            :key="index"
            @click="onGoNewsDetail(item)"
          >
            <image :src="item.imgUrl" mode="aspectFill"></image>
            <view class="u-body-item-title px-2 font-26 leading-5">
              <view class="u-line-2 font-bold">
                {{ item.title }}
              </view>
              <view class="font-22" style="color: #99a2c0">
                <text>
                  {{ dayjs(item.createDate).format("YYYY-MM-DD hh:mm:ss") }}
                </text>
                <text class="ml-4">{{ item.category }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import ComLiveSwiper from "../../../components/live-swiper/index.vue";
import useNewsService from "../../../service/news/newsService";
import type { NewsListForm } from "../../../service/news/model/newsModel";
import { Pagination } from "../../../service/base-model/baseParams";
import dayjs from "dayjs";
import { ref } from "vue";
const { t } = usePageFrame();
const newsService = useNewsService();
const newsList = ref<Array<any>>([]);
const pagination = new Pagination();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("index.hot-news"),
  });

  getNewsList();
});

const getNewsList = async () => {
  const params = {
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    type: 0,
  } as NewsListForm;
  const result = await newsService.newsList(params);
  const data = result.data;
  if (pagination.pageNum === 1) {
    newsList.value = data;
  } else {
    newsList.value.push(...data);
  }
};

const onGoNewsDetail = (news: any) => {
  uni.navigateTo({
    url: "/pages/news/detail/index?id=" + news.id,
  });
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
