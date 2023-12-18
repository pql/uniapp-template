<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "./style/tailwind.scss";
@import "vk-uview-ui/index.scss";
@import "./style/transition.css";
@import "./style/public.scss";
</style>
