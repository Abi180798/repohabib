import { getWithAuth } from "../../../utils/requestHandler";

export const DashboardAPI = {
  async getTransactionData(id, params) {
    const response = await getWithAuth(`/statistic/transaction/${id}`,params);
    return response;
  },
  async getTotalPendapatanGraph(id, params) {
    const response = await getWithAuth(`/statistic/transaction/graph/${id}`,params);
    return response;
  },
  async getTotalPajakGraph(id, params) {
    const response = await getWithAuth(`/statistic/tax/graph/${id}`,params);
    return response;
  },
  async getJumlahTransaksiGraph(id, params) {
    const response = await getWithAuth(`/statistic/transaction/count/graph/${id}`,params);
    return response;
  },
  async getRankMerchant(id) {
    const response = await getWithAuth(`/statistic/transaction/rank/bizaccount/${id}`);
    return response;
  },
  async getRankProduct(id) {
    const response = await getWithAuth(`/statistic/transaction/rank/product/${id}`);
    return response;
  },
  async getRankSales(id, params) {
    const response = await getWithAuth(`/statistic/transaction/rate/${id}`,params);
    return response;
  },
};
