<template>
  <view>
    <view class="p-3">
      <view class="font-36 font-bold" style="color: #26364e"
        >{{ $t("user.mine.hello") }},
        {{ tools.phoneDesensitize(userStore.phone) }} !</view
      >
      <view v-if="!evaluateInfo">
        <view class="mt-2 font-36 font-bold" style="color: #26364e">
          {{ $t("evaluate.tip1") }}
        </view>
        <view class="mt-1 font-36 font-bold" style="color: #26364e">
          {{ $t("evaluate.tip2") }}
        </view>
        <view class="my-2 flex items-center justify-center">
          <u-image
            src="../../../static/images/evaluate-empty-data.png"
            width="500"
            height="430"
          ></u-image>
        </view>
        <view>
          <ComButton
            :title="$t('evaluate.at-once')"
            :custom-style="customStyle"
            @onTap="onSubmit"
          />
        </view>
      </view>
      <view v-else>
        <view>
          <view
            class="mt-4 relative flex flex-col justify-center"
            style="width: 100%; height: 150rpx"
          >
            <u-image
              class="absolute top-0 right-0 bottom-0 left-0"
              width="100%"
              height="150"
              src="../../../static/images/evaluate-report-bg.png"
            ></u-image>
            <view class="font-36 px-3 relative z-10" style="color: #ffffff">{{
              $t("evaluate.tip3")
            }}</view>
            <view
              class="font-24 px-3 relative z-10 mt-1"
              style="color: #8991ab"
              v-if="evaluateInfo && evaluateInfo.createDate"
              >{{
                dayjs(evaluateInfo.createDate).format("YYYY-MM-DD hh:mm:ss")
              }}</view
            >
          </view>
          <view class="p-3" style="background: #f6faff">
            <view class="flex gap-4 flex-wrap">
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.age")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("age")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.expect")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("visaType")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.yasi")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("english")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.education")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("edu")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.budget")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("asset")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.stay-time")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("time")
                }}</text>
              </view>
              <view style="width: 45%">
                <text class="font-26" style="color: #8991ab">{{
                  $t("evaluate.form.label.goal")
                }}</text>
                <text class="ml-2 font-26" style="color: #2f3441">{{
                  getValueByField("reason")
                }}</text>
              </view>
            </view>
          </view>
          <view class="mt-3 mb-10 font-26" style="color: #8991ab">
            {{ $t("evaluate.contact-you-and-explain-with-you") }}
          </view>
          <view class="font-32 font-bold" style="color: #26364e">{{
            $t("evaluate.matching-scheme")
          }}</view>
          <view
            v-for="(item, index) in evaluateInfo.project"
            :key="index"
            class="project-card mt-3"
            @click="onProjectDetail(item)"
          >
            <u-image width="100%" height="290" :src="item.listImg"></u-image>
          </view>
          <view class="mt-6">
            <ComButton
              :title="$t('evaluate.contact-us-for-detail')"
              :custom-style="customStyle"
              @onTap="onAppoint"
            />
          </view>
        </view>
      </view>
    </view>
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
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import useTools from "../../../mixins/tools";
import { ref } from "vue";
import useEvaluateService from "../../../service/evaluate/evaluateService";
import useUserStore from "../../../store/modules/user";
import useHomeService from "../../../service/home/homeService";
import type { AppointWithConsultantForm } from "../../../service/home/model/homeModel";
import dayjs from "dayjs";
import ComAppointmentPopup from "../../../components/popup/appointment.vue";
import ComButton from "../../../components/button/button.vue";

const { t, $u } = usePageFrame();
const tools = useTools();
const evaluateInfo = ref();
const showAppointmentPopup = ref<boolean>(false);
const evaluateService = useEvaluateService();
const homeService = useHomeService();
const userStore = useUserStore();
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.mine.evaluate.report"),
  });
  getEvaluateData();
});

const getEvaluateData = async () => {
  const result = await evaluateService.myTestList();
  const data = result.data;
  evaluateInfo.value = data;
};

const onAppoint = () => {
  showAppointmentPopup.value = true;
};

const onAppointmentPopupConfirm = async (fields: any) => {
  const params = {
    liveId: 0,
    type: 9,
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    source: "wxapp_about",
    memo: "移民评估报告",
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

const getValueByField = (field: string) => {
  const data = evaluateInfo.value.data;
  let value = null;
  Object.keys(data).forEach((key: string) => {
    if (key === field) {
      value = data[key].value;
    }
  });
  return value;
};

const onSubmit = () => {
  uni.navigateTo({
    url: "/pages/personal-info/evaluate/index",
  });
};

const onProjectDetail = (item: any) => {
  // 设置值供给/pages/webview/webview使用
  tools.setWebviewParamsSync({});
  uni.navigateTo({
    url: `/pages/webview/webview?src=${encodeURIComponent(item.mobileLinkUrl)}`,
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
