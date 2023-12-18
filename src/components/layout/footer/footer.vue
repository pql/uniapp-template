<template>
  <view class="footer_page">
    <view class="footer_content">
      <view class="fc"> {{ $t("footer.poster") }}</view>
      <view>
        {{ $t("footer.content") }}
      </view>
      <view class="set_margin"> USAeb5 Ex©2022</view>
      <view class="flex_row bottom">
        <navigator
          url="/pages/contact/contact"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          {{ $t("footer.contact-us") }}
        </navigator>

        <navigator
          url="/pages/word/word"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          {{ $t("footer.privacy-policy") }}
        </navigator>

        <navigator
          url="/pages/word/Terms"
          open-type="navigate"
          hover-class="navigator-hover"
          >{{ $t("footer.terms-of-use") }}
        </navigator>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import usePageFrame from "../../../mixins/page-frame";
const { t, $u } = usePageFrame();
</script>

<style lang="scss">
.footer_page {
  background-color: rgba(14, 19, 29, 1);
  padding: 32rpx;
  font-size: 26rpx;
  font-weight: 400;
  letter-spacing: 0.42rpx;
  opacity: 1;
  color: rgba(255, 255, 255, 0.6);
  line-height: 43rpx;
  .fc {
    color: #fff;
    font-size: 38rpx;
    font-weight: 500;
    letter-spacing: 1.68rpx;
    line-height: 50rpx;
    margin-bottom: 20rpx;
  }
  .signup_btn {
    margin: 20rpx 0 42rpx;
    width: 190rpx;
    height: 68rpx;
    background: linear-gradient(
      263.06deg,
      rgba(255, 226, 151, 1) 0%,
      rgba(255, 252, 237, 1) 35.39%,
      rgba(255, 224, 146, 1) 100%
    );
    color: rgba(65, 65, 65, 1);
    opacity: 1;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 68rpx;
    text-align: center;
  }
  .set_margin {
    margin: 20rpx 0;
  }
  .bottom {
    navigator {
      margin-right: 20rpx;
    }
    color: #fff;
  }
}
</style>
