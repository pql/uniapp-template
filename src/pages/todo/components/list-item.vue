<template>
  <view class="agencyEvent_list">
    <view class="list" v-for="(item, index) in list" :key="index">
      <view class="item">
        <view class="flex_row_jus_betw">
          <view class="created_time color03">{{ item.createTime }}</view>
          <view
            :style="{
              color:
                item.status === 0
                  ? 'rgba(255, 141, 26, 1)'
                  : 'rgba(67, 207, 124, 1)',
            }"
          >
            {{
              item.status === 0
                ? $t("product.todo.untreated")
                : $t("product.todo.processed")
            }}
          </view>
          <view class="user-info">
            <view class="user-name">
              <text>{{ item.createBy }}</text>
              <text style="color: rgba(0, 0, 0, 0.6)">{{
                $t("product.todo.published")
              }}</text>
            </view>
            <view class="color06">{{ $t("product.todo.pending-vote") }}</view>
          </view>
          <view
            v-if="item.signaturePicUrlList.length"
            class="img_area flex_row"
          >
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
              <button class="btn" @click="onGoPreview(file.fileUrl)">
                {{ $t("global.lookup") }}
              </button>
              <button
                class="btn"
                @click="tools.downloadPDF(file.fileUrl, file.fileName)"
              >
                {{ $t("order.file.download") }}
              </button>
            </view>
          </view>
          <view class="hangdl_btn_area" v-if="item.status === 0">
            <button class="hangdl_btn" @click="onTodo(item.id, index)">
              {{ $t("product.todo.i-handled") }}
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
import useTools from "../../../mixins/tools";
import usePageFrame from "../../../mixins/page-frame";
import useOrderService from "../../../service/order/orderService";
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
    const onGoPreview = (url: string) => {
      let viewerUrl = `/hybrid/html/dist/src/pages/PDFViewer/index.html?pdfLink=${url}`;

      // 微信小程序、 h5(使用访问的时候记得跨域)
      // #ifdef H5 ||  MP-WEIXIN
      viewerUrl = `${
        import.meta.env.VITE_APP_WEBVIEW_API_BASE_URL
      }/src/pages/PDFViewer/index.html`;
      // #endif

      // #ifdef APP-PLUS
      viewerUrl = viewerUrl;
      // #endif

      // 设置值供给/pages/webview/webview使用
      tools.setWebviewParamsSync({
        pdfLink: url,
      });

      uni.navigateTo({
        url: "/pages/webview/webview?src=" + viewerUrl,
      });
    };

    const onTodo = async (id: number, index: number) => {
      const result = await orderService.orderTodo(id);
      const data = result.data;
      $u.toast(t("global.success"));
    };
    return {
      onPreviewImage,
      tools,
      onGoPreview,
      onTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
.agencyEvent_list {
  .color03 {
    color: rgba(0, 0, 0, 0.3);
  }
  .color06 {
    color: rgba(0, 0, 0, 0.6);
  }
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
      // height: 86rpx;
      border-radius: 8rpx;
      background: rgba(247, 252, 255, 1);

      border: 2rpx solid rgba(194, 223, 255, 1);
      letter-spacing: 0.84rpx;
      margin-bottom: 16rpx;
      .file_title {
        margin-right: 11rpx;
      }
      .btn {
        margin-left: 8rpx;
        font-size: 24rpx;
        width: 128rpx;
        height: 52rpx;
        line-height: 52rpx;
        text-align: center;
        border: 2rpx solid rgba(224, 224, 230, 1);
      }
    }
    .hangdl_btn_area {
      text-align: right;
      .hangdl_btn {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-size: 28rpx;
        padding: 0;
        line-height: 60rpx;
        width: 168rpx;
        height: 60rpx;
        opacity: 1;
        border-radius: 6rpx;
        background: rgba(0, 80, 179, 1);
      }
    }
  }
}
</style>
