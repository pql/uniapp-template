// 文档 https://github.com/Allen-1998/pinia-plugin-persist-uni

import { defineStore } from "pinia";
import useOrderService from "../../service/order/orderService";
import type { Pagination } from "../../service/base-model/baseParams";
const orderService = useOrderService();
export const useOrderStore = defineStore("storeOrder", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    async queryList(data: Pagination) {
      const result = await orderService.queryList(data);
      const orderList = result.data;
      return orderList;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "order",
      },
    ],
  },
});

export default useOrderStore;
