<template>
  <view class="p-3">
    <ComStep :current="currentStep" @updateCurrentStep="onUpdateCurrentStep" />
    <view class="border-b mb-4 border-gray-200"></view>
    <ComContentStep1 v-if="currentStep === 0" />
    <ComContentStep2 v-else-if="currentStep === 1" />
    <ComContentStep3 v-else-if="currentStep === 2" />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import ComStep from "./components/step.vue";
import ComContentStep1 from "./components/content-step1.vue";
import ComContentStep2 from "./components/content-step2.vue";
import ComContentStep3 from "./components/content-step3.vue";
import usePageFrame from "../../mixins/page-frame";
import useCommonService from "../../service/common/commonService";
import useTools from "../../mixins/tools";
import { ref } from "vue";
const tools = useTools();
const { t, $u } = usePageFrame();
const commonService = useCommonService();
const queryOptions = ref();
const currentStep = ref(0);

onLoad((options: any) => {
  uni.setNavigationBarTitle({
    title: t("user.menu.sign"),
  });

  queryOptions.value = options;

  if (options.currentStep) {
    currentStep.value = Number(options.currentStep);
  }
});

const onUpdateCurrentStep = (step: number) => {
  currentStep.value = step;
};
</script>
