import API_URL from "../boot/api";
import router from '../router';

const state = {
    chats: [],
    selectedChat: [],
    profile: [],
    searchUsers: [],
    successRegister: false,
    isLogin: false,
};

const getters = {};

const actions = {
    register({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            API_URL.post("auth/register", data)
                .then((response) => {
                    commit("SET_IS_REGISTER");
                    router.push('/congratulation');
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
                  console.log(response.data);
                    commit("SET_IS_LOGIN");
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
      },
      searchUsers({ commit }, data) {
        return new Promise((resolve, reject) => {
            API_URL.post("/search",data)
            .then((response) => {
                commit("SET_SEARCHUSERS",response.data.data);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
      },
      profile({ commit }) {
        return new Promise((resolve, reject) => {
          API_URL.get("/info")
            .then((response) => {
              resolve(response);
              commit("SET_PROFILE", response.data.data);
              commit("SET_IS_LOGIN");
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      chats({ commit }) {
        return new Promise((resolve, reject) => {
          API_URL.get("/chats")
            .then((response) => {
              resolve(response);
              commit("SET_CHATS", response.data.data);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      getChatMsgs({commit},data) {
        return new Promise((resolve, reject) => {
          API_URL.get(`/chat/${data}`)
            .then((response) => {
              resolve(response);
              commit('SET_SELECTEDCHAT',response.data.data);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      sendMessage(_,data) {
        return new Promise((resolve, reject) => {
          API_URL.post(`/chat/${data.id}/send`,data.msg)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      updateProfile({commit},data) {
        return new Promise((resolve, reject) => {
          API_URL.put("/info",data)
            .then((response) => {
              commit("SET_PROFILE", response.data.data);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      updateAvatar({commit},data) {
        let formData = new FormData();
        formData.append('avatar',data)
        console.log(formData);
        return new Promise((resolve, reject) => {
          API_URL.post("/avatar",formData)
            .then((response) => {
              commit("SET_PROFILE", response.data.data);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
      beginChat(_,data) {
        return new Promise((resolve, reject) => {
          API_URL.post(`/chat/${data}/start`)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
              console.log(error);
            });
        });
      },
}

const mutations = {
    SET_IS_LOGIN: (state) => {
        state.isLogin = true;
      },
      SET_IS_REGISTER: (state) => {
        state.successRegister = true;
      },
      SET_IS_LOGOUT: (state) => {
        state.isLogin = false;
      },
      SET_PROFILE: (state, payload) => {
        localStorage.setItem("profile", JSON.stringify(payload));
        state.profile = payload;
      },
      SET_CHATS: (state, payload) => {
        state.chats = payload;
      },
      SET_SEARCHUSERS: (state, payload) => {
        state.searchUsers = payload;
      },
      SET_SELECTEDCHAT: (state, payload) => {
        state.selectedChat = payload;
      },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}