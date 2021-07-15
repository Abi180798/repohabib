import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
} from "../../../utils/requestHandler";

export const PegawaiAPI = {
  async postPegawai(data) {
    const response = await postWithAuth("/bizstaff", data);
    return response;
  },
  async getPegawai(bizAccountId,params) {
    const response = await getWithAuth(`/bizstaff/bizaccount/${bizAccountId}`,{},params);
    return response;
  },
  async getPegawaiNoRole() {
    const response = await getWithAuth(`/bizstaff/biz/none`);
    return response;
  },
  async putPegawaiById(id, data) {
    const response = await putWithAuth(`/bizstaff/${id}`, data);
    return response;
  },
  async delPegawaiById(id) {
    const response = await deleteWithAuth(`/bizstaff/${id}`);
    return response;
  },
  async delMulPegawaiById(data) {
    const response = await deleteWithAuth(`/bizstaff`,data);
    return response;
  },
};
