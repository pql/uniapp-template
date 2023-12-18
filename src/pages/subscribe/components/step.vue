<template>
  <view>
    <u-steps
      :list="stepList"
      mode="number"
      direction="column"
      active-color="rgb(0, 80, 179)"
      :current="current"
    ></u-steps>
  </view>
</template>

<script lang="ts">
import { ref } from "vue";
import usePageFrame from "../../../mixins/page-frame";
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const { t } = usePageFrame();
    const stepList = ref<Array<any>>([
      {
        name: t("subscribe.step.step1.name"),
      },
      {
        name: t("subscribe.step.step2.name"),
      },
      {
        name: t("subscribe.step.step3.name"),
      },
    ]);
    return {
      stepList,
    };
  },
};
</script>
