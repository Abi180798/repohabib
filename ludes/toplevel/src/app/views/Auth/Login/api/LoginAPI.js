import { postWithoutAuth } from "../../../../utils/requestHandler";

export const LoginAPI = {
  async loginAccount(data) {
    const response = await postWithoutAuth("/auth", data);
    return response;
  },
};
