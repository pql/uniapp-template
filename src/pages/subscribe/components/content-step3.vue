<template>
  <view>
    <view class="flex items-center flex-col justify-center">
      <u-icon name="checkmark-circle-fill" color="#19be6b" size="60" />
      <text class="mt-2">{{ $t("product.pay.success") }}</text>
      <view class="mt-2">
        <text>
          {{ $t("product.pay.success.tips-1") }}
        </text>
        <text style="color: rgba(0, 80, 179, 1)" @click="onGoMyOrder">
          {{ $t("user.menu.orders") }}
        </text>
        <text>
          {{ $t("product.pay.success.tips-2") }}
        </text>
      </view>
    </view>
    <view class="mt-6 border p-3 rounded">
      <view>
        <view
          v-if="orderInfo && orderInfo.product && orderInfo.product.productName"
        >
          <text class="text-sm" style="color: #909399">
            {{ $t("product.pay.product-name") }}：
          </text>
          <text style="color: #606266">
            {{ orderInfo.product.productName }}
          </text>
        </view>
        <view v-if="orderInfo && orderInfo.orderNo">
          <text class="text-sm" style="color: #909399">
            {{ $t("user.wallet.order-no") }}：
          </text>
          <text style="color: #606266">
            {{ orderInfo.orderNo }}
          </text>
        </view>
        <view v-if="orderInfo && orderInfo.product && orderInfo.product.type">
          <text class="text-sm" style="color: #909399">
            {{ $t("product.product-type") }}：
          </text>
          <text style="color: #606266">
            {{ orderInfo.product.type }}
          </text>
        </view>
        <view
          v-if="
            orderInfo && orderInfo.product && orderInfo.product.perInvestAmount
          "
        >
          <text class="text-sm" style="color: #909399">
            {{ $t("investment.amount") }}：
          </text>
          <text style="color: #606266">
            ${{ tools.formatNum(orderInfo.product.perInvestAmount) }}
          </text>
        </view>
      </view>
    </view>
    <view class="mt-6 flex">
      <ComButton
        :title="$t('index.order.detail')"
        :custom-style="customStyle"
        @onTap="onGoOrderDetail(orderInfo)"
      />

      <ComButton
        :title="$t('index.back-home')"
        :custom-style="customStyle"
        @onTap="onGoHome"
      />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import useOrderService from "../../../service/order/orderService";
import useTools from "../../../mixins/tools";
import ComButton from "../../../components/button/button.vue";

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const queryOptions = ref();
const orderService = useOrderService();
const orderInfo = ref();
const tools = useTools();

onLoad(async (options) => {
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

const onGoMyOrder = () => {
  uni.switchTab({
    url: "/pages/tabbar/order/index",
  });
};

const onGoOrderDetail = (order: any) => {
  uni.navigateTo({
    url: "/pages/order/detail?orderNo=" + order.orderNo,
  });
};

const onGoHome = () => {
  uni.switchTab({
    url: "/pages/tabbar/index/index",
  });
};
</script>
