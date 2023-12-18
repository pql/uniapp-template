<template>
  <view class="create-sign">
    <ComSign
      @complete="onComplete"
      @cancel="onCancel"
      @saveAlbumSuccess="onSaveAlbumSuccess"
    />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import ComSign from "../../../components/sign/sign.vue";
import { t } from "../../../locale";
import useCommonService from "../../../service/common/commonService";

const commonService = useCommonService();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.create-sign"),
  });
});

const onCancel = () => {
  uni.navigateBack({
    delta: 1,
  });
};

const onComplete = (path: string) => {
  uni.uploadFile({
    url: `${import.meta.env.VITE_APP_API_BASE_URL}/common/file/s3/upload`,
    filePath: path,
    name: "file",
    success: async (uploadFileRes) => {
      uni.navigateTo({
        url:
          "/pages/personal-info/signature/signature?signatureKey=" +
          encodeURIComponent(JSON.parse(uploadFileRes.data).data),
      });
    },
  });
};

const onSaveAlbumSuccess = () => {
  uni.navigateTo({
    url: "/pages/personal-info/signature/signature",
  });
};
</script>

<style lang="scss" scoped>
.create-sign {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
