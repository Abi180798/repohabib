import { getWithAuth } from "../../../utils/requestHandler";

export const MerchantAPI = {
  async getDataMerchant() {
    const response = await getWithAuth(`/bizaccount`);
    return response;
  },
  async getDataMerchantByParent(id) {
    const response = await getWithAuth(`/bizaccount/parentid/${id}`);
    return response;
  },
  async getPajakMerchant(id, params) {
    const response = await getWithAuth(`/statistic/tax/graph/bizaccount/${id}`, params);
    return response;
  },
  async getTransaksiMerchant(id, params) {
    const response = await getWithAuth(`/statistic/transaction/count/graph/bizaccount/${id}`, params);
    return response;
  },
  async getPendapatanMerchant(id, params) {
    const response = await getWithAuth(`/statistic/transaction/graph/bizaccount/${id}`, params);
    return response;
  },
  async getSummaryMerchant(id, params) {
    const response = await getWithAuth(`/statistic/transaction/bizaccount/${id}`, params);
    return response;
  },
  async getRankProductMerchant(id) {
    const response = await getWithAuth(`/statistic/transaction/rank/product/bizaccount/${id}`);
    return response;
  },
  async getRankSalesMerchant(id, params) {
    const response = await getWithAuth(`/statistic/transaction/rate/bizaccount/${id}`, params);
    return response;
  },
}