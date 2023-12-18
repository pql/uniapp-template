<template>
  <u-form :model="model" :ref="formRef" label-position="top" label-width="100%">
    <!-- 开户行 -->
    <u-form-item
      :label="$t('user.wallet.withdrawal.number')"
      required
      prop="bankNumber"
      style="margin-top: 0rpx"
    >
      <u-input
        v-model="model.bankNumber"
        type="number"
        clearable
        border
        :placeholder="$t('user.wallet.withdrawal.number-placeholder')"
      />
    </u-form-item>
    <!-- 开户行 -->
    <!-- 户名 -->
    <u-form-item
      :label="$t('user.wallet.withdrawal.bank-name')"
      required
      prop="bankName"
    >
      <u-input
        v-model="model.bankName"
        clearable
        border
        :placeholder="$t('global.input')"
      />
    </u-form-item>
    <!-- 户名 -->
    <!-- 开户人姓名 -->
    <u-form-item
      :label="$t('user.wallet.withdrawal.account')"
      required
      prop="bankUserName"
    >
      <u-input
        v-model="model.bankUserName"
        clearable
        border
        :placeholder="$t('global.input')"
      />
    </u-form-item>
    <!-- 开户人姓名 -->
    <!-- 开户地址 -->
    <u-form-item :label="$t('user.wallet.deposit.bank-address')">
      <u-input
        v-model="model.bankAddress"
        clearable
        border
        :placeholder="$t('global.input')"
      />
    </u-form-item>
    <!-- 开户地址 -->
    <!-- swiftCode -->
    <u-form-item :label="$t('user.wallet.deposit.swift-code')">
      <u-input
        v-model="model.swiftCode"
        clearable
        border
        :placeholder="$t('global.input')"
      />
    </u-form-item>
    <!-- swiftCode -->
    <!-- 备注 -->
    <u-form-item :label="$t('user.wallet.withdrawal.remark')">
      <u-input
        type="textarea"
        v-model="model.remark"
        clearable
        border
        :placeholder="$t('user.wallet.withdrawal.remark-placeholder')"
      />
    </u-form-item>
    <!-- 备注 -->
  </u-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { t } from "../../../../locale/index";
const defaultForm = {
  bankAddress: "",
  bankName: "",
  bankNumber: "",
  bankUserName: "",
  remark: "",
  swiftCode: "",
};
const rules = {
  bankName: {
    required: true,
    message: t("user.wallet.bank-name.not-empty"),
    trigger: ["change", "blur"],
  },
  bankNumber: {
    min: 5,
    max: 20,
    required: true,
    message: t("user.wallet.withdrawal.number-placeholder"),
    trigger: ["change", "blur"],
  },
  bankUserName: {
    required: true,
    message: t("user.wallet.bank-user-name.not-empty"),
  },
};
export default defineComponent({
  data() {
    return {
      model: defaultForm,
      formRef: "formRef",
    };
  },
  mounted() {
    const ref: any = this.$refs.formRef;
    ref.setRules(rules);
  },
  methods: {
    getFields() {
      return this.model;
    },
    setFields(fields: any) {
      this.model = fields;
    },
    resetFields() {
      this.model = defaultForm;
    },
    validate() {
      const ref: any = this.$refs.formRef;
      return ref.validate();
    },
  },
});
</script>
