import {
  createApp
} from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";
import router from '../router';

createApp({}).use(VueAxios, axios);

export const BASE_URL = "https://test.agrides.ru/";
// export const BASE_URL = "https://bughunt.gesekhub.ru/";

export const API_URL = BASE_URL + "api/";

const API = axios.create({
  withCredentials: false,
  baseURL: API_URL
});
API.defaults.headers.common["Accept"] = "application/json";
API.defaults.headers.common["Content-Type"] = "application/json";
/*
if (localStorage.getItem("access_token")) {
  API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
}*/

API.interceptors.request.use(
  config => {
    if (localStorage.getItem("access_token")) {
      config.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.config.url !== 'auth/login' && error.response.status === 401) {
      router.push('/login');
      return Promise.reject(error.response);
    }

    if (error.response.status === 403) {
      if (error.response.data.message && 
        error.response.data.message === 'Your email address is not verified.') {
          console.log('Почта не подтверждена!');
          return Promise.reject(error.response);
      }
      console.log('1');
      return Promise.reject(error.response);
    }
    console.log('2');
    return Promise.reject(error.response);
  }
);


export default API;