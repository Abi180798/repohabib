import axios from 'axios'
import Cookies from "js-cookie"
import { Base64 } from 'js-base64';
import { AuthAPI } from '../views/Auth/api/AuthAPI';
import { TOKEN } from './constants';

const BASE_URL = "https://patra.ludes.in/api/v1"

// export const postImage = async (url, data = {}, headers = {}) => {
//   try {
//     const token = "5afc829487c100de3e6679971a00040b2b77cead";
//     const r = await axios.post(url, data, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...headers
//     }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// };
export const PostWithoutAuth = async (url, data = {}) => {
  try {
    const r = await axios.post(`${BASE_URL}${url}`, data);
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401||r.status===403){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.replace("/login");
    }
    r.isError = true;
    return r;
  }
};
export const postWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401||r.status===403){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.replace("/login");
    }
    r.isError = true;
    return r;
  }
};
// export const patchWithAuth = async (url, data = {}, headers = {}) => {
//   try {
//     const authToken = Base64.decode(AuthAPI.getAuth());
//     const apiToken = Base64.decode(AuthAPI.getToken());
//     const r = await axios.patch(`${BASE_URL}${url}`, data, {
//       headers: {
//         "content-type": "application/json",
//         "x-auth-token": `${authToken}`,
//         "x-api-token": `${apiToken}`,
//         ...headers
//       }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// };
export const putWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.put(`${BASE_URL}${url}`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401||r.status===403){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.replace("/login");
    }
    r.isError = true;
    return r;
  }
};

export const getWithAuth = async (url, headers = {},params={}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      },
      params:{
        ...params
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401||r.status===403){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.replace("/login");
    }
    r.isError = true;
    return r;
  }
};

export const getWithoutAuth = async (url) => {
  try {
    const r = await axios.get(`${BASE_URL}${url}`);
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
}

// export const getWithAuthParams = async (url,params={}) => {
//   try {
//     const r = await axios.get(`${BASE_URL}${url}`,{
//       headers:{
//         ...params
//       }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// }
// export const postWithAuthParams = async (url,params={},data={}) => {
//   try {
//     const r = await axios.post(`${BASE_URL}${url}`,data,{
//       headers:{
//         ...params
//       }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// }

export const deleteWithAuth = async (url,data={}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.delete(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },data:{
        ...data
      }
    });
    return r;
  } catch (err) {
    console.log(err);
    const r = err.response || {};
    if(r.status===401||r.status===403){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.replace("/login");
    }
    r.isError = true;
    return r;
  }
};