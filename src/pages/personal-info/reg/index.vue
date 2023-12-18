<template>
  <view class="reg_page">
    <u-skeleton
      :loading="loading"
      :animation="true"
      bgColor="#FFF"
    ></u-skeleton>
    <view class="u-skeleton reg_page_content pages">
      <ComRegS
        v-if="identityData && identityData.type === InvestorIdentityType.RegS"
      />
      <ComRegD
        v-if="identityData && identityData.type === InvestorIdentityType.RegD"
        :item="identityData"
      />
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import ComFooter from "../../../components/layout/footer/footer.vue";
import ComRegS from "./components/RegS.vue";
import ComRegD from "./components/RegD.vue";
import { DeviceType, InvestorIdentityType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { ref } from "vue";
import useUserStore from "../../../store/modules/user";
const { onBack, t, $u } = usePageFrame();
const loading = ref<boolean>(true);
const identityData = ref<any>();
const userStore = useUserStore();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.reg-sd"),
  });
});

onShow(async () => {
  identityData.value = await userStore.identity();
  loading.value = false;
  if (identityData.value.type === InvestorIdentityType.RegS) {
    uni.setNavigationBarTitle({
      title: "Reg S",
    });
  } else if (identityData.value.type === InvestorIdentityType.RegD) {
    uni.setNavigationBarTitle({
      title: "Reg D",
    });
  }
});
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
</style>
