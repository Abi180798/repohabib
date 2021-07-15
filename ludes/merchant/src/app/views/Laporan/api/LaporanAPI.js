import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
} from "../../../utils/requestHandler";

export const LaporanAPI = {
  async postLaporan(data) {
    const response = await postWithAuth("/bizproduct/report", data);
    return response;
  },
  async getLaporan(bizAccountId,params) {
    const response = await getWithAuth(`/bizstaff/bizaccount/${bizAccountId}`,{},params);
    return response;
  },
  async putLaporanById(id, data) {
    const response = await putWithAuth(`/bizstaff/${id}`, data);
    return response;
  },
  async delLaporanById(id) {
    const response = await deleteWithAuth(`/bizstaff/${id}`);
    return response;
  },
  async LaporanById(id,dateString1,dateString2) {
    let response;
    if(dateString1){
      response = await getWithAuth(`/statistic/transaction/rate/bizaccount/${id}?dateRange[0]=${dateString1}&dateRange[1]=${dateString2}`);
    }else{
      response = await getWithAuth(`/statistic/transaction/rate/bizaccount/${id}`);
    }
    return response;
  },
};
