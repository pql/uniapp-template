<template>
  <view class="p-3 flex flex-col" style="max-height: 90vh">
    <view class="mb-5 text-center text-xl">{{
      $t("user.login.toast.popuptitle")
    }}</view>
    <scroll-view scroll-y>
      <view class="text-sm mb-8">{{ $t("user.login.toast.description") }}</view>

      <view>
        <ComButton
          :title="$t('user.login.toast.regd')"
          @onTap="onConfirmRegD"
        />
      </view>

      <view class="mt-3">
        <ComButton
          :title="$t('user.login.toast.regs')"
          @onTap="onConfirmRegS"
        />
      </view>
      <u-gap height="100"></u-gap>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import useUserService from "../../service/user/userService";
import { InvestorIdentityType } from "../../types/enum";
import { ref } from "vue";
import ComButton from "../button/button.vue";

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

const emit = defineEmits(["chooseRegSDIdentityFinish"]);
const userService = useUserService();
const onConfirmRegD = () => {
  userService.confirmRegSOrRegDIdentity(InvestorIdentityType.RegD).then(() => {
    emit("chooseRegSDIdentityFinish");
  });
};

const onConfirmRegS = () => {
  userService.confirmRegSOrRegDIdentity(InvestorIdentityType.RegS).then(() => {
    emit("chooseRegSDIdentityFinish");
  });
};
</script>
