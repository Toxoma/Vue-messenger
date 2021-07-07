import API_URL from "../boot/api";
import router from '../router';

const state = {
    chats: [{
            id: 1,
            firstName: 'Dan',
            lastName: 'IsHere',
            msg: 'one',
        },
        {
            id: 2,
            firstName: 'Ads',
            lastName: 'Dsssss',
            msg: 'two',
        },
        {
            id: 3,
            firstName: 'Dsaa',
            lastName: 'Mikel',
            msg: 'three',
        }
    ],
    userInfo:{},
    successRegister: false,
    isLogin: false,
};

const getters = {}

const actions = {
    register({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            API_URL.post("auth/register", data)
                .then((response) => {
                    commit("SET_IS_REGISTER");
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    login({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            API_URL.post("auth/login", data)
                .then((response) => {
                    commit("SET_IS_LOGIN",response.data.user);
                    localStorage.setItem("access_token", response.data.token);
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
      logout({ commit }) {
        return new Promise((resolve, reject) => {
            API_URL.post("auth/logout")
            .then((response) => {
                localStorage.removeItem("access_token");
                commit("SET_IS_LOGOUT");
                router.push('/');
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
      }
}

const mutations = {
    SET_IS_LOGIN: (state, info) => {
        state.isLogin = true;
        state.userInfo = info;
      },
      SET_IS_REGISTER: (state) => {
        state.successRegister = true;
      },
      SET_IS_LOGOUT: (state) => {
        state.isLogin = false;
      },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}