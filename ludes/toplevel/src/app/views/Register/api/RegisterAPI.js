import { getWithAuth, postWithAuth, putWithAuth, deleteWithAuth } from "../../../utils/requestHandler";

export const RegisterAPI = {
  async getMerchants(id) {
    const response = await getWithAuth(`/bizaccount/parentid/${id}`);
    return response;
  },
  async getMerchantById(id) {
    const response = await getWithAuth(`/bizaccount/${id}`);
    return response;
  },
  async addMerchant(data) {
    const response = await postWithAuth(`/bizaccount`, data);
    return response;
  },
  async updateMerchant(id, data) {
    const response = await putWithAuth(`/bizaccount/${id}`, data);
    return response;
  },
  async deleteMerchant(id) {
    const response = await deleteWithAuth(`/bizaccount/${id}`);
    return response;
  },
  async getUserNonPegawai() {
    const response = await getWithAuth(`/bizstaff/biz/none`);
    return response;
  },
  async addOwner(data) {
    const response = await postWithAuth(`/bizstaff`, data);
    return response;
  },
}