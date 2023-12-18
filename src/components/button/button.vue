<template>
  <u-button
    :disabled="disabled"
    :shape="shape"
    :custom-style="customStyle"
    @click="onTap"
    >{{ title }}</u-button
  >
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  title: {
    type: String,
    default: "按钮",
  },
  customStyle: {
    type: Object,
    default: () => {
      return {
        borderColor: "#1D429F",
        color: "#FFFFFF",
        background: "#1D429F",
      };
    },
  },
  shape: {
    type: String,
    default: "square", // https://vkuviewdoc.fsq.pub/components/button.html
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["onTap"]);

const onTap = () => {
  emits("onTap");
};
</script>
