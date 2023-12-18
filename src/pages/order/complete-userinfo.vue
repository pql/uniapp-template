<template>
  <view>
    <ComBasicInfo />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import ComBasicInfo from "./components/basic-info.vue";
import { ref } from "vue";
const { t } = usePageFrame();
const queryOptions = ref();
onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("product.files.fullfill"),
  });

  queryOptions.value = options;
});
</script>
