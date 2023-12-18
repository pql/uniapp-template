import http from "../http";
import type { LoginForm } from "../base-model/form";

export default function () {
  const login = (data: LoginForm) => {
    return http.post({
      url: "/tourist/login",
      data: data,
    });
  };
  return {
    login,
  };
}
