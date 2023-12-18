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
            <view v-if="isbind">
              <u-form
                :model="model"
                ref="formRef"
                label-position="top"
                label-width="100%"
              >
                <!-- phone-area -->
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.login.phone-area')"
                >
                  <u-input
                    v-model="model.phoneAreaCode"
                    type="select"
                    :trim="false"
                    border
                    :placeholder="
                      $t('user.register.verification-phone-area-warn')
                    "
                    @click="onShowPhoneAreaCodeSelect"
                  />
                  <u-select
                    :confirm-text="$t('global.confirm')"
                    :cancel-text="$t('global.cancel')"
                    v-model="showSelectPhoneAreaCode"
                    mode="single-column"
                    :list="selectPhoneAreaCodeOptions"
                    @confirm="selectPhoneAreaCodeOnConfirm"
                  ></u-select>
                </u-form-item>
                <!-- phone-area -->
                <!-- phone -->
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.login.phone')"
                  prop="phone"
                >
                  <u-input
                    class="mr-1"
                    clearable
                    border
                    v-model="model.phone"
                    :placeholder="$t('global.input')"
                  >
                  </u-input>
                </u-form-item>
                <!-- phone -->
                <!-- phone code -->
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.mine.phone-code')"
                  prop="phoneCode"
                >
                  <view
                    class="input_box h-9 flex content-center border-2 border-gray-200 rounded px-2"
                  >
                    <u-input
                      class="mr-1 flex-1"
                      clearable
                      v-model="model.phoneCode"
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
                <!-- phone code -->
                <view v-if="!isbind && showTip" class="form_tip_info mb-2">
                  {{ $t("user.mine.phone-code-send-1") }}
                  <text style="color: rgba(0, 80, 179, 1)"
                    >{{ getPhone }}
                  </text>
                  {{ $t("user.mine.phone-code-send-2") }}
                </view>
              </u-form>
            </view>
            <view v-else>
              <u-form
                :model="model"
                ref="formRef"
                label-position="top"
                label-width="100%"
              >
                <!-- phone code -->
                <u-form-item
                  :border-bottom="false"
                  :label="$t('user.mine.phone-code')"
                  prop="phoneCode"
                >
                  <view
                    class="input_box h-9 flex content-center border-2 border-gray-200 rounded px-2"
                  >
                    <u-input
                      class="mr-1 flex-1"
                      clearable
                      v-model="model.phoneCode"
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
                <!-- phone code -->
                <view v-if="!isbind && showTip" class="form_tip_info mb-2">
                  {{ $t("user.mine.phone-code-send-1") }}
                  <text style="color: rgba(0, 80, 179, 1)"
                    >{{ getPhone }}
                  </text>
                  {{ $t("user.mine.phone-code-send-2") }}
                </view>
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
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { ref, computed } from "vue";
import useUserService from "../../../service/user/userService";
import useUserStore from "../../../store/modules/user";
import useTools from "../../../mixins/tools";
import type {
  BindPhoneForm,
  BindPhoneSendCodeForm,
  UnbindPhoneForm,
} from "../../../service/user/model/userModel";

const { t, $u } = pageFrame();
const loading = ref<boolean>(true);
const navbarTitle = ref<string>("");
const isFinished = ref<boolean>(false);
const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const submitButtonText = ref<string>(t("user.safe.bind"));
const userStore = useUserStore();
const formRef = ref<any>(null);
const codeRef = ref<any>(null);
const model = ref<any>({});
const isbind = ref<boolean>();
const showSelectPhoneAreaCode = ref<boolean>(false);
const selectPhoneAreaCodeOptions = ref<Array<any>>([]);
const tips = ref<string>("");
const seconds = ref<number>(60);
const showTip = ref<boolean>(false);
const userService = useUserService();
const phoneAreaCode = ref();
const queryOptions = ref();
const tools = useTools();
const rules = {
  phone: {
    required: true,
    message: t("user.login.phone-warn"),
    trigger: ["change", "blur"],
  },
  phoneCode: {
    required: true,
    message: t("user.register.verification-code-warn"),
    trigger: ["change", "blur"],
  },
  phoneAreaCode: {
    required: true,
    message: t("user.register.verification-phone-area-warn"),
    trigger: ["change", "blur"],
  },
};

onReady(() => {
  formRef.value.setRules(rules);
});

onLoad(async (options: any) => {
  uni.setNavigationBarTitle({
    title: t("user.menu.bind-phone"),
  });
  queryOptions.value = options;
  await userStore.getUserInfo();
  const type = options.type; // 绑定类型  bind  unbind
  if (type === "unbind") {
    navbarTitle.value = t("unbind.phone");
    uni.setNavigationBarTitle({
      title: t("unbind.phone"),
    });
    isbind.value = false;
    submitButtonText.value = t("user.safe.unbind");
  } else {
    navbarTitle.value = t("bind.phone");
    uni.setNavigationBarTitle({
      title: t("bind.phone"),
    });
    isbind.value = true;
    submitButtonText.value = t("user.safe.bind");
  }

  const result = await userService.getPhoneCodeList();
  const data = result.data;
  const selectOptions = tools.genSelectOptions(
    data,
    "countryZh",
    "countryCode"
  );
  selectPhoneAreaCodeOptions.value = selectOptions;
  loading.value = false;
});

const getPhone = computed(() => {
  return tools.phoneDesensitize(userStore.phone);
});

const onShowPhoneAreaCodeSelect = () => {
  showSelectPhoneAreaCode.value = true;
};

const selectPhoneAreaCodeOnConfirm = (data: any) => {
  model.value.phoneAreaCode = data[0].label;
  phoneAreaCode.value = data[0].value;
};

const onCodeChange = (text: string) => {
  tips.value = text;
};

const onGetCode = async () => {
  if (codeRef.value.canGetCode) {
    uni.showLoading({
      title: t("user.Getting.verification.code"),
    });
    if (isbind.value) {
      const params = {
        phone: model.value.phone,
        phoneAreaCode: phoneAreaCode.value,
      } as BindPhoneSendCodeForm;
      await userService.bindPhoneSendCode(params);
    } else {
      await userService.unbindPhoneSendCode();
    }
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
    if (!model.value.phoneAreaCode) {
      $u.toast(t("user.register.verification-phone-area-warn"));
      return;
    }
    if (!model.value.phone) {
      $u.toast(t("user.login.phone-warn"));
      return;
    }
    if (!model.value.phoneCode) {
      $u.toast(t("user.register.verification-code-warn"));
      return;
    }
    const params = {
      phone: model.value.phone,
      phoneCode: model.value.phoneCode,
      phoneAreaCode: phoneAreaCode.value,
    } as BindPhoneForm;
    const result = await userService.bindPhone(params);
    const data = result.data;
    $u.toast(t("user.safe.bind.success"));
    isFinished.value = true;
  } else {
    // 解绑
    if (!model.value.phoneCode) {
      $u.toast(t("user.register.verification-code-warn"));
      return;
    }
    const params = {
      phoneCode: model.value.phoneCode,
    } as UnbindPhoneForm;
    const result = await userService.unbindPhone(params);
    const data = result.data;
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
