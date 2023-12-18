<template>
  <view>
    <view
      class="mx-3 j-sb box_height"
      v-for="(item, index) in menuList"
      :key="index"
      @click="onSelectMenu(item.pagePath)"
    >
      <view>
        <u-image
          width="40rpx"
          height="40rpx"
          :src="item.icon"
          class="d-inline-block relative -top-0.5"
        ></u-image>
        <text class="ml-3">
          {{ item.title }}
        </text>
      </view>
      <view>
        <u-image
          width="40rpx"
          height="40rpx"
          src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/right_arrow_icon.png"
        ></u-image>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
const { onBack, t, $u } = usePageFrame();

const menuList = [
  {
    pagePath: "/pages/personal-info/userinfo/setInfo",
    icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/id_card_icon.png",
    title: t("user.mine.profile"),
  },
  {
    pagePath: "/pages/personal-info/userinfo/setPsw",
    icon: "https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/password_lock_icon.png",
    title: t("user.mine.password"),
  },
];

onLoad(async (options) => {
  uni.setNavigationBarTitle({
    title: t("user.menu.profile"),
  });
});

const onSelectMenu = (path: string) => {
  uni.navigateTo({
    url: path,
  });
};
</script>

<style lang="scss">
.box_height {
  height: 100rpx;
  margin: 20rpx 32rpx 0;
  background-color: #fff;
  font-size: 30rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
