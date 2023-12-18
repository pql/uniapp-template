<template>
  <view class="set_info_page">
    <view class="set_info_content p-3">
      <view class="title">{{ $t("user.mine.profile") }}</view>
      <view class="base_info flex_row mt-2">
        <view class="left">
          <u-avatar
            :src="form.signAvatar"
            mode="circle"
            width="120"
            height="120"
            @click="onUpload"
          ></u-avatar>
          <!-- <ComAvatar
            :ref="avatarRef"
            selWidth="200px"
            selHeight="400upx"
            @upload="onUpload"
            :avatarSrc="form.signAvatar"
            avatarStyle="width: 130rpx; height: 130rpx; border-radius: 100%;"
          >
          </ComAvatar> -->
        </view>
        <view class="right">
          <view>
            <text style="color: rgba(0, 80, 179, 1)">{{ form.email }}</text>
          </view>
          <view>
            {{ $t("user.complete.personal.information") }}
          </view>
        </view>
      </view>
      <view class="form_area">
        <u-form
          :model="form"
          ref="formRef"
          label-position="top"
          label-width="100%"
        >
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.phone')"
          >
            <u-input
              v-model="form.phone"
              clearable
              border
              disabled
              placeholder=""
            />
          </u-form-item>
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.email')"
          >
            <u-input
              v-model="form.email"
              clearable
              border
              disabled
              placeholder=""
            />
          </u-form-item>
          <!-- lastName -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.last-name')"
            prop="lastName"
            required
          >
            <u-input
              v-model="form.lastName"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- lastName -->
          <!-- firstName -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.first-name')"
            prop="firstName"
            required
          >
            <u-input
              v-model="form.firstName"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- firstName -->
          <!-- middleName -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.middle-name')"
          >
            <u-input
              v-model="form.middleName"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- middleName -->
          <!-- country -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.area')"
            prop="country"
            required
          >
            <u-input
              v-model="form.country"
              type="select"
              :trim="false"
              border
              :placeholder="$t('user.mine.profile.area')"
              @click="onShowCountrySelect"
            />
            <u-select
              :confirm-text="$t('global.confirm')"
              :cancel-text="$t('global.cancel')"
              v-model="showSelectCountry"
              mode="single-column"
              :list="selectCountryOptions"
              @confirm="selectCountryOnConfirm"
            ></u-select>
          </u-form-item>
          <!-- country -->
          <!-- province -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.province')"
            prop="province"
            required
          >
            <u-input
              v-model="form.province"
              type="select"
              :trim="false"
              border
              :placeholder="$t('user.mine.profile.province')"
              @click="onShowProvinceSelect"
            />
            <u-select
              :confirm-text="$t('global.confirm')"
              :cancel-text="$t('global.cancel')"
              v-model="showSelectProvince"
              mode="single-column"
              :list="selectProvinceOptions"
              @confirm="selectProvinceOnConfirm"
            ></u-select>
          </u-form-item>
          <!-- province -->
          <!-- city -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.city')"
          >
            <u-input
              v-model="form.city"
              :placeholder="$t('global.input')"
              border
            />
          </u-form-item>
          <!-- city -->
          <!-- zipCode -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.postal-code')"
          >
            <u-input
              v-model="form.zipCode"
              :placeholder="$t('global.input')"
              border
            />
          </u-form-item>
          <!-- zipCode -->
          <!-- birthday -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.birth')"
            prop="birthday"
            required
          >
            <u-input
              v-model="form.birthday"
              :trim="false"
              border
              :placeholder="$t('user.mine.profile.birth')"
              @click="onShowBirthdayPicker"
            />
            <u-picker
              :confirm-text="$t('global.confirm')"
              :cancel-text="$t('global.cancel')"
              :params="{
                year: true,
                month: true,
                day: true,
                hour: false,
                minute: false,
                second: false,
              }"
              v-model="showBirthdayPicker"
              mode="time"
              @confirm="onBirthdayPickerChange"
            ></u-picker>
          </u-form-item>
          <!-- birthday -->
          <!-- overseasAddress -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.address')"
            prop="overseasAddress"
            required
          >
            <u-input
              v-model="form.overseasAddress"
              :placeholder="$t('global.input')"
              border
            />
          </u-form-item>
          <!-- overseasAddress -->
          <!-- currentAddress -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.address-usa')"
            prop="overseasAddress"
            required
          >
            <u-input
              v-model="form.currentAddress"
              :placeholder="$t('global.input')"
              border
            />
          </u-form-item>
          <!-- currentAddress -->
          <!-- alienNumber -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.alien-number')"
            prop=""
          >
            <u-input
              v-model="form.alienNumber"
              :placeholder="$t('global.input')"
              border
            />
          </u-form-item>
          <!-- alienNumber -->
          <!-- gender -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.mine.profile.gander')"
          >
            <u-input
              v-model="form.gander"
              type="select"
              :trim="false"
              border
              :placeholder="$t('user.mine.profile.area')"
              @click="onShowGenderSelect"
            />
            <u-select
              :confirm-text="$t('global.confirm')"
              :cancel-text="$t('global.cancel')"
              v-model="showSelectGender"
              mode="single-column"
              :list="selectGenderOptions"
              @confirm="selectGenderOnConfirm"
            ></u-select>
          </u-form-item>
          <!-- gender -->
          <!-- middleName -->
          <u-form-item
            :border-bottom="false"
            :label="$t('user.social.Security.number')"
            prop="repsw"
          >
            <u-input
              v-model="form.ssn"
              clearable
              border
              :placeholder="$t('global.input')"
            />
          </u-form-item>
          <!-- middleName -->
        </u-form>
      </view>
    </view>
    <view class="bottom_area m-3">
      <ComButton
        :title="$t('user.mine.profile.save')"
        :custom-style="customStyle"
        @onTap="onSubmitForm"
      />
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onReady, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import usePageFrame from "../../../mixins/page-frame";
// import ComAvatar from "../../../components/avatar/avatar.vue";
import ComButton from "../../../components/button/button.vue";
import useUserStore from "../../../store/modules/user";
import useCommonService from "../../../service/common/commonService";
import useTools from "../../../mixins/tools";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType, GenderType } from "../../../types/enum";
import dayjs from "dayjs";
import { deviceType } from "../../../utils/platform";
const { onBack, t, $u } = usePageFrame();
const defaultForm = {
  signAvatar: "",
};
const rules = {
  country: {
    required: true,
    message: t("user.mine.profile.area-warning"),
    trigger: ["change"],
  },
  province: {
    required: true,
    message: t("user.mine.profile.province-warning"),
    trigger: ["change"],
  },
  firstName: {
    required: true,
    message: t("user.mine.profile.first-name-warning"),
    trigger: "change",
  },
  lastName: {
    required: true,
    message: t("user.mine.profile.last-name-warning"),
    trigger: "change",
  },
  currentAddress: {
    required: true,
    message: t("user.mine.profile.address-warning"),
    trigger: "change",
  },
  overseasAddress: {
    required: true,
    message: t("user.mine.profile.address-usa-warning"),
    trigger: "change",
  },
  birthday: {
    required: true,
    message: t("user.mine.profile.birth-warning"),
    trigger: "change",
  },
};

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});
const userStore = useUserStore();
const tools = useTools();
const loading = ref<boolean>(true);
const form = ref<any>(defaultForm);
const formRef = ref<any>(null);
const avatarRef = ref("avatarRef");
const commonService = useCommonService();
const showSelectCountry = ref<boolean>(false);
const showSelectProvince = ref<boolean>(false);
const showBirthdayPicker = ref<boolean>(false);
const showSelectGender = ref<boolean>(false);
const selectCountryOptions = ref<Array<any>>([]);
const selectProvinceOptions = ref<Array<any>>([]);
const selectGenderOptions = ref<Array<any>>([
  {
    label: t("user.gander.male"),
    value: 1,
  },
  {
    label: t("user.gander.female"),
    value: 0,
  },
  {
    label: t("user.gander.unknow"),
    value: 2,
  },
]);

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.mine.profile"),
  });
});

const onLoadCountryData = async () => {
  const result = await commonService.countryList();
  const data = result.data;
  const options = tools.genSelectOptions(data, "chName", "id");
  selectCountryOptions.value = options;
};

const onLoadProvinceData = async (parentId: number) => {
  const result = await commonService.getProvinceDataByCountryId(parentId);
  const data = result.data;
  const options = tools.genSelectOptions(data, "chName", "id");
  selectProvinceOptions.value = options;
};

const fetchAndFormateUserInfo = async () => {
  const userinfo = await userStore.getUserInfo();
  loading.value = false;
  form.value = userinfo;
  if (userinfo.birthday != null) {
    form.value.birthday = dayjs(userinfo.birthday).format("YYYY-MM-DD");
  }
  if (userinfo.email != null) {
    form.value.email = tools.cryptoEmail(userinfo.email);
  }
  if (userinfo.gander != null) {
    form.value.gander = selectGenderOptions.value.filter(
      (gender) => gender.value === userinfo.gander
    )[0].label;
  } else {
    form.value.gander = selectGenderOptions.value[0].label;
  }
};

onShow(async () => {
  await fetchAndFormateUserInfo();

  onLoadCountryData();
});

onReady(() => {
  formRef.value.setRules(rules);
});

const onUpload = async (data: any) => {
  const tempFilePath = data.path;
  uni.uploadFile({
    url: `${import.meta.env.VITE_APP_API_BASE_URL}/common/file/s3/upload`,
    filePath: tempFilePath,
    name: "file",
    success: async (uploadFileRes) => {
      form.value.avatar = JSON.parse(uploadFileRes.data).data;
      const result = await commonService.getFileUrl({
        key: JSON.parse(uploadFileRes.data).data,
      });
      const path = result.data;
      form.value.signAvatar = path;
    },
  });
};

const onShowCountrySelect = () => {
  showSelectCountry.value = true;
};

const onShowProvinceSelect = () => {
  showSelectProvince.value = true;
};

const onShowBirthdayPicker = () => {
  showBirthdayPicker.value = true;
};

const selectCountryOnConfirm = (data: any) => {
  form.value.country = data[0].label;
  onLoadProvinceData(data[0].value);
  form.value.province = "";
};

const selectProvinceOnConfirm = (data: any) => {
  form.value.province = data[0].label;
};

const onBirthdayPickerChange = (data: any) => {
  form.value.birthday = data.year + "/" + data.month + "/" + data.day;
};

const onShowGenderSelect = () => {
  showSelectGender.value = true;
};

const selectGenderOnConfirm = (data: any) => {
  form.value.gander = data[0].label;
};

const onSubmitForm = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    const params = {
      id: form.value.id,
      avatar: form.value.avatar,
      phone: form.value.phone,
      firstName: form.value.firstName,
      middleName: form.value.middleName,
      lastName: form.value.lastName,
      country: form.value.country,
      province: form.value.province,
      city: form.value.city,
      zipCode: form.value.zipCode,
      birthday: dayjs(form.value.birthday).unix() * 1000,
      overseasAddress: form.value.overseasAddress,
      currentAddress: form.value.currentAddress,
      alienNumber: form.value.alienNumber,
      gander: selectGenderOptions.value.filter(
        (item) => item.label === form.value.gander
      )[0].value,
      ssn: form.value.ssn,
    };
    await userStore.updateUserInfo(params);
    uni.showToast({
      title: t("global.submit.success"),
      icon: "success",
      mask: true,
    });
    await fetchAndFormateUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.set_info_page {
  .set_info_content {
    background-color: #fff;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 32rpx;
    }
    .base_info {
      align-items: center;
      .right {
        margin-left: 40rpx;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0.96rpx;
      }
    }
  }
  .bottom_area {
    height: 144rpx;
  }
}
</style>

<style lang="scss">
::v-deep .oper-wrapper {
  top: calc(100% - 50px) !important;
}
</style>
