import { t } from "../locale";
import { app } from "../main";
import useUserStore from "../store/modules/user";

export function requestInterceptor(config: any) {
  const userStore = useUserStore();
  config.header.Authorization = userStore.token;

  // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
  // config.header.token = vm.token;

  // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
  // config.header.token = vm.$store.state.token;

  // 方式三，如果token放在了globalData，通过getApp().globalData获取
  // config.header.token = getApp().globalData.username;

  // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
  // const token = uni.getStorageSync('token');
  // config.header.token = token;

  return config;
}

export function responseInterceptor(res: any) {
  // 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
  // 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
  const $u = app.config.globalProperties.$u;
  const userStore = useUserStore();
  if (res.code == 200) {
    // 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
    return res;
  }
  if (res.code === 401) {
    // 未登录
    if (userStore.token === "") {
      $u.toast(t("login.not-login"));
      const pages = getCurrentPages();
      // #ifdef MP-WEIXIN
      if (pages[0].route !== "/pages/tabbar/personal-info/index") {
        uni.switchTab({
          url: "/pages/tabbar/personal-info/index",
        });
      }
      // #endif
      // #ifdef APP || H5
      const timer = setTimeout(() => {
        $u.route({
          url: "/pages/login/index",
          type: "reLaunch",
        });
        clearTimeout(timer);
      }, 1000);
      // #endif
      return false;
    } else {
      $u.toast(res.msg);
    }
    return Promise.reject(res);
  } else {
    $u.toast(res.msg);
    return false;
  }
}
