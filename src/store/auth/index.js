import API_URL from "../../boot/api";

const state = {};
const getters = {};
const mutations = {};
const actions = {
  register(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("auth/register", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  forgotPassword(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("password/forgot", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  newPassword(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("password/reset", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  checkAvailable(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.get("check", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  externalAuth(_, data){
    return new Promise((resolve, reject) => {
      API_URL.post("external", data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
