import { PostWithoutAuth } from "../../../../utils/requestHandler";

export const LoginAPI = {
  async loginAccount(data) {
    const response = await PostWithoutAuth("/auth", data);
    return response;
  },
};
