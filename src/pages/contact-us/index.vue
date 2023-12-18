<template>
  <view>
    <view>
      <view class="header relative">
        <u-image
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/bar-img-2.jpg"
          width="100%"
          height="250"
        ></u-image>
        <view
          class="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-10/12"
          style="color: #ffffff"
        >
          <view class="font-64 font-bold">{{
            $t("contact-us.address-and-phone")
          }}</view>
        </view>
      </view>
      <!-- content -->
      <view class="px-3">
        <view class="title font-bold">{{ $t("contact-us.area.usa") }}</view>
        <view class="content p-3 rounded">
          <view class="font-28 font-bold mb-1.5" style="color: #26364e"
            >纽约总部</view
          >
          <view class="mb-1.5 flex items-center">
            <u-icon
              name="map"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)"
              >299 Broadway, suite 200 New York, NY, 10007</view
            >
          </view>
          <view class="flex items-center">
            <u-icon
              name="phone"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)"
              >+1 212-287-5095</view
            >
          </view>
        </view>
        <view class="title font-bold">{{ $t("contact-us.area.china") }}</view>
        <view class="mb-2">
          <u-image
            width="100%"
            height="160"
            @click="onCallPhone('400-669-0268')"
            src="../../static/images/national-hotline.png"
          ></u-image>
        </view>
        <view class="content p-3 rounded">
          <view class="font-28 font-bold mb-1.5" style="color: #26364e"
            >北京</view
          >
          <view class="mb-1.5 flex items-center">
            <u-icon
              name="map"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)"
              >北京市朝阳区建国路77号华贸中心三号楼1</view
            >
          </view>
          <view class="font-28 font-bold mb-1.5 mt-3" style="color: #26364e"
            >上海</view
          >
          <view class="mb-1.5 flex items-center">
            <u-icon
              name="map"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)">
              上海市黄浦区淮海中路8号兰生大厦2901</view
            >
          </view>
          <view class="font-28 font-bold mb-1.5 mt-3" style="color: #26364e"
            >深圳</view
          >
          <view class="mb-1.5 flex items-center">
            <u-icon
              name="map"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)">
              深圳市福田区京基滨河时代A座2007B</view
            >
          </view>
          <view class="font-28 font-bold mb-1.5 mt-3" style="color: #26364e"
            >成都</view
          >
          <view class="mb-1.5 flex items-center">
            <u-icon
              name="map"
              color="rgba(38,54,78,0.8)"
              size="40"
              class="icon"
            ></u-icon>
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)">
              成都市锦江区二环路东五段华润广场B座12</view
            >
          </view>
          <view
            class="font-28 font-bold mb-1.5 mt-3"
            style="color: rgba(38, 54, 78, 0.4)"
          >
            天津
            <text style="font-size: 16rpx; font-weight: normal"> · </text>成都
            <text style="font-size: 16rpx; font-weight: normal"> · </text>重庆
            <text style="font-size: 16rpx; font-weight: normal"> · </text>广州
            <text style="font-size: 16rpx; font-weight: normal"> · </text>香港
            正在筹备中</view
          >
        </view>
        <view class="content p-3 rounded mt-3">
          <view class="font-28 font-bold mb-1.5" style="color: #26364e">{{
            $t("contact-us.service.title")
          }}</view>
          <view class="mb-1.5 flex items-center">
            <view class="font-26" style="color: rgba(38, 54, 78, 0.8)"
              >{{ $t("contact-us.service.time") }}：</view
            >
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)"
              >北京时间 9:00-17:00</view
            >
          </view>
          <view class="flex items-center">
            <view class="font-26" style="color: rgba(38, 54, 78, 0.8)"
              >{{ $t("contact-us.email") }}：</view
            >
            <view class="font-26 ml-1" style="color: rgba(38, 54, 78, 0.8)"
              >cs@btmusa.cn</view
            >
          </view>
        </view>
        <view class="my-10 flex flex-col items-center justify-center">
          <u-image
            width="174"
            height="174"
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/contact_my_qrcode.png"
          ></u-image>
          <text
            class="font-bold font-24 mt-1"
            style="color: rgba(38, 54, 78, 0.6)"
            >长按图片，点击关注公众号</text
          >
        </view>
        <view class="flex gap-2">
          <view class="flex-1">
            <u-button
              :custom-style="{
                width: '100%',
                background: '#1D429F',
                color: '#ffffff',
                fontWeight: 500,
              }"
              open-type="contact"
              >{{ $t("contact-us.button.online-service") }}</u-button
            >
          </view>
          <view class="flex-1">
            <u-button
              :custom-style="{
                width: '100%',
                background: '#ffac39',
                color: '#ffffff',
                fontWeight: 500,
              }"
              @click="onAppoint"
              >{{ $t("contact-us.button.appointment") }}</u-button
            >
          </view>
          <u-gap height="200"></u-gap>
        </view>
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->

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

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../mixins/page-frame";
import { deviceType } from "../../utils/platform";
import { DeviceType } from "../../types/enum";
import ComFooter from "../../components/layout/footer/footer.vue";
import ComAppointmentPopup from "../../components/popup/appointment.vue";
import useHomeService from "../../service/home/homeService";
import type { AppointWithConsultantForm } from "../../service/home/model/homeModel";
import { ref } from "vue";

const { onBack, t, $u } = usePageFrame();
const homeService = useHomeService();
const showAppointmentPopup = ref<boolean>(false);

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("footer.contact-us"),
  });
});

const onCallPhone = (phone: string) => {
  uni.makePhoneCall({
    phoneNumber: phone,
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
    memo: "联系我们",
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

const onAppoint = () => {
  showAppointmentPopup.value = true;
};
</script>

<style lang="scss" scoped>
.title {
  color: #26364e;
  font-size: 30rpx;
  font-weight: 500;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}
.content {
  background: #fafafa;
  .text {
    font-size: 26rpx;
    line-height: 44rpx;
    color: #363a40;
  }
}
</style>
