import { App } from "vue";
import uView from "vk-uview-ui";

// 全局挂载引入http相关请求拦截插件
import http from "vk-uview-ui/libs/request";

// post类型对象参数转为get类型url参数
import queryParams from "vk-uview-ui/libs/function/queryParams";
// 路由封装
import route from "vk-uview-ui/libs/function/route.js";
// 时间格式化
import timeFormat from "vk-uview-ui/libs/function/timeFormat.js";
// 时间戳格式化,返回多久之前
import timeFrom from "vk-uview-ui/libs/function/timeFrom.js";
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from "vk-uview-ui/libs/function/colorGradient.js";
// 生成全局唯一guid字符串
import guid from "vk-uview-ui/libs/function/guid.js";
// 主题相关颜色,info|success|warning|primary|default|error,此颜色已在uview.scss中定义,但是为js中也能使用,故也定义一份
import color from "vk-uview-ui/libs/function/color.js";
// 根据type获取图标名称
import type2icon from "vk-uview-ui/libs/function/type2icon.js";
// 打乱数组的顺序
import randomArray from "vk-uview-ui/libs/function/randomArray.js";
// 对象和数组的深度克隆
import deepClone from "vk-uview-ui/libs/function/deepClone.js";
// 对象深度拷贝
import deepMerge from "vk-uview-ui/libs/function/deepMerge.js";
// 添加单位
import addUnit from "vk-uview-ui/libs/function/addUnit.js";

// 规则检验
import test from "vk-uview-ui/libs/function/test.js";
// 随机数
import random from "vk-uview-ui/libs/function/random.js";
// 去除空格
import trim from "vk-uview-ui/libs/function/trim.js";
// toast提示，对uni.showToast的封装
import toast from "vk-uview-ui/libs/function/toast.js";
// 获取父组件参数
import getParent from "vk-uview-ui/libs/function/getParent.js";
// 获取整个父组件
import $parent from "vk-uview-ui/libs/function/$parent.js";
// 获取sys()和os()工具方法
// 获取设备信息，挂载到$u的sys()(system的缩写)属性中，
// 同时把安卓和ios平台的名称"ios"和"android"挂到$u.os()中，方便取用
import { sys, os } from "vk-uview-ui/libs/function/sys.js";
// 防抖方法
import debounce from "vk-uview-ui/libs/function/debounce.js";
// 节流方法
import throttle from "vk-uview-ui/libs/function/throttle.js";

// 配置信息
import config from "vk-uview-ui/libs/config/config.js";
// 各个需要fixed的地方的z-index配置文件
import zIndex from "vk-uview-ui/libs/config/zIndex.js";

function wranning(str: string) {
  // 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (import.meta.env.VITE_APP_NODE_ENV === "development") {
    console.warn(str);
  }
}

export const $u: any = {
  queryParams: queryParams,
  route: route,
  timeFormat: timeFormat,
  date: timeFormat, // 另名date
  timeFrom,
  colorGradient: colorGradient.colorGradient,
  colorToRgba: colorGradient.colorToRgba,
  guid,
  color,
  sys,
  os,
  type2icon,
  randomArray,
  wranning,
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  hexToRgb: colorGradient.hexToRgb,
  rgbToHex: colorGradient.rgbToHex,
  test,
  random,
  deepClone,
  deepMerge,
  getParent,
  $parent,
  addUnit,
  trim,
  type: ["primary", "success", "error", "warning", "info"],
  http,
  toast,
  config, // uView配置信息相关，比如版本号
  zIndex,
  debounce,
  throttle,
};

const useVkUView = (app: App) => {
  app.use(uView);
};

export default useVkUView;
