<template>
  <ComProductItem :product="productInfo" />
  <view>
    <text>{{ $t("user.wallet.table.balance") }}：</text>
    <text>${{ tools.formatNum(confirmSignInfo.totalAmount) }}</text>
  </view>
  <view>
    <text>{{ $t("user.wallet.table.available") }}：</text>
    <text> ${{ tools.formatNum(confirmSignInfo.availableAmount) }} </text>
  </view>
  <view class="mt-12">
    <ComButton
      :title="$t('subscribe.confirm.pay')"
      :custom-style="customStyle"
      @onTap="onConfirmPayment"
    />
  </view>
  <!-- 充值弹框 -->
  <u-popup
    v-model="showRechargePopup"
    mode="center"
    closeable
    border-radius="16"
    width="90%"
    @close="onRechargePopupClose"
  >
    <view class="p-3">
      <view>
        {{ $t("product.recharge.please") }}
      </view>
      <view class="mt-3">{{ $t("product.recharge.subtitle") }}</view>
      <view class="mt-3">
        <ComButton
          :title="$t('product.recharge.go')"
          :custom-style="customStyle"
          @onTap="onGoRecharge"
        />
      </view>
    </view>
  </u-popup>
  <!-- 充值弹框 -->
</template>

<script lang="ts" setup>
import ComProductItem from "./product-item.vue";
import usePageFrame from "../../../mixins/page-frame";
import useTools from "../../../mixins/tools";
import useCommonService from "../../../service/common/commonService";
import useOrderService from "../../../service/order/orderService";
import type { OrderPayForm } from "../../../service/order/model/orderModel";
import { ref, computed } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { deviceType, isAndroid, isIOS, isWeb } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";
import useUserStore from "../../../store/modules/user";
import ComButton from "../../../components/button/button.vue";

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const confirmSignInfo = ref({
  availableAmount: 0,
  orderId: 0,
  orderNo: "0",
  totalAmount: 0,
});
const showRechargePopup = ref<boolean>(false);
const queryOptions = ref();
const tools = useTools();
const { t, $u } = usePageFrame();
const commonService = useCommonService();
const orderService = useOrderService();
const productInfo = ref();
const orderInfo = ref();
const walletData = ref<Array<any>>([]);

const userStore = useUserStore();

onLoad(async (options) => {
  queryOptions.value = options;
  if (queryOptions.value.productId) {
    const result = await commonService.getProductDetail(
      queryOptions.value.productId
    );
    const data = result.data;
    productInfo.value = data;
  }

  if (queryOptions.value.orderNo) {
    const params = { orderNo: queryOptions.value.orderNo };
    const result = await orderService.queryList(params);
    const data = result.data;
    orderInfo.value = data[0];
    confirmSignInfo.value.orderId = orderInfo.value.id;
    confirmSignInfo.value.orderNo = orderInfo.value.orderNo;
    confirmSignInfo.value.totalAmount =
      (orderInfo.value.amount || 0) +
      (orderInfo.value.product.lawyerFee || 0) +
      (orderInfo.value.product.brokerFee || 0) +
      (orderInfo.value.product.manageFee || 0);
  }

  uni.$on("receiveContentStep1Data", async (source: any) => {
    confirmSignInfo.value.orderId = source.orderId;
    confirmSignInfo.value.orderNo = source.orderNo;
    confirmSignInfo.value.totalAmount = source.totalAmount;
  });
});

onShow(async () => {
  walletData.value = await userStore.walletInfo();
  confirmSignInfo.value.availableAmount = getWalletInfo.value.root.available;
});

const onGoRecharge = () => {
  showRechargePopup.value = false;
  uni.navigateTo({
    url: "/pages/personal-info/moneybag/index",
  });
};

const getWalletInfo = computed(() => {
  const root =
    walletData.value.find((item) => item.walletType === "ROOT") || {};
  const total = walletData.value.reduce((prev, current) => {
    return prev + current.available;
  }, 0);
  const projects =
    walletData.value.filter((item) => item.walletType === "PROJECT") || [];
  return {
    root, //根钱包
    total, //全部余额
    projects, //子钱包
  };
});

const onRechargePopupClose = () => {
  showRechargePopup.value = false;
};

const onConfirmPayment = async () => {
  if (
    confirmSignInfo.value.availableAmount < confirmSignInfo.value.totalAmount
  ) {
    showRechargePopup.value = true;
  } else {
    const params = {
      channel:
        deviceType === DeviceType.PC
          ? 0
          : deviceType === DeviceType.PHONE && isWeb
          ? 1
          : deviceType === DeviceType.PHONE && isAndroid
          ? 3
          : deviceType === DeviceType.PHONE && isIOS
          ? 2
          : 0,
      id: confirmSignInfo.value.orderId,
    } as OrderPayForm;
    const result = await orderService.orderPay(params);
    const data = result.data;
    if (data) {
      uni.navigateTo({
        url: `/pages/subscribe/index?productId=${
          queryOptions.value.productId
        }&collectId=${queryOptions.value.collectId}&currentStep=2&orderNo=${
          confirmSignInfo.value.orderNo || orderInfo.value.orderNo
        }`,
      });
    }
  }
};
</script>
