<template>
  <view class="content">
    <u-button type="primary" @click="onRequest">发起http请求</u-button>
  </view>
</template>

<script setup lang="ts">
import useUserService from "../../service/user/userService";
const userService = useUserService();
const onRequest = () => {
  userService
    .login({
      email: "1101102993@qq.com",
      password: "123456",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
