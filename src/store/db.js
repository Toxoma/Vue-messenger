import axios from "axios";

const state = {
    chats: [],
}
const url = 'https://jsonplaceholder.typicode.com/users';

const getters = {}

const actions = {
    postRegUserInfo(data) {     
        axios.post(url, data)
            .then(response => {
                console.log('Ответ сервера успешно получен!');
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    postAuthUserInfo(data) {       
        axios.post(url, data)
            .then(response => {
                console.log('Ответ сервера успешно получен!');
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    loadChats({
        commit
    },data) {
        return new Promise((resolve, reject) => {
            axios
                .get(url,data)
                .then(response => {
                    commit("SET_CHATS", response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    },
}

const mutations = {
    SET_CHATS(state, payload) {
        state.chats = payload;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}