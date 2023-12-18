<template>
  <view>
    <view>
      <u-tabs-swiper
        ref="uTabsRef"
        :current="current"
        :list="tabList"
        :is-scroll="false"
        active-color="#304EB5"
        inactive-color="#999999"
        bar-width="200"
        @change="onTabsChange"
      ></u-tabs-swiper>
    </view>
    <swiper
      style="height: 100vh; width: 100%"
      :current="swiperCurrent"
      @transition="onTransition"
      @animationfinish="onAnimationfinish"
    >
      <swiper-item v-show="swiperCurrent === 0" style="overflow: auto">
        <scroll-view
          scroll-y
          style="height: 100vh; width: 100%"
          @scrolltolower="onReachBottom"
        >
          <view class="p-3">
            <u-image
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/project-usa.png"
              width="100%"
              height="240"
              @click="onGoUSAProjectDetail"
            ></u-image>
            <view class="font-32 font-bold mt-4 mb-2 text-black">移民项目</view>
            <view
              v-for="(item, index) in projectList"
              :key="index"
              class="project-card"
              @click="onProjectDetail(item)"
            >
              <u-image width="100%" height="290" :src="item.listImg"></u-image>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item v-show="swiperCurrent === 1" style="overflow: auto">
        <scroll-view
          scroll-y
          style="height: 100vh; width: 100%"
          @scrolltolower="onReachBottom"
        >
          <view class="p-3">
            <u-image
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/project-canada.png"
              width="100%"
              height="240"
              @click="onGoCANADAProjectDetail"
            ></u-image>
            <view class="font-32 font-bold mt-4 mb-2 text-black">移民项目</view>
            <view
              v-for="(item, index) in projectList"
              :key="index"
              class="project-card"
              @click="onProjectDetail(item)"
            >
              <u-image width="100%" height="290" :src="item.listImg"></u-image>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import { ref } from "vue";
import useProjectService from "../../../service/project/projectService";
import type { ProductListForm } from "../../../service/project/model/projectModel";
import { Pagination } from "../../../service/base-model/baseParams";
import useTools from "../../../mixins/tools";

const { t } = usePageFrame();
const uTabsRef = ref();
const tools = useTools();
const projectService = useProjectService();
const projectList = ref<Array<any>>([]);

const tabList = ref<Array<any>>([
  {
    name: "美国",
  },
  {
    name: "加拿大",
  },
]);
// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
const current = ref<number>(0); // tabs组件的current值，表示当前活动的tab选项
const swiperCurrent = ref<number>(0); // swiper组件的current值，表示当前那个swiper-item是活动的
const pagination = new Pagination();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("index.project"),
  });

  getProductList();
});

const getProductList = async () => {
  const params = {
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    country: swiperCurrent.value === 0 ? 0 : 1,
  } as ProductListForm;
  const result = await projectService.productList(params);
  const data = result.data;
  if (pagination.pageNum === 1) {
    projectList.value = data;
  } else {
    projectList.value.push(...data);
  }
};

// tabs通知swiper切换
const onTabsChange = (index: number) => {
  swiperCurrent.value = index;
  projectList.value.length = 0;
  pagination.pageNum = 1;
};

const onAnimationfinish = (e: any) => {
  const curr = e.detail.current;
  uTabsRef.value.setFinishCurrent(curr);

  swiperCurrent.value = curr;
  current.value = curr;

  projectList.value.length = 0;
  pagination.pageNum = 1;
  getProductList();
};

const onTransition = (e: any) => {
  const dx = e.detail.dx;
  uTabsRef.value.setDx(dx);

  projectList.value.length = 0;
  pagination.pageNum = 1;
};

// scroll-view到底部加载更多
const onReachBottom = () => {
  pagination.pageNum++;
  getProductList();
};

const onProjectDetail = (item: any) => {
  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({});
  uni.navigateTo({
    url: `/pages/webview/webview?src=${encodeURIComponent(item.mobileLinkUrl)}`,
  });
};

const onGoUSAProjectDetail = () => {
  let viewerUrl = `/hybrid/html/dist/src/pages/immigrateProgramIntro/usa/index.html`;
  // 微信小程序、 h5(使用访问的时候记得跨域)
  // #ifdef H5 ||  MP-WEIXIN
  viewerUrl = `${
    import.meta.env.VITE_APP_WEBVIEW_API_BASE_URL
  }/src/pages/immigrateProgramIntro/usa/index.html`;
  // #endif

  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({});

  uni.navigateTo({
    url: "/pages/webview/webview?src=" + viewerUrl,
  });
};

const onGoCANADAProjectDetail = () => {
  let viewerUrl = `/hybrid/html/dist/src/pages/immigrateProgramIntro/canada/index.html`;
  // 微信小程序、 h5(使用访问的时候记得跨域)
  // #ifdef H5 ||  MP-WEIXIN
  viewerUrl = `${
    import.meta.env.VITE_APP_WEBVIEW_API_BASE_URL
  }/src/pages/immigrateProgramIntro/canada/index.html`;
  // #endif

  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({});

  uni.navigateTo({
    url: "/pages/webview/webview?src=" + viewerUrl,
  });
};
</script>

<style lang="scss" scoped>
.project-card {
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(28, 61, 118, 0.1);
  border-radius: 8px;
  margin-bottom: 40rpx;
}
</style>
