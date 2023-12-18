<template>
  <view class="wrapper flex p-3">
    <view class="left w-10">
      <u-button @click="onCancel" class="operate-button w-10">
        {{ $t("global.cancel") }}
      </u-button>
      <u-button @click="onSaveCanvasAsImg" class="operate-button w-10">
        {{ $t("global.save.album") }}
      </u-button>
      <u-button
        @click="onReWriting"
        class="operate-button w-10"
        style="color: red"
      >
        {{ $t("global.re-writing") }}
      </u-button>
      <u-button
        @click="onComplete"
        class="operate-button w-10"
        style="color: rgb(0, 80, 179)"
      >
        {{ $t("global.complete") }}
      </u-button>
    </view>
    <view class="handCenter content mx-2">
      <canvas
        class="handWriting"
        :disable-scroll="true"
        @touchstart="uploadScaleStart"
        @touchmove="uploadScaleMove"
        canvas-id="handWriting"
        :style="{ height: props.canvasHeight }"
      ></canvas>
    </view>
    <view class="w-10 flex items-center">
      <view class="rotate-90">{{ $t("global.sign") }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { defineEmits, ref, nextTick, defineProps } from "vue";
import { base64ToPath } from "image-tools";
import { t } from "../../locale";

const props = defineProps({
  canvasHeight: {
    type: String,
    default: "80vh",
  },
});

const canvasName = ref<string>("handWriting");
const ctx = ref<any>("");
const startX = ref<number | null>(null);
const startY = ref<number | null>(null);
const canvasWidth = ref<number>(0);
const canvasHeight = ref<number>(0);
const lineColor = ref<string>("#1A1A1A");
const lineSize = ref<number>(5);

const emit = defineEmits(["cancel", "complete", "saveAlbumSuccess"]);

onLoad(() => {
  ctx.value = uni.createCanvasContext("handWriting");
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select(".handCenter")
      .boundingClientRect((rect: any) => {
        canvasWidth.value = rect.width;
        canvasHeight.value = rect.height;
        /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
        setCanvasBg("#e6e5e5");
      })
      .exec();
  });
});

const setCanvasBg = (color: string) => {
  //设置canvas背景色  不设置  导出的canvas的背景为透明
  //@params：字符串  color
  /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
  //rect() 参数说明  矩形路径左上角的横坐标，左上角的纵坐标, 矩形路径的宽度, 矩形路径的高度
  //这里是 canvasHeight - 4 是因为下边盖住边框了，所以手动减了写
  ctx.value.rect(0, 0, canvasWidth.value, canvasHeight.value - 4);
  ctx.value.setFillStyle(color);
  ctx.value.fill(); // 设置填充
  ctx.value.draw(); // 开画
};

const onCancel = () => {
  emit("cancel");
};

const onSaveCanvasAsImg = () => {
  uni.canvasToTempFilePath({
    canvasId: "handWriting",
    fileType: "pne",
    quality: 1,
    success(res) {
      console.log(res.tempFilePath, "canvas生成图片地址");
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          uni.showToast({
            title: t("global.save.album.success"),
            duration: 2000,
          });
          emit("saveAlbumSuccess");
        },
      });
    },
  });
};

const onReWriting = () => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  ctx.value.draw();
  setCanvasBg("#e6e5e5");
};

const onComplete = () => {
  uni.canvasToTempFilePath({
    canvasId: "handWriting",
    fileType: "png",
    quality: 1,
    success(res) {
      // 在H5平台下，tempFilePath 为 base64
      console.log(res);
      console.log(res.tempFilePath, "canvas生成图片地址");

      // #ifdef H5
      base64ToPath(res.tempFilePath)
        .then((path: string) => {
          emit("complete", path);
        })
        .catch((err: any) => {
          console.log(`base64ToPath error: ${err}`);
        });
      // #endif

      // #ifdef APP-PLUS
      emit("complete", res.tempFilePath);
      // #endif
    },
  });
};

// 笔迹开始
const uploadScaleStart = (e: any) => {
  startX.value = e.changedTouches[0].x;
  startY.value = e.changedTouches[0].y;
  // 设置画笔参数
  // 设置画笔颜色
  ctx.value.setStrokeStyle(lineColor.value);
  // 设置线条粗细
  ctx.value.setLineWidth(lineSize.value);
  // 设置线条结束端点样式
  ctx.value.setLineCap("round"); // "butt"、"round"、"square"
  // 开始画笔
  ctx.value.beginPath();
};
// 笔迹移动
const uploadScaleMove = (e: any) => {
  // 取点
  const temX = e.changedTouches[0].x;
  const temY = e.changedTouches[0].y;

  // 画线条
  ctx.value.moveTo(startX.value, startY.value);
  ctx.value.lineTo(temX, temY);
  ctx.value.stroke();
  startX.value = temX;
  startY.value = temY;
  ctx.value.draw(true);
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}

.operate-button {
  writing-mode: vertical-lr;
  height: 210rpx;
  padding: 0;
  margin: 20rpx 0;
}

.content {
  border: 4rpx dashed #e9e9e9;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
