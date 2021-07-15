import { PostWithoutAuth } from "../../../../utils/requestHandler";

export const RegisterAPI = {
  async registerAccount(data) {
    const response = await PostWithoutAuth("/user", data);
    return response;
  },
};
