<template>
  <view class="two_verifications_page">
    <view>
      <view class="popup_content">
        <view class="popup_content_title">
          <text>{{ $t("user.menu.two-step") }}</text>
        </view>
        <u-form
          :model="model"
          :ref="formRef"
          label-position="top"
          label-width="100%"
        >
          <u-form-item
            :border-bottom="false"
            :label="
              type === 'email'
                ? $t('user.mine.email-code')
                : type === 'google'
                ? $t('user.mine.google-code')
                : type === 'phone'
                ? $t('user.mine.phone-code')
                : ''
            "
            :prop="
              type === 'email'
                ? 'emailCode'
                : type === 'google'
                ? 'googleCode'
                : type === 'phone'
                ? 'phoneCode'
                : ''
            "
          >
            <view
              class="input_box h-9 flex-1 flex content-center border rounded px-2"
            >
              <u-input
                v-if="type === 'email'"
                class="mr-1"
                clearable
                v-model="model.emailCode"
                :placeholder="$t('global.input')"
              >
              </u-input>
              <u-input
                v-if="type === 'google'"
                class="mr-1"
                clearable
                v-model="model.googleCode"
                :placeholder="$t('global.input')"
              >
              </u-input>
              <u-input
                v-if="type === 'phone'"
                class="mr-1"
                clearable
                v-model="model.phoneCode"
                :placeholder="$t('global.input')"
              >
              </u-input>
              <view class="h-9" v-if="type === 'email' || type === 'phone'">
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
            <text v-if="type === 'email'">
              {{ $t("user.mine.email-code-send-1") }}
            </text>
            <text v-if="type === 'phone'">
              {{ $t("user.mine.phone-code-send-1") }}
            </text>
            <text v-if="type === 'google'">
              {{ $t("user.mine.google-code-send-1") }}
            </text>
            <text v-if="type === 'email'" style="color: rgba(0, 80, 179, 1)">
              {{ getEmail }}
            </text>
            <text v-if="type === 'phone'" style="color: rgba(0, 80, 179, 1)">
              {{ getPhone }}
            </text>
            <text v-if="type === 'google'" style="color: rgba(0, 80, 179, 1)">
              {{ getEmail }}
            </text>
            <text v-if="type === 'email'">
              {{ $t("user.mine.email-code-send-2") }}
            </text>
            <text v-if="type === 'phone'">
              {{ $t("user.mine.phone-code-send-2") }}
            </text>
            <text v-if="type === 'google'">
              {{ $t("user.mine.google-code-send-2") }}
            </text>
          </view>
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

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
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

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "email", // 可选值 email   google    phone
    },
  },
  setup(props, { emit }) {
    const model = ref<any>(defaultForm);
    const formRef = ref<string>("formRef");
    const codeRef = ref<string>("codeRef");
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
      const ref: any = formRef.value;
      if (props.type === MultiAuthType.EMAIL) {
        ref.setRules(rules.emailCode);
      } else if (props.type === MultiAuthType.GOOGLE) {
        ref.setRules(rules.googleCode);
      } else if (props.type === MultiAuthType.PHONE) {
        ref.setRules(rules.phoneCode);
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
      const ref: any = codeRef.value;
      if (ref.canGetCode) {
        uni.showLoading({
          title: t("user.Getting.verification.code"),
        });
        if (props.type === MultiAuthType.EMAIL) {
          await userService.multAuthEmailCode();
        } else if (props.type === MultiAuthType.GOOGLE) {
          // 谷歌验证码的查看在app中进行
          // await userService.multAuthGoogleCode();
        } else if (props.type === MultiAuthType.PHONE) {
          await userService.multAuthPhoneCode();
        }
        uni.hideLoading();
        $u.toast(t("user.register.verification-code-sent"));
        showTip.value = true;
        // 通知验证码组件内部开始倒计时
        ref.start();
      }
    };

    const onConfirm = async () => {
      if (props.type === MultiAuthType.EMAIL) {
        if (!model.value.emailCode) {
          uni.showToast({
            title: t("user.register.email.code.warn"),
            icon: "none",
            mask: true,
          });
          return;
        } else {
          const params = {
            emailCode: model.value.emailCode,
          };
          await userStore.multiAuth(params);
          uni.showToast({
            title: t("global.submit.success"),
            icon: "none",
            mask: true,
          });
          emit("confirm");
        }
      } else if (props.type === MultiAuthType.GOOGLE) {
        if (!model.value.googleCode) {
          uni.showToast({
            title: t("user.register.google.code.warn"),
            icon: "none",
            mask: true,
          });
          return;
        } else {
          const params = {
            googleCode: model.value.googleCode,
          };
          await userStore.multiAuth(params);
          uni.showToast({
            title: t("global.submit.success"),
            icon: "none",
            mask: true,
          });
          emit("confirm");
        }
      } else if (props.type === MultiAuthType.PHONE) {
        if (!model.value.phoneCode) {
          uni.showToast({
            title: t("user.register.phone.code.warn"),
            icon: "none",
            mask: true,
          });
          return;
        } else {
          const params = {
            phoneCode: model.value.phoneCode,
          };
          await userStore.multiAuth(params);
          uni.showToast({
            title: t("global.submit.success"),
            icon: "none",
            mask: true,
          });
          emit("confirm");
        }
      }
    };

    return {
      model,
      formRef,
      seconds,
      codeRef,
      onCodeChange,
      onGetCode,
      tips,
      showTip,
      getEmail,
      getPhone,
      onConfirm,
    };
  },
});
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
