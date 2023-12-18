import type { Pagination } from "../base-model/baseParams";
import http from "../http";
import type {
  DepositForm,
  ExtractForm,
  WithdrawForm,
  WithdrawAccountForm,
} from "./model/walletModel";

export default function () {
  const depositAccountList = () => {
    return http.get({
      url: "/publish/depositAccount/list",
    });
  };
  const deposit = (data: DepositForm) => {
    return http.post({
      url: "/publish/deposit",
      data: data,
    });
  };
  const extract = (data: ExtractForm) => {
    return http.post({
      url: "/publish/extract",
      data: data,
    });
  };
  const depositList = (data: Pagination) => {
    return http.get({
      url: "/publish/deposit/list",
      data: data,
    });
  };
  const withdrawList = (data: Pagination) => {
    return http.get({
      url: "/publish/withdraw/list",
      data: data,
    });
  };
  const transactionList = (data: Pagination) => {
    return http.get({
      url: "/publish/transaction/list",
      data: data,
    });
  };
  const withdrawAccountList = () => {
    return http.get({
      url: "/publish/withdrawAccount/list",
    });
  };
  const withdraw = (data: WithdrawForm) => {
    return http.post({
      url: "/publish/withdraw",
      data: data,
    });
  };
  const addWithdrawAccount = (data: WithdrawAccountForm) => {
    return http.post({
      url: "/publish/withdrawAccount",
      data: data,
    });
  };
  const setWithdrawAccount = (data: WithdrawAccountForm) => {
    return http.put({
      url: "/publish/withdrawAccount",
      data: data,
    });
  };
  const deleteWithdrawAccountById = (id: string | number) => {
    return http.delete({
      url: `/publish/withdrawAccount/${id}`,
    });
  };

  return {
    depositAccountList,
    deposit,
    extract,
    depositList,
    withdrawList,
    transactionList,
    withdrawAccountList,
    withdraw,
    addWithdrawAccount,
    setWithdrawAccount,
    deleteWithdrawAccountById,
  };
}
