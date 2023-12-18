<template>
  <view class="seeSealDetail_popup">
    <view class="top">
      <text class="title">{{ $t("user.add.stamp") }}</text>
    </view>
    <view class="content">
      <view class="holder_title">{{ $t("user.stamp.table.owner") }}</view>
      <u-input
        border
        :placeholder="$t('global.input')"
        v-model="holder"
        style="margin: 30rpx 0 100rpx"
      ></u-input>
      <view class="holder_title">
        {{ $t("user.stamp.modal.upload") }}
        <text style="color: rgb(0, 80, 179)" @click="onGoCreateSeal"
          >({{ $t("user.stamp.modal.no-data-and-create-data") }})</text
        >
      </view>
      <view class="upload_area">
        <view @click="onUpload">
          <u-image
            class="add_img"
            :src="
              previewImageUrl
                ? previewImageUrl
                : 'https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/add_images.png'
            "
            mode="aspectFill"
            style="width: 240rpx; height: 240rpx"
          ></u-image>
        </view>
      </view>
      <view class="upload_tip" v-if="!previewImageUrl">{{
        $t("user.stamp.modal.upload-tips")
      }}</view>
      <view class="re_load" v-if="previewImageUrl" @click="onUpload">{{
        $t("global.upload.again")
      }}</view>
    </view>
    <view class="popup_bottom">
      <view class="confirm" @click="onConfirm"
        >{{ $t("global.confirm") }}
      </view>
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

<script lang="ts" setup>
import useCommonService from "../../../../service/common/commonService";
import { ref, defineEmits } from "vue";
import { t } from "../../../../locale";
import ComPopupMultiVerify from "../../../../components/popup/multi-verify.vue";
import type { CreateSealForm } from "../../../../service/user/model/userModel";
import useUserService from "../../../../service/user/userService";
import { onLoad, onShow } from "@dcloudio/uni-app";
import useUserStore from "../../../../store/modules/user";

const holder = ref<string>();
const previewImageUrl = ref<string>();
const uploadImageKey = ref<string>();
const showMultiVerifyPopup = ref<boolean>(false);
const userService = useUserService();
const emit = defineEmits(["confirm"]);
const userStore = useUserStore();
const commonService = useCommonService();
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

onLoad(async (options: any) => {
  if (options.signatureKey) {
    const signatureKey = decodeURIComponent(options.signatureKey);
    const result = await commonService.getFileUrl({
      key: signatureKey,
    });
    const data = result.data;
    previewImageUrl.value = data; // 图片预览地址
    uploadImageKey.value = signatureKey; // 图片上传Key
  }
});

const toggleMultiVerifyPopup = () => {
  showMultiVerifyPopup.value = !showMultiVerifyPopup.value;
};

const onMultiVerifyPopClose = () => {
  showMultiVerifyPopup.value = false;
};

const onGoCreateSeal = () => {
  uni.navigateTo({
    url: "/pages/personal-info/signature/create-sign",
  });
};

const onUpload = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album"],
    success: (res) => {
      const maxSize = 20 * 1024 * 1024;
      const tempFiles: any = res.tempFiles;
      tempFiles.map((item: any, index: number) => {
        const listType = ["image/png", "image/jpg", "image/jpeg"];
        const flag = listType.indexOf(item.type);
        if (flag >= 0) {
          if (item.size > maxSize) {
            uni.showToast({
              title: t("user.stamp.modal.upload-tips"),
              icon: "none",
              mask: true,
            });
            return;
          } else {
            const tempFilePaths = res.tempFilePaths;
            uni.uploadFile({
              url: `${
                import.meta.env.VITE_APP_API_BASE_URL
              }/common/file/s3/upload`,
              filePath: tempFilePaths[index],
              name: "file",
              success: async (uploadFileRes) => {
                //本地预览图片地址
                previewImageUrl.value = tempFilePaths[index];
                const result = await commonService.getFileUrl({
                  key: JSON.parse(uploadFileRes.data).data,
                });
                const data = result.data;
                //上传成功后返回来的图片Key
                uploadImageKey.value = JSON.parse(uploadFileRes.data).data;
              },
            });
          }
        }
      });
    },
  });
};

const onConfirm = async () => {
  if (!holder.value || !uploadImageKey.value) {
    uni.showToast({
      title: t("user.stamp.add-error"),
      icon: "none",
      mask: true,
    });
    return;
  }
  toggleMultiVerifyPopup();
};

const onMultiVerifyConfirm = async () => {
  const params = {
    holder: holder.value,
    imgUrl: uploadImageKey.value,
  } as CreateSealForm;
  const result = await userService.createSeal(params);
  const data = result.data;
  onMultiVerifyPopClose();
  emit("confirm");
};
</script>

<style lang="scss">
.seeSealDetail_popup {
  .top {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    padding: 0 41rpx;
    .title {
      font-size: 40rpx;
      font-weight: 500;
    }
  }
  .content {
    .holder_title {
      font-size: 32rpx;
      line-height: 32px;
    }
    margin: 40rpx 64rpx 0;
    height: calc(100vh - 88rpx - 100rpx - 172rpx);
    .upload_area {
      width: 250rpx;
      height: 250rpx;
      margin: 76rpx auto 40rpx;
      text-align: center;
    }
    .upload_tip {
      text-align: center;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.5);
    }
    .re_load {
      color: rgba(0, 80, 179, 1);
      font-size: 28rpx;
      text-align: center;
      margin-top: 45rpx;
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
