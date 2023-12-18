<template>
  <view class="info_update_list">
    <view class="list" v-for="(item, index) in list" :key="index">
      <view class="item">
        <view class="created_time">{{
          dayjs(item.createTime).format("YYYY-MM-DD hh:mm:ss")
        }}</view>
        <view class="user-info flex_row">
          <u-avatar
            :src="item.signatureAvatar"
            mode="circle"
            size="50"
            class="user-avatar"
          ></u-avatar>
          <view class="user-name">
            <text>{{ item.createBy }}</text>
            <view style="color: rgba(0, 0, 0, 0.6)">{{ item.info }}</view>
          </view>
        </view>

        <view v-if="item.signaturePicUrlList.length" class="img_area flex_row">
          <view v-for="(imgUrl, i) in item.signaturePicUrlList" :key="i">
            <image
              :src="imgUrl"
              mode="aspectFit"
              style="width: 180rpx; height: 180rpx"
              class="item_img"
              @click="onPreviewImage(index, i)"
            />
          </view>
        </view>
        <view
          class="file_area flex_row_jus_betw"
          v-for="(file, index) in item.signatureFileList"
          :key="index"
        >
          <view>
            <image
              style="width: 48rpx; height: 44rpx; vertical-align: middle"
              src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/file_icon.png"
              mode="scaleToFill"
            />
            <text class="file_title">{{ file.fileName }}</text>
          </view>
          <view class="flex_row">
            <button
              class="btn"
              @click="tools.downloadPDF(file.fileUrl, file.fileName)"
            >
              {{ $t("order.file.download") }}
            </button>
          </view>
        </view>
      </view>
    </view>
    <u-empty
      v-if="!list.length"
      :text="$t('global.list.is.empty')"
      mode="list"
      icon="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
      width="104"
      height="104"
      marginTop="200"
    >
    </u-empty>
  </view>
</template>

<script lang="ts">
import useTools from "../../../../mixins/tools";
import usePageFrame from "../../../../mixins/page-frame";
import useOrderService from "../../../../service/order/orderService";
import dayjs from "dayjs";
export default {
  props: {
    list: {
      type: Array<any>,
      default: () => [],
    },
  },
  setup(props) {
    const tools = useTools();
    const orderService = useOrderService();
    const { $u, t } = usePageFrame();
    const onPreviewImage = (index: number, i: number) => {
      uni.previewImage({
        urls: props.list[index].signaturePicUrlList,
        current: props.list[index].signaturePicUrlList[i],
      });
    };
    return {
      onPreviewImage,
      tools,
      dayjs,
    };
  },
};
</script>

<style lang="scss" scoped>
.info_update_list {
  .list {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.25);
    border-bottom: 1rpx solid rgba(235, 235, 235, 1);
  }
  .item {
    padding: 26rpx;
    .user-info {
      align-items: center;
      margin-top: 40rpx;
      margin-bottom: 30rpx;
      line-height: 45rpx;
      .user-name {
        margin-left: 24rpx;
        font-size: 28rpx;
      }
    }
    .img_area {
      flex-wrap: wrap;
      gap: 16rpx;
      margin-bottom: 16rpx;
      .item_img {
        display: inline-block;
      }
    }
    .file_area {
      align-items: center;
      font-size: 26rpx;
      padding: 21rpx 26rpx;
      height: 86rpx;
      border-radius: 8rpx;
      background: rgba(247, 252, 255, 1);

      border: 2rpx solid rgba(194, 223, 255, 1);
      letter-spacing: 0.84rpx;
      margin-bottom: 16rpx;
      .file_title {
        margin-right: 11rpx;
      }
      .btn {
        font-size: 24rpx;
        width: 128rpx;
        height: 52rpx;
        line-height: 52rpx;
        text-align: center;
        border: 2rpx solid rgba(224, 224, 230, 1);
      }
    }
  }
}
</style>
