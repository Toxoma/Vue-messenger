<template>
  <div class="popup-wrapp">
    <div class="block d-flex flex-column">
      <div class="row1 d-flex justify-content-between">
        <div class="">Личные данные</div>
        <img src="../assets/foto/mainPage/close.svg" @click="$emit('cancel', !flag)" />
      </div>
      <form id="profile" @submit.prevent="vivod">
        <div class="row2">
          <img class="profile-foto" :srcset="info.avatar" alt="foto"/>
          <img
            class="icon"
            @click="fileFlag = false"
            src="../assets/foto/mainPage/changeFoto.svg"
          />
          <input
            class="file"
            :class="{ 'd-none': fileFlag }"
            data-key="avatar"
            ref="file"
            @change="btnFlag=false;"
            type="file"
          />
        </div>

        <div class="d-flex flex-column">
          <div class="row3 row-input d-flex justify-content-between">
            <div class="inner">
              <input
                class=""
                data-key="name"
                data-valid="name"
                v-model="info.name"
                type="text"
              />
            </div>
            <img src="../assets/foto/mainPage/nameIcon.svg" />
          </div>
          <div class="row4 row-input">
            <div class="inner">
              <input
                class=""
                data-valid="name"
                data-key="surname"
                v-model="info.surname"
                type="text"
              />
            </div>
          </div>

          <div class="row5 row-input d-flex justify-content-between">
            <div class="inner">
              <input
                class=""
                data-key="email"
                data-valid="email"
                v-model="info.email"
                type="email"
              />
            </div>
            <img src="../assets/foto/mainPage/email.svg" alt="" />
          </div>

          <button
            class="btn"
            :disabled="
              info.name === name &&
              info.surname === surname &&
              info.email === email &&
              btnFlag
            "
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import router from '../router';
// import submitForm from "../modules/submitForm";
import Validator from "../modules/validator";
import { mapState,mapActions } from "vuex";

export default {
  data() {
    return {
      info: {},
      newData: {},
      name: "",
      surname: "",
      email: "",
      fileFlag: true,
      btnFlag: true,
      file:'',
      requestFlag: false,
    };
  },
   computed: {
    ...mapState({
      profile: (state) => state.chats.profile,
    }),
  },
  props: {
    flag: Boolean,
  },
  methods: {
...mapActions({
      updateProfile: "chats/updateProfile",
      updateAvatar: "chats/updateAvatar",
    }),

    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },

    vivod: function (e) {
      const inputs = Array.from(e.target.querySelectorAll("input:not([type='file'])"));

      if (!this.btnFlag) {
        this.handleFileUpload();
        this.updateAvatar(this.file)
        .then(()=>{
          this.requestFlag = true;
        })
        .catch((err)=>{
          console.error(err);
        });
      }

      inputs.forEach((element) => {
          if (
            element.dataset.key !== "img" &&
            this[element.dataset.key] !== this.info[element.dataset.key]
          ) {
            this.newData[element.dataset.key] = element.value;
          }
      });

      if (Object.keys(this.newData).length) {
        let arr = {};
        for (const key in this.newData) {
          arr[key] = this.newData[key];
        }
        this.updateProfile(arr)
        .then(()=>{
          this.requestFlag = true;
        })
        .catch((err)=>{
          console.error(err);
        });
      }

      setTimeout(()=>{
        document.querySelector(".row1>img").click();
      },500);
    },
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('profile'));

    this.name = this.info.name;
    this.surname = this.info.surname;
    this.email = this.info.email;

    const valid = new Validator({
      selector: "#profile",
      pattern: {
        // phone: /\d{3}/,
      },
      method: {
        name: [["notEmpty"], ["pattern", "name"]],
        email: [["notEmpty"], ["pattern", "email"]],
      },
    });
    valid.init();
  },
};
</script>

<style scoped>
.block {
  background: #ffffff;
  width: 40%;
  min-width: 370px;
  max-width: 640px;
}
.row1 {
  padding: 16px;
}
.row1 img {
  cursor: pointer;
}
.row2 {
  width: 100%;
  padding: 24px 32px;
  background: rgba(196, 196, 196, 0.4);
  margin-bottom: 24px;
}
.icon {
  padding: 6px;
  border-radius: 15px;
  background: #202020;
  border: 0.5px solid #ffffff;
  position: relative;
  top: 40px;
  left: -30px;
  cursor: pointer;
}
input {
  border: none;
  width: 100%;
  margin-right: 5px;
}
.file {
  margin-top: 20px;
}
.row-input {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.71);
  border-radius: 10px;
  margin: 0 60px;
  padding: 20px 17px;
}
.row4,
.row5 {
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
.inner{
  display: contents;
}
.profile-foto{
  border-radius: 100px;
  width: 150px;
}
</style>
