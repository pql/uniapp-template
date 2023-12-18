<template>
  <view class="item">
    <view class="card_item" v-for="(item, index) in list" :key="index">
      <view class="flex_row_jus_betw">
        <text class="fs_24">
          {{ $t("user.stamp.table.id") }}
        </text>
        <text>{{ item.sealNo }}</text>
      </view>
      <view class="other_info flex_row">
        <view class="left">
          <view class="fs_24">{{ $t("user.stamp.table.owner") }}</view>
          <view>{{ item.holder }}</view>
          <view class="fs_24">{{ $t("user.stamp.table.status") }}</view>
          <view
            :class="[item.status === 0 ? 'color_green' : 'color_red', 'fs_28']"
            >{{
              item.status === 1
                ? $t("user.stamp.table.status.revoke")
                : $t("user.stamp.table.status.normal")
            }}</view
          >
        </view>
        <view class="right">
          <view class="fs_24">{{ $t("user.stamp.table.time") }}</view>
          <view>{{
            dayjs(item && item.createTime).format("YYYY-MM-DD HH:mm:ss")
          }}</view>
          <view class="details_btn" @click="onSelect(item)" v-if="showViewButton">{{
            $t("user.stamp.action.show")
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  props: {
    list: {
      type: Array<any>,
      default: () => [],
    },
    showViewButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const onSelect = (item: any) => {
      emit("select", item);
    };
    return {
      onSelect,
      dayjs,
    };
  },
});
</script>

<style lang="scss" scoped>
.fs_24 {
  font-size: 24rpx;
  font-weight: 400;
  letter-spacing: 0.39rpx;
  line-height: 26rpx;
  color: rgba(0, 0, 0, 0.5);
  line-height: 40rpx;
}
.fs_28 {
  font-size: 28rpx;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 28rpx;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40rpx;
}

.color_green {
  color: rgba(24, 160, 88, 1);
}
.color_red {
  color: rgba(217, 54, 62, 0.8);
}
.card_item {
  // width: 622rpx;
  height: 352rpx;
  background: linear-gradient(
    180deg,
    rgba(245, 245, 245, 1) 0%,
    rgba(251, 251, 251, 1) 100%
  );
  background-blend-mode: normal;

  border: 2px solid rgba(0, 0, 0, 0.07);
  padding: 24rpx;
  margin-bottom: 20rpx;
  .other_info {
    margin-top: 25rpx;
    flex-direction: row;
    column-gap: 18rpx;
    justify-content: space-around;
    padding-top: 25rpx;
    height: 242rpx;
    line-height: 50rpx;
    mix-blend-mode: normal;
    opacity: 1;
    background: rgba(255, 255, 255, 0.9);
    background-blend-mode: normal;
    .details_btn {
      font-size: 28rpx;
      font-weight: 400;
      letter-spacing: 0.84rpx;
      width: 200rpx;
      height: 68rpx;
      opacity: 1;
      text-align: center;
      line-height: 68rpx;
      border: 1rpx solid rgba(224, 224, 230, 1);
      background-color: #fff;
      margin-top: 23rpx;
    }
  }
}

.item_list {
  background-color: #fff;
}
</style>
