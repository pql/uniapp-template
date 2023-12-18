<template>
  <view class="seeSealDetail_popup">
    <view class="top">
      <text class="title">{{ $t("user.stamp.table.action") }}</text>
      <text v-if="seal.status === 0" class="color_red fs_28" @click="onRevoke">
        {{ $t("user.stamp.action.revoke") }}
      </text>
    </view>
    <view class="content">
      <view class="sealImg_area">
        <image class="sealImg" :src="seal.imgUrl" mode="aspectFill" />
      </view>
      <view class="card">
        <ComCardItem :show-view-button="false" :list="[seal]"></ComCardItem>
      </view>
    </view>
    <view class="popup_bottom">
      <view class="confirm" @click="onClose">{{
        $t("user.2fa.status-close")
      }}</view>
    </view>
    <u-popup
      v-model="showMultiVerifyPopup"
      mode="center"
      closeable
      border-radius="16"
      width="90%"
      @close="onMultiVerifyPopClose"
    >
      <ComPopupMultiVerify
        :types="multiVerifyTypes"
        @confirm="onMultiVerifyConfirm"
      />
    </u-popup>
  </view>
</template>

<script lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { defineComponent, ref } from "vue";
import ComCardItem from "./card-item.vue";
import ComPopupMultiVerify from "../../../../components/popup/multi-verify.vue";
import useUserStore from "../../../../store/modules/user";
import useUserService from "../../../../service/user/userService";
import type { RevokeSealForm } from "../../../../service/user/model/userModel";

export default defineComponent({
  props: {
    seal: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ComCardItem,
    ComPopupMultiVerify,
  },
  setup(props, { emit }) {
    const userStore = useUserStore();
    const userService = useUserService();
    const showMultiVerifyPopup = ref<boolean>(false);
    const multiVerifyTypes = ref<Array<string>>([]);
    onShow(() => {
      if (userStore.twoFaStatus === 1) {
        multiVerifyTypes.value.push("email");
      }
      if (userStore.twoFaGoogleStatus === 1) {
        multiVerifyTypes.value.push("google");
      }
      if (userStore.twoFaPhoneStatus === 1) {
        multiVerifyTypes.value.push("phone");
      }
    });
    const onMultiVerifyPopClose = () => {
      showMultiVerifyPopup.value = false;
    };
    const onMultiVerifyConfirm = async () => {
      const params = {
        id: props.seal.id as number,
      } as RevokeSealForm;
      const result = await userService.revokeSeal(params);
      const data = result.data;
      onMultiVerifyPopClose();
      emit("revoke");
    };
    const onRevoke = () => {
      showMultiVerifyPopup.value = true;
    };
    const onClose = () => {
      emit("close");
    };
    return {
      onRevoke,
      onClose,
      showMultiVerifyPopup,
      onMultiVerifyPopClose,
      onMultiVerifyConfirm,
      multiVerifyTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
.seeSealDetail_popup {
  height: calc(100vh - 88rpx);
  .top {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    padding: 0 80rpx;
    .title {
      padding-left: 80rpx;
      font-size: 40rpx;
      font-weight: 500;
    }
    .fs_28 {
      font-size: 28rpx;
      float: right;
    }
    .color_green {
      color: rgba(24, 160, 88, 1);
    }
    .color_red {
      color: rgba(217, 54, 62, 0.8);
    }
  }
  .content {
    margin: 40rpx 64rpx 0;
    height: calc(100vh - 88rpx - 100rpx - 172rpx);
    .sealImg_area {
      width: 622rpx;
      height: 467rpx;
      margin-bottom: 41rpx;
    }
    .sealImg {
      width: 622rpx;
      height: 467rpx;
      object-fit: cover;
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
}
</style>
