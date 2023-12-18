import http from "../http";
import type { Pagination } from "../base-model/baseParams";
import type {
  QueryListForm,
  ConfirmSignForm,
  PlaceAnOrderBeforeConditionForm,
  OrderPayForm,
  OrderFileForm,
  ToDoListForm,
  InfoListForm,
  PostInvestorOrderDataForm
} from "./model/orderModel";

export default function () {
  const queryList = (data: Pagination | QueryListForm) => {
    return http.get({
      url: "/investor/order/list",
      data: data,
    });
  };
  const todoList = (data: ToDoListForm) => {
    return http.get({
      url: "/investor/order/todo/list",
      data: data,
    });
  };
  const infoList = (data: InfoListForm) => {
    return http.get({
      url: "/investor/order/info/list",
      data: data,
    });
  };
  const confirmSign = (data: ConfirmSignForm) => {
    return http.post({
      url: "/investor/order/collection/confirmSign",
      data: data,
    });
  };
  const hasNoPayOrder = () => {
    return http.post({
      url: "/investor/order/precondition/invest",
    });
  };
  const placeAnOrderBeforeCondition = (
    data: PlaceAnOrderBeforeConditionForm
  ) => {
    return http.post({
      url: "/investor/order/collection/precondition",
      data: data,
    });
  };
  const orderPay = (data: OrderPayForm) => {
    return http.post({
      url: "/investor/order/pay",
      data: data,
    });
  };
  const getOrderFile = (data: OrderFileForm) => {
    return http.get({
      url: "/investor/order/file/list",
      data: data,
    });
  };
  const orderTodo = (id: number) => {
    return http.post({
      url: "/investor/order/todo",
      data: { id },
    });
  };
  const getOrderDetail = (orderNo: string) => {
    return http.get({
      url: "/investor/order/" + orderNo,
    });
  };
  const postInvestorOrderData = (data: PostInvestorOrderDataForm) => {
    return http.post({
      url: "/investor/order/data",
      data: data,
    });
  };
  return {
    queryList,
    confirmSign,
    hasNoPayOrder,
    placeAnOrderBeforeCondition,
    orderPay,
    getOrderFile,
    todoList,
    orderTodo,
    getOrderDetail,
    infoList,
    postInvestorOrderData,
  };
}
