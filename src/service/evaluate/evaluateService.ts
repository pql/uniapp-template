import http from "../http";
import type { PublishTestForm } from "./model/evaluateModel";

export default function () {
  const testList = () => {
    return http.get({
      url: "/common/test/list",
    });
  };
  const publishTest = (data: PublishTestForm) => {
    return http.post({
      url: "/publish/test",
      data: data,
    });
  };
  const myTestList = () => {
    return http.get({
      url: "/publish/test",
    });
  };
  return {
    testList,
    publishTest,
    myTestList,
  };
}
