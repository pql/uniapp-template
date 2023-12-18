<template>
  <view class="two_verifications_page">
    <view>
      <view class="popup_content">
        <view class="popup_content_title">
          <text>{{ $t("user.menu.two-step") }}</text>
        </view>
        <u-form
          :model="model"
          ref="formRef"
          label-position="top"
          label-width="100%"
        >
          <!-- email -->
          <u-form-item
            :border-bottom="false"
            v-if="types.indexOf('email') >= 0"
            :label="$t('user.mine.email-code')"
            prop="emailCode"
          >
            <view
              class="input_box h-9 flex-1 flex content-center border rounded px-2"
            >
              <u-input
                class="mr-1"
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
          <view v-if="showTip" class="form_tip_info mb-2">
            <text>
              {{ $t("user.mine.email-code-send-1") }}
            </text>
            <text style="color: rgba(0, 80, 179, 1)">
              {{ getEmail }}
            </text>
            <text>
              {{ $t("user.mine.email-code-send-2") }}
            </text>
          </view>
          <!-- email -->
          <!-- google -->
          <u-form-item
            v-if="types.indexOf('google') >= 0"
            :border-bottom="false"
            :label="$t('user.mine.google-code')"
            prop="googleCode"
          >
            <view
              class="input_box h-9 flex-1 flex content-center border rounded px-2"
            >
              <u-input
                class="mr-1"
                clearable
                v-model="model.googleCode"
                :placeholder="$t('global.input')"
              >
              </u-input>
            </view>
          </u-form-item>
          <!-- google -->
          <!-- phone -->
          <u-form-item
            v-if="types.indexOf('phone') >= 0"
            :border-bottom="false"
            :label="$t('user.mine.phone-code')"
            prop="phoneCode"
          >
            <view
              class="input_box h-9 flex-1 flex content-center border rounded px-2"
            >
              <u-input
                class="mr-1"
                clearable
                v-model="model.phoneCode"
                :placeholder="$t('global.input')"
              >
              </u-input>
              <view class="h-9">
                <u-verification-code
                  :seconds="seconds"
                  :ref="codeRef"
                  @change="onCodeChange"
                ></u-verification-code>
                <text class="code" @tap="onGetCode">{{ tips }}</text>
              </view>
            </view>
          </u-form-item>
          <view v-if="showTip" class="form_tip_info mb-2">
            <text>
              {{ $t("user.mine.phone-code-send-1") }}
            </text>
            <text style="color: rgba(0, 80, 179, 1)">
              {{ getPhone }}
            </text>
            <text>
              {{ $t("user.mine.phone-code-send-2") }}
            </text>
          </view>
          <!-- phone -->
        </u-form>
      </view>
      <view class="popup_bottom">
        <view class="confirm" @click="onConfirm">{{
          $t("global.confirm")
        }}</view></view
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
} from "vue";
import usePageFrame from "../../mixins/page-frame";
import useTools from "../../mixins/tools";
import useUserStore from "../../store/modules/user";
import useUserService from "../../service/user/userService";
import { MultiAuthType } from "../../types/enum";
import { onLoad } from "@dcloudio/uni-app";
const defaultForm = {
  emailCode: "",
  googleCode: "",
  phoneCode: "",
};

const emits = defineEmits(["confirm"]);

const props = defineProps({
  types: {
    type: Array,
    default: [], // 可选值 email   google    phone
  },
});

const model = ref<any>(defaultForm);
const formRef = ref<any>(null);
const codeRef = ref<any>(null);
const tips = ref<string>("");
const seconds = ref<number>(60);
const showTip = ref<boolean>(false);
const userService = useUserService();
const { t, $u } = usePageFrame();
const userStore = useUserStore();
const tools = useTools();
const rules = {
  emailCode: [
    {
      required: true,
      message: t("user.register.email.code.warn"),
      trigger: "change",
    },
  ],
  googleCode: [
    {
      required: true,
      message: t("user.register.google.code.warn"),
      trigger: "change",
    },
  ],
  phoneCode: [
    {
      required: true,
      message: t("user.register.phone.code.warn"),
      trigger: "change",
    },
  ],
};

const getEmail = computed(() => {
  return tools.cryptoEmail(userStore.email);
});

const getPhone = computed(() => {
  return tools.phoneDesensitize(userStore.phone);
});

onMounted(() => {
  if (props.types.indexOf(MultiAuthType.EMAIL) >= 0) {
    formRef.value.setRules(rules.emailCode);
  } else if (props.types.indexOf(MultiAuthType.GOOGLE) >= 0) {
    formRef.value.setRules(rules.googleCode);
  } else if (props.types.indexOf(MultiAuthType.PHONE) >= 0) {
    formRef.value.setRules(rules.phoneCode);
  }
});

onLoad(async () => {
  // 只有在没有获取到用户信息时才调用获取用户信息接口
  await userStore.getUserInfo();
});

const onCodeChange = (text: string) => {
  tips.value = text;
};

const onGetCode = async () => {
  if (codeRef.value.canGetCode) {
    uni.showLoading({
      title: t("user.Getting.verification.code"),
    });
    if (props.types.indexOf(MultiAuthType.EMAIL) >= 0) {
      await userService.multAuthEmailCode();
    }
    if (props.types.indexOf(MultiAuthType.GOOGLE) >= 0) {
      // 谷歌验证码的查看在app中进行
      // await userService.multAuthGoogleCode();
    }
    if (props.types.indexOf(MultiAuthType.PHONE) >= 0) {
      await userService.multAuthPhoneCode();
    }
    uni.hideLoading();
    $u.toast(t("user.register.verification-code-sent"));
    showTip.value = true;
    // 通知验证码组件内部开始倒计时
    codeRef.value.start();
  }
};

const onConfirm = async () => {
  const params: any = {};
  if (props.types.indexOf(MultiAuthType.EMAIL) >= 0) {
    params.emailCode = model.value.emailCode;
  }
  if (props.types.indexOf(MultiAuthType.GOOGLE) >= 0) {
    params.googleCode = model.value.googleCode;
  }
  if (props.types.indexOf(MultiAuthType.PHONE) >= 0) {
    params.phoneCode = model.value.phoneCode;
  }
  await userStore.multiAuth(params);
  uni.showToast({
    title: t("global.submit.success"),
    icon: "none",
    mask: true,
  });
  emits("confirm");
};
</script>

<style lang="scss">
.popup_content {
  padding: 0 45rpx;
  .popup_content_title {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 40rpx;
    font-weight: 600;
    letter-spacing: 1.2rpx;
    image {
      float: right;
      top: 32rpx;
    }
  }
  .form_tip_info {
    color: rgba(0, 0, 0, 0.5);
    font-size: 28rpx;
    font-weight: 400;
    font-family: PingFangSC;
  }
}
.popup_bottom {
  height: 132rpx;
  background-color: #fff;
  border-top: 1rpx solid rgba(237, 237, 237, 1);
  padding: 26rpx 45rpx;
  .confirm {
    height: 80rpx;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
    background-color: rgba(0, 80, 179, 1);
  }
}
.code {
  color: rgba(0, 80, 179, 1);
}
</style>
