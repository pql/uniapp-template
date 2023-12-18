<template>
  <view>
    <web-view :src="src" @message="handleMessage"></web-view>
  </view>
</template>

<script setup lang="ts">
import { onBackPress, onLoad, onReady, onUnload } from "@dcloudio/uni-app";
import { ref } from "vue";
import useUserStore from "../../store/modules/user";
import useTools from "../../mixins/tools";
const tools = useTools();
let wv; // 计划创建的webview
const userStore = useUserStore();
const src = ref<string>();

onLoad(async (options: any) => {
  await userStore.getUserInfo();
  if (options.src) {
    const params = tools.getWebviewParamsSync();
    let externalURLParamString = "";
    Object.keys(params).forEach((key) => {
      externalURLParamString += `&${key}=${params[key]}`;
    });
    if (options.src.indexOf("?") === -1) {
      let url =
        options.src + "?token=" + userStore.token + externalURLParamString;
      src.value = decodeURIComponent(url);
    } else {
      let url =
        options.src + "&token=" + userStore.token + externalURLParamString;
      src.value = decodeURIComponent(url);
    }
  }

  // #ifdef H5
  window.addEventListener("message", handleMessageH5, false);
  // #endif
});

onReady(() => {
  // #ifdef APP-PLUS
  const pages = getCurrentPages();
  const page: any = pages[pages.length - 1];
  const currentWebview = page.$getAppWebview();
  setTimeout(() => {
    wv = currentWebview.children()[0];
    // wv.setStyle({ top: 150, height: 300 });
  }, 1000);
  // #endif
});

onUnload(() => {
  // #ifdef H5
  window.removeEventListener("message", handleMessageH5, false);
  // #endif
});

const getParam = (path: string, name: string) => {
  const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(path)) {
    return unescape(RegExp.$2.replace(/\+/g, " "));
  }
  return "";
};

const handleMessage = (data: any) => {
  const res = data.detail.data;
  if (res[0].action === "onSignContract") {
    const componentList = res[0].value.componentList;
    uni.navigateTo({
      url: `/pages/subscribe/index?productId=${getParam(
        src.value!,
        "productId"
      )}&collectId=${getParam(src.value!, "collectId")}&currentStep=1`,
    });
    uni.$emit("receiveSignContractData", {
      componentList: componentList,
    });
  } else if (res[0].action === "onContactConsultantForDetail") {
    uni.reLaunch({
      url: "/pages/tabbar/index/index?showContactConsultantPopup=1",
    });
  }
};
const handleMessageH5 = (data: any) => {
  if (data.data.data.data === "toBack") {
    uni.navigateBack();
  } else if (data.data.data.data === "toLogin") {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
};
</script>
