<template>
  <view class="tixian_page">
    <view class="pages">
      <ComHeader>{{ $t("user.menu.wallet") }}</ComHeader>
      <u-skeleton
        :loading="loading"
        :animation="true"
        bgColor="#FFF"
      ></u-skeleton>
      <view class="u-skeleton">
        <view class="tixian_content">
          <view class="tixian_title">{{ $t("user.wallet.withdrawal") }}</view>
          <view class="flex_row_jus_betw available_amount">
            <view>{{ $t("user.wallet.withdrawal.amount") }}</view>
            <view style="color: rgba(0, 0, 0, 0.5)">
              <text>
                {{ $t("user.wallet.available") }}
              </text>
              <text class="color_bule"
                >${{ tools.formatNum(getWalletInfo.root.available) }}</text
              >
            </view>
          </view>
          <view class="flex h-9 border rounded px-2">
            <u-input
              class="mr-1"
              :maxlength="maxlength"
              clearable
              v-model="amount"
              :placeholder="$t('user.wallet.Withdrawal.input')"
              type="number"
              @input="onInput"
              @focus="onFocus"
            >
            </u-input>
            <view class="py-2 code" @click="onSetAllWithdrawValue">{{
              $t("user.wallet.withdrawal.button-all")
            }}</view>
          </view>
          <view class="flex_row_jus_betw select_account">
            <view>{{ $t("user.wallet.withdrawal.submit-account") }}</view>
            <view
              class="color_bule flex content-center"
              @click="onShowChooseWithdrawPopup"
            >
              <u-image
                mode="scaleToFill"
                src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/tixian_icon.png"
                width="30"
                height="30"
                class="mr-1"
              ></u-image>
              <text>
                {{ $t("user.wallet.select.account") }}
              </text>
            </view>
          </view>
          <!-- 账户卡片 -->
          <view class="account_card" v-if="accountList.length">
            <view class="flex_row_jus_betw card_header">
              <view class="account_name">
                <view>
                  {{
                    accountList[currentIndex] &&
                    accountList[currentIndex].bankName
                  }}
                </view>
                <view class="color_grey">
                  {{ $t("user.wallet.withdrawal.bank-name") }}
                </view>
              </view>
              <view class="account_holder">
                {{
                  accountList[currentIndex] &&
                  accountList[currentIndex].bankNumber
                }}
              </view>
            </view>
            <view class="other_card_info flex_row">
              <view class="left">
                <view class="color_grey">{{
                  $t("user.wallet.deposit.swift-code")
                }}</view>
                <view>{{
                  accountList[currentIndex] &&
                  accountList[currentIndex].swiftCode
                }}</view>
                <view class="color_grey">{{
                  $t("user.wallet.deposit.remark")
                }}</view>
              </view>
              <view class="right">
                <view class="color_grey">
                  {{ $t("user.wallet.withdrawal.time") }}
                </view>
                <view>
                  {{
                    dayjs(
                      accountList[currentIndex] &&
                        accountList[currentIndex].createTime
                    ).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </view>
              </view>
            </view>
            <view class="remark">
              {{
                accountList[currentIndex] && accountList[currentIndex].remark
              }}
            </view>
          </view>
          <!-- 账户卡片 -->
        </view>
        <view class="bottom_btn" @click="onConfirmWithdraw">{{
          $t("user.wallet.withdrawal.button")
        }}</view>

        <!-- 选择提现账户 -->
        <u-popup
          v-model="showChooseWithdrawPopup"
          mode="bottom"
          closeable
          border-radius="16"
          width="90%"
        >
          <view class="popup_area">
            <!-- 选择提现的账户 -->
            <view class="title">{{
              $t("user.wallet.withdrawal.account-warning")
            }}</view>
            <scroll-view scroll-y class="scroll">
              <view
                class="scroll_list"
                v-for="(item, index) in accountList"
                :key="index"
              >
                <view
                  class="account_card"
                  :class="{
                    activate: activeIndex === index,
                  }"
                  @click="onSelectCard(item, index)"
                >
                  <view class="flex_row_jus_betw card_header">
                    <view class="account_name">
                      <view>{{ item.bankName }}</view>
                      <view class="color_grey">{{
                        $t("user.wallet.withdrawal.bank-name")
                      }}</view>
                    </view>
                    <view class="account_holder flex flex-column">
                      <text>{{ item.bankNumber }}</text>
                      <u-icon
                        @click="onEditCard(item)"
                        name="edit-pen"
                        color="rgba(0,0,0,0.5)"
                        size="40"
                      ></u-icon>
                    </view>
                  </view>
                  <view class="other_card_info flex_row">
                    <view class="left">
                      <view class="color_grey">{{
                        $t("user.wallet.withdrawal.swift-code")
                      }}</view>
                      <view>{{ item.swiftCode }}</view>
                      <view class="color_grey">{{
                        $t("user.wallet.withdrawal.remark")
                      }}</view>
                    </view>
                    <view class="right">
                      <view class="color_grey">
                        {{ $t("user.wallet.withdrawal.time") }}</view
                      >
                      <view>{{
                        dayjs(item && item.createTime).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      }}</view>
                    </view>
                  </view>
                  <view class="remark">{{ item.remark }}</view>
                </view>
              </view>
            </scroll-view>
            <view class="bottom_btn">
              <button @click="onShowAddWithdrawAccountPopup">
                {{ $t("user.wallet.withdrawal.add") }}
              </button>
            </view>
            <!-- 选择提现的账户 -->
          </view>
        </u-popup>
        <!-- 选择提现账户 -->

        <!-- 新增提现账户 -->
        <u-popup
          v-model="showAddWithdrawAccountPopup"
          mode="bottom"
          closeable
          border-radius="16"
          width="90%"
        >
          <view class="popup_area">
            <view class="title">
              <text>
                {{ $t("global.add") }}
                {{ $t("user.wallet.Withdrawal.account") }}
              </text>
            </view>
            <view class="form_area">
              <scroll-view scroll-y class="scroll">
                <ComAddWithdrawAccountForm
                  ref="addWithdrawAccountFormRef"
                ></ComAddWithdrawAccountForm>
              </scroll-view>
            </view>
            <view class="bottom_btn_save">
              <button @click="onCreateWithdrawAccount">
                {{ $t("global.add") }}
              </button>
            </view>
          </view>
        </u-popup>
        <!-- 新增提现账户 -->

        <!-- 编辑账户 -->
        <u-popup
          v-model="showEditWithdrawAccountPopup"
          mode="bottom"
          border-radius="16"
          width="90%"
        >
          <view class="popup_area">
            <view class="title">
              <text>
                {{ $t("global.edit") }}
                {{ $t("user.wallet.Withdrawal.account") }}
              </text>
              <text class="delete_text" @click="onDeleteWithdrawAccount">
                {{ $t("global.delete") }}
              </text>
            </view>
            <view class="form_area">
              <scroll-view scroll-y class="scroll">
                <ComAddWithdrawAccountForm
                  ref="addWithdrawAccountFormRef"
                ></ComAddWithdrawAccountForm>
              </scroll-view>
            </view>
            <view class="bottom_btn_save">
              <button @click="onEditWithdrawAccount">
                {{ $t("global.edit") }}
              </button>
            </view>
          </view>
        </u-popup>
        <!-- 编辑账户 -->

        <!-- 多重验证 -->
        <u-popup
          v-model="showMultiVerifyPopup"
          mode="center"
          closeable
          border-radius="16"
          width="90%"
          @close="onMultiVerifyPopClose"
        >
          <ComPopupMultiVerify
            :types="multiVerifyTypes"
            @confirm="onMultiVerifyConfirm"
          />
        </u-popup>
        <!-- 多重验证 -->
      </view>
    </view>
    <!-- #ifdef H5 -->
    <ComFooter v-if="deviceType !== DeviceType.PHONE" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import { ref, computed, nextTick } from "vue";
import ComHeader from "../../../components/layout/header/header.vue";
import ComFooter from "../../../components/layout/footer/footer.vue";
import ComPopupMultiVerify from "../../../components/popup/multi-verify.vue";
import ComAddWithdrawAccountForm from "./components/add-withdraw-account-form.vue";
import useTools from "../../../mixins/tools";
import useWalletService from "../../../service/wallet/walletService";
import useUserStore from "../../../store/modules/user";
import dayjs from "dayjs";
import type {
  WithdrawAccountForm,
  WithdrawForm,
} from "../../../service/wallet/model/walletModel";
import { deviceType, isAndroid, isIOS, isWeb } from "../../../utils/platform";
import { DeviceType } from "../../../types/enum";
const userStore = useUserStore();
const tools = useTools();
const walletService = useWalletService();
const { onBack, t, $u } = usePageFrame();

const loading = ref<boolean>(true);
const walletData = ref<Array<any>>([]);
const maxlength = ref<number>(-1);
const amount = ref<number>();
const accountList = ref<Array<any>>([]);
const currentAccountId = ref();
const addWithdrawAccountFormRef = ref();
const currentIndex = ref<number>(0);
const activeIndex = ref<number>(-1);
const currentTarget = ref<any>({ id: -1 }); // 临时存放 编辑删除的项

const showChooseWithdrawPopup = ref<boolean>(false);
const showAddWithdrawAccountPopup = ref<boolean>(false);
const showEditWithdrawAccountPopup = ref<boolean>(false);
const showMultiVerifyPopup = ref<boolean>(false);
const multiVerifyTypes = ref<Array<string>>([]);
const operateType = ref<number>(); // 0 新增 1 修改 2 删除 3 提现

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.withdraw"),
  });
});

onShow(async () => {
  if (userStore.twoFaStatus === 1) {
    multiVerifyTypes.value.push("email");
  }
  if (userStore.twoFaGoogleStatus === 1) {
    multiVerifyTypes.value.push("google");
  }
  if (userStore.twoFaPhoneStatus === 1) {
    multiVerifyTypes.value.push("phone");
  }
  walletData.value = await userStore.walletInfo();
  fetchWithdrawAccountList();
  loading.value = false;
});

const fetchWithdrawAccountList = async () => {
  const result = await walletService.withdrawAccountList();
  const data = result.data;
  accountList.value = data;
  if (accountList.value && accountList.value.length > 0) {
    currentAccountId.value = accountList.value[0].id;
  }
};

const getWalletInfo = computed(() => {
  const root =
    walletData.value.find((item) => item.walletType === "ROOT") || {};
  const total = walletData.value.reduce((prev, current) => {
    return prev + current.available;
  }, 0);
  const projects =
    walletData.value.filter((item) => item.walletType === "PROJECT") || [];
  return {
    root, //根钱包
    total, //全部余额
    projects, //子钱包
  };
});

const onInput = (value: string) => {
  maxlength.value = 14;
  if (
    Number(value) > Number(getWalletInfo.value.root.available) ||
    Number(value) < 0
  ) {
    $u.toast("user.wallet.Withdrawal.input.please-enter-correct");
    return;
  } else {
    const index = value.indexOf(".");
    if (index !== -1) maxlength.value = index + 3;
  }
};

const onFocus = () => {
  maxlength.value = 14;
};

const onSetAllWithdrawValue = () => {
  amount.value = getWalletInfo.value.root.available;
};

const onShowChooseWithdrawPopup = () => {
  showChooseWithdrawPopup.value = true;
};
const onHideChooseWithdrawPopup = () => {
  showChooseWithdrawPopup.value = false;
};

const onConfirmWithdraw = async () => {
  operateType.value = 3; // 提现
  if (amount.value == undefined || amount.value === 0) {
    uni.showToast({
      title: t("user.wallet.withdrawal.amount-warning"),
      icon: "none",
      mask: true,
    });
    return;
  }
  if (accountList.value.length === 0) {
    uni.showToast({
      title: t("user.wallet.withdrawal.please-create-account-first"),
      icon: "none",
      mask: true,
    });
    return;
  }
  showMultiVerifyPopup.value = true;
};

const fetchWithdraw = async () => {
  // 0-PC 1-MOBILE(H5) 2-IOS 3-ANDROID
  const params = {
    channel:
      deviceType === DeviceType.PC
        ? 0
        : deviceType === DeviceType.PHONE && isWeb
        ? 1
        : deviceType === DeviceType.PHONE && isAndroid
        ? 3
        : deviceType === DeviceType.PHONE && isIOS
        ? 2
        : 0,
    amount: amount.value,
    withdrawAccountId: currentAccountId.value,
  } as WithdrawForm;
  const result = await walletService.withdraw(params);
  const data = result.data;
  amount.value = undefined;
  if (accountList.value && accountList.value.length > 0) {
    currentAccountId.value = accountList.value[0].id;
  }
  $u.toast(t("global.submit.success"));
  setTimeout(async () => {
    walletData.value = await userStore.walletInfo();
  }, 500);
};

const onShowAddWithdrawAccountPopup = () => {
  showAddWithdrawAccountPopup.value = true;
};
const onHideAddWithdrawAccountPopup = () => {
  showAddWithdrawAccountPopup.value = false;
};

const onSelectCard = (item: any, index: number) => {
  activeIndex.value = index;
  currentIndex.value = index;
  currentAccountId.value = item.id;
};

const onShowEditWithdrawAccountPopup = () => {
  showEditWithdrawAccountPopup.value = true;
};

const onHideEditWithdrawAccountPopup = () => {
  showEditWithdrawAccountPopup.value = false;
};

const onEditCard = (item: any) => {
  currentTarget.value = item;
  onShowEditWithdrawAccountPopup();

  nextTick(() => {
    const model = addWithdrawAccountFormRef.value.model;
    let params: any = {};
    Object.keys(model).forEach((key: string) => {
      params[key] = item[key];
    });
    addWithdrawAccountFormRef.value.setFields(params);
  });
};

const onDeleteWithdrawAccount = async () => {
  operateType.value = 2; // 删除
  showMultiVerifyPopup.value = true;
};

const onCreateWithdrawAccount = async () => {
  operateType.value = 0; // 新增
  const valid: boolean = await addWithdrawAccountFormRef.value.validate();
  if (valid) {
    const model: WithdrawAccountForm =
      addWithdrawAccountFormRef.value.getFields();
    showMultiVerifyPopup.value = true;
  }
};

const onEditWithdrawAccount = async () => {
  operateType.value = 1; // 编辑
  const valid: boolean = await addWithdrawAccountFormRef.value.validate();
  if (valid) {
    const model: WithdrawAccountForm =
      addWithdrawAccountFormRef.value.getFields();
    showMultiVerifyPopup.value = true;
  }
};

const onMultiVerifyPopClose = () => {
  showMultiVerifyPopup.value = false;
};

const onMultiVerifyConfirm = async () => {
  if (operateType.value === 0) {
    // 新增
    const model: WithdrawAccountForm =
      addWithdrawAccountFormRef.value.getFields();
    const result = await walletService.addWithdrawAccount(model);
    const data = result.data;
    $u.toast(t("global.submit.success"));
    onHideAddWithdrawAccountPopup();
    onMultiVerifyPopClose();
    fetchWithdrawAccountList();
  } else if (operateType.value === 1) {
    // 编辑
    const model: WithdrawAccountForm =
      addWithdrawAccountFormRef.value.getFields();
    model.id = currentTarget.value.id;
    const result = await walletService.setWithdrawAccount(model);
    const data = result.data;
    $u.toast(t("global.submit.success"));
    onHideEditWithdrawAccountPopup();
    onMultiVerifyPopClose();
    fetchWithdrawAccountList();
  } else if (operateType.value === 2) {
    // 删除
    const result = await walletService.deleteWithdrawAccountById(
      currentTarget.value.id
    );
    const data = result.data;
    $u.toast(t("global.submit.success"));
    onHideEditWithdrawAccountPopup();
    onMultiVerifyPopClose();
    fetchWithdrawAccountList();
  } else if (operateType.value === 3) {
    fetchWithdraw();
    onMultiVerifyPopClose();
  }
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.color_bule {
  color: rgba(0, 80, 179, 1);
}
.color_grey {
  color: rgba(0, 0, 0, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  letter-spacing: 0.39rpx;
}

.tixian_content {
  box-sizing: border-box;
  min-height: 820rpx;
  background-color: #fff;
  margin: 0 32rpx;
  margin-top: calc(147rpx + var(--status-bar-height));
  padding: 40rpx 32rpx 35rpx;
  color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  .tixian_title {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0px;
  }
  .available_amount {
    margin: 40rpx 0 30rpx;
    font-size: 26rpx;
    letter-spacing: 0.78rpx;
  }
  .code {
    font-size: 28rpx;
    font-weight: 400;
    letter-spacing: 0.45rpx;
    line-height: 28rpx;
    color: rgba(0, 80, 179, 1);
  }
  .select_account {
    height: 96rpx;
    border-top: 1rpx solid rgba(235, 235, 235, 1);
    align-items: center;
  }
}
.bottom_btn {
  height: 80rpx;
  color: #fff;
  background-color: rgba(0, 80, 179, 1);
  text-align: center;
  line-height: 80rpx;
  margin: 80rpx 32rpx 0;
}
.account_card {
  padding: 30rpx;
  line-height: 44rpx;
  border: 2rpx solid rgba(0, 0, 0, 0.07);
  background: linear-gradient(
    180deg,
    rgba(245, 245, 245, 1) 0%,
    rgba(251, 251, 251, 1) 100%
  );
  background-blend-mode: normal;
  .card_header {
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 50rpx;
  }
  .other_card_info {
    width: 100%;
    padding: 30rpx 20rpx 0;
    background: rgba(255, 255, 255, 0.9);
    background-blend-mode: normal;
    justify-content: space-between;
    line-height: 45rpx;
    .right {
      width: 300rpx;
    }
  }
  .remark {
    background: rgba(255, 255, 255, 0.9);
    padding-left: 20rpx;
    padding-bottom: 10rpx;
  }
}

.popup_area {
  height: calc(100vh - 147rpx - var(--status-bar-height));

  .scroll {
    height: calc(100vh - 147rpx - var(--status-bar-height) - 100rpx - 144rpx);
  }
  .delete_text {
    color: rgba(217, 54, 62, 0.8);
    font-size: 28rpx;
    float: right;
    right: 0;
    letter-spacing: 0.84rpx;
  }
  .title {
    height: 100rpx;
    font-size: 40rpx;
    font-weight: 500;
    letter-spacing: 1.2rpx;
    line-height: 100rpx;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
    padding: 0 40rpx;
  }
  .account_card {
    margin: 40rpx 64rpx 0;
  }

  .bottom_btn {
    width: 100%;
    background-color: #fff;
    border-top: 1rpx solid rgba(235, 235, 235, 1);
    height: 144rpx;
    padding: 32rpx;
    margin: 0;
    button {
      background-color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      color: rgba(0, 80, 179, 1);
      border: 1rpx solid rgba(0, 80, 179, 1);
    }
  }

  .form_area {
    margin: 0rpx 64rpx;
  }

  .bottom_btn_save {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1rpx solid rgba(235, 235, 235, 1);
    height: 144rpx;
    padding: 32rpx;
    margin: 0;
    button {
      background-color: rgba(0, 80, 179, 1);
      height: 80rpx;
      color: #fff;
    }
  }
  .activate {
    border: 2rpx solid rgba(0, 80, 179, 1);
  }
}
</style>
