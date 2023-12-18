<template>
  <view class="list-item" style="list-style: none">
    <view class="d-flex p-3 border-bottom">
      <image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/icon_investment_doc.png"
        mode="aspectFit"
        style="width: 72rpx; height: 72rpx"
      />
      <view class="flex-1 ml-3">
        <view class="font-30 text-ellipsis">{{ item.fileName }}</view>
        <view class="mt-1 font-24 text-secondary">
          <view class="mt"
            >{{ $t("user.order.sign-user") }}：{{ item.updateBy }}</view
          >
          <view class="mt"
            >{{ $t("user.order.sign-time") }}：{{
              dayjs(item.updateTime).format("YYYY-MM-DD hh:mm:ss")
            }}</view
          >
          <view class="mt">
            {{
              $t("user.order.file-content-1", {
                type: operatorDict(item.operatorType),
                name: item.createBy,
              })
            }}
          </view>
          <view class="mt">{{
            $t("user.order.file-content-2", {
              time: dayjs(item.createTime).format("YYYY-MM-DD hh:mm:ss"),
            })
          }}</view>
        </view>
      </view>
    </view>
    <view class="flex-1 d-flex a-center py-2 px-3">
      <view class="flex-1" style="color: #6f89a6">
        {{ operatorFileType(item.operatorType) }}
      </view>
      <u-button
        class="btn btn-1"
        @click="tools.downloadPDF(item.signatureSignedFileUrl, item.filename)"
      >
        {{ $t("order.file.download") }}
      </u-button>
      <view style="width: 20rpx"></view>
      <u-button
        class="btn btn-1"
        v-if="item.status === 1"
        @click="
          onGoPreview(item.signatureSignedFileUrl || item.signatureFileUrl)
        "
      >
        {{ $t("order.file.check") }}
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import usePageFrame from "../../../mixins/page-frame";
import useTools from "../../../mixins/tools";
import dayjs from "dayjs";
const { t } = usePageFrame();
const tools = useTools();
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const operatorDict = (type: string) => {
      if (type === "INVESTOR") return t("user.reg.auth-tips-2");
      else if (type === "FUNDRAISER") return t("user.register.fundraiser");
      else if (type === "LAWYER") return t("user.register.lawyer");
      else if (type === "BROKER") return t("user.register.broker");
    };
    const operatorFileType = (type: string) => {
      if (type === "INVESTOR") return t("order.file.investor");
      else if (type === "FUNDRAISER") return t("order.file.fundraiser");
      else if (type === "LAWYER") return t("order.file.lawyer");
      else if (type === "BROKER") return t("order.file.broker");
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
    return {
      operatorDict,
      operatorFileType,
      dayjs,
      tools,
      onGoPreview,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 30rpx;
  background-color: #fff;
  border: 2rpx solid #00000011;
  border-radius: 8rpx;
}

.btn {
  margin: 0;
  padding: 0;
  width: 180rpx;
  height: 60rpx;

  &.btn-1 {
    color: #fff;
    background-color: #0050b3;
    border: none;
  }
}
</style>
