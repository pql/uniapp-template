<template>
  <view class="ps-relative">
    <view class="top w-full flex flex-wrap p-2">
      <view
        class="w-1/2 flex items-center justify-center my-1.5"
        v-if="orderInfo"
      >
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onFiles(orderInfo)"
        >
          <text>
            {{ $t("product.files") }}
          </text>
        </view>
      </view>
      <view class="w-1/2 flex items-center justify-center my-1.5">
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onToDo(orderInfo)"
        >
          <text>
            {{ $t("product.todo.list") }}
          </text>
        </view>
      </view>
      <view class="w-1/2 flex items-center justify-center my-1.5">
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onGoUpdateInfo(orderInfo)"
        >
          <text>
            {{ $t("product.my.file.update") }}
          </text>
        </view>
      </view>
      <view class="w-1/2 flex items-center justify-center my-1.5">
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onCompleteInfo(orderInfo)"
        >
          <text>
            {{ $t("product.complete.info") }}
          </text>
        </view>
      </view>
      <view class="w-1/2 flex items-center justify-center my-1.5">
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onGoToMyLawyer"
        >
          <text>
            {{ $t("user.menu.lawyer") }}
          </text>
        </view>
      </view>
      <view class="w-1/2 flex items-center justify-center my-1.5">
        <view
          class="top-item w-11/12 flex items-center justify-center"
          @click="onGoToMyConsultant"
        >
          <text>
            {{ $t("user.menu.agent") }}
          </text>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="mt-3">
      <!-- 当前状态 -->
      <view class="d-flex flex-column mx-3 bg-white border pb-3">
        <view class="border-bottom">
          <view class="p-2 pt-3">
            <text> {{ $t("product.current.status") }}： </text>
            <text
              v-if="orderInfo && orderInfo.orderStatus === 0"
              style="color: #fb6e23"
              >{{ $t("user.order.status.1") }}</text
            >
            <text
              v-else-if="orderInfo && orderInfo.orderStatus === 1"
              style="color: #52c41a"
              >{{ $t("user.order.status.2") }}</text
            >
            <text
              v-else-if="orderInfo && orderInfo.orderStatus === 2"
              style="color: #52c41a"
              >{{ $t("user.order.status.3") }}</text
            >
            <text
              v-else-if="orderInfo && orderInfo.orderStatus === 100"
              style="color: #333333"
              >{{ $t("user.order.status.4") }}</text
            >
          </view>
          <ComStep
            class="px-2"
            :current="orderInfo && orderInfo.orderStatus + 1"
          />
        </view>

        <view class="px-2 pt-2 font-24 text-secondary">
          <text>{{ $t("product.order.sign.time") }}：</text>
          <text v-if="orderInfo && orderInfo.createTime">{{
            dayjs(orderInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
          }}</text>
          <text v-else>{{ $t("global.no-data") }}</text>
        </view>
        <view class="p-2 font-24 text-secondary">
          <text>{{ $t("product.order.num") }}：</text>
          <text v-if="orderInfo && orderInfo.orderNo">{{
            orderInfo.orderNo
          }}</text>
          <text v-else>{{ $t("global.no-data") }}</text>
        </view>

        <view
          class="mt-1 mr-3 d-flex j-end text-sm"
          v-if="orderInfo && orderInfo.orderStatus !== 100"
        >
          <u-button
            v-if="orderInfo.orderStatus === 0"
            class="operate-button operate-button-checked"
            @click="onGoPay(orderInfo)"
            >{{ $t("product.pay.now") }}
          </u-button>
          <u-button
            v-else-if="orderInfo.orderStatus === 1"
            class="operate-button operate-button-checked"
            @click="onCompleteInfo(orderInfo)"
            >{{ $t("product.complete.info") }}
          </u-button>
        </view>
      </view>
      <!-- 当前状态 -->
      <view class="m-3 p-3 border bg-white" v-if="orderInfo">
        <view class="d-flex a-center text-primary">
          <image
            v-if="
              orderInfo.product &&
              orderInfo.product.signatureProjectPicUrlList.length > 0
            "
            :src="orderInfo.product.signatureProjectPicUrlList[0]"
            mode="aspectFill"
            style="width: 160rpx; height: 136rpx; border-radius: 5rpx"
          />
          <view
            class="flex-1 d-flex flex-column j-sb ml-3"
            style="height: 136rpx"
          >
            <view class="font-24 text-ellipsis font-title">
              <text>{{ $t("product.pay.product-name") }}：</text>
              <text v-if="orderInfo.product && orderInfo.product.productName">{{
                orderInfo.product.productName
              }}</text>
              <text v-else>{{ $t("global.no-data") }}</text>
            </view>
            <view class="text-ellipsis-2 font-24">
              <text>{{ $t("product.project.address") }}：</text>
              <text v-if="orderInfo.product && orderInfo.product.address">{{
                orderInfo.product.address
              }}</text>
              <text v-else>{{ $t("global.no-data") }}</text>
            </view>
          </view>
        </view>
        <view class="mt-2 font-24">
          <text>{{ $t("product.project.type") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.type">{{
            orderInfo.product.type
          }}</text>
          <text v-else>{{ $t("global.no-data") }}</text>
        </view>
      </view>
      <view class="m-3 p-3 border bg-white" v-if="orderInfo">
        <view class="mt-2 font-24">
          <text>{{ $t("product.capital.status") }}：</text>
          <text
            v-if="orderInfo.product && orderInfo.product.fundStatus === 0"
          ></text>
          <text
            v-else-if="orderInfo.product && orderInfo.product.fundStatus === 1"
            >{{ $t("user.product.fund.1") }}</text
          >
          <text
            v-else-if="orderInfo.product && orderInfo.product.fundStatus === 2"
            >{{ $t("user.product.fund.2") }}</text
          >
          <text
            v-else-if="orderInfo.product && orderInfo.product.fundStatus === 3"
            >{{ $t("user.product.fund.3") }}</text
          >
          <text
            v-else-if="orderInfo.product && orderInfo.product.fundStatus === 4"
            >{{ $t("user.product.fund.4") }}</text
          >
        </view>

        <view class="mt-2 font-24" v-if="orderInfo.orderFundStatus != null">
          <text>{{ $t("eb5.orderFundStatus") }}：</text>
          <text v-if="orderInfo.orderFundStatus === 0"></text>
          <text v-else-if="orderInfo.orderFundStatus === 1">{{
            $t("eb5.orderFundStatus-1")
          }}</text>
          <text v-else-if="orderInfo.orderFundStatus === 2">{{
            $t("ueb5.orderFundStatus-2")
          }}</text>
          <text v-else-if="orderInfo.orderFundStatus === 3">{{
            $t("eb5.orderFundStatus-3")
          }}</text>
          <text v-else-if="orderInfo.orderFundStatus === 4">{{
            $t("eb5.orderFundStatus-4")
          }}</text>
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.project.progress") }}：</text>
          <text
            v-if="orderInfo.product && orderInfo.product.progressStatus === 0"
          ></text>
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 1
            "
            >{{ $t("user.product.progress.1") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 2
            "
            >{{ $t("user.product.progress.2") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 3
            "
            >{{ $t("user.product.progress.3") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 4
            "
            >{{ $t("user.product.progress.4") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 5
            "
            >{{ $t("user.product.progress.5") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 6
            "
            >{{ $t("user.product.progress.6") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 7
            "
            >{{ $t("user.product.progress.7") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 8
            "
            >{{ $t("user.product.progress.8") }}</text
          >
          <text
            v-else-if="
              orderInfo.product && orderInfo.product.progressStatus === 9
            "
            >{{ $t("user.product.progress.9") }}</text
          >
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.invest.term") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.investYears">{{
            orderInfo.product.investYears || ""
          }}</text>
          <text>&NonBreakingSpace;{{ $t("user.register.years") }}</text>
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("eb5.information.delay") }}：</text>
          <text
            v-if="orderInfo.product && orderInfo.product.borrowerExtensionNum"
            >{{ orderInfo.product.borrowerExtensionNum }}
            {{ $t("eb5.information.delayTip") }}</text
          >
          <text v-else>{{ $t("global.no-data") }}</text>
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.invest.volume") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.perInvestAmount"
            >${{ tools.formatNum(orderInfo.product.perInvestAmount) }}</text
          >
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.invset.manageFee") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.manageFee"
            >${{ tools.formatNum(orderInfo.product.manageFee) }}</text
          >
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("eb5.information.lawyerFee") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.lawyerFee"
            >${{ tools.formatNum(orderInfo.product.lawyerFee) }}</text
          >
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("eb5.information.brokerFee") }}：</text>
          <text v-if="orderInfo.product && orderInfo.product.brokerFee"
            >${{ tools.formatNum(orderInfo.product.brokerFee) }}</text
          >
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.roi.type") }}：</text>
          <text v-if="orderInfo.product">
            {{ roiType(orderInfo.product) }}
          </text>
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.order.sign.time") }}：</text>
          <text v-if="orderInfo.createTime">{{
            dayjs(orderInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
          }}</text>
          <text v-else>{{ $t("global.no-data") }}</text>
        </view>

        <view class="mt-2 font-24">
          <text>{{ $t("product.amount.total") }}：</text>
          <text
            >${{
              tools.formatNum(
                (orderInfo.amount || 0) +
                  (orderInfo.product.lawyerFee || 0) +
                  (orderInfo.product.brokerFee || 0) +
                  (orderInfo.product.manageFee || 0)
              )
            }}</text
          >
        </view>

        <view class="mt-3 d-flex j-end text-sm">
          <u-button
            class="operate-button operate-button-checked"
            @click="onGoProjectDetail(orderInfo)"
            >{{ $t("product.project.detail") }}
          </u-button>
        </view>
      </view>
      <!-- 当前状态 -->

      <!-- 项目投资钱包 -->
      <view class="my-3 mx-3 bg-white border">
        <view class="d-flex p-3 border-bottom">
          <image
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/order_wallet.png"
            mode="aspectFit"
            style="width: 60rpx; height: 60rpx"
          />
          <view class="flex-1 mx-3">
            <view class="font-26">{{ $t("product.wallet.invest") }}</view>
            <view class="mt-1 font-34" v-if="orderInfo && orderInfo.wallet"
              >${{
                (orderInfo.wallet.invested || 0) +
                (orderInfo.wallet.issuedToBroker || 0) +
                (orderInfo.wallet.issuedToFundraiser || 0) +
                (orderInfo.wallet.issuedToLawyer || 0) +
                (orderInfo.wallet.available || 0) +
                (orderInfo.wallet.frozen || 0)
              }}</view
            >
            <view v-else class="mt-1 font-34">$0</view>
          </view>
          <view>
            <u-button style="color: #096dd9" @click="onGoWallet">
              {{ $t("user.menu.wallet") }}
            </u-button>
          </view>
        </view>
        <view
          class="d-flex a-center py-3 border-bottom"
          v-if="orderInfo && orderInfo.wallet"
        >
          <view class="flex-1 text-center">
            <view class="font-26 text-secondary">{{
              $t("product.invest.amount")
            }}</view>
            <view class="mt">{{ orderInfo.wallet.invested || 0 }}</view>
          </view>
          <view class="flex-1 text-center">
            <view class="font-26 text-secondary">{{
              $t("product.invest.available")
            }}</view>
            <view class="mt">{{ orderInfo.wallet.available || 0 }}</view>
          </view>
        </view>
        <view class="p-3 font-24" v-if="orderInfo && orderInfo.wallet">
          <view style="color: #333333">{{
            $t("product.funding.records")
          }}</view>
          <view
            v-for="(item, index) in orderInfo.wallet.transactionList"
            :key="index"
          >
            <view class="mt-3">${{ item.amount }}</view>
            <view class="mt-2 text-secondary">
              <view
                >{{ $t("product.serial.num") }}：{{ item.transactionNo }}</view
              >
              <view>{{ $t("product.event") }}：{{ item.remark }}</view>
              <view
                >{{ $t("product.time") }}：{{
                  dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }}</view
              >
            </view>
          </view>
        </view>
      </view>
      <!-- 项目投资钱包 -->
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import { ref } from "vue";
import useOrderService from "../../service/order/orderService";
import useTools from "../../mixins/tools";
import ComStep from "../subscribe/components/step.vue";
import dayjs from "dayjs";
import { ProjectStatus } from "../../types/enum";
import { deviceType } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
import ComFooter from "../../components/layout/footer/footer.vue";

const orderService = useOrderService();
const { t, $u } = usePageFrame();
const queryOptions = ref();
const orderInfo = ref();
const tools = useTools();

onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("index.order.detail"),
  });

  queryOptions.value = options;
  if (queryOptions.value.orderNo) {
    const params = {
      orderNo: queryOptions.value.orderNo,
    };
    const result = await orderService.queryList(params);
    const data = result.data;
    if (data[0]) {
      orderInfo.value = data[0];
    }
  }
});

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

const onGoProjectDetail = (item: any) => {
  if (item.product.projectStatus === ProjectStatus.APPLICATION_FOR_PURCHASE) {
    // 设置值供给/pages/webview/webview使用
    tools.setWebviewParamsSync({});
    uni.navigateTo({
      url: `/pages/webview/webview?src=${encodeURIComponent(
        item.product.mobileLinkUrl
      )}`,
    });
  }
};

const onGoWallet = () => {
  uni.navigateTo({
    url: "/pages/personal-info/moneybag/index",
  });
};

const onGoToMyConsultant = () => {
  uni.navigateTo({
    url: "/pages/personal-info/broker/broker",
  });
};

const onGoToMyLawyer = () => {
  uni.navigateTo({
    url: "/pages/personal-info/lawyer/lawyer",
  });
};

const onGoUpdateInfo = (item: any) => {
  uni.navigateTo({
    url: "/pages/personal-info/info-update/index?orderId=" + item.id,
  });
};

const onToDo = (item: any) => {
  uni.navigateTo({
    url: "/pages/todo/index?orderId=" + item.id,
  });
};

const onFiles = (item: any) => {
  uni.navigateTo({
    url: "/pages/order/file-management?id=" + item.id,
  });
};
</script>

<style lang="scss" scoped>
.top {
  color: var(--info);
  background-color: #fff;
  .top-item {
    height: 66rpx;
    font-size: 24rpx;
    border: 1rpx solid var(--info);
    border-radius: 8rpx;
  }
}
.operate-button {
  margin: 0;
  width: 260rpx;
  height: 68rpx;
  border: none;
}
.operate-button-checked {
  color: #fff;
  background-color: #0050b3;
}
</style>
