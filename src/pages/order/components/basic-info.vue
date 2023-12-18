<template>
  <view class="set_info_page">
    <u-skeleton
      :loading="loading"
      :animation="true"
      bgColor="#FFF"
    ></u-skeleton>
    <view class="u-skeleton">
      <view class="set_info_content">
        <view class="form_area">
          <view class="mb-3" v-for="(item, index) in formConfig" :key="index">
            <view v-if="item.type === 'input'">
              <view class="mb-1">
                <text class="text-danger" v-if="item.required">*</text>
                <text>{{ item.title_zh }}</text>
              </view>
              <u-input
                v-model="item.value"
                clearable
                border
                :placeholder="item.placeholder_zh"
              />
            </view>
            <view v-else-if="item.type === 'date'">
              <view class="mb-1">
                <text class="text-danger" v-if="item.required">*</text>
                <text>{{ item.title_zh }}</text>
              </view>
              <u-input
                v-model="item.value"
                :trim="false"
                border
                :placeholder="item.placeholder_zh"
                @click="onShowBirthdayPicker(item)"
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
            </view>
            <view v-else-if="item.type === 'dependents'">
              <view v-for="(subItem, subIndex) in item.value" :key="subIndex">
                <view
                  class="d-flex j-sb a-center mt-5 px-3 bg-color"
                  style="height: 68rpx"
                >
                  <view class="text-secondary"
                    >{{ $t("user.dependant") }} {{ subIndex + 1 }}</view
                  >
                  <view
                    class="text-danger"
                    @click="onDeleteDependant(item, subIndex)"
                    >{{ $t("global.delete") }}</view
                  >
                </view>
                <view
                  class="mt-3"
                  v-for="(sItem, sIndex) in subItem"
                  :key="sIndex"
                >
                  <view v-if="sItem.type === 'input'">
                    <view class="mb-1">
                      <text class="text-danger" v-if="sItem.required">*</text>
                      <text>{{ sItem.title_zh }}</text>
                    </view>
                    <u-input
                      v-model="sItem.value"
                      clearable
                      border
                      :placeholder="sItem.placeholder_zh"
                    />
                  </view>
                  <view v-else-if="sItem.type === 'date'">
                    <view class="mb-1">
                      <text class="text-danger" v-if="sItem.required">*</text>
                      <text>{{ sItem.title_zh }}</text>
                    </view>
                    <u-input
                      v-model="sItem.value"
                      :trim="false"
                      border
                      :placeholder="sItem.placeholder_zh"
                      @click="onShowBirthdayPicker(item)"
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
                  </view>
                </view>
              </view>
              <u-button class="btn-1 mt-3" @click="onAddCaregiver(item)">{{
                item.title_zh
              }}</u-button>
            </view>
          </view>
        </view>
      </view>
      <view class="bottom_area">
        <ComButton
          :title="$t('global.save')"
          :custom-style="customStyle"
          @onTap="onSubmitForm"
        />
      </view>
      <!-- #ifdef H5 -->
      <ComFooter v-if="deviceType !== DeviceType.PHONE" />
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang="ts">
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import usePageFrame from "../../../mixins/page-frame";
import type { PostInvestorOrderDataForm } from "../../../service/order/model/orderModel";
import useOrderService from "../../../service/order/orderService";
import useTools from "../../../mixins/tools";
import ComFooter from "../../../components/layout/footer/footer.vue";
import ComButton from "../../../components/button/button.vue";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";

export default {
  components: {
    ComFooter,
    ComButton,
  },
  setup(props) {
    const queryOptions = ref();
    const loading = ref<boolean>(true);
    const orderService = useOrderService();
    const orderInfo = ref();
    const formConfig = ref<Array<any>>([]);
    const showBirthdayPicker = ref<boolean>(false);
    const currentTarget = ref();
    const { onBack, t, $u } = usePageFrame();
    const customStyle = ref({
      borderColor: "#1D429F",
      color: "#FFFFFF",
      background: "#1D429F",
    });

    onLoad(async (options) => {
      queryOptions.value = options;

      const result = await orderService.getOrderDetail(
        queryOptions.value.orderNo
      );
      const data = result.data;
      orderInfo.value = data;
      formConfig.value = JSON.parse(data.investorForm);
      loading.value = false;
    });

    const onBirthdayPickerChange = (data: any) => {
      currentTarget.value.value = data.year + "/" + data.month + "/" + data.day;
    };

    const onShowBirthdayPicker = (item: any) => {
      currentTarget.value = item;
      showBirthdayPicker.value = true;
    };

    const onDeleteDependant = (item: any, subIndex: number) => {
      item.value.splice(subIndex, 1);
    };

    const onAddCaregiver = (item: any) => {
      item.value.push([
        {
          type: "input",
          title_zh: "姓氏",
          placeholder_zh: "请输入",
          filed: "lastName",
          value: null,
          requried: true,
          props: {
            span: 1,
          },
        },
        {
          type: "input",
          title_zh: "名字",
          placeholder_zh: "请输入",
          filed: "firstName",
          value: null,
          requried: true,
          props: {
            span: 1,
          },
        },
        {
          type: "date",
          title_zh: "出生日期",
          placeholder_zh: "选择日期",
          filed: "birthday",
          value: null,
          requried: true,
          props: {
            span: 1,
          },
        },
        {
          type: "input",
          title_zh: "海外家庭住址",
          placeholder_zh: "请输入海外家庭住址",
          filed: "overseasAddress",
          value: null,
          requried: true,
          props: {
            span: 2,
          },
        },
      ]);
    };

    const onSubmitForm = async () => {
      for (let item of formConfig.value) {
        if (item.required && $u.test.isEmpty(item.value)) {
          if (item.type === "dependents") {
            $u.toast(t("global.input") + item.title_zh);
          } else {
            $u.toast(item.title_zh + " " + t("global.can-not-null"));
          }
          return;
        } else {
          if (item.type === "dependents") {
            for (let subIndex in item.value) {
              for (let sItem of item.value[subIndex]) {
                if (sItem.required && $u.test.isEmpty(sItem.value)) {
                  let i = parseInt(subIndex) + 1;
                  $u.toast(
                    t("user.dependant") +
                      i +
                      sItem.title_zh +
                      " " +
                      t("global.can-not-null")
                  );
                  return;
                }
              }
            }
          }
        }
      }
      const params = {
        id: orderInfo.value.id,
        investorForm: JSON.stringify(formConfig.value),
      } as PostInvestorOrderDataForm;
      const result = await orderService.postInvestorOrderData(params);
      const data = result.data;
      uni.showToast({
        title: t("global.submit.success"),
        icon: "none",
        success: () => {
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        },
      });
    };
    return {
      loading,
      onSubmitForm,
      customStyle,
      deviceType,
      DeviceType,
      formConfig,
      showBirthdayPicker,
      onShowBirthdayPicker,
      onBirthdayPickerChange,
      onDeleteDependant,
      onAddCaregiver,
    };
  },
};
</script>

<style lang="scss" scoped>
.set_info_page {
  .set_info_content {
    background-color: #fff;
    margin: 0 32rpx 40rpx;
    padding: 32rpx;
  }
  .u-button {
    margin-left: 0;
    margin-right: 0;
    height: 68rpx;

    &.btn-1 {
      color: #2080f0;
      border-color: #2080f0;
    }

    &.btn-2 {
      color: #fff;
      background-color: #0050b3;
      border: none;
    }
  }
  .bottom_area {
    background-color: #fff;
    height: 144rpx;
    padding: 32rpx;
    button {
      background-color: rgba(0, 80, 179, 1);
      color: #fff;
    }
  }
}
</style>

<style lang="scss">
::v-deep .oper-wrapper {
  top: calc(100% - 50px) !important;
}
</style>
