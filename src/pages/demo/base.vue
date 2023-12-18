<template>
  <view></view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
const { onBack, t, $u } = usePageFrame();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.login.login"),
  });
});
</script>
