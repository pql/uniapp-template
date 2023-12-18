import type { App } from "vue";
import Request from "vk-uview-ui/libs/request";
import { requestInterceptor, responseInterceptor } from "./interceptor";
import { app } from "../main";
import { t } from "../locale";
import useUserStore from "../store/modules/user";

export const httpRequestService = Request;
// 请求拦截器
httpRequestService.interceptor.request = requestInterceptor;
// 响应拦截器
httpRequestService.interceptor.response = responseInterceptor;
const requestConfig = {
  baseUrl: import.meta.env.VITE_APP_API_BASE_URL, // 请求的根域名
  // 默认的请求头
  header: {},
  method: "POST",
  // 设置为json，返回后uni.request会对数据进行一次JSON.parse
  dataType: "json",
  // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
  responseType: "text",
  showLoading: true, // 是否显示请求中的loading
  loadingText: "",
  loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  timer: null, // 定时器
  originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
  loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
};
// 设置全局默认配置
httpRequestService.config = requestConfig;

export interface HttpOption {
  url: string;
  data?: any;
  method?: string;
  headers?: any;
  beforeRequest?: () => void;
  afterRequest?: () => void;
}

export interface Response<T = any> {
  code: number;
  msg: string;
  data: T;
}

function http<T = any>({
  url,
  data,
  method,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  
  const $u = app.config.globalProperties.$u;
  const userStore = useUserStore();
  const successHandler = (res: Response<T>) => {
    // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
    if (res.code === 200) {
      return res.data;
    } else if (res.code === 401) {
      // 未登录
      // if (userStore.token === "") {
      //   $u.toast(t("login.not-login"));
      //   setTimeout(() => {
      //     $u.route({
      //       url: "/pages/login/index",
      //       type: "reLaunch",
      //     });
      //   }, 1000);
      // } else {
      //   $u.toast(res.msg);
      // }
      return false;
    }
    throw new Error(res.msg || "请求失败，未知异常");
  };
  
  const failHandler = (error: Response<Error>) => {
    afterRequest && afterRequest();
    throw new Error(error.msg) || "请求失败，未知异常！";
  };
  beforeRequest && beforeRequest();
  method = method || "GET";
  const params = Object.assign(
    typeof data === "function" ? data() : data || {},
    {}
  );

  return method === "GET"
    ? httpRequestService
        .get(url, params, headers)
        // .then(successHandler, failHandler)
    : method === "POST"
    ? httpRequestService
        .post(url, params, headers)
        // .then(successHandler, failHandler)
    : method === "PUT"
    ? httpRequestService
        .put(url, params, headers)
        // .then(successHandler, failHandler)
    : method === "DELETE"
    ? httpRequestService
        .delete(url, params, headers)
        // .then(successHandler, failHandler)
    : null;
}

export function get<T = any>({
  url,
  data,
  method = "GET",
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  });
}

export function post<T = any>({
  url,
  data,
  method = "POST",
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  });
}

export function put<T = any>({
  url,
  data,
  method = "PUT",
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  });
}

export function del<T = any>({
  url,
  data,
  method = "DELETE",
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  });
}

function install(app: App): void {
  app.config.globalProperties.$http = http;
  app.config.globalProperties.$get = get;
  app.config.globalProperties.$post = post;
  app.config.globalProperties.$put = put;
  app.config.globalProperties.$delete = del;
}

export default {
  install,
  get,
  post,
  put,
  delete: del,
};
