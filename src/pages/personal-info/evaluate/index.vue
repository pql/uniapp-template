<template>
  <view>
    <u-image
      src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/fast-evaluate.png"
      width="100%"
      height="400"
    ></u-image>
    <view class="pl-3 pr-3 pb-3">
      <view v-for="(item, index) in questionList" :key="index">
        <view v-if="item.num === 1" class="mb-2">
          <view class="mb-2 text-base font-bold"
            >{{ index + 1 }}.{{ item.title }}</view
          >
          <view v-if="item.name !== 'english'">
            <u-radio-group
              v-model="item.value"
              width="50%"
              @change="onRadioGroupChange($event, item)"
            >
              <u-radio
                v-for="(optionItem, optionIndex) in item.option"
                :key="optionIndex"
                :name="optionItem.title"
              >
                {{ optionItem.title }}
              </u-radio>
            </u-radio-group>
          </view>
          <view v-else>
            <u-radio-group
              v-model="item.value"
              wrap
              @change="onRadioGroupChange($event, item)"
            >
              <u-radio
                v-for="(optionItem, optionIndex) in item.option"
                :key="optionIndex"
                :name="optionItem.title"
              >
                {{ optionItem.title }}
              </u-radio>
            </u-radio-group>
          </view>
        </view>
        <view v-else-if="item.num > 1" class="mb-2">
          <view class="mb-2 text-base font-bold"
            >{{ index + 1 }}.{{ item.title }}</view
          >
          <u-checkbox-group
            :max="item.num"
            width="50%"
            @change="onCheckboxGroupChange($event, item)"
          >
            <u-checkbox
              v-for="(optionItem, optionIndex) in item.option"
              v-model="optionItem.checked"
              :key="optionIndex"
              :name="optionItem.title"
              shape="circle"
              >{{ optionItem.title }}</u-checkbox
            >
          </u-checkbox-group>
        </view>
      </view>
      <view v-if="questionList.length > 0">
        <ComButton
          :title="$t('index.home.evaluate.get-result')"
          :custom-style="customStyle"
          @onTap="onSubmit"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";
import { ref, nextTick } from "vue";
import useEvaluateService from "../../../service/evaluate/evaluateService";
import type { PublishTestForm } from "../../../service/evaluate/model/evaluateModel";
import ComButton from "../../../components/button/button.vue";
const { t, $u } = usePageFrame();
const evaluateService = useEvaluateService();
const questionList = ref<Array<any>>([]);

const customStyle = ref({
  borderColor: "#1D429F",
  color: "#FFFFFF",
  background: "#1D429F",
});

const onRadioGroupChange = (title: any, question: any) => {
  nextTick(() => {
    question.option.forEach((pitem: any) => {
      if (title === pitem.title) {
        question.value = pitem.optionId;
      }
    });
  });
};

const onCheckboxGroupChange = (list: any, question: any) => {
  nextTick(() => {
    if (list.length > question.num) {
      const checkedList = JSON.parse(
        JSON.stringify(list.slice(0, question.num))
      );
      $u.toast(`最多选择${question.num}个`);
      question.value.length = 0;
      question.option.forEach((pitem: any) => {
        const index = checkedList.indexOf(pitem.title);
        if (index === -1) {
          pitem.checked = false;
        } else {
          pitem.checked = true;
          question.value.push(pitem.optionId);
        }
      });
    } else {
      const checkedList = JSON.parse(
        JSON.stringify(list.slice(0, question.num))
      );
      question.value.length = 0;
      question.option.forEach((pitem: any) => {
        const index = checkedList.indexOf(pitem.title);
        if (index === -1) {
          pitem.checked = false;
        } else {
          pitem.checked = true;
          question.value.push(pitem.optionId);
        }
      });
    }
  });
};

const onSubmit = async () => {
  const params = questionList.value.map((item) => {
    const obj = {
      questionId: item.questionId,
      optionIds: item.num === 1 ? [item.value] : [...item.value],
    };
    return obj;
  });
  const isCompleted = params.every((item) => {
    return item.optionIds.every((v) => v !== null);
  });
  if (isCompleted) {
    const result = await evaluateService.publishTest({
      data: params,
    } as PublishTestForm);
    const data = result.data;
    if (data) {
      $u.toast(t("global.submit.success"));
    } else {
      $u.toast(t("global.failure"));
    }
  } else {
    $u.toast(t("index.home.complete-all-question"));
  }
};

onLoad(async () => {
  uni.setNavigationBarTitle({
    title: t("user.menu.fast-evaluate"),
  });

  const result = await evaluateService.testList();
  const data = result.data;
  data.forEach((item: any) => {
    if (item.num === 1) {
      item.value = null;
    }
    if (item.num > 1) {
      item.value = [];
      item.option.forEach((optionItem: any) => {
        optionItem.checked = false;
      });
    }
  });
  questionList.value = data;
  console.log(data);
});
</script>
