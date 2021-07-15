import {
  postWithAuth,
  getWithAuth,
  putWithAuth,
  deleteWithAuth,
} from "../../../utils/requestHandler";

export const DiskonAPI = {
  async postDiscount(data) {
    const response = await postWithAuth("/discount/bulk", data);
    return response;
  },
  async getDiscount(data) {
    const response = await postWithAuth("/discount/all",data);
    return response;
  },
  async getDiscountById(id) {
    const response = await getWithAuth(`/discount/${id}`);
    return response;
  },
  async putDiscountById(id, data) {
    const response = await putWithAuth(`/discount/${id}`, data);
    return response;
  },
  async delDiscountById(id) {
    const response = await deleteWithAuth(`/discount/${id}`);
    return response;
  },
};
