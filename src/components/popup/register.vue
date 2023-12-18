<template>
    <view class="p-3 flex flex-col" style="max-height: 90vh">
        <view class="mb-5 text-center text-xl">{{$t("user.register.register")}}</view>
        <scroll-view scroll-y>
            <view class="text-sm">{{$t("user.register.modal.tips")}}</view>
            <view class="mt-6 text-2xl text-gray-400">SETP1</view>
            <view>{{$t('user.register.modal.step-1')}}</view>
            <view class="mt-2 text-gray-400">{{$t('user.register.modal.step-tips-1')}}</view>

            <view class="mt-6 text-2xl text-gray-400">STEP2</view>
            <view>{{$t('user.register.modal.step-2')}}</view>
            <view class="mt-2 text-gray-400">{{$t('user.register.modal.step-tips-2')}}</view>

            <view class="mt-6 text-2xl text-gray-400">STEP3</view>
            <view>{{$t('user.register.modal.step-3')}}</view>
            <view class="mt-2 text-gray-400">{{$t('user.register.modal.step-tips-3')}}</view>

            <view class="mt-6 text-2xl text-gray-400">STEP4</view>
            <view>{{$t('user.register.modal.step-4')}}</view>
            <view class="mt-2 text-gray-400">{{$t('user.register.modal.step-tips-4')}}</view>

            <u-gap height="100"></u-gap>
        </scroll-view>
    </view>
</template>