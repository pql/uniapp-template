<template>
  <view class="collection_page">
    <z-paging
      ref="pagingRef"
      v-model="list"
      use-page-scroll
      hide-empty-view
      @query="onQueryList"
    >
      <!-- content -->
      <view class="content">
        <view class="list_item" v-for="(item, index) in list" :key="index">
          <view class="top border-b border-gray-200 flex justify-between px-2">
            <view class="flex">
              <u-image
                shape="circle"
                :src="
                  item.product.signatureProductCompanyLogo ||
                  item.product.signatureFundraiserAvatar
                "
                width="40rpx"
                height="40rpx"
              />
              <text class="ml-1">{{ item.product.companyName }}</text>
            </view>
            <view>
              <u-icon
                name="trash-fill"
                color="rgba(196, 196, 196, 1)"
                size="40"
                @click="onDelete(index, item.collectionNo)"
              ></u-icon>
            </view>
          </view>
          <view class="box_1 box_border">
            <view class="flex_row title">
              <u-image
                show-loading
                :src="
                  item.product.signatureBannerPicUrlList &&
                  item.product.signatureProjectPicUrlList[0]
                "
                width="160rpx"
                height="136rpx"
              ></u-image>
              <view class="right">
                <view class="font-30 font-weight-600">{{
                  item.product.productName
                }}</view>
                <view class="font-26"
                  ><text>{{ $t("project.address") }}</text
                  >：{{ item.product.productCity }}</view
                >
              </view>
            </view>
            <view>
              <view
                ><text>{{ $t("investment.amount") }}：</text
                >{{ tools.toAddPrefix(item.product.perInvestAmount) }}</view
              >
              <view
                ><text>{{ $t("administrative.fee") }}：</text
                >{{ tools.toAddPrefix(item.product.manageFee) }}</view
              >
              <view
                ><text>{{ $t("consulting.fee") }}：</text
                >{{ tools.toAddPrefix(item.product.brokerFee) }}</view
              >
              <view
                ><text>{{ $t("counsel.fee") }}：</text
                >{{ tools.toAddPrefix(item.product.lawyerFee) }}</view
              >
            </view>
          </view>
          <view class="box_border box_2">
            <view
              ><text>{{ $t("invest.years") }}：</text
              >{{ item.product.investYears }}年</view
            >
            <view>
              {{ $t("eb5.information.delay") }}：
              <text v-if="item.product.borrowerExtensionNum"
                >{{ item.product.borrowerExtensionNum
                }}{{ $t("eb5.information.delayTip") }}</text
              >
              <text v-else>{{ $t("global.no-data") }}</text>
            </view>
            <view
              ><text>{{ $t("retribution") }}：</text>{{ roiType(item.product) }}
            </view>
            <view
              ><text>{{ $t("product.state") }}：</text
              >{{ item.product.productState }}</view
            >
            <view
              ><text>{{ $t("product.city") }}：</text
              >{{ item.product.productCity }}</view
            >
            <view
              ><text>{{ $t("region.category") }}：</text
              >{{ item.product.regionCategory }}</view
            >
            <view
              ><text>{{ $t("immigrant.number") }}：</text
              >{{ item.product.immigrantNum }}</view
            >
            <view
              ><text>{{ $t("create.job.number") }}：</text
              >{{ item.product.createJobNum }}</view
            >
            <view
              ><text>{{ $t("employment.requirements") }}：</text
              >{{ item.product.employmentRequirements }}</view
            >
          </view>
          <view class="box_3 flex_row box_border">
            <view>
              <view
                ><text>{{ $t("release.status") }}：</text
                >{{ fundStatus(item.product.fundStatus) }}</view
              >
              <view
                ><text>{{ $t("project.progress") }}：</text
                >{{ progressStatus(item.product.progressStatus) }}</view
              >
            </view>
            <view v-if="item.product.projectStatus == 2">
              <button
                style="min-width: 300rpx"
                class="btn_go_buy"
                hover-class="button-hover"
                @click="onGoAndSubscribe(item)"
              >
                {{ $t("go.and.subscribe") }}
              </button>
            </view>
            <image
              v-else
              class="collection_fail_img"
              style="width: 200rpx; height: 200rpx"
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/collection_fail.png"
              mode="scaleToFill"
            />
          </view>
        </view>
        <u-empty
          v-if="!list.length"
          :text="$t('global.list.is.empty')"
          mode="list"
          icon="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
          width="104"
          height="104"
          marginTop="200"
        >
        </u-empty>
      </view>
      <!-- content -->
    </z-paging>
    <!-- 选择合适服务 -->
    <u-popup
      v-model="showSuitableServicePopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
      @close="onSuitableServicePopupClose"
    >
      <view class="p-3">
        <view class="font-bold mb-3" v-if="checkboxList.length > 0">{{
          $t("subscribe.choose.suitable.service")
        }}</view>
        <view class="mb-3">
          <u-checkbox-group @change="onCheckboxGroupChange">
            <view v-for="(item, index) in checkboxList" :key="index">
              <u-checkbox
                v-model="item.checked"
                :key="index"
                :name="item.name"
                active-color="#1D429F"
              >
                <view>{{ item.name }}</view>
              </u-checkbox>
            </view>
          </u-checkbox-group>
        </view>
        <ComButton
          :title="$t('subscribe.place-an-order')"
          :disabled="disabledButton"
          :custom-style="customStyle"
          @onTap="onPlaceAnOrder"
        />
      </view>
    </u-popup>
    <!-- 选择合适服务 -->
    <!-- 存在未支付订单 -->
    <u-popup
      v-model="showNoPayOrderPopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
      @close="onNoPayOrderPopupClose"
    >
      <view class="p-3">
        <view class="font-bold mb-3">{{ $t("product.unpaied.title") }}</view>
        <view class="mb-3">
          {{ $t("product.unpaied.subtitle") }}
        </view>
        <ComButton
          :title="$t('product.gopay')"
          :custom-style="customStyle"
          @onTap="onGoPay"
        />
      </view>
    </u-popup>
    <!-- 存在未支付订单 -->
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import usePageFrame from "../../../mixins/page-frame";
import useUserStore from "../../../store/modules/user";
import useOrderService from "../../../service/order/orderService";
import ComButton from "../../../components/button/button.vue";
import useTools from "../../../mixins/tools";
import { onLoad } from "@dcloudio/uni-app";
import type { PlaceAnOrderBeforeConditionForm } from "../../../service/order/model/orderModel";
import { deviceType, isAndroid, isIOS, isWeb } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.collection"),
  });
});

const tools = useTools();
const { onBack, t, $u } = usePageFrame();
const userStore = useUserStore();
const orderService = useOrderService();
const showSuitableServicePopup = ref<boolean>(false);
const showNoPayOrderPopup = ref<boolean>(false);
const currentTarget = ref();
const checkboxList = ref<Array<any>>([]);
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

const list = ref<Array<any>>([]);
const pagingRef = ref();
const disabledButton = ref<boolean>(false);

const onQueryList = async (pageNum: number, pageSize: number) => {
  const params = {
    pageNum,
    pageSize,
  };
  const data = await userStore.getCollectionList(params);
  list.value = data;
  pagingRef.value.complete(data);
};

const onSuitableServicePopupClose = () => {
  showSuitableServicePopup.value = false;
};
// 选中任一checkbox时，由checkbox-group触发
const onCheckboxGroupChange = (e: any) => {
  if (checkboxList.value.length > 0) {
    const bool = checkboxList.value.every((item: any) => item.checked);
    disabledButton.value = bool;
  } else {
    disabledButton.value = false;
  }
};

const onGoAndSubscribe = async (collect: any) => {
  const result = await orderService.hasNoPayOrder();
  const data = result.data;
  if (!data) {
    // 不存在未支付订单
    const list = [];
    if (collect.product.lawyerFee && collect.product.lawyerFee > 0) {
      list.push({
        name:
          t("subscribe.lawyer.fee") +
          " " +
          "$" +
          tools.formatNum(collect.product.lawyerFee),
        checked: true,
      });
    }
    if (collect.product.brokerFee && collect.product.brokerFee > 0) {
      list.push({
        name:
          t("subscribe.broker.fee") +
          " " +
          "$" +
          tools.formatNum(collect.product.brokerFee),
        checked: true,
      });
      if (collect.product.manageFee && collect.product.manageFee > 0) {
        list.push({
          name:
            t("subscribe.manage.fee") +
            " " +
            "$" +
            tools.formatNum(collect.product.manageFee),
          checked: true,
        });
      }
    }
    checkboxList.value = list;
    currentTarget.value = collect;
    showSuitableServicePopup.value = true;
  } else {
    // 存在未支付订单
    showNoPayOrderPopup.value = true;
  }
};

const onNoPayOrderPopupClose = () => {
  showNoPayOrderPopup.value = false;
};

const onGoPay = () => {
  uni.switchTab({
    url: "/pages/tabbar/order/index",
  });
};

const onPlaceAnOrder = async () => {
  const params = {
    id: currentTarget.value.id,
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
    payLawyerFee: checkboxList.value[0].checked,
    payBrokerFee: checkboxList.value[1].checked,
    payManageFee: checkboxList.value[2].checked,
  } as PlaceAnOrderBeforeConditionForm;
  const result = await orderService.placeAnOrderBeforeCondition(params);
  const data = result.data;
  showSuitableServicePopup.value = false;
  if (data) {
    uni.navigateTo({
      url:
        "/pages/subscribe/index?productId=" +
        currentTarget.value.productId +
        "&collectId=" +
        currentTarget.value.id,
    });
  }
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

const fundStatus = (status: number) => {
  return status === 1
    ? t("ready.for.launch")
    : status === 2
    ? t("on.the.way")
    : status === 3
    ? t("complete.collection")
    : "";
};

const progressStatus = (status: number) => {
  switch (status) {
    case 1:
      return t("in.project.planning");
    case 2:
      return t("in.preparation.for.construction");
    case 3:
      return t("in.foundation.construction");
    case 4:
      return t("under.main.construction");
    case 5:
      return t("under.internal.construction");
    case 6:
      return t("it.is.finished");
    case 7:
      return t("project.under.lease");
    case 8:
      return t("project.sales.in.progress");
    case 9:
      return t("completion.of.rental.sale");
    default:
      return "";
  }
};

const onDelete = async (index: number, id: number | string) => {
  list.value.splice(index, 1);
  await userStore.deleteCollection(id);
  $u.toast(t("global.success"));
};
</script>

<style lang="scss" scoped>
.collection_page {
  .content {
    margin: 32rpx;
    .box_border {
      padding: 24rpx;
      border-bottom: 1rpx solid rgba(235, 235, 235, 1);
    }
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
  }
}
</style>
