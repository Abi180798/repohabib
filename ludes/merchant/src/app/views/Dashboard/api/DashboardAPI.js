import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
} from "../../../utils/requestHandler";

export const DashboardAPI = {
  async getStatistic(bizAccountId,dateString1,dateString2) {
    const response = await getWithAuth(`/statistic/transaction/bizaccount/${bizAccountId}?dateRange[0]=${dateString1}&dateRange[1]=${dateString2}`);
    return response;
  },
  async getAccount(bizAccountId) {
    const response = await getWithAuth(`/bizaccount/${bizAccountId}`);
    return response;
  },
  async putAccountId(bizAccountId,data) {
    const response = await putWithAuth(`/bizaccount/${bizAccountId}`,data);
    return response;
  },
  async getStatisticGraph(bizAccountId,periode) {
    const response = await getWithAuth(`/statistic/transaction/graph/bizaccount/${bizAccountId}?periode=${periode}`);
    return response;
  },
  async getStatisticTerlaris(bizAccountId,dateString1,dateString2) {
    const response = await getWithAuth(`/statistic/transaction/rank/product/bizaccount/${bizAccountId}?dateRange[0]=${dateString1}&dateRange[1]=${dateString2}`);
    return response;
  },
};
