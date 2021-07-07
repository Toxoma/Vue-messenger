<template>
  <div class="popup-wrapp__password">
    <div class="d-flex flex-column">
      <div class="row2">
        <p>Новый пароль</p>
        <p>Придумайте сложный пароль</p>
      </div>
      <form
        id="newPassword"
        class="d-flex flex-column"
        @submit.prevent="sendNewPassword"
      >
        <input
          class="first-inp"
          data-key="password"
          data-valid="password"
          v-model="info.password"
          type="password"
          placeholder="Введите пароль"
        />

        <input
          class="second-inp"
          data-key="passwordConfirm"
          data-valid="password_confirmation"
          v-model="info.passwordConfirm"
          :disabled="passwordFlag"
          type="password"
          placeholder="Повторите пароль"
        />

        <button
          class="btn"
          :class="{ 'disable-block': errCount.size !== 0 }"
          :disabled="errCount.size !== 0"
          type="submit"
        >
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Validator from "../modules/validator";

export default {
  data() {
    return {
      info: {
        password: "",
        passwordConfirm: "",
        token: "",
        email: "",
      },
      errCount: new Set(),
      passwordFlag: true,
    };
  },
  methods: {
    ...mapActions({
      newPassword: "chats/newPassword",
    }),

    // submit: function (e) {
    //   setTimeout(() => {
    //     const data = submitForm(e, this);
    //     this.newPassword(data);
    //   }, 500);
    // },

    sendNewPassword() {
      this.newPassword({
        token: this.info.token,
        email: this.info.email,
        password: this.info.password,
        password_confirmation: this.info.passwordConfirm,
      }).then(() => {
        console.log("Пароль сменен");
        this.$router.push("/login");
      });
    },

    inputValid: (data) => {
      const inputsPassword = document.querySelector(".first-inp");
      inputsPassword.addEventListener("change", () => {
        if (data.info.password !== "") {
          data.passwordFlag = false;
        } else {
          data.passwordFlag = true;
          data.info.passwordConfirm = "";
        }
      });
    },
  },
  mounted() {
    this.info.token = this.$route.query.token;
    this.info.email = this.$route.query.email;

    this.inputValid(this);

    const valid = new Validator({
      selector: "#newPassword",
      pattern: {},
      method: {
        password: [["notEmpty"], ["pattern", "password"]],
      },
    });
    valid.init();
  },
};
</script>

<style scoped>
.popup-wrapp__password {
  min-width: 400px;
  width: 30%;
}
.row2 {
  width: 100%;
  padding: 24px 32px;
  background: rgba(196, 196, 196, 0.4);
}

input {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.71);
  box-sizing: border-box;
  border-radius: 10px;
  margin: 0 60px;
  padding: 20px 17px;
}
.first-inp {
  margin-top: 24px;
}
.second-inp {
  margin-top: 16px;
}
.btn {
  margin: 0 60px;
  padding: 20px 17px;
  border-radius: 5px;
  margin-bottom: 56px;
  margin-top: 24px;

  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  color: #ffffff;
  background: #000000;
}
input.success {
  border: 4px solid green;
}
input.error {
  border: 4px solid red;
}
</style>
