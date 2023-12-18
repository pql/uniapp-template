<template>
  <ComProductItem :product="productInfo" />
  <view>
    <text v-if="pdfFileLink">{{ tools.getNameByUrl(pdfFileLink) }}</text>
    <text
      class="ml-1 underline font-26"
      style="color: rgb(0, 80, 179)"
      @click="onPreviewPDF"
      >{{ $t("global.lookup") }}</text
    >
  </view>
  <view class="mt-12">
    <ComButton
      :title="$t('subscribe.step.sign')"
      :custom-style="customStyle"
      @onTap="onGoSign"
    />
  </view>
</template>

<script lang="ts" setup>
import ComProductItem from "./product-item.vue";
import usePageFrame from "../../../mixins/page-frame";
import useTools from "../../../mixins/tools";
import useCommonService from "../../../service/common/commonService";
import useOrderService from "../../../service/order/orderService";
import type { ConfirmSignForm } from "../../../service/order/model/orderModel";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { deviceType, isAndroid, isIOS, isWeb } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";
import ComButton from "../../../components/button/button.vue";

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const queryOptions = ref();
const tools = useTools();
const { t, $u } = usePageFrame();
const commonService = useCommonService();
const orderService = useOrderService();
const productInfo = ref();
const pdfFileLink = ref();

onLoad(async (options) => {
  queryOptions.value = options;

  if (queryOptions.value.productId) {
    const result = await commonService.getProductDetail(
      queryOptions.value.productId
    );
    const data = result.data;
    productInfo.value = data;
    pdfFileLink.value = data.signatureAgreementFile;

    uni.$on("receiveSignContractData", async (source: any) => {
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
        id: Number(
          queryOptions.value.collectId || queryOptions.value.productId
        ),
        payBrokerFee: productInfo.value.brokerFee > 0 ? true : false,
        payLawyerFee: productInfo.value.lawyerFee > 0 ? true : false,
        payManageFee: productInfo.value.manageFee > 0 ? true : false,
        componentList: source.componentList,
      } as ConfirmSignForm;
      const result = await orderService.confirmSign(params);
      const data = result.data;

      uni.$emit("receiveContentStep1Data", data);
    });
  }
});

const onPreviewPDF = () => {
  let viewerUrl = "/hybrid/html/dist/src/pages/pdfPreview/index.html";

  // 微信小程序、 h5(使用访问的时候记得跨域)
  // #ifdef H5 ||  MP-WEIXIN
  viewerUrl = `${
    import.meta.env.VITE_APP_WEBVIEW_API_BASE_URL
  }/src/pages/pdfPreview/index.html`;
  // #endif

  // #ifdef APP-PLUS
  viewerUrl = viewerUrl;
  // #endif

  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({
    productId: queryOptions.value.productId,
  });

  uni.navigateTo({
    url: "/pages/webview/webview?src=" + viewerUrl,
  });
};

const onGoSign = () => {
  let viewerUrl = "/hybrid/html/dist/src/pages/signContract/index.html";

  // 微信小程序、 h5(使用访问的时候记得跨域)
  // #ifdef H5 ||  MP-WEIXIN
  viewerUrl = `${
    import.meta.env.VITE_APP_WEBVIEW_API_BASE_URL
  }/src/pages/signContract/index.html`;
  // #endif

  // #ifdef APP-PLUS
  viewerUrl = viewerUrl;
  // #endif

  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({
    productId: queryOptions.value.productId,
    collectId: queryOptions.value.collectId,
  });

  uni.navigateTo({
    url: "/pages/webview/webview?src=" + viewerUrl,
  });
};
</script>
