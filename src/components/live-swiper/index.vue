<template>
  <swiper
    autoplay
    next-margin="50"
    style="height: 310rpx"
    :current="currentSwiperIndex"
    @change="onSwiperChange"
  >
    <swiper-item v-for="(item, index) in liveList" :key="index">
      <view
        class="p-3 swiper-element"
        :class="[currentSwiperIndex === index ? 'active' : 'unactive']"
      >
        <view
          class="text-base font-bold fas-overflow font-28"
          :style="{
            color: currentSwiperIndex === index ? '#ffffff' : '#26364E',
          }"
          >{{ item.title }}</view
        >
        <view
          class="mt-1 font-24"
          :style="{
            color:
              currentSwiperIndex === index
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(38,54,78,0.6)',
          }"
          >{{ dayjs(item.startDate).format("YYYY-MM-DD hh:mm:ss") }}</view
        >
        <u-button
          v-if="!userStore.token"
          shape="circle"
          :custom-style="customStyle"
          open-type="getPhoneNumber"
          @getphonenumber="onGetPhoneNumber($event, item.id)"
          >{{ $t("index.home.appointment-live") }}</u-button
        >
        <u-button
          v-else
          shape="circle"
          :custom-style="customStyle"
          @click="onAppointmentLive(item.id)"
          >{{ $t("index.home.appointment-live") }}</u-button
        >
      </view>
    </swiper-item>
  </swiper>

  <!-- popup 预约-->
  <u-popup
    v-model="showAppointmentPopup"
    mode="bottom"
    closeable
    border-radius="16"
  >
    <ComAppointmentPopup
      :title="$t('index.home.appointment-live')"
      :button-text="$t('index.home.appointment-live')"
      @confirm="onAppointmentPopupConfirm"
    />
  </u-popup>
  <!-- popup 预约-->
</template>

<script lang="ts" setup>
import { ref, defineExpose, defineProps } from "vue";
import dayjs from "dayjs";
import useUserStore from "../../store/modules/user";
import usePageFrame from "../../mixins/page-frame";
import type { WXLoginForm } from "../../service/user/model/userModel";
import ComAppointmentPopup from "../popup/appointment.vue";
import useHomeService from "../../service/home/homeService";
import type { LiveRecordForm } from "../../service/home/model/homeModel";
import { onLoad } from "@dcloudio/uni-app";

const props = defineProps({
  source: {
    required: true,
    type: String,
    default: "", // 页面来源，哪个页面使用了改组件，得标记
  },
});

const userStore = useUserStore();
const currentSwiperIndex = ref(0);
const liveList = ref<Array<any>>([]);
const currentLiveId = ref(0);
const { t, $u } = usePageFrame();
const showAppointmentPopup = ref<boolean>(false);
const homeService = useHomeService();

const customStyle = ref({
  marginTop: "20rpx",
  borderColor: "#ffffff",
  color: "#ffffff",
  fontSize: 26,
  background: "transparent",
});

onLoad(async () => {
  const liveResult = await homeService.liveList({});
  const liveData = liveResult.data;
  liveList.value = liveData;
});

const onSwiperChange = (e: any) => {
  const detail = e.detail;
  currentSwiperIndex.value = detail.current;
};

const onGetPhoneNumber = async (e: any, liveId: number) => {
  currentLiveId.value = liveId;
  const detail = e.detail;
  const phoneCode = detail.code;
  const loginResult: any = await uni.login({
    provider: "weixin",
  });
  const loginCode = loginResult && loginResult.code;
  const result = await userStore.wxlogin({
    phoneCode,
    loginCode,
  } as WXLoginForm);
  userStore.setToken(result && result.token);
  $u.toast(t("user.login.success"));

  showAppointmentPopup.value = true;
};

const onAppointmentPopupConfirm = async (fields: any) => {
  const params = {
    liveId: currentLiveId.value,
    type: 0,
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    memo: fields.memo,
    source: props.source,
  } as LiveRecordForm;
  const result = await homeService.liveRecord(params);
  const data = result.data;
  if (data) {
    $u.toast(t("global.submit.success"));
  } else {
    $u.toast(t("global.failure"));
  }
  showAppointmentPopup.value = false;
};

const onAppointmentLive = (liveId: number) => {
  currentLiveId.value = liveId;
  showAppointmentPopup.value = true;
};

defineExpose({
  onAppointmentLive,
});
</script>

<style lang="scss">
.swiper-element {
  width: 95%;
  height: 310rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.active {
  background: linear-gradient(75deg, #314db1 0%, #596bcf 100%);
}

.unactive {
  background: #f2f7ff;
}
</style>
