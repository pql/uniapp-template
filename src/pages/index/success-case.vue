<template>
  <view class="relative">
    <view
      class="fixed text-center w-full top-2"
      style="
        color: rgba(147, 154, 166, 0.2);
        font-size: 60rpx;
        font-weight: 900
      "
      >BTM EB-5 PROJECTS</view
    >
    <z-paging
      ref="pagingRef"
      v-model="list"
      use-page-scroll
      hide-empty-view
      :refresher-enabled="false"
      @query="onQueryList"
    >
      <view
        v-if="list.length"
        class="pt-7 px-3"
        style="min-height: calc(100vh - 44px - var(--status-bar-height))"
      >
        <view>
          <u-waterfall v-model="list" ref="uWaterfallRef">
            <template v-slot:left="{ leftList }">
              <view
                v-for="(item, index) in leftList"
                :key="index"
                class="mr-2 mb-4"
              >
                <u-lazy-load
                  threshold="-450"
                  :image="item.listImg"
                  :index="index"
                ></u-lazy-load>
                <view class="font-26 mt-1.5 leading-5" style="color: #363a40">
                  {{ item.name }}
                </view>
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.number-of-people") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40"
                  >{{ item.totalQuote || "-" }}
                  {{ $t("success.case.number-of-people.unit") }}</view
                >
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.number-of-money") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40"
                  >${{ tools.formatNum(item.totalAmount) || "-" }}</view
                >
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.regional-center") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40">{{
                  item.regionalCenter || "-"
                }}</view>
              </view>
            </template>
            <template v-slot:right="{ rightList }">
              <view
                v-for="(item, index) in rightList"
                :key="index"
                class="ml-2 mb-4"
              >
                <u-lazy-load
                  threshold="-450"
                  :image="item.listImg"
                  :index="index"
                ></u-lazy-load>
                <view class="font-26 mt-1.5 leading-5" style="color: #363a40">
                  {{ item.name }}
                </view>
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.number-of-people") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40"
                  >{{ item.totalQuote || "-" }}
                  {{ $t("success.case.number-of-people.unit") }}</view
                >
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.number-of-money") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40"
                  >${{ tools.formatNum(item.totalAmount) || "-" }}</view
                >
                <view class="font-22 mt-2" style="color: rgba(54, 58, 64, 0.6)">
                  {{ $t("success.case.regional-center") }}：
                </view>
                <view class="font-22 my-1" style="color: #363a40">{{
                  item.regionalCenter || "-"
                }}</view>
              </view>
            </template>
          </u-waterfall>
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
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import useProjectService from "../../service/project/projectService";
import type { ProductListForm } from "../../service/project/model/projectModel";
import useTools from "../../mixins/tools";
import { ref } from "vue";

const { t } = usePageFrame();
const projectService = useProjectService();
const list = ref<Array<any>>([]);
const pagingRef = ref();
const tools = useTools();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("index.success-case"),
  });
});

const onQueryList = async (pageNum: number = 1, pageSize: number = 10) => {
  const params = {
    pageNum,
    pageSize,
    country: 0,
    isTop: 0,
  } as ProductListForm;
  const result = await projectService.productList(params);
  const data = result.data;
  list.value = data;
  pagingRef.value.complete(data);
  console.log(data);
};
</script>
