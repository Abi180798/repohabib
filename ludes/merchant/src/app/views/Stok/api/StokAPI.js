import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
  getWithoutAuth,
} from "../../../utils/requestHandler";

export const StokAPI = {
  async postStok(data) {
    const response = await postWithAuth("/bizproduct", data);
    return response;
  },
  async getStok(params) {
    const response = await getWithAuth(`/bizproduct/get/all/`,{},params);
    return response;
  },
  async getMedia(mediaId) {
    const response = await getWithoutAuth(`/media/${mediaId}`);
    return response;
  },
  async getStokBy(bizAccountId) {
    const response = await getWithAuth(`/bizproduct/bizaccount/${bizAccountId}`);
    return response;
  },
  async getStokById(id) {
    const response = await getWithAuth(`/bizproduct/${id}`);
    return response;
  },
  async putStokById(id, data) {
    const response = await putWithAuth(`/bizproduct/${id}`, data);
    return response;
  },
  async delStokById(id) {
    const response = await deleteWithAuth(`/bizproduct/${id}`);
    return response;
  },
  async delMulStokById(data) {
    const response = await deleteWithAuth(`/bizproduct`,data);
    return response;
  },
};
