<template>
  <view class="content">
    <view>当前应用设置页面转场动画名：{{ appConfigStore.pageAnim }}</view>
    <Transition :name="appConfigStore.pageAnim">
      <u-button type="primary" @click="changePageAnim"
        >更改页面转场动画名为"{{ appConfigStore.pageAnim }}"</u-button
      >
    </Transition>
  </view>
</template>

<script setup lang="ts">
import useAppConfigStore from "../../store/modules/app-config";
import { PageAnim } from "../../types/enum";

const appConfigStore = useAppConfigStore();

const changePageAnim = () => {
  if (appConfigStore.pageAnim === PageAnim.OPACITY) {
    appConfigStore.changePageAnim(PageAnim.DOWN);
  } else if (appConfigStore.pageAnim === PageAnim.DOWN) {
    appConfigStore.changePageAnim(PageAnim.OPACITY);
  }
};
</script>
