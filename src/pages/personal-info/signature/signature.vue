<template>
  <view class="signature_page">
    <view class="signature_content">
      <view class="top">
        <view class="title">
          {{ $t("user.stamp.manage-tips") }}
        </view>
        <view class="title_tip">{{ $t("user.stamp.indro-tips") }}</view>
        <view class="details_btn" @click="onViewExample">{{
          $t("user.stamp.button-test")
        }}</view>
      </view>
      <!-- card_content -->
      <view class="card_content">
        <scroll-view
          scroll-x="false"
          scroll-y="false"
          class="scroll-content"
          :scroll-into-view="scrollIntoIndex"
        >
          <view
            v-for="(item, index) in topBar"
            :key="index"
            :id="'top' + index"
            class="scroll-item"
            @click="onChangeTab(index)"
          >
            <text :class="topBarIndex === index ? 'f-active-color' : ''">
              {{ item }}
            </text>
          </view>
        </scroll-view>
        <swiper
          :current="topBarIndex"
          @animationfinish="onAnimationFinish"
          class="swiper-card-content"
        >
          <swiper-item>
            <scroll-view scroll-y="true" class="swiper-card-content">
              <ComCardItem
                v-if="effectList.length"
                :list="effectList"
                @select="onViewSeal"
              />
              <u-empty
                v-else
                :text="$t('global.list.is.empty')"
                src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
                margin-top="100"
              ></u-empty>
            </scroll-view>
          </swiper-item>
          <swiper-item>
            <scroll-view scroll-y="true" class="swiper-card-content">
              <ComCardItem
                v-if="revokeList.length"
                :list="revokeList"
                @select="onViewSeal"
              />
              <u-empty
                v-else
                :text="$t('global.list.is.empty')"
                src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/no_data_icon.png"
                margin-top="100"
              ></u-empty>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
      <!-- card_content -->
    </view>
    <view class="bottom_area">
      <button class="confirm" @click="onAddSeal">
        {{ $t("user.stamp.button-add") }}
      </button>
    </view>
    <u-popup
      v-model="showTwoVerifyPopup"
      :mode="popupMode"
      :closeable="popupCloseable"
      border-radius="16"
      width="90%"
      @close="onTwoVerifyPopClose"
    >
      <ComExample
        v-if="clickType === 1"
        @confirm="showTwoVerifyPopup = false"
      />
      <ComSealDetail
        v-if="clickType === 2"
        :seal="targetSeal"
        @revoke="onRevokeSeal"
        @close="showTwoVerifyPopup = false"
      />

      <ComAddSeal v-if="clickType === 4" @confirm="onCreateSealSuccess" />
    </u-popup>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
import ComFooter from "../../../components/layout/footer/footer.vue";
import { DeviceType } from "../../../types/enum";
import { deviceType } from "../../../utils/platform";
import { onLoad, onShow } from "@dcloudio/uni-app";
import ComCardItem from "./components/card-item.vue";
import ComSealDetail from "./components/seal-detail.vue";
import ComAddSeal from "./components/add-seal.vue";
import ComExample from "./components/example.vue";
import useUserService from "../../../service/user/userService";
import { ref, nextTick } from "vue";
const { onBack, t, $u } = usePageFrame();
const userService = useUserService();

const topBar = ref<Array<string>>([
  t("user.stamp.table.status.normal"),
  t("user.stamp.table.status.revoke"),
]);
const clickType = ref<number>(1);
const effectList = ref<Array<any>>([]);
const revokeList = ref<Array<any>>([]);
const targetSeal = ref();
const scrollIntoIndex = ref<string>("top0");
const topBarIndex = ref<number>(0);
const showTwoVerifyPopup = ref<boolean>(false);
const popupMode = ref<string>("bottom"); // bottom 底部 center 中间
const popupCloseable = ref<boolean>(true);

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.stamp"),
  });
});

onShow(async () => {
  fetchSealList();
});

const onAnimationFinish = (e: any) => {
  const curr = e.detail.current;
  topBarIndex.value = curr;
};

const fetchSealList = async () => {
  const result = await userService.getSealList();
  const data = result.data;
  effectList.value = data.filter((item: any) => item.status === 0);
  revokeList.value = data.filter((item: any) => item.status === 1);
};

const onViewExample = () => {
  clickType.value = 1;
  popupMode.value = "bottom";
  showTwoVerifyPopup.value = true;
};

const onChangeTab = (index: number) => {
  if (topBarIndex.value === index) {
    return;
  }
  topBarIndex.value = index;
  scrollIntoIndex.value = "top" + index;
  fetchSealList();
};

const onRevokeSeal = () => {
  uni.showToast({
    title: t("global.success"),
    icon: "none",
    mask: true,
  });
  onTwoVerifyPopClose();
  fetchSealList();
};

const onCreateSealSuccess = () => {
  onTwoVerifyPopClose();
  fetchSealList();
};

const onViewSeal = (item: any) => {
  popupMode.value = "bottom";
  clickType.value = 2;
  showTwoVerifyPopup.value = true;
  popupCloseable.value = false;
  targetSeal.value = item;
};

const onAddSeal = () => {
  popupMode.value = "bottom";
  clickType.value = 4;
  nextTick(() => {
    showTwoVerifyPopup.value = true;
  });
};
const onTwoVerifyPopClose = () => {
  showTwoVerifyPopup.value = false;
};
</script>

<style lang="scss" scoped>
.signature_content {
  padding: 32rpx;
  .top {
    padding: 40rpx 32rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      margin-bottom: 32rpx;
    }
    .title_tip {
      font-size: 28rpx;
      font-weight: 400;
      letter-spacing: 0.84rpx;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 32rpx;
    }
  }
}
.card_content {
  background-color: #fff;
  padding: 0 32rpx 32rpx;
  margin-bottom: 144rpx;
}
.details_btn {
  font-size: 28rpx;
  font-weight: 400;
  letter-spacing: 0.84rpx;
  width: 250rpx;
  //padding: 0 18rpx;
  height: 68rpx;
  mix-blend-mode: normal;
  opacity: 1;
  text-align: center;
  line-height: 68rpx;
  border: 1rpx solid rgba(224, 224, 230, 1);
  background-color: #fff;
  margin-top: 23rpx;
}
.swiper-card-content {
  height: calc(100vh - 88rpx - 360rpx - 144rpx - 84rpx);
}
.scroll-content {
  width: 100%;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.5);
  // text-align: center;
  background-color: #fff;
  .scroll-item {
    height: 84rpx;
    line-height: 100rpx;
    display: inline-block;
    margin-right: 80rpx;
  }
}

.f-active-color {
  border-bottom: 2rpx solid rgba(0, 80, 179, 1);
  color: rgba(0, 80, 179, 1);
}
.bottom_area {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 144rpx;
  background-color: #fff;
  border-top: 1rpx solid rgba(237, 237, 237, 1);
  padding: 32rpx 45rpx;
  .confirm {
    background-color: #fff;
    height: 80rpx;
    color: rgba(0, 80, 179, 1);
    line-height: 80rpx;
    text-align: center;
    border: 2rpx solid rgba(0, 80, 179, 1);
  }
}
.set_margins {
  height: 144rpx;
}
.signatureRevoke {
  width: 650rpx;
  padding: 0 45rpx;
  .signatureRevoke_title {
    height: 100rpx;
    text-align: center;
    line-height: 130rpx;
    font-size: 40rpx;
    font-weight: 500;
    letter-spacing: 1.2rpx;
  }
  .signatureRevoke_info {
    color: rgba(0, 0, 0, 0.5);
    font-size: 28rpx;
    font-weight: 400;
    font-family: PingFangSC;
    text-align: center;
    line-height: 100rpx;
    min-height: 150rpx;
  }
  .signatureRevoke_bottom_btn {
    height: 132rpx;
    background-color: #fff;
    border-top: 1rpx solid rgba(237, 237, 237, 1);
    padding: 26rpx 45rpx;
    button {
      width: 50%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
    }
    .submit {
      margin-left: 50rpx;
      color: #ffffff;
      background-color: rgba(0, 80, 179, 1);
    }
  }
}
</style>
