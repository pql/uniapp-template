<template>
  <view class="p-3">
    <!-- welcome -->
    <view>
      <view class="text-xl font-bold" style="color: #26364e">
        {{ $t("index.home.welcome.title") }}</view
      >
    </view>
    <view class="mb-2 rounded relative">
      <u-image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/athena-home.png"
        mode="aspectFit"
        width="100%"
        height="310"
      ></u-image>
    </view>
    <view class="flex items-center justify-between gap-4 mb-4">
      <view
        class="p-3 rounded"
        style="background: linear-gradient(360deg, #f9fbff 0%, #e4e9f5 100%)"
      >
        <view class="font-bold font-26">{{
          $t("index.home.menu.title1")
        }}</view>
        <view class="font-22 mt-1">{{ $t("index.home.menu.subtitle1") }}</view>
      </view>
      <view
        class="p-3 rounded"
        style="background: linear-gradient(360deg, #f9fbff 0%, #e4e9f5 100%)"
      >
        <view class="font-bold font-26">{{
          $t("index.home.menu.title2")
        }}</view>
        <view class="font-22 mt-1">{{ $t("index.home.menu.subtitle2") }}</view>
      </view>
      <view
        class="p-3 rounded"
        style="background: linear-gradient(360deg, #f9fbff 0%, #e4e9f5 100%)"
      >
        <view class="font-bold font-26">{{
          $t("index.home.menu.title3")
        }}</view>
        <view class="font-22 mt-1">{{ $t("index.home.menu.subtitle3") }}</view>
      </view>
    </view>
    <!-- welcome -->

    <!-- menus -->
    <view class="flex gap-4 items-center justify-between mb-4">
      <view class="flex flex-col items-center" @click="onAppointmentLive(0)">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/menu-item1.png"
          width="80"
          height="80"
        ></u-image>
        <view class="font-bold mt-2 text-center font-24">{{
          $t("index.home.menu-item1")
        }}</view>
      </view>
      <view class="flex flex-col items-center">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/menu-item2.png"
          width="80"
          height="80"
        ></u-image>
        <view class="font-bold mt-2 text-center font-24">{{
          $t("index.home.menu-item2")
        }}</view>
      </view>
      <view class="flex flex-col items-center" @click="onGoSuccessCase">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/menu-item3.png"
          width="80"
          height="80"
        ></u-image>
        <view class="font-bold mt-2 text-center font-24">{{
          $t("index.home.menu-item3")
        }}</view>
      </view>
      <view class="flex flex-col items-center" @click="onGoBTM22">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/menu-item4.png"
          width="80"
          height="80"
        ></u-image>
        <view class="font-bold mt-2 text-center font-24">{{
          $t("index.home.menu-item4")
        }}</view>
      </view>
    </view>
    <!-- menus -->
    <!-- evaluate -->
    <view class="rounded mb-4">
      <u-image
        @click="onGoEvaluate"
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/evaluate.png"
        width="100%"
        height="256"
      ></u-image>
    </view>
    <!-- evaluate -->

    <!-- notice-bar -->
    <view class="mb-4 flex items-center p-2" style="background: #f2f6f9">
      <u-image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/latest-news.png"
        width="55"
        height="61"
      ></u-image>
      <u-notice-bar
        class="flex-1"
        type="none"
        :volume-icon="false"
        mode="vertical"
        color="rgba(30,41,58,0.7)"
        font-size="24rpx"
        :list="noticeBarList"
        @click="onNoticeBarClick"
      ></u-notice-bar>
    </view>
    <!-- notice-bar -->

    <!-- service -->
    <view class="mb-4">
      <view class="mb-3">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/btn-advantage.png"
          width="173"
          height="33"
        ></u-image>
      </view>
      <u-grid :col="2" :border="false">
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage1.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage2.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage3.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage4.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage5.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
        <u-grid-item :custom-style="{ padding: '10rpx' }">
          <u-image
            class="w-full"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/advantage6.png"
            height="152"
            mode="aspectFit"
          ></u-image>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- service -->

    <!-- live -->
    <view>
      <u-image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/live-appointment.png"
        height="33"
        width="137"
      ></u-image>
      <view class="mt-3">
        <ComLiveSwiper ref="liveSwiperRef" source="wxapp_live_home"/>
      </view>
    </view>
    <!-- live -->

    <!-- north-america-plan -->
    <view class="mt-5 relative">
      <u-image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/north-america-plan.png"
        width="100%"
        height="180"
      ></u-image>
      <view class="absolute right-2 top-4" style="width: 60%">
        <view class="font-32 font-bold text-ellipsis" style="color: #26364e">{{
          $t("index.home.north-american-plan")
        }}</view>
        <view
          class="font-26 mt-1 text-ellipsis-2 leading-4"
          style="color: rgba(38, 54, 78, 0.6)"
          >{{ $t("index.home.north-american-plan.tip") }}</view
        >
      </view>
    </view>
    <!-- north-america-plan -->

    <!-- popup 预约-->
    <u-popup
      v-model="showAppointmentPopup"
      mode="bottom"
      closeable
      border-radius="16"
    >
      <ComAppointmentPopup
        :title="$t('contact-us.button.appointment')"
        :button-text="$t('contact-us.button.appointment')"
        :show-remark="false"
        @confirm="onAppointmentPopupConfirm"
      />
    </u-popup>
    <!-- popup 预约-->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import { ref } from "vue";
import useHomeService from "../../../service/home/homeService";
import type { NewsListForm } from "../../../service/home/model/homeModel";
import ComLiveSwiper from "../../../components/live-swiper/index.vue";
import ComAppointmentPopup from "../../../components/popup/appointment.vue";
import type { AppointWithConsultantForm } from "../../../service/home/model/homeModel";

const { t, $u } = usePageFrame();
const noticeBarList = ref<Array<any>>([]);
const newsList = ref<Array<any>>([]);
const homeService = useHomeService();
const liveSwiperRef = ref();
const showAppointmentPopup = ref<boolean>(false);

onLoad(async (options: any) => {
  uni.setNavigationBarTitle({
    title: t("index.home"),
  });

  const newsParams = { type: 1 } as NewsListForm;
  const newsResult = await homeService.newsList(newsParams);
  const newsData = newsResult.data;
  newsList.value = newsData;
  newsData.forEach((item: any, index: number) => {
    noticeBarList.value.push(item.title);
  });

  if (Number(options.showContactConsultantPopup) === 1) {
    showAppointmentPopup.value = true;
  }
});

const onAppointmentLive = (liveId: number) => {
  liveSwiperRef.value.onAppointmentLive(liveId);
};

const onGoEvaluate = () => {
  uni.navigateTo({
    url: "/pages/personal-info/evaluate/index",
  });
};

const onGoBTM22 = () => {
  uni.navigateTo({
    url: "/pages/personal-info/btm22/index",
  });
};

const onNoticeBarClick = (index: number) => {
  if (newsList.value[index]) {
    uni.navigateTo({
      url: `/pages/news/detail/index?id=${newsList.value[index].id}`,
    });
  }
};

const onGoSuccessCase = () => {
  uni.navigateTo({
    url: "/pages/index/success-case",
  });
};

const onAppointmentPopupConfirm = async (fields: any) => {
  const params = {
    liveId: 0,
    type: 9,
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    source: "wxapp_about",
    memo: "项目详情",
  } as AppointWithConsultantForm;
  const result = await homeService.appointWithConsultant(params);
  const data = result.data;
  if (data) {
    $u.toast(t("global.submit.success"));
  } else {
    $u.toast(t("global.failure"));
  }
  showAppointmentPopup.value = false;
};
</script>
