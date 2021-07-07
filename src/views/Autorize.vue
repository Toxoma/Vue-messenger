<template>
  <div class="auth-wrapp d-flex">
    <div class="auth-foto-block">
      <img class="auth-foto" src="../assets/foto/auth/authFoto.svg" />
    </div>
    <form class="auth-form" @submit.prevent="submit">
      <div class="auth-tel auth-input-block">
        <input
          class="input"
          data-key="phone"
          @input="validator, phoneMake"
          data-valid="phone"
          type="tel"
          v-model="info.phone"
          placeholder="+7__________"
        />
      </div>

      <div class="auth-password auth-input-block">
        <input
          class="input"
          data-key="password"
          type="password"
          data-valid="password"
          v-model="info.password"
          placeholder="Пароль"
        />
      </div>

      <div class="auth-forget-block text-end">
        <router-link class="rlink" to="recower"> Забыли пароль? </router-link>
      </div>

      <button
        class="auth-enter-btn"
        :class="{
          'disable-block': errCount.size !== 0,
          'white-text': errCount.size === 0,
        }"
        type="submit"
        :disabled="errCount.size !== 0"
      >
        ВОЙТИ
      </button>

      <router-link class="rlink" to="/register">
        <div class="auth-reg-block d-flex justify-content-center">
          <p name="reg" class="auth-reglink">Нет аккаунта?</p>
          <label class="fw-bold" for="reg">Зарегестрируйтесь</label>
        </div>
      </router-link>
    </form>
  </div>
</template>

<script>
// import router from "../router";
// import inputValid from "../modules/inputValid";
import submitForm from "../modules/submitForm";
import Validator from "../modules/validator";

import { mapState, mapActions } from "vuex";
import router from '../router';

export default {
  data: () => ({
    info: {
      phone: "",
      password: "",
    },
    x: 123,
    userData: {},
    errCount: new Set(),
  }),

  computed: {
    ...mapState({
      chats: (state) => state.chats.chats,
      isLogin: (state) => state.chats.isLogin,
    }),
  },
  methods: {
    ...mapActions({
      login: "chats/login",
    }),
    //извлечение данных из формы
    submit: function (e) {
      setTimeout(() => {
        const data = submitForm(e, this);
        this.login(data)
        .then(()=>{
            if (this.isLogin) {
                router.push('/mainPage')
            }
        })
        .catch((err)=>{
            console.error(err);
        });
      }, 500);
    },
  },
  mounted() {
      if (localStorage.getItem('access_token')) {
        router.push('/mainPage');
      }

    const valid = new Validator({
      selector: ".auth-form",
      pattern: {
        // phone: /\d{3}/,
      },
      method: {
        phone: [["notEmpty"], ["pattern", "phone"]],
        password: [["notEmpty"], ["pattern", "password"]],
      },
    });
    valid.init();
  },
};
</script>

<style>
.rlink {
  text-decoration-line: none;
  color: #000000;
}

.rlink:hover {
  cursor: pointer;
  color: rgb(33, 112, 230);
}

.auth-wrapp {
  height: 100%;
  width: 360px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.auth-foto-block {
  margin-bottom: 40px;
}

.auth-foto {
  width: 120px;
  height: 120px;
}

.auth-tel {
  margin-bottom: 40px;
}

.auth-password {
  margin-bottom: 10px;
}

.input {
  min-width: 312px;
  width: 40%;
  padding: 14px 15px;
  display: inline-block;
  letter-spacing: 2px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.42);
  opacity: 0.54;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.71);
  box-sizing: border-box;
  border-radius: 10px;
}

.auth-forget-block {
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.62px;
  font-feature-settings: "pnum" on, "lnum" on;
}

.auth-enter-btn {
  width: 360px;
  height: 55px;
  border: none;
  padding: 0;

  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  background: #000000;
  border-radius: 5px;
}

.auth-enter-btn .enter {
  color: #ffffff;
}

.auth-link {
  text-decoration: none;
  color: #ffffff;
}

.recower-password {
  cursor: pointer;
  text-decoration: none;
  color: #000000;
}

.recower-password:hover {
  color: #000000;
}

.auth-reg-block {
  margin-top: 40px;
}

.auth-reglink {
  margin-right: 5px;
}

.white-text {
  color: #ffffff;
}

.disable-block {
  opacity: 0.5;
}

.auth-input-block .input {
  width: 100%;
}
</style>
