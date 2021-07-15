import Cookies from 'js-cookie';
import { TOKEN } from '../../../utils/constants';

export const AuthAPI = {
  getToken() {
    return Cookies.get(TOKEN);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  // getHTTPHeader() {
  //   return {
  //     "x-auth-token": Base64.decode(this.getAuth()),
  //     "x-api-token": Base64.decode(this.getToken())
  //   };
  // },

  // async fetchUser() {
  //   const response = await getData("/api/users/me/");
  //   return response;
  // }
}