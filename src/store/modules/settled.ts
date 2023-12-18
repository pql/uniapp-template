// 文档 https://github.com/Allen-1998/pinia-plugin-persist-uni

import { defineStore } from "pinia";
import type { QueryListParams } from "../../service/settled/model/settledModel";
import useSettledService from "../../service/settled/settledService";

const settledService = useSettledService();
export const useSettledStore = defineStore("storeSettled", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    async queryList(params: QueryListParams) {
      const result = await settledService.queryList(params);
      const data = result.data;
      return data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "settled",
      },
    ],
  },
});

export default useSettledStore;
