import { postWithoutAuth } from "../../../../utils/requestHandler";

export const RegisterAPI = {
  async registerAccount(data) {
    const response = await postWithoutAuth("/user", data);
    return response;
  },
};
