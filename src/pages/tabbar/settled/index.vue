<template>
  <view class="sttled-page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      use-page-scroll
      hide-empty-view
      :refresher-enabled="false"
      @query="onQueryList"
    >
      <!-- search -->
      <view class="ps-relative z999 px-3 bg-color">
        <u-search
          :placeholder="$t('eb5.search.placeholder')"
          v-model="keyword"
          height="64"
          shape="square"
          bg-color="transparent"
          :show-action="false"
          border-color="#0050B3"
          @search="onSearch"
          @clear="onClear"
        ></u-search>
      </view>
      <!-- search -->

      <!-- list -->
      <view class="px-3 mt-3" v-if="list.length">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="list-item"
          @click="onGoProjectDetail(item)"
        >
          <view
            class="status-modal"
            v-if="
              item.projectStatus === ProjectStatus.TRANSFER_OF_ACCOUNT ||
              item.projectStatus === ProjectStatus.PAUSE ||
              item.projectStatus === ProjectStatus.BREAK_UP
            "
          >
            <image
              v-if="item.projectStatus === ProjectStatus.TRANSFER_OF_ACCOUNT"
              class="mt-10"
              mode="aspectFit"
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/market/project-status-3.png"
              style="width: 180rpx; height: 180rpx"
            ></image>
            <image
              v-else-if="item.projectStatus === ProjectStatus.PAUSE"
              class="mt-10"
              mode="aspectFit"
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/market/project-status-4.png"
              style="width: 180rpx; height: 180rpx"
            ></image>
            <image
              v-else-if="item.projectStatus === ProjectStatus.BREAK_UP"
              class="mt-10"
              mode="aspectFit"
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/market/project-status-5.png"
              style="width: 180rpx; height: 180rpx"
            ></image>
          </view>

          <view class="ps-relative">
            <image
              :src="
                item.signatureProjectPicUrlList
                  ? item.signatureProjectPicUrlList[0]
                  : 'https://img.js.design/assets/img/62e0af7b1eceec35a4ecb885.png'
              "
              mode="aspectFill"
              style="width: 100%; height: 370rpx"
            >
            </image>
            <view
              class="project-status"
              :style="{
                color:
                  item.projectStatus === ProjectStatus.ABOUNT_TO_BEGIN ||
                  item.projectStatus === ProjectStatus.APPLICATION_FOR_PURCHASE
                    ? '#FFFFFF'
                    : '#000073',
                backgroundColor:
                  item.projectStatus === ProjectStatus.ABOUNT_TO_BEGIN
                    ? '#18A058'
                    : item.projectStatus ===
                      ProjectStatus.APPLICATION_FOR_PURCHASE
                    ? '#0050B3'
                    : '#E9E9E9',
              }"
            >
              {{ $t("state.project." + item.projectStatus) }}
            </view>
            <view class="sell-time">
              <u-image
                :src="
                  item.signatureProductCompanyLogo ||
                  item.signatureFundraiserAvatar
                "
                mode="aspectFill"
                shape="circle"
                width="48rpx"
                height="48rpx"
              ></u-image>
              <view class="ml-3">{{
                item.productCompany || item.companyName
              }}</view>
            </view>
          </view>
          <view class="p-3">
            <view class="font-36 font-title">{{ item.productName }}</view>
            <view class="my-2 text-secondary">
              {{ item.productState }} {{ item.productCity }}
            </view>
          </view>
          <view class="p-3 border-top">
            <view class="d-flex flex-wrap pl-3 bg-color radius-1">
              <view class="d-flex flex-column j-sb py-3 pr-3 w-50">
                <view class="font-24 text-secondary">{{
                  $t("eb5.information.regionCategory")
                }}</view>
                <view class="mt font-weight-700">{{
                  item.regionCategory || "-"
                }}</view>
              </view>
              <view class="d-flex flex-column j-sb py-3 pr-3 w-50">
                <view class="font-24 text-secondary">{{
                  $t("eb5.information.immigrantNum")
                }}</view>
                <view class="mt font-weight-700">{{ item.immigrantNum }}</view>
              </view>
              <view class="d-flex flex-column j-sb py-3 pr-3 w-50">
                <view class="font-24 text-secondary">{{
                  $t("eb5.information.createJobNum")
                }}</view>
                <view class="mt font-weight-700">{{ item.createJobNum }}</view>
              </view>
              <view class="d-flex flex-column j-sb py-3 pr-3 w-50">
                <view class="font-24 text-secondary">{{
                  $t("eb5.information.employmentRequirements")
                }}</view>
                <view class="mt font-weight-700"
                  >{{ transferEmploymentRate(item) }}%</view
                >
              </view>
            </view>
            <view class="d-flex a-center mt-3">
              <view class="flex-1 mr-3">
                <view class="font-24 text-secondary">{{
                  $t("state.amount.title")
                }}</view>
                <view class="font-36" style="color: #0050b3"
                  >${{ tools.formatNum(item.perInvestAmount) }}
                </view>
              </view>
              <view>
                <u-button
                  :custom-style="{
                    minWidth: '280rpx',
                    border: 'none',
                    color: '#0050B3',
                  }"
                  :disabled="
                    item.projectStatus !==
                    ProjectStatus.APPLICATION_FOR_PURCHASE
                  "
                  @click="onGoProjectDetail(item)"
                >
                  {{
                    item.projectStatus !==
                    ProjectStatus.APPLICATION_FOR_PURCHASE
                      ? $t("state.project." + item.projectStatus)
                      : $t("eb5.btn.toIntro")
                  }}
                </u-button>
              </view>
            </view>
            <u-gap height="20rpx"></u-gap>
          </view>
        </view>
      </view>
      <view
        class="d-flex j-center a-center"
        style="height: calc(100vh - 122px - var(--status-bar-height))"
        v-else
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
      <!-- list -->
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import usePageFrame from "../../../mixins/page-frame";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import useSettledStore from "../../../store/modules/settled";
import { onLoad } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { QueryListParams } from "../../../service/settled/model/settledModel";
import useTools from "../../../mixins/tools";
import { ProjectStatus } from "../../../types/enum";
const { onBack, t, $u } = usePageFrame();
const settledStore = useSettledStore();
const tools = useTools();

const keyword = ref<string>("");
const list = ref<Array<any>>([]);
const pagingRef = ref<any>("pagingRef");

onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("header.models"),
  });
});

const transferEmploymentRate = (item: any) => {
  if (item.createJobNum && item.immigrantNum) {
    return ((item.createJobNum / item.immigrantNum) * 10).toFixed(2);
  } else {
    return 0;
  }
};

// 查询项目列表
const onQueryList = async (pageNum: number, pageSize: number) => {
  const params = new QueryListParams();
  params.pageNum = pageNum;
  params.pageSize = pageSize;
  params.productName = keyword.value;

  const data = await settledStore.queryList(params);
  list.value = data;
  pagingRef.value.complete(data);
};

const onSearch = async (value: string) => {
  const params = new QueryListParams();
  params.productName = value;
  const data = await settledStore.queryList(params);
  list.value = data;
  pagingRef.value.complete(data);
};

const onClear = async () => {
  const params = new QueryListParams();
  const data = await settledStore.queryList(params);
  list.value = data;
  pagingRef.value.complete(data);
};

// 跳转【项目介绍】
const onGoProjectDetail = (item: any) => {
  if (item.projectStatus === ProjectStatus.APPLICATION_FOR_PURCHASE) {
    // 设置值供给/pages/webview/webview使用
    tools.setWebviewParamsSync({});
    uni.navigateTo({
      url: `/pages/webview/webview?src=${encodeURIComponent(
        item.mobileLinkUrl
      )}`,
    });
  }
};
</script>

<style lang="scss" scoped>
::v-deep .u-navbar {
  position: relative;
  z-index: 999;
}

.list-item {
  position: relative;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;

  .status-modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    text-align: center;
    background-color: #ffffff4c;
  }

  .type {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    padding: 0 10rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 10rpx;
  }

  .project-status {
    position: absolute;
    top: 20rpx;
    right: 0;
    padding: 0 20rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    color: #fff;
    border-top-left-radius: 10rpx;
    border-bottom-left-radius: 10rpx;
  }

  .sell-time {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    height: 70rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ::v-deep .u-count-down {
    margin: 0 10rpx;

    .u-count-down__text {
      font-size: 28rpx;
      color: #fff;
    }
  }

  .u-button--disabled {
    color: #000 !important;
    background-color: #e0e0e6ff !important;
  }
}
</style>
