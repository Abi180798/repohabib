import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
} from "../../../utils/requestHandler";

export const KategoriAPI = {
  async postCategory(data) {
    const response = await postWithAuth("/category", data);
    return response;
  },
  async getCategory(bizAccountId, params) {
    const response = await getWithAuth(`/category/bizaccount/${bizAccountId}/`,{},params);
    return response;
  },
  async getAllCategory() {
    const response = await getWithAuth(`/category/`);
    return response;
  },
  async getCategoryById(id) {
    const response = await getWithAuth(`/category/${id}`);
    return response;
  },
  async getCategoryByName(name) {
    const response = await getWithAuth(`/category/${name}`);
    return response;
  },
  async putCategoryById(id, data) {
    const response = await putWithAuth(`/category/${id}`, data);
    return response;
  },
  async delCategoryById(id) {
    const response = await deleteWithAuth(`/category/${id}`);
    return response;
  },
  async delMulCategoryById(data) {
    const response = await deleteWithAuth(`/category`,data);
    return response;
  },
};
