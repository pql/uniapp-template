<template>
  <view class="appointment">
    <view class="p-3">
      <view class="form_area">
        <view class="title">{{ title }}</view>
        <u-form
          :model="form"
          label-position="top"
          label-width="100%"
          ref="formRef"
        >
          <!-- name -->
          <u-form-item
            :border-bottom="false"
            :label="$t('index.home.appointment.name')"
            prop="name"
          >
            <u-input
              v-model="form.name"
              clearable
              border
              :placeholder="$t('index.home.appointment.name.placeholder')"
            />
          </u-form-item>
          <!-- name -->
          <!-- phone -->
          <u-form-item
            :border-bottom="false"
            :label="$t('index.home.appointment.phone')"
            prop="phone"
          >
            <u-input
              v-model="form.phone"
              clearable
              border
              :placeholder="$t('index.home.appointment.phone.placeholder')"
            />
          </u-form-item>
          <!-- phone -->
          <!-- email -->
          <u-form-item
            :border-bottom="false"
            :label="$t('index.home.appointment.email')"
            prop="email"
          >
            <u-input
              v-model="form.email"
              clearable
              border
              :placeholder="$t('index.home.appointment.email.placeholder')"
            />
          </u-form-item>
          <!-- email -->
          <!-- memo -->
          <u-form-item
            v-if="showRemark"
            :border-bottom="false"
            :label="$t('index.home.appointment.memo')"
            prop="memo"
          >
            <u-input
              v-model="form.memo"
              clearable
              border
              :placeholder="$t('index.home.appointment.memo.placeholder')"
            />
          </u-form-item>
          <!-- memo -->
          <view>{{ $t("index.home.appointment.choose-one") }}</view>
          <view class="bottom_area">
            <ComButton
              :title="buttonText"
              :custom-style="customStyle"
              @onTap="onSubmit"
            />
          </view>
        </u-form>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { ref } from "vue";
import usePageFrame from "../../mixins/page-frame";
import {
  isEmailPassed,
  isChineseNamePassed,
  isPhoneNumberPassed,
} from "../../mixins/validator";
import ComButton from "../button/button.vue";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  memo: "",
};
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    buttonText: {
      type: String,
      default: "提交",
    },
    showRemark: {
      type: Boolean,
      default: true,
    },
  },
  components: { ComButton },
  setup(props, { emit }) {
    const form = ref<any>(defaultForm);
    const customStyle = ref({
      borderColor: "#1D429F",
      color: "#FFFFFF",
      background: "#1D429F",
    });
    const { t, $u } = usePageFrame();
    const onSubmit = () => {
      if (!isChineseNamePassed(form.value.name)) {
        $u.toast(t("index.home.appointment.name.placeholder"));
        return;
      }
      if (!isPhoneNumberPassed(form.value.phone)) {
        $u.toast(t("index.home.appointment.phone.placeholder"));
        return;
      }
      emit("confirm", form.value);
    };
    return {
      form,
      customStyle,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 32rpx;
}
.from_area {
  padding: 42rpx;
  background: #fff;
  margin: 0 32rpx 32rpx;
}
.bottom_area {
  background-color: #fff;
  position: relative;
  margin-top: 40rpx;
}
</style>
