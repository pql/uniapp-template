<template>
  <view class="reject_details_page">
    <view class="reject_details_content">
      <view class="reject_details_title">{{
        $t("global.search.verification")
      }}</view>
      <view class="p-2">
        <view class="reject_details_title title2"
          >{{ $t("user.reg.submit-title") }}
          <view class="tip_info">{{ $t("user.reg.regd-tips") }} </view>
        </view>
        <view class="supporting_materials">{{
          $t("user.reg.submit-subtitle")
        }}</view>
        <scroll-view scroll-y class="mb-4">
          <view class="materials_img_area">
            <view @tap="onUpload">
              <image
                class="add_img"
                src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/add_images.png"
                mode="aspectFill"
              ></image>
            </view>
            <view
              v-for="(item, index) in imgList"
              :key="index"
              class="position"
            >
              <image :src="item" mode="aspectFill" class="add_img" />
              <view class="img_bottom flex_row">
                <text
                  class="preview"
                  @click.stop="onPreviewImage(item, index)"
                  >{{ $t("global.lookup") }}</text
                >
                <text @click.stop="onDeleteImage(item, index)">{{
                  $t("global.delete")
                }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="add_img_tip">{{ $t("user.reg.submit-images") }} </view>
        <view>{{ $t("user.reg.submit-template-tips") }}</view>
        <!-- #ifdef APP-PLUS -->
        <view
          style="color: rgba(0, 80, 179, 1); line-height: 55rpx"
          @click="onDownloadTemplate"
          >{{ $t("user.reg.submit-template") }}</view
        >
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <a
          href="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/T_1.png"
          download="template.png"
          style="color: rgba(0, 80, 179, 1); line-height: 55rpx"
          >{{ $t("user.reg.submit-template") }}</a
        >
        <!-- #endif -->
      </view>
    </view>
    <view class="bottom_area">
      <view class="submit_btn" @click="onSubmit">
        {{ $t("user.reg.submit-button") }}
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import ComFooter from "../../../components/layout/footer/footer.vue";
import useCommonService from "../../../service/common/commonService";
import useUserService from "../../../service/user/userService";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { onLoad } from "@dcloudio/uni-app";
import pageFrame from "../../../mixins/page-frame";
import { ref } from "vue";

const { t, $u } = pageFrame();
const imgList = ref<Array<any>>([]);
const pictureUrlList = ref<Array<any>>([]);
const signAddressList = ref<Array<any>>([]);
const commonService = useCommonService();
const userService = useUserService();

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.reg-verify"),
  });
});

const onUpload = async () => {
  const maxSize = 10 * 1024 * 1024;
  const data: any = await uni.chooseImage({
    count: 9 - imgList.value.length,
    sourceType: ["album"],
  });
  if (data.errMsg === "chooseImage:ok") {
    data.tempFiles.map((item: any, index: number) => {
      const listType = ["image/png", "image/jpg", "image/jpeg"];
      const flag = listType.indexOf(item.type);
      // App 无 item.type 属性 图片类型未判断
      if (item.size > maxSize) {
        uni.showToast({
          title: t("user.reg.submit-images"),
          icon: "none",
          mask: true,
        });
        return;
      } else {
        imgList.value.push(item.path);
        const tempFilePaths = data.tempFilePaths;
        uni.uploadFile({
          url: `${import.meta.env.VITE_APP_API_BASE_URL}/common/file/s3/upload`,
          filePath: tempFilePaths[index],
          name: "file",
          success: async (uploadFileRes) => {
            pictureUrlList.value.push(JSON.parse(uploadFileRes.data).data);
            const result = await commonService.getFileUrl({
              key: JSON.parse(uploadFileRes.data).data,
            });
            const path = result.data;
            signAddressList.value.push(path);
          },
        });
      }
    });
  }
};

const onSubmit = async () => {
  if (!imgList.value.length) {
    uni.showToast({
      title: t("global.select.picture"),
      icon: "none",
      mask: true,
    });
    return;
  }
  const params = { fileList: pictureUrlList.value };
  await userService.uploadVerifyFile(params);
  uni.showToast({
    title: t("global.submit.success"),
    icon: "none",
    mask: true,
  });
  setTimeout(() => {
    uni.redirectTo({ url: "/pages/personal-info/reg/index" });
  }, 1500);
};

const onPreviewImage = (item: string, index: number) => {
  uni.previewImage({
    urls: imgList.value,
    current: imgList.value[index],
  });
};

const onDeleteImage = (item: string, index: number) => {
  signAddressList.value.splice(index, 1);
  imgList.value.splice(index, 1);
  pictureUrlList.value.splice(index, 1);
};

const onDownloadTemplate = () => {
  plus.gallery.save(
    "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/T_1.png",
    () => {
      uni.showToast({
        title: t("global.download.success"),
        icon: "none",
        mask: true,
      });
    },
    () => {
      uni.showToast({
        title: t("global.fail.success"),
        icon: "none",
        mask: true,
      });
    }
  );
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.reject_details_page {
  background-color: #f5f5f5;
  .reject_details_content {
    background-color: #ffffff;
    padding: 40rpx 32rpx;
    color: rgba(0, 0, 0, 0.5);
    .reject_details_title {
      font-size: 32rpx;
      font-weight: 500;
      // margin-bottom: 39rpx;
      margin-bottom: 15rpx;
      color: rgba(0, 0, 0, 0.9);
    }
    .title2 {
      .tip_info {
        margin-top: 23rpx;
        font-size: 28rpx;
        letter-spacing: 0.84rpx;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .supporting_materials {
      font-size: 30rpx;
      font-weight: 600;
      letter-spacing: 0.9rpx;
      color: rgba(0, 0, 0, 0.9);
      margin-bottom: 40rpx;
    }
    .materials_img_area {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      row-gap: 47rpx;
      column-gap: 45rpx;
      .add_img {
        width: 240rpx;
        height: 240rpx;
      }
      .position {
        // box-sizing: border-box;
        position: relative;
        .img_bottom {
          width: 240rpx;
          height: 50rpx;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          align-items: center;
          //justify-content: space-around;
          top: 190rpx;
          font-size: 24rpx;
          color: #fff;
          text {
            width: 50%;
            text-align: center;
          }
          .preview {
            border-right: 1rpx solid #fff;
          }
        }
      }
    }
    .add_img_tip {
      font-size: 24rpx;
      font-weight: 400;
      letter-spacing: 0.72rpx;
      margin-bottom: 36rpx;
    }
  }
  .bottom_area {
    height: 144rpx;
    width: 100%;
    background-color: #fff;
    padding: 32rpx;
    .submit_btn {
      text-align: center;
      color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      background: rgba(0, 80, 179, 1);
      background-blend-mode: normal;
    }
  }
}
</style>
