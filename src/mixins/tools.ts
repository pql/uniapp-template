import { t } from "../locale";
import { $u } from "../vk-uview";

export default function () {
  const cryptoEmail = (email: string) => {
    if (!email) return;
    const tempArr = email.split("@");
    return tempArr[0].slice(0, 2) + "****@" + tempArr[1];
  };
  const toAddPrefix = (value: any, prefix: string = "$") => {
    return value ? prefix + value : "-";
  };
  /**
   *
   * @param {金额} value
   * @returns 返回带有千分符的金额字符
   */
  const formatNum = (value: string | number) => {
    if (!value) return "0";
    if (typeof value === "string") {
      value = Number(value);
    }
    return value.toLocaleString("en-US");
  };
  const copy = (value: any) => {
    uni.setClipboardData({
      data: value,
      success: () => {
        $u.toast(t("global.copyed"));
      },
    });
  };
  const phoneDesensitize = (phone: string) => {
    return phone.substr(0, 3) + "****" + phone.substr(7);
  };
  const genSelectOptions = (
    array: Array<any>,
    labelField: string,
    valueField: string
  ) => {
    if (Array.isArray(array)) {
      return array.map((item: any) => {
        return {
          label: item[labelField],
          text: item[labelField],
          value: item[valueField],
        };
      });
    }
    return [];
  };
  const getNameByUrl = (url: string) => {
    const temp = url.split("/");
    return temp[temp.length - 1];
  };
  const downloadPDF = (
    url: string,
    filename: string = `${new Date().getTime()}`
  ) => {
    // #ifdef H5
    window.location.href = url;
    // #endif
    // #ifdef APP
    uni.showLoading({
      title: t("global.download.loading"),
    });
    const task = plus.downloader.createDownload(
      url,
      {
        //本地路径开头使用file://，跟上手机文件本地目录storage/emulated/0，就是用户文件管理器能看到的了
        filename: "file://storage/emulated/0/Download/" + filename, //利用保存路径，实现下载文件的重命名
      },
      (file, status) => {
        // file 为下载的文件对象
        if (status === 200) {
          //下载成功,file.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
          let fileSaveUrl = plus.io.convertLocalFileSystemURL(file.filename!);
          uni.hideLoading();
          uni.showModal({
            title: t("global.download.success"),
            content: t("global.download.savePath") + fileSaveUrl,
            confirmText: t("global.confirm"),
            showCancel: false,
          });
        } else {
          // 下载失败
          plus.downloader.clear(); // 清除下载任务
        }
      }
    );
    task.start();
    // #endif
  };
  const setWebviewParamsSync = (data: any) => {
    try {
      uni.setStorageSync("webviewParams", data);
    } catch (error) {
      console.error("set webviewParams fail:" + error);
    }
  };
  const getWebviewParamsSync = () => {
    try {
      const value = uni.getStorageSync("webviewParams");
      if (value) {
        return value;
      }
    } catch (error) {
      console.error("get webviewParams fail:" + error);
    }
  };
  return {
    cryptoEmail,
    toAddPrefix,
    formatNum,
    copy,
    phoneDesensitize,
    genSelectOptions,
    getNameByUrl,
    downloadPDF,
    getWebviewParamsSync,
    setWebviewParamsSync,
  };
}
