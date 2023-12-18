<template>
  <view class="lawyer_list_page p-3">
    <scroll-view
      scroll-y
      style="height: 100vh; width: 100%"
      @scrolltolower="onReachBottom"
    >
      <view class="content">
        <view class="list_item p-3" v-for="(item, index) in list" :key="index">
          <view class="flex_row">
            <u-avatar :src="item.signatureAvatar" shape="square"></u-avatar>
            <view class="right">
              <view class="name">{{ item.name }}</view>
              <view v-if="state"
                >{{ $t("user.lawyer.offices") }} {{ item.lawOfficeName }}</view
              >
              <view v-else>
                {{ $t("user.lawyer.services") }} {{ item.productName }}
              </view>
            </view>
          </view>
          <view class="lawyer_info_area">
            <view v-if="state">
              {{ $t("user.lawyer.services") }} {{ item.productName }}
            </view>
            <view>{{ $t("user.lawyer.email") }} {{ item.email }}</view>
            <view
              >{{ $t("user.lawyer.phone") }} {{ formateData(item.phone) }}</view
            >
            <view v-if="!state">
              {{ $t("user.broker.company") }}
              {{ formateData(item.companyName) }}
            </view>
            <view
              >{{ $t("user.broker.address") }}
              {{
                formateData(item.lawOfficeAddress || item.companyAddress)
              }}</view
            >
          </view>
          <view class="bottom_area">
            <view>{{ $t("user.lawyer.order-no") }} {{ item.orderNo }}</view>
            <view
              >{{ $t("user.lawyer.service-date") }}
              {{ dayjs(item.serviceBeginTime).format("YYYY-MM-DD hh:mm:ss") }} ~
              {{
                item.serviceEndTime
                  ? dayjs(item.serviceEndTime).format("YYYY-MM-DD hh:mm:ss")
                  : $t("user.lawyer.to-now")
              }}
            </view>
          </view>
        </view>
        <u-empty
          v-if="!list.length"
          :text="$t('global.list.is.empty')"
          mode="list"
          icon="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
          margin-top="200"
        ></u-empty>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import usePageFrame from "../../../../mixins/page-frame";
import dayjs from "dayjs";
/** 
list: [
  {
    avatar: "http://dummyimage.com/100x100",
    bindType: 2,
    bindUserName: "820373584@qq.com",
    email: "chuangjisu@126.com",
    id: 3,
    lawOfficeAddress: "黑龙江省上海市泽库县",
    lawOfficeName: "阿斯顿律所",
    lawyerNo: "869659857760813509",
    name: "布 吕",
    orderNo: "878385729518961091",
    phone: null,
    phoneNumber: "95",
    productName: "魏勒比广场壹号项目",
    serviceBeginTime: "2022-08-21 14:49:45",
    serviceEndTime: null,
    signatureAvatar: "http://dummyimage.com/100x100",
    status: 0,
  },
];
*/
defineProps({
  list: {
    type: Array<any>,
    default: () => [],
  },
  state: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["loadMore"]);
const { t, $u } = usePageFrame();
const formateData = (value: any) => {
  return value ? value : t("global.no-data");
};

const onReachBottom = () => {
  emits("loadMore");
};
</script>

<style lang="scss">
.lawyer_list_page {
  .content {
    font-size: 22rpx;
    font-weight: 400;
    letter-spacing: 0rpx;
    line-height: 30rpx;
    color: rgba(0, 0, 0, 0.5);

    .list_item {
      background-color: #ffffff;
      border: 1rpx solid rgba(0, 0, 0, 0.07);
      margin-bottom: 24rpx;

      .right {
        margin-left: 22rpx;
        font-size: 22rpx;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 48rpx;
        color: rgba(0, 0, 0, 0.8);

        .name {
          color: rgba(0, 0, 0, 0.9);
          font-size: 30rpx;
          font-weight: 600;
          letter-spacing: 0.96rpx;
          line-height: 32rpx;
        }
      }

      .lawyer_info_area {
        padding-top: 40rpx;
        border-bottom: 1rpx solid rgba(235, 235, 235, 1);

        view {
          margin-bottom: 20rpx;
        }
      }

      .bottom_area {
        view {
          margin-top: 20rpx;
        }
      }
    }
  }
}
</style>
