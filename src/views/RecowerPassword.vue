<template>
  <div class="recower-wrapp">
    <div v-if="flag">
      <div class="recower-text">
        Для восстановления пароля введите указанный<br />при регистрации адрес
        электронной почты
      </div>
      <form @submit.prevent="submit" id="recowerForm">
        <div class="recower-email-block">
          <input
            class="input recower-email"
            data-key="email"
            data-valid="email"
            type="email"
            v-model="info.email"
            placeholder="E-mail"
          />
        </div>
        <button
          class="recower-continue d-flex align-items-center"
          :class="{ 'disable-block': errCount.size !== 0 }"
          :disabled="errCount.size !== 0"
          type="submit"
        >
          <p>ДАЛЕЕ</p>
          <img
            class="recover-img"
            src="../assets/foto/registration/arrow_back.svg"
          />
        </button>
      </form>
    </div>

    <div v-else>
      <div class="recower-text">
        Письмо успешно отправлено!<br />На вашу электронную почту был
        отправлено<br />письмо с инструкцией по сбросу пароля
      </div>
      <div class="recower-foto-block">
        <img class="recower-foto" src="../assets/foto/auth/authFoto.svg" />
      </div>
      <router-link class="rlink" to="login">
        <button class="recower-back">вернуться к входу</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import submitForm from "../modules/submitForm";
import Validator from "../modules/validator";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      info: {
        email: "",
      },
      flag: true,
      errCount: new Set(),
      userData: {},
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      forgotPassword: "chats/forgotPassword",
    }),

    //извлечение данных из формы
    submit: function (e) {
      setTimeout(() => {
        const data = submitForm(e, this);
        this.forgotPassword(data)
          .then(()=>{
              this.flag = false
          })
          .catch((err) => {
            console.error(err);
          });
      }, 500);
    },
  },
  mounted() {
    const valid = new Validator({
      selector: "#recowerForm",
      pattern: {
        // phone: /\d{3}/,
      },
      method: {
        email: [["notEmpty"], ["pattern", "email"]],
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

.recower-wrapp {
  width: 420px;
  height: 230px;
  margin: auto;
}

.recower-text {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 40px;
}

.recower-email {
  width: 360px;
  height: 55px;
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.71);
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 15px;
}

.recower-continue {
  width: 360px;
  height: 55px;
  background: #ffffff;
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0;
}

.recover-img {
  margin-left: 5px;
}

.recower-foto-block {
  margin: 40px 0;
}

.recower-foto {
  width: 150px;
  height: 150px;
}

.recower-back {
  width: 360px;
  height: 55px;
  background: #000000;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  margin: auto;
  padding: 0;
  color: #ffffff;
}

.disable-block {
  opacity: 0.5;
}
</style>
