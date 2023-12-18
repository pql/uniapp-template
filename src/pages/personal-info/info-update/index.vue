<template>
  <view>
    <view>
      <view>
        <u-tabs-swiper
          ref="uTabsRef"
          :current="current"
          :list="tabsList"
          :is-scroll="false"
          active-color="#304EB5"
          inactive-color="#999999"
          bar-width="187"
          @change="onTabsChange"
        ></u-tabs-swiper>
      </view>
      <swiper
        style="height: 100vh; width: 100%"
        :current="swiperCurrent"
        @transition="onTransition"
        @animationfinish="onAnimationfinish"
      >
        <swiper-item style="overflow: auto">
          <ComListItem :list="list" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import { ref } from "vue";
import useOrderService from "../../../service/order/orderService";
import type { InfoListForm } from "../../../service/order/model/orderModel";
import ComListItem from "./components/list-item.vue";
const orderService = useOrderService();
const { t } = usePageFrame();
const uTabsRef = ref();

const queryOptions = ref();
const tabsList = ref<Array<any>>([
  { name: t("user.register.fundraiser") },
  { name: t("user.register.lawyer") },
  { name: t("user.register.consult") },
]);

const list = ref<Array<any>>([]);
// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
const current = ref<number>(0); // tabs组件的current值，表示当前活动的tab选项
const swiperCurrent = ref<number>(0); // swiper组件的current值，表示当前那个swiper-item是活动的

const roles = ref(["FUNDRAISER", "LAWYER", "BROKER"]);

onLoad((options) => {
  uni.setNavigationBarTitle({
    title: t("product.my.file.update"),
  });

  queryOptions.value = options;

  onQueryList();
});

const onQueryList = async (pageNum: number = 1, pageSize: number = 10) => {
  const params = {
    productId: queryOptions.value.productId,
    orderId: queryOptions.value.orderId,
    operatorType: roles.value[current.value],
    pageNum,
    pageSize,
  } as InfoListForm;
  const result = await orderService.infoList(params);
  const data = result.data;
  list.value = data;
};

const onTabsChange = (index: number) => {
  current.value = index;
  onQueryList();
};

const onTransition = (e: any) => {
  const dx = e.detail.dx;
  uTabsRef.value.setDx(dx);
};

const onAnimationfinish = (e: any) => {
  const curr = e.detail.current;
  uTabsRef.value.setFinishCurrent(curr);

  swiperCurrent.value = curr;
  current.value = curr;

  onQueryList();
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}
.event_state_area {
  padding: 16rpx;
  align-items: center;
  justify-content: center;
  .btn {
    padding: 0;
    margin: 8rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    width: 200rpx;
    height: 52rpx;
    line-height: 52rpx;
    color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    border-radius: 8rpx;
    background: rgba(240, 240, 240, 1);
  }
  .active_btn {
    color: rgba(31, 121, 219, 1);
    background: rgba(237, 245, 255, 1);
  }
}
</style>
