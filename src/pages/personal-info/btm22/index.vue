<template>
  <view>
    <view class="header relative">
      <u-image
        src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/bar-img-2.jpg"
        width="100%"
        height="250"
      ></u-image>
      <view
        class="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-10/12"
        style="color: #ffffff"
      >
        <view class="font-64 font-bold">Who We Are?</view>
        <view class="font-26 leading-4"
          >We will realize the people's dreams A trusted partner on the
          migration trail</view
        >
      </view>
    </view>
    <!-- content -->
    <view class="content-container">
      <view class="title">专注北美移民20余年</view>
      <view class="content">
        <view class="text">
          贝特曼集团发身于2001年成立的刘宇和贝特曼律师事务所，二十余年来基于中美经济交流的需求，并结合自身丰富的美国法律和商业实践背景，刘宇带领团队将贝特曼品牌，由法律专业领域，延伸到对美国的资本投资管理领域，创立了总部位于纽约曼哈顿的贝特曼集团，旗下包括贝特曼法律集团、贝特曼资本投资管理有限公司、贝特曼咨询有限公司（北美移民）、BuildX地产开发投资平台、USAeb5美国投资移民数字平台、EB-5区域中心等投资管理实体，以及区域链相关的创新科技公司。
        </view>
        <view class="image-el">
          <u-image
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/btm_bg1.jpeg"
            width="100%"
            height="490rpx"
          ></u-image>
        </view>
      </view>

      <view class="title">贝特曼法律集团</view>
      <view class="content">
        <view class="text"
          >位于美国纽约曼哈顿联邦大楼旁，由刘宇前律师于2001年在纽约创办的第一家律师事务所发展而来，
          在格里高利·贝特曼律师加入后，正式形成了代表专业能力、品质、信誉的贝特曼法律服务品牌，后发展成为贝特曼法律集团。贝特曼法律集团在20多年的法律执业中，服务了超过万名的移民客户，遍布美国各州，在移民行业广受尊敬。贝特曼法律集团也不断吸收法律精英的加入，2022年，前纽约联邦移民法官Sandy
          Hom应刘宇先生邀请加入贝特曼法律集团，正是对贝特曼法律服务品质的认可和肯定。</view
        >
      </view>

      <view class="title">贝特曼资本</view>
      <view class="content">
        <view class="text">
          贝特曼资本下设贝特曼EB-5资本投资管理公司，参与EB-5基金管理，监督EB-5资金使用，保护贝特曼合作中介机构及投资人的权益。
        </view>
      </view>

      <view class="title">贝特曼咨询</view>
      <view class="content">
        <view class="text">
          贝特曼咨询座落于世界金融中心纽约曼哈顿，其业务核心，是以B2B的模式，为主要EB-5投资来源国的中介公司和投资机构，尤其是中国区的广大中介机构，提供来源于美国本土的系统化的专业支持。这些支持包括EB-5法律政策信息、从业人员全面培训、EB-5项目的尽调与评估、移民法律和商业法律的配套服务、EB-5投资的风控和问题处理，以及美国本土客服工作等方面的业务支持和服务。
        </view>
      </view>

      <view class="title">USAeb5数字平台</view>
      <view class="content">
        <view class="text">
          以美国纽约为全球运营中心，作为EB-5 行业TOP
          序列的先行者和实践者，我们力求通过自身的专业背景、丰富的经验和影响力，结合现代IT
          技术，为广大从业者和投资人构建行业首创、公开透明、安全可靠的全方位业务支撑体系。通过垂直整合资源、平台深度运营，进而实现行业的专业化、系统化、数字化，并以此拉动和促进行业升级，强化从业者赋能和保护投资人利益，这必将对行业生态产生积极的影响。
        </view>
        <view class="image-el">
          <u-image
            src="https://btm-group.oss-cn-hangzhou.aliyuncs.com/resources/mobile/static/images/btm_bg2.jpeg"
            width="100%"
            height="490rpx"
          ></u-image>
        </view>
      </view>

      <view class="title">BUILD X 美国地产投资平台</view>
      <view class="content">
        <view class="text">
          创新型地产投资平台。Model
          1为现金持有者提供在项目完工前以低价投资购买优质房产的通道，通过 Model
          1投资的早期投资者，往往获得 50%以上的资产增值以及税务上的优势；Model
          2为投资人提供股权投资地产项目开发的机会；Model
          3为喜欢稳定季度收益的投资人，提供1-3年期的固定收益理财产品
        </view>
      </view>
    </view>
    <!-- content -->
    <u-gap height="100"></u-gap>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import usePageFrame from "../../../mixins/page-frame";

const { t } = usePageFrame();
onLoad(() => {
  uni.setNavigationBarTitle({
    title: t("user.menu.btm22"),
  });
});
</script>

<style lang="scss" scoped>
.content-container {
  margin: 0 45rpx;
}
.title {
  color: #363a40;
  font-size: 40rpx;
  font-weight: 500;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}
.content {
  .text {
    font-size: 26rpx;
    line-height: 44rpx;
    color: #363a40;
  }
  .image-el {
    margin-top: 40rpx;
    margin-bottom: 66rpx;
  }
}
</style>
