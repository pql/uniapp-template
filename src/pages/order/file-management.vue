<template>
  <view>
    <z-paging
      ref="pagingRef"
      v-model="list"
      use-page-scroll
      hide-empty-view
      :refresher-enabled="false"
      @query="onQueryList"
    >
      <view
        class="pt-3 px-3"
        style="min-height: calc(100vh - 44px - var(--status-bar-height))"
        v-if="list.length"
      >
        <view v-for="(item, index) in list" :key="index">
          <ComFileItem :item="item" />
        </view>
      </view>
      <view
        class="d-flex j-center a-center"
        style="height: calc(100vh - 44px - var(--status-bar-height))"
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
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import useOrderService from "../../service/order/orderService";
import type { OrderFileForm } from "../../service/order/model/orderModel";
import { deviceType } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
import ComFooter from "../../components/layout/footer/footer.vue";
import ComFileItem from "./components/file-item.vue";
import { ref } from "vue";
const { t } = usePageFrame();
const orderService = useOrderService();
const queryOptions = ref();
const pagingRef = ref();
const list = ref<Array<any>>([]);
onLoad((options) => {
  uni.setNavigationBarTitle({
    title: t("product.my.files"),
  });

  queryOptions.value = options;
});

const onQueryList = async (pageNum: number = 1, pageSize: number = 10) => {
  const params = {
    id: queryOptions.value.id,
  } as OrderFileForm;
  const result = await orderService.getOrderFile(params);
  const data = result.data;
  list.value = data;
  pagingRef.value.complete(data);
};
</script>
