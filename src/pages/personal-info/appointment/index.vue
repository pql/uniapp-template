<template>
  <view>
    <z-paging
      ref="pagingRef"
      v-model="list"
      use-page-scroll
      hide-empty-view
      :refresher-enabled="false"
      @query="onQueryList"
    >
      <view class="header relative">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/bar-img-2.jpg"
          width="100%"
          height="250"
        ></u-image>
      </view>
      <view class="p-3">
        <view class="font-bold font-32">{{ $t("user.mine.appointment") }}</view>
        <view class="content">
          <view
            class="pt-3"
            style="min-height: calc(100vh - 44px - var(--status-bar-height))"
            v-if="list.length"
          >
            <view
              v-for="(item, index) in list"
              :key="index"
              class="p-2 mb-4 rounded relative"
              style="box-shadow: 0px 4px 10px 0px rgba(28, 61, 118, 0.1)"
            >
              <view class="mb-2 font-bold">{{ item.liveTitle }}</view>
              <view class="flex flex-wrap gap-2 justify-between">
                <view
                  class="font-22 leading-4"
                  style="color: rgba(38, 54, 78, 0.5); width: 45%"
                >
                  <text>{{ $t("user.mine.start-time") }}：</text>
                  <text v-if="item.liveStartDate">{{
                    dayjs(item.liveStartDate).format("YYYY-MM-DD hh:mm:ss")
                  }}</text>
                  <text v-else>-</text>
                </view>
                <view
                  class="font-22 leading-4"
                  style="color: rgba(38, 54, 78, 0.5); width: 45%"
                >
                  <text>{{ $t("user.mine.end-time") }}：</text>
                  <text v-if="item.liveEndDate">{{
                    dayjs(item.liveEndDate).format("YYYY-MM-DD hh:mm:ss")
                  }}</text>
                  <text v-else>-</text>
                </view>
                <view
                  class="font-22 leading-4"
                  style="color: rgba(38, 54, 78, 0.5); width: 45%"
                >
                  <text>{{ $t("user.mine.appointment.phone") }}：</text>
                  <text v-if="item.phone">{{
                    tools.phoneDesensitize(item.phone)
                  }}</text>
                  <text v-else>-</text>
                </view>
                <view
                  class="font-22 leading-4"
                  style="color: rgba(38, 54, 78, 0.5); width: 45%"
                >
                  <text>{{ $t("user.mine.appointment.email") }}：</text>
                  <text v-if="item.phone">{{
                    tools.cryptoEmail(item.email)
                  }}</text>
                  <text v-else>-</text>
                </view>
                <view
                  class="font-22 leading-4"
                  style="color: rgba(38, 54, 78, 0.5); width: 45%"
                >
                  <text>{{ $t("index.home.appointment.memo") }}：</text>
                  <text v-if="item.memo">{{ item.memo }}</text>
                  <text v-else>-</text>
                </view>
              </view>
              <view class="absolute right-1 bottom-1">
                <view
                  v-if="item.isEnd"
                  class="px-1.5 py-1 rounded"
                  style="background: #979797; color: #ffffff; font-size: 20rpx"
                  >{{ $t("global.had-end") }}</view
                >
                <view
                  v-else
                  class="px-1.5 py-1 rounded"
                  style="background: #314db1; color: #ffffff; font-size: 20rpx"
                >
                  {{ $t("global.about-to-begin") }}
                </view>
              </view>
            </view>
          </view>
          <view
            v-else
            class="d-flex j-center a-center"
            style="height: calc(100vh - 44px - var(--status-bar-height))"
          >
            <u-empty
              mode="list"
              icon="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
              :text="$t('global.list.is.empty')"
              width="104"
              height="104"
            >
            </u-empty>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import useHomeService from "../../../service/home/homeService";
import type { GetLiveRecordForm } from "../../../service/home/model/homeModel";
import { ref } from "vue";
import dayjs from "dayjs";
import useTools from "../../../mixins/tools";

const { t } = usePageFrame();
const homeService = useHomeService();
const pagingRef = ref();
const list = ref<Array<any>>([]);
const tools = useTools();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.mine.appointment"),
  });
});

const onQueryList = async (pageNum: number = 1, pageSize: number = 10) => {
  const params = {
    pageNum,
    pageSize,
  } as GetLiveRecordForm;
  const result = await homeService.getLiveRecord(params);
  const data = result.data;
  list.value = data;
  pagingRef.value.complete(data);
};
</script>
