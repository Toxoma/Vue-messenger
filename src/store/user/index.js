import API_URL from "../../boot/api";

const state = {
  profile: [],
  isLogin: false,
};
const getters = {};
const mutations = {
  SET_PROFILE: (state, payload) => {
    state.profile = payload;
  },
  SET_IS_LOGIN: (state) => {
    state.isLogin = true;
  },
  SET_IS_LOGOUT: () => {
    state.isLogin = false;
  },
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("auth/login", data)
        .then((response) => {
          resolve(response);
          location = "/bugs";
          commit("SET_IS_LOGIN");
          localStorage.setItem("access_token", response.data.token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  profile({ commit }, data) {
    return new Promise((resolve, reject) => {
      API_URL.get("auth/info", data)
        .then((response) => {
          resolve(response);
          commit("SET_PROFILE", response.data.data);
          commit("SET_IS_LOGIN");
          console.log(response.data.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  addBalance(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("user/addBalance", data)
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("access_token");
    commit("SET_IS_LOGOUT");
    location = "/";
  },
  buyCasco(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("insurance", data)
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  buyBridge(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("transfer", data)
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  buyWinterPalace(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("mortgage", data)
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  buyCard(_, data) {
    return new Promise((resolve, reject) => {
      API_URL.post("spbCard", data)
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
  pagination() {
    return new Promise((resolve, reject) => {
      API_URL.get("history")
        .then((response) => {
          resolve(response);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
