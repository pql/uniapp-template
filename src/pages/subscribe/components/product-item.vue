<template>
  <view class="list_item p-3" v-if="product">
    <view class="top border-b flex justify-between px-2">
      <view class="flex">
        <u-image
          shape="circle"
          :src="
            product.signatureProductCompanyLogo ||
            product.signatureFundraiserAvatar
          "
          width="40rpx"
          height="40rpx"
        />
        <text class="ml-1">{{ product.companyName }}</text>
      </view>
    </view>
    <view class="box_1 box_border pt-2">
      <view class="flex_row title">
        <u-image
          show-loading
          :src="
            product.signatureBannerPicUrlList &&
            product.signatureProjectPicUrlList[0]
          "
          width="160rpx"
          height="136rpx"
        ></u-image>
        <view class="right">
          <view class="font-30 font-weight-600">{{ product.productName }}</view>
          <view class="font-26"
            ><text>{{ $t("project.address") }}</text
            >：{{ product.productCity }}</view
          >
        </view>
      </view>
      <view>
        <view
          ><text>{{ $t("investment.amount") }}：</text
          >{{ tools.toAddPrefix(product.perInvestAmount) }}</view
        >
        <view
          ><text>{{ $t("invest.years") }}：</text
          >{{ product.investYears }}年</view
        >
        <view
          ><text>{{ $t("retribution") }}：</text>{{ roiType(product) }}</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePageFrame from "../../../mixins/page-frame";
import useTools from "../../../mixins/tools";

export default defineComponent({
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const { t, $u } = usePageFrame();
    const tools = useTools();

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
    return {
      tools,
      roiType,
    };
  },
});
</script>

<style lang="scss" scoped>
.list_item {
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 1);
  font-size: 22rpx;
  line-height: 40rpx;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 24rpx;
  .top {
    align-items: center;
    height: 90rpx;
    font-size: 26rpx;
    letter-spacing: 0.42rpx;
    color: rgba(0, 0, 0, 0.4);
  }
  .box_1 {
    .title {
      font-size: 32rpx;
      line-height: 38rpx;
      line-height: 45rpx;
      color: rgba(0, 0, 0, 0.9);
      margin-bottom: 20rpx;
    }
    .right {
      margin-left: 24rpx;
    }
  }
  .box_3 {
    position: relative;
    justify-content: space-between;
    align-items: flex-end;
    .btn_go_buy {
      padding: 0;
      font-size: 28rpx;
      width: 168rpx;
      height: 68rpx;
      line-height: 68rpx;
      opacity: 1;
      border-radius: 6rpx;
      background: rgba(0, 80, 179, 1);
      color: #fff;
    }
    .collection_fail_img {
      position: absolute;
      top: -80rpx;
      right: 32rpx;
    }
  }
}
</style>
