import axios from 'axios'
import { Base64 } from 'js-base64';
import { AuthAPI } from '../views/Auth/api/AuthAPI';
import Cookies from "js-cookie"
import { TOKEN } from './constants';
import { API_URL } from '../config/api'

export const postWithoutAuth = async (url, data = {}) => {
  try {
    const r = await axios.post(`${API_URL}${url}`, data);
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.reload()
    }
    r.isError = true;
    return r;
  }
};

export const postWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.post(`${API_URL}${url}`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.reload()
    }
    r.isError = true;
    return r;
  }
};

export const putWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.put(`${API_URL}${url}`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.reload()
    }
    r.isError = true;
    return r;
  }
};

export const getWithAuth = async (url, params = {}) => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.get(`${API_URL}${url}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        ...params,
      },
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.reload()
    }
    r.isError = true;
    return r;
  }
};

export const deleteWithAuth = async url => {
  try {
    const token = Base64.decode(AuthAPI.getToken());
    const r = await axios.delete(`${API_URL}${url}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return r;
  } catch (err) {
    const r = err.response || {};
    if(r.status===401){
      //todo expired token
      Cookies.remove(TOKEN);
      window.location.reload()
    }
    r.isError = true;
    return r;
  }
};