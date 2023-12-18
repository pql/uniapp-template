<template>
  <view class="w-full h-screen" style="background: #ffffff">
    <z-paging
      ref="pagingRef"
      v-model="list"
      hide-empty-view
      :fixed="false"
      :refresher-enabled="false"
      :use-page-scroll="false"
      @query="onQuery"
    >
      <view>
        <u-tabs-swiper
          ref="uTabsRef"
          :list="tabList"
          :current="current"
          active-color="rgba(0, 80, 179, 1)"
          :show-bar="false"
          @change="onChangeTab"
          :is-scroll="false"
        ></u-tabs-swiper>
      </view>
      <swiper
        :current="swiperCurrent"
        @transition="onTransition"
        @animationfinish="onAnimationFinish"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in swiperList"
          :key="index"
        >
          <scroll-view scroll-y style="height: 600rpx; width: 100%">
            <view
              class="list-item m-2 p-2"
              v-for="(item, index) in list"
              :key="index"
            >
              <view class="amount flex_row_jus_betw">
                <text>{{ contentType }}</text>
                ${{ tools.formatNum(item.amount) }}
              </view>
              <view class="info">
                <view>
                  <text> {{ $t("user.wallet.table.number") }}： </text>
                  <text>
                    {{
                      item.depositNo || item.withdrawNo || item.transactionNo
                    }}
                  </text>
                </view>
                <block v-if="swiperCurrent !== 2">
                  <view v-if="swiperCurrent === 0">
                    <text>{{ $t("user.wallet.table.finish-time") }}：</text>
                    <text>{{ item.createTime }}</text>
                  </view>
                  <block v-if="swiperCurrent === 1">
                    <view>
                      <text>{{ $t("user.wallet.table.status") }}：</text>
                      <!-- 状态 0提现中 1-成功 2-失败-->
                      <text style="color: rgba(0, 0, 0, 0.8)">{{
                        item.status === 0
                          ? $t("user.wallet.table.status.withdrawaling")
                          : item.status == 1
                          ? $t("user.wallet.table.status.success")
                          : $t("user.wallet.table.status.fail")
                      }}</text>
                    </view>
                    <view>
                      <!-- 提现申请时间-->
                      <text>
                        {{
                          $t("user.wallet.table.withdrawal-application-time")
                        }}：
                      </text>
                      <text>{{ item.createTime }}</text>
                    </view>
                    <view v-if="item.status === 1">
                      <!-- 到账时间-->
                      <text>
                        {{ $t("user.wallet.table.arrival-time") }}：
                      </text>
                      <text>{{ item.updateTime }}</text>
                    </view>
                  </block>
                  <view>
                    <text>{{ $t("user.wallet.table.balance") }}：</text>
                    <text>{{ item.afterAmount }}</text>
                  </view>
                </block>
                <block v-else>
                  <view>
                    <text> {{ $t("user.wallet.table.from") }}： </text>
                    <text>
                      {{
                        index % 2 == 0
                          ? item.toWalletRemark
                          : item.fromWalletRemark
                      }}
                    </text>
                  </view>
                  <view>
                    <text>{{ $t("user.wallet.table.to") }}：</text>
                    <text>{{
                      index % 2 != 0
                        ? item.toWalletRemark
                        : item.fromWalletRemark
                    }}</text>
                  </view>
                  <view>
                    <text>{{ $t("user.wallet.table.trading-time") }}：</text>
                    <text>{{ item.createTime }}</text>
                  </view>
                  <view>
                    <text>{{ $t("user.wallet.table.reason") }}：</text>
                    <text>{{ item.remark }}</text>
                  </view>
                </block>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../../mixins/page-frame";
import { defineExpose, ref, computed } from "vue";
import useWalletService from "../../../../service/wallet/walletService";
import useTools from "../../../../mixins/tools";
const { onBack, t, $u } = usePageFrame();
const tools = useTools();
const list = ref<Array<any>>([]);
const pagingRef = ref();
const uTabsRef = ref();
const tabList = ref<Array<any>>([
  {
    name: t("user.wallet.deposit"),
  },
  {
    name: t("user.wallet.withdrawal"),
  },
  {
    name: t("user.wallet.trade"),
  },
]);
const swiperList = ref<Array<any>>([
  {
    name: t("user.wallet.deposit"),
  },
  {
    name: t("user.wallet.withdrawal"),
  },
  {
    name: t("user.wallet.trade"),
  },
]);
const current = ref<number>(0); // tabs组件的current值，表示当前活动的tab选项
const swiperCurrent = ref<number>(0); // swiper组件的current值，表示当前那个swiper-item是活动的
const walletService = useWalletService();

const contentType = computed(() => {
  if (swiperCurrent.value === 0) {
    return t("user.wallet.deposit");
  } else if (swiperCurrent.value === 1) {
    return t("user.wallet.withdrawal");
  } else if (swiperCurrent.value === 2) {
    return t("user.wallet.trade");
  }
});

// swiper-item左右移动，通知tabs的滑块跟随移动
const onTransition = (e: any) => {
  const dx = e.detail.dx;
  uTabsRef.value.setDx(dx);
};

// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
const onAnimationFinish = (e: any) => {
  const curr = e.detail.current;
  uTabsRef.value.setFinishCurrent(curr);
  current.value = curr;
  swiperCurrent.value = curr;
  onQuery();
};

const onQuery = async (pageNum: number = 1, pageSize: number = 10) => {
  const params = { pageNum, pageSize };
  if (swiperCurrent.value === 0) {
    const result = await walletService.depositList(params);
    const data = result.data;
    list.value = data;
    pagingRef.value.complete(data);
  } else if (swiperCurrent.value === 1) {
    const result = await walletService.withdrawList(params);
    const data = result.data;
    list.value = data;
    pagingRef.value.complete(data);
  } else if (swiperCurrent.value === 2) {
    const result = await walletService.transactionList(params);
    const data = result.data;
    list.value = data;
    pagingRef.value.complete(data);
  }
};

const onChangeTab = (index: number) => {
  swiperCurrent.value = index;
  onQuery();
};
defineExpose({
  onQuery,
});
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  font-size: 24rpx;
}
.swiper-item {
}
.list-item {
  background: rgba(245, 245, 245, 1);
  list-style: none;
  .amount {
    font-size: 26rpx;
    font-weight: 500;
  }
  .info {
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    view {
      flex: 1;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0.42rpx;
      line-height: 40rpx;
    }
  }
}
</style>
