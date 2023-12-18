// 页面级别公共功能封装，方便在.vue文件中引用，公共变量，公共方法统一管理
import { $u } from "../vk-uview";
import { t } from "../locale/index";
import useTools from "./tools"

export default function () {
  const tools = useTools();
  const onBack = () => {
    const pages = getCurrentPages();
    if (pages.length === 1) {
      uni.switchTab({
        url: "/pages/tabbar/index/index",
      });
    } else {
      uni.navigateBack();
    }
  };
  return {
    onBack,
    $u,
    t,
    copy: tools.copy
  }
}