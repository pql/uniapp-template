<template>
  <view>
    <view>
      <view>
        <u-tabs-swiper
          ref="uTabsRef"
          :current="current"
          :list="tabsList"
          :is-scroll="false"
          active-color="#304EB5"
          inactive-color="#999999"
          bar-width="187"
          @change="onTabsChange"
        ></u-tabs-swiper>
      </view>
      <swiper
        style="height: 100vh; width: 100%"
        :current="swiperCurrent"
        @transition="onTransition"
        @animationfinish="onAnimationfinish"
      >
        <swiper-item style="overflow: auto">
          <ListItem :list="list" state />
        </swiper-item>
      </swiper>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
import ListItem from "./components/list-item.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import useUserStore from "../../../store/modules/user";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { deviceType } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";
const userStore = useUserStore();
const { onBack, t, $u } = usePageFrame();
const uTabsRef = ref();

const tabsList = ref<Array<any>>([
  { name: t("user.lawyer.current") },
  { name: t("user.lawyer.history") },
]);
const list = ref<Array<any>>([]);
// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
const current = ref<number>(0); // tabs组件的current值，表示当前活动的tab选项
const swiperCurrent = ref<number>(0); // swiper组件的current值，表示当前那个swiper-item是活动的

onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("user.menu.lawyer"),
  });
  getLawyerList();
});

const getLawyerList = async () => {
  list.value = await userStore.getLawyerList(current.value);
};

const onTransition = (e: any) => {
  const dx = e.detail.dx;
  uTabsRef.value.setDx(dx);
};

const onTabsChange = (index: number) => {
  current.value = index;
  getLawyerList();
};

const onAnimationfinish = (e: any) => {
  const curr = e.detail.current;
  uTabsRef.value.setFinishCurrent(curr);

  swiperCurrent.value = curr;
  current.value = curr;

  getLawyerList();
};
</script>
