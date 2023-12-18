<template>
  <view class="bind_emails_page">
    <view class="pages">
      <u-skeleton
        :loading="loading"
        :animation="true"
        bgColor="#FFF"
      ></u-skeleton>
      <view class="u-skeleton">
        <block v-if="!isFinished">
          <view class="content p-3">
            <view class="title">{{ navbarTitle }}</view>
            <view class="step-box mt-4" v-if="isbind">
              <view class="step-box-item flex">
                <view class="step-box-item-left w-16 code"
                  >{{ $t("user.safe.google.step-1") }}
                </view>
                <view class="step-box-item-content flex-1 pl-4">
                  {{ $t("user.safe.google.step-1.desc") }}
                </view>
              </view>
              <view class="step-box-item flex mt-4">
                <view class="step-box-item-left w-16 code">
                  {{ $t("user.safe.google.step-2") }}
                </view>
                <view class="step-box-item-content flex-1 pl-4">
                  {{ $t("user.safe.google.step-2.desc") }}
                </view>
              </view>
              <view
                class="flex align-center justify-center mt-4"
                v-if="googleInfo"
              >
                <QrcodeVue
                  :value="googleInfo.otpauthUrl"
                  :size="200"
                  level="H"
                />
              </view>
              <view class="mt-4">
                {{ $t("user.safe.google.step-2.desc.tip") }}
              </view>
              <view class="step-box-item flex mt-4">
                <view class="step-box-item-left w-16 code">
                  {{ $t("user.safe.google.step-3") }}
                </view>
                <view class="step-box-item-content flex-1 pl-4">
                  {{ $t("user.safe.google.step-3.desc") }}
                </view>
              </view>
              <view class="step-box-item flex mt-4">
                <view class="step-box-item-left w-16 code">
                  {{ $t("user.safe.google.step-4") }}
                </view>
                <view class="step-box-item-content flex-1 pl-4">
                  {{ $t("user.safe.google.step-4.desc") }}
                </view>
              </view>

              <u-form
                :model="model"
                ref="formRef"
                label-position="top"
                label-width="100%"
              >
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.mine.email-code')"
                  prop="emailCode"
                  style="margin-top: 40rpx"
                >
                  <view
                    class="input_box h-9 flex content-center border-2 border-gray-200 rounded px-2"
                  >
                    <u-input
                      class="flex-1"
                      clearable
                      v-model="model.emailCode"
                      :placeholder="$t('global.input')"
                    >
                    </u-input>
                    <view class="h-9">
                      <u-verification-code
                        :seconds="seconds"
                        ref="codeRef"
                        @change="onCodeChange"
                      ></u-verification-code>
                      <text class="code" @tap="onGetCode">{{ tips }}</text>
                    </view>
                  </view>
                </u-form-item>
                <u-form-item
                  v-if="isbind"
                  :border-bottom="false"
                  :label="$t('user.login.google')"
                  prop="googleCode"
                >
                  <view
                    class="input_box h-9 flex-1 flex content-center border-2 border-gray-200 rounded px-2"
                  >
                    <u-input
                      clearable
                      v-model="model.googleCode"
                      :placeholder="$t('user.safe.google.input.placeholder')"
                    >
                    </u-input>
                  </view>
                </u-form-item>
                <view v-if="!isbind && showTip" class="form_tip_info mb-2">
                  {{ $t("user.mine.email-code-send-1") }}
                  <text style="color: rgba(0, 80, 179, 1)"
                    >{{ getEmail }}
                  </text>
                  {{ $t("user.mine.email-code-send-2") }}
                </view>
              </u-form>
            </view>
            <view class="step-box mt-4" v-else>
              <view class="step-box-item flex">
                <view class="step-box-item-content flex-1">
                  {{ $t("user.safe.google.step-3.desc.unbind") }}
                </view>
              </view>
              <u-form
                :model="model"
                ref="formRef"
                label-position="top"
                label-width="100%"
              >
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.login.google')"
                  prop="googleCode"
                >
                  <u-input
                    clearable
                    border
                    v-model="model.googleCode"
                    :placeholder="$t('user.safe.google.input.placeholder')"
                  >
                  </u-input>
                </u-form-item>
              </u-form>
            </view>
          </view>
          <view class="bottom_area">
            <ComButton
              :title="submitButtonText"
              :custom-style="customStyle"
              @onTap="onSubmit"
            />
          </view>
        </block>
        <block v-else>
          <view class="bind_success_area">
            <view class="title">{{ navbarTitle }}</view>
            <view class="success_content">
              <image
                style="width: 120rpx; height: 120rpx"
                src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/success.png"
                mode="scaleToFill"
              />
              <view class="success_text">{{ $t("global.success") }}</view>
              <view class="go_home_btn" @click="onHome">{{
                $t("security.account")
              }}</view>
            </view>
          </view>
        </block>
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onReady } from "@dcloudio/uni-app";
import pageFrame from "../../../mixins/page-frame";
import ComFooter from "../../../components/layout/footer/footer.vue";
import ComButton from "../../../components/button/button.vue";
import QrcodeVue from "qrcode.vue";
import { DeviceType, GoogleAction } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { ref, onMounted, computed } from "vue";
import useUserService from "../../../service/user/userService";
import useUserStore from "../../../store/modules/user";
import useTools from "../../../mixins/tools";
import type { UnbindGoogleForm } from "../../../service/user/model/userModel";

const { t, $u } = pageFrame();
const loading = ref<boolean>(true);
const navbarTitle = ref<string>("");
const isFinished = ref<boolean>(false);
const submitButtonText = ref<string>(t("user.safe.bind"));
const userStore = useUserStore();
const formRef = ref<any>(null);
const codeRef = ref<any>(null);
const model = ref<any>({});
const isbind = ref<boolean>();
const tips = ref<string>("");
const seconds = ref<number>(60);
const showTip = ref<boolean>(false);
const userService = useUserService();
const queryOptions = ref();
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const tools = useTools();
const googleInfo = ref();
const rules = {
  emailCode: {
    required: true,
    message: t("user.register.verification-code-warn"),
    trigger: ["change", "blur"],
  },
  googleCode: {
    required: true,
    message: t("user.login.google-warn"),
    trigger: ["change", "blur"],
  },
};

onLoad(async (options: any) => {
  uni.setNavigationBarTitle({
    title: t("user.menu.bind-google"),
  });
  queryOptions.value = options;
  await userStore.getUserInfo();
  const type = options.type; // 绑定类型  bind  unbind
  if (type === "unbind") {
    navbarTitle.value = t("unbind.google");
    uni.setNavigationBarTitle({
      title: t("unbind.google"),
    });
    isbind.value = false;
    submitButtonText.value = t("user.safe.unbind");
  } else {
    navbarTitle.value = t("bind.google");
    uni.setNavigationBarTitle({
      title: t("bind.google"),
    });
    isbind.value = true;
    submitButtonText.value = t("user.safe.bind");
    const result = await userService.google({ action: GoogleAction.INIT });
    const data = result.data;
    googleInfo.value = data;
  }

  loading.value = false;
});

const getEmail = computed(() => {
  return tools.cryptoEmail(userStore.email);
});

onReady(() => {
  if (queryOptions.value.type === "bind") {
    formRef.value.setRules(rules);
  } else {
    formRef.value.setRules(rules.googleCode);
  }
});

const onCodeChange = (text: string) => {
  tips.value = text;
};

const onGetCode = async () => {
  if (codeRef.value.canGetCode) {
    uni.showLoading({
      title: t("user.Getting.verification.code"),
    });
    await userService.multAuthGoogleCode();
    uni.hideLoading();
    $u.toast(t("user.register.verification-code-sent"));
    showTip.value = true;
    // 通知验证码组件内部开始倒计时
    codeRef.value.start();
  }
};

const onHome = () => {
  userStore.getUserInfo();
  uni.switchTab({
    url: "/pages/personal-info/index",
  });
};

const onSubmit = async () => {
  if (isbind.value) {
    // 绑定
    if (!model.value.emailCode) {
      $u.toast(t("user.register.verification-code-warn"));
      return;
    }
    if (!model.value.googleCode) {
      $u.toast(t("user.login.google-warn"));
      return;
    }
    const params = {
      gaToken: googleInfo.value.gaToken,
      googleCode: model.value.googleCode,
      emailCode: model.value.emailCode,
      action: GoogleAction.INIT,
    };
    const result = await userService.bindGoogle(params);
    const data = result.data;
    $u.toast(t("user.safe.bind.success"));
    isFinished.value = true;
  } else {
    // 解绑
    if (!model.value.googleCode) {
      $u.toast(t("user.login.google-warn"));
      return;
    }
    const params = {
      oldGoogleCode: model.value.googleCode,
    } as UnbindGoogleForm;
    const result = await userService.unBindGoogle(params);
    const data = result.data;
    console.log(data);
    $u.toast(t("user.safe.unbind.success"));
    isFinished.value = true;
  }
};
</script>

<style lang="scss" scoped>
.bind_emails_page {
  box-sizing: border-box;

  .title {
    font-size: 32rpx;
    font-weight: 600;
  }
  .content {
    background-color: #fff;

    .tip {
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 35rpx;
    }
  }
  .bottom_area {
    height: 144rpx;
    background-color: #fff;
    padding: 32rpx;
  }
  .bind_success_area {
    padding: 40rpx 32rpx;
    margin: 40rpx 32rpx;
    background-color: #fff;
    height: 745rpx;
    .success_content {
      margin: 128rpx 63rpx 160rpx;
      text-align: center;
      .success_text {
        font-size: 32rpx;
        font-weight: 600;
        margin: 49rpx 0 99rpx;
      }
      .go_home_btn {
        height: 80rpx;
        line-height: 80rpx;
        background-color: rgba(0, 80, 179, 1);
        background-blend-mode: normal;
        color: #fff;
      }
    }
  }
  .code {
    color: rgba(0, 80, 179, 1);
  }
}
</style>
