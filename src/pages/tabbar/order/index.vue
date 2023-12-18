<template>
    <view class="content">
      <z-paging
        ref="pagingRef"
        v-model="list"
        use-page-scroll
        hide-empty-view
        :refresher-enabled="false"
        @query="onQueryList"
      >
        <view
          class="pb-3 px-3 text-secondary"
          style="min-height: calc(100vh - 44px - var(--status-bar-height))"
          v-if="list.length > 0"
        >
          <view
            class="list-item mt-3 bg-white border"
            v-for="(item, index) in list"
            :key="index"
            style="list-style: none"
          >
            <view class="d-flex j-sb a-center px-3 h_100 font-26 border-bottom">
              <view class="text-secondary">
                <text>{{ $t("product.order.num") }}：</text>
                <text>{{ item.orderNo }}</text>
              </view>
              <view>
                <text class="text-primary"
                  >{{ $t("product.order.status") }}：</text
                >
                <text v-if="item.orderStatus === 0" style="color: #fb6e23">{{
                  $t("user.order.status.1")
                }}</text>
                <text v-else-if="item.orderStatus === 1" style="color: #52c41a">{{
                  $t("user.order.status.2")
                }}</text>
                <text v-else-if="item.orderStatus === 2" style="color: #52c41a">{{
                  $t("user.order.status.3")
                }}</text>
                <text
                  v-else-if="item.orderStatus === 100"
                  style="color: #333333"
                  >{{ $t("user.order.status.4") }}</text
                >
              </view>
            </view>
            <view class="p-3 border-bottom">
              <view class="d-flex a-center text-primary">
                <image
                  v-if="
                    item.product &&
                    item.product.signatureProjectPicUrlList.length > 0
                  "
                  :src="item.product.signatureProjectPicUrlList[0]"
                  mode="aspectFill"
                  style="width: 160rpx; height: 136rpx; border-radius: 5rpx"
                />
                <view
                  class="flex-1 d-flex flex-column j-sb ml-3"
                  style="height: 136rpx"
                >
                  <view class="font-24 text-ellipsis font-title">
                    <text>{{ $t("product.pay.product-name") }}：</text>
                    <text v-if="item.product && item.product.productName">{{
                      item.product.productName
                    }}</text>
                    <text v-else>{{ $t("global.no-data") }}</text>
                  </view>
                  <view class="text-ellipsis-2 font-24">
                    <text>{{ $t("product.project.address") }}：</text>
                    <text v-if="item.product && item.product.address">{{
                      item.product.address
                    }}</text>
                    <text v-else>{{ $t("global.no-data") }}</text>
                  </view>
                </view>
              </view>
              <view class="mt-2 font-24">
                <text>{{ $t("product.project.type") }}：</text>
                <text v-if="item.product && item.product.type">{{
                  item.product.type
                }}</text>
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
              <view class="mt-2 font-24">
                <text>{{ $t("product.project.fund.company") }}：</text>
                <text v-if="item.fundraiser && item.fundraiser.companyName">{{
                  item.fundraiser.companyName
                }}</text>
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
              <view class="mt-2 font-24">
                <text>{{ $t("product.project.intermediary.company") }}：</text>
                <text v-if="item.broker && item.broker.companyName">{{
                  item.broker.companyName
                }}</text>
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
              <view class="mt-2 font-24">
                <text>{{ $t("product.project.consel.company") }}：</text>
                <text v-if="item.lawyer && item.lawyer.lawOfficeName">{{
                  item.lawyer.lawOfficeName
                }}</text>
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
            </view>
            <view class="p-3 font-24">
              <view class="mt-2 font-24">
                <text>{{ $t("product.capital.status") }}：</text>
                <text v-if="item.product && item.product.fundStatus === 0"></text>
                <text v-else-if="item.product && item.product.fundStatus === 1">{{
                  $t("user.product.fund.1")
                }}</text>
                <text v-else-if="item.product && item.product.fundStatus === 2">{{
                  $t("user.product.fund.2")
                }}</text>
                <text v-else-if="item.product && item.product.fundStatus === 3">{{
                  $t("user.product.fund.3")
                }}</text>
                <text v-else-if="item.product && item.product.fundStatus === 4">{{
                  $t("user.product.fund.4")
                }}</text>
              </view>
  
              <view class="mt-2 font-24" v-if="item.orderFundStatus != null">
                <text>{{ $t("eb5.orderFundStatus") }}：</text>
                <text v-if="item.orderFundStatus === 0"></text>
                <text v-else-if="item.orderFundStatus === 1">{{
                  $t("eb5.orderFundStatus-1")
                }}</text>
                <text v-else-if="item.orderFundStatus === 2">{{
                  $t("ueb5.orderFundStatus-2")
                }}</text>
                <text v-else-if="item.orderFundStatus === 3">{{
                  $t("eb5.orderFundStatus-3")
                }}</text>
                <text v-else-if="item.orderFundStatus === 4">{{
                  $t("eb5.orderFundStatus-4")
                }}</text>
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.project.progress") }}：</text>
                <text
                  v-if="item.product && item.product.progressStatus === 0"
                ></text>
                <text
                  v-else-if="item.product && item.product.progressStatus === 1"
                  >{{ $t("user.product.progress.1") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 2"
                  >{{ $t("user.product.progress.2") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 3"
                  >{{ $t("user.product.progress.3") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 4"
                  >{{ $t("user.product.progress.4") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 5"
                  >{{ $t("user.product.progress.5") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 6"
                  >{{ $t("user.product.progress.6") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 7"
                  >{{ $t("user.product.progress.7") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 8"
                  >{{ $t("user.product.progress.8") }}</text
                >
                <text
                  v-else-if="item.product && item.product.progressStatus === 9"
                  >{{ $t("user.product.progress.9") }}</text
                >
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.invest.term") }}：</text>
                <text v-if="item.product && item.product.investYears">{{
                  item.product.investYears || ""
                }}</text>
                <text>&NonBreakingSpace;{{ $t("user.register.years") }}</text>
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("eb5.information.delay") }}：</text>
                <text v-if="item.product && item.product.borrowerExtensionNum"
                  >{{ item.product.borrowerExtensionNum }}
                  {{ $t("eb5.information.delayTip") }}</text
                >
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.invest.volume") }}：</text>
                <text v-if="item.product && item.product.perInvestAmount"
                  >${{ tools.formatNum(item.product.perInvestAmount) }}</text
                >
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.invset.manageFee") }}：</text>
                <text v-if="item.product && item.product.manageFee"
                  >${{ tools.formatNum(item.product.manageFee) }}</text
                >
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("eb5.information.lawyerFee") }}：</text>
                <text v-if="item.product && item.product.lawyerFee"
                  >${{ tools.formatNum(item.product.lawyerFee) }}</text
                >
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("eb5.information.brokerFee") }}：</text>
                <text v-if="item.product && item.product.brokerFee"
                  >${{ tools.formatNum(item.product.brokerFee) }}</text
                >
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.roi.type") }}：</text>
                <text v-if="item.product">
                  {{ roiType(item.product) }}
                </text>
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.order.sign.time") }}：</text>
                <text v-if="item.createTime">{{
                  dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }}</text>
                <text v-else>{{ $t("global.no-data") }}</text>
              </view>
  
              <view class="mt-2 font-24">
                <text>{{ $t("product.amount.total") }}：</text>
                <text
                  >${{
                    tools.formatNum(
                      (item.amount || 0) +
                        (item.product.lawyerFee || 0) +
                        (item.product.brokerFee || 0) +
                        (item.product.manageFee || 0)
                    )
                  }}</text
                >
              </view>
  
              <view class="mt-3 d-flex j-end text-sm">
                <u-button class="operate-button" @click="onGoOrderDetail(item)">{{
                  $t("product.order.detail")
                }}</u-button>
                <u-gap style="width: 30rpx"></u-gap>
                <u-button
                  v-if="item.orderStatus === 0"
                  class="operate-button operate-button-checked"
                  @click="onGoPay(item)"
                  >{{ $t("product.pay.now") }}
                </u-button>
                <u-button
                  v-else-if="item.orderStatus === 1"
                  class="operate-button operate-button-checked"
                  @click="onCompleteInfo(item)"
                  >{{ $t("product.profile") }}
                </u-button>
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
            :text="$t('global.list.is.empty')"
            mode="list"
            icon="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
            width="104"
            height="104"
            marginTop="200"
          >
          </u-empty>
        </view>
      </z-paging>
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </view>
  </template>
  
  <script setup lang="ts">
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import useOrderStore from "../../../store/modules/order";
  import { Pagination } from "../../../service/base-model/baseParams";
  import usePageFrame from "../../../mixins/page-frame";
  import useTools from "../../../mixins/tools";
  import { deviceType } from "../../../utils/platform";
  import { DeviceType } from "../../../types/enum";
  import ComFooter from "../../../components/layout/footer/footer.vue";
  import dayjs from "dayjs";
  const { t, $u } = usePageFrame();
  const tools = useTools();
  const list = ref<Array<any>>([]);
  const orderStore = useOrderStore();
  const pagingRef = ref();
  
  onLoad(() => {
    uni.setNavigationBarTitle({
      title: t("user.menu.orders"),
    });
  });
  
  onShow(() => {
    onQueryList();
  });
  
  const onQueryList = async (pageNum: number = 1, pageSize: number = 10) => {
    const params = new Pagination();
    params.pageNum = pageNum;
    params.pageSize = pageSize;
    const data = await orderStore.queryList(params);
    list.value = data;
    pagingRef.value.complete(data);
  };
  
  // 回报形式
  const roiType = (data: any) => {
    // roiType: 投资回报类型 1-固定年化利率 2-固定年化金额 3-固定年化利率+固定年化金额 4-文字说明
    // roiAa: 年化金额
    // roiApr: 年化利率
    // roiDescription: 回报方案
    const { roiType, roiAa, roiApr, roiDescription } = data;
    if (roiType === 1) {
      return t("user.register.roiType-1", {
        value: `${roiApr || 0}%`,
      });
    } else if (roiType === 2) {
      return t("user.register.roiType-2", { value: roiAa });
    } else if (roiType === 3) {
      return t("user.register.roiType-3", {
        value1: `${roiApr || 0}%`,
        value2: roiAa,
      });
    } else {
      return roiDescription;
    }
  };
  
  const onGoOrderDetail = (item: any) => {
    uni.navigateTo({
      url: "/pages/order/detail?orderNo=" + item.orderNo,
    });
  };
  
  const onGoPay = (item: any) => {
    uni.navigateTo({
      url: `/pages/subscribe/index?productId=${item.productId}&collectId=&currentStep=1&orderNo=${item.orderNo}`,
    });
  };
  
  const onCompleteInfo = (item: any) => {
    uni.navigateTo({
      url: "/pages/order/complete-userinfo?orderNo=" + item.orderNo,
    });
  };
  </script>
  
  <style scoped>
  .operate-button {
    margin: 0;
    width: 220rpx;
    height: 68rpx;
    border: none;
  }
  .operate-button-checked {
    color: #fff;
    background-color: #0050b3;
  }
  </style>
  