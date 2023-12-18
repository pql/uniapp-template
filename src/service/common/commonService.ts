import http from "../http";
import type { ForgetPasswordForm, ResetPasswordForm } from "../base-model/form";

export default function () {
  const forgetPassword = (data: ForgetPasswordForm) => {
    return http.post({
      url: "/common/password/forget",
      data: data,
    });
  };
  const resetPassword = (data: ResetPasswordForm) => {
    return http.post({
      url: "/common/password/reset",
      data: data,
    });
  };
  const countryList = () => {
    return http.get({
      url: "/common/country/list",
    });
  };
  const getProvinceDataByCountryId = (parentId: number) => {
    return http.get({
      url: `/common/country/children/${parentId}`,
    });
  };
  const getFileUrl = (data: any) => {
    return http.get({
      url: "/common/file/s3/sign",
      data: data,
    });
  };
  const getProductDetail = (id: number) => {
    return http.get({
      url: "common/product/" + id,
    });
  };
  return {
    forgetPassword,
    resetPassword,
    countryList,
    getProvinceDataByCountryId,
    getFileUrl,
    getProductDetail,
  };
}
