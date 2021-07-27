<template>
  <div class="main-wrapp row">
    <div class="burger-menu hide col-4">
      <section class="user-info d-flex align-items-center">
        <div class="profile-avatar">
          <img :srcset="profile.avatar" alt="foto" />
        </div>
        <div class="col2">
          <p class="name">{{ profile.name }} {{ profile.surname }}</p>
          <p class="msg">{{profile.phone}}</p>
        </div>
      </section>
      <section
        class="menu-item d-flex align-items-center"
        @click="popupDataFlag = true"
      >
        <div class="icon">
          <img src="../assets/foto/mainPage/personalData.svg" alt="" />
        </div>
        <p class="text">Личные данные</p>
      </section>
      <section
        class="menu-item d-flex align-items-center"
        @click="popupChangeFlag = true"
      >
        <div class="icon">
          <img src="../assets/foto/mainPage/password.svg" alt="" />
        </div>
        <p class="text">Пароль</p>
      </section>
      <section class="menu-item d-flex align-items-center">
        <div class="icon">
          <img src="../assets/foto/mainPage/progInfo.svg" alt="" />
        </div>
        <p class="text">О приложении</p>
      </section>
      <section class="menu-item d-flex align-items-center">
        <div class="icon">
          <img src="../assets/foto/mainPage/help.svg" alt="" />
        </div>
        <p class="text">Помощь</p>
      </section>
      <section
        class="menu-item d-flex align-items-center"
        @click="popupExitFlag = true"
      >
        <div class="icon">
          <img src="../assets/foto/mainPage/exit.svg" alt="" />
        </div>
        <p class="text">Выход</p>
      </section>
    </div>
    <PopupExit
      v-if="popupExitFlag"
      v-on:cancel="popupExitFlag = $event"
      :flag="popupExitFlag"
    ></PopupExit>
    <PopupChange
      v-if="popupChangeFlag"
      v-on:cancel="popupChangeFlag = $event"
      :flag="popupChangeFlag"
    ></PopupChange>
    <PopupUser
      v-if="popupDataFlag"
      v-on:cancel="popupDataFlag = $event"
      :flag="popupDataFlag"
    ></PopupUser>
    <PopupUserSearch
      v-if="popupUserSearchFlag"
      :flag="popupUserSearchFlag"
      v-on:cancel="
        () => {
          popupUserSearchFlag = $event;
          reloadChats();
        }
      "
    ></PopupUserSearch>
    <div class="left col-4">
      <header class="header">
        <div class="row1 d-flex justify-content-between">
          <div class="burger-icon" @click="toggleBurger(burgerMenu)">
            <img
              src="../assets/foto/mainPage/Hamburger.svg"
              alt=""
              class="icon"
            />
          </div>
          <div class="header-text">Чаты</div>
          <div class="header-icon" @click="popupUserSearchFlag = true">
            <img
              src="../assets/foto/mainPage/header-icon.svg"
              alt=""
              class="icon"
            />
          </div>
        </div>
        <div class="row2">
          <div class="search d-flex">
            <div class="col1">
              <img src="../assets/foto/mainPage/Search.svg" alt="" />
            </div>
            <div class="col2">
              <input class="search-chat" type="text" placeholder="Поиск" />
            </div>
          </div>
        </div>
      </header>

      <section v-if="flagChatHas" class="chat-list">
        <ChatBlock
          v-for="chat in chatsArr"
          :key="chat.chat_id"
          :info="chat"
          v-on:selected="selectedChat($event)"
        ></ChatBlock>
      </section>
      <section v-else class="chat-list-none">
        <div class="text">Чатов пока нет</div>
      </section>
    </div>
    <div class="right col-8">
      <img
        v-if="flagSelectChat"
        class="chat-icon"
        src="../assets/foto/mainPage/icon.svg"
        alt=""
      />
      <div v-else class="chat">
        <div class="chat-header">
          <p>
            {{ selectedChatInfo.chat_user.surname }}
            {{ selectedChatInfo.chat_user.name }}
          </p>
        </div>
        <div class="chat-wrapp">
        <ChatMsgs v-for="oneMsg in array" :key="oneMsg.message_id" :info="oneMsg"></ChatMsgs>
         </div>
        <div class="type-block d-flex align-items-center">
          <div class="">
            <img
              class="type-block__insert"
              src="../assets/foto/mainPage/msg/attach_file.svg"
            />
          </div>
          <textarea
          spellcheck="false"
            class="type-block__input"
            type="text"
            placeholder="Сообщение"
            v-model="message"
            rows="2"
          />
          <div class="d-flex">
            <img
              class="type-block__smile"
              src="../assets/foto/mainPage/msg/sentiment_satisfied.svg"
            />
            <img
              class="type-block__send"
              @click="msgValid"
              src="../assets/foto/mainPage/msg/send.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from "../router";
import ChatBlock from "../components/ChatBlock.vue";
import PopupExit from "../components/PopupExit.vue";
import PopupChange from "../components/PopupChangePassword.vue";
import PopupUser from "../components/PopupUserData.vue";
import PopupUserSearch from "../components/PopupUserSearch.vue";
import ChatMsgs from "../components/ChatMsgs.vue";

import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      flagSelectChat: true,
      flagChatHas: false,
      popupExitFlag: false,
      popupChangeFlag: false,
      popupDataFlag: false,
      popupUserSearchFlag: false,
      burgerMenu: "",
      chatsArr: [],
      message: "",
      array:[],
    };
  },
  components: {
    ChatBlock,
    PopupExit,
    PopupChange,
    PopupUser,
    PopupUserSearch,
    ChatMsgs,
  },
  computed: {
    ...mapState({
      chats: (state) => state.chats.chats,
      profile: (state) => state.chats.profile,
      selectedChatInfo: (state) => state.chats.selectedChat,
      arrayMsgs: (state) => state.chats.arrayMsgs,
    }),
  },
  methods: {
    ...mapActions({
      getProfile: "chats/profile",
      getChats: "chats/chats",
      getChatMsgs: "chats/getChatMsgs",
      sendMessage: "chats/sendMessage",
    }),
    msgValid() {
      if (this.message.trim()!=='') {
        this.sendMessage(
        {
          id: this.selectedChatInfo.chat_id,
          msg: {message: this.message},
        })
        .then(()=>{
          this.message = '';
        });
      }
    },
    selectedChat(data) {
      this.getChatMsgs(data.chat_id).then(() => {
        this.array = this.selectedChatInfo.messages;
        this.array.reverse();
        this.flagSelectChat = false;
      });
    },

    reloadChats() {
      this.getChats().then((response) => {
        this.chatsArr = response.data.data;
        this.flagChatHas = true;
      });
    },

    toggleBurger: (burgerMenu) => {
      burgerMenu.classList.toggle("hide");

      setTimeout(() => {
        const body = document.querySelector("body");

        const burgerListener = (e) => {
          const target = e.target;

          if (!target.closest(".burger-menu") || target.matches(".menu-item")) {
            body.removeEventListener("click", burgerListener);
            burgerMenu.classList.toggle("hide");
          }
        };

        body.addEventListener("click", burgerListener);
      }, 200);
    },

    sortirovka: function (value) {
      if (!value) {
        console.log(this.chats);
        this.chatsArr = this.chats;
        return;
      }

      const arr = [];
      const str = new RegExp(value, "i");

      this.chats.forEach((item) => {
        const fullName = item.chat_user.name + " " + item.chat_user.surname;
        if (str.test(fullName)) {
          arr.push(item);
        }
      });
      this.chatsArr = arr;
    },

    start() {
      this.getProfile()
        .then(() => {
          this.reloadChats();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.start();

    this.burgerMenu = document.querySelector(".burger-menu");
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.classList.add("active");
      });
      item.addEventListener("mouseout", () => {
        item.classList.remove("active");
      });
      item.addEventListener("click", () => {
        document.querySelector("body").click();
      });
    });

    const searchChat = document.querySelector(".search-chat");
    searchChat.addEventListener("input", (e) =>
      this.sortirovka(e.target.value)
    );
  },
};
</script>

<style scoped>
.main-wrapp {
  width: 100%;
  height: 100%;
  /* min-width: 710px; */
}

.left,
.right {
  padding: 0;
}

.right {
  display: flex;
}

.chat-icon {
  margin: auto;
}

.row1 {
  align-items: center;
  height: 48px;
}

.burger-icon {
  margin-left: 22px;
  cursor: pointer;
}

.header {
  background: #efefef;
  height: 104px;
}

.header-text {
  font-family: "Segoe UI", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}

.header-icon {
  margin-right: 22px;
  cursor: pointer;
}

.row2 {
  margin-bottom: 16px;
}

.search {
  margin: 0 16px;
  background: #ffffff;
  box-shadow: 0px 1.5px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  height: 40px;
  align-items: center;
}

.search .col1 {
  margin: 0 17px;
}

.search .col2 input {
  border: none;
  font-family: "Segoe UI", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #323130;
  width: 100%;
}

.chat-list-none {
  background: #c9c9c9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-list-none text {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}

.chat-list {
  /* background: #E5E5E5; */
  text-align: left;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
}

.burger-menu {
  position: absolute;
  background: #e7e7e7;
  padding: 0;
  height: 100%;
  z-index: 1;
  transition: 1s;
  min-width: 230px;
}

.hide {
  transform: translateX(-100%);
}

.burger-menu .user-info {
  padding: 16px 0 16px 16px;
  background: #b4b4b4;
}

.burger-menu .col1 {
  margin-right: 8px;

}
.profile-avatar img{
  width: 60px; 
  margin-right: 10px;
}

.burger-menu .col2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Segoe UI", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #000000;
}

.burger-menu .col2 .name {
  font-size: 16px;
  line-height: 21px;
}

.burger-menu .col2 .msg {
  font-size: 14px;
  line-height: 19px;
}

.menu-item {
  padding: 14px 0;
}

.menu-item .icon {
  width: 48px;
}

.menu-item .text {
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  color: #000000;
}

.burger-menu .active {
  background: #c4c4c4;
}

.popup-wrapp {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  height: auto;
}
.popup-wrapp .block {
}
.chat {
  border-left: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-image: url("../assets/foto/wall.png");
}
.chat-header {
  height: 48px;
  padding-top: 8px;
  padding-left: 16px;
  text-align-last: left;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.16px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #212121;
  background-color: #fff;
}
.type-block {
  /* height: 46px; */
  width: 100%;
  background-color: #fff;
}
.type-block__insert {
  padding: 0 15px;
}

.type-block__input {
  height: 100%;
  width: 100%;
  min-height: 35px;
  max-height: 220px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #000;
}

.type-block__smile {
  padding: 0 15px;
}
.type-block__send {
  padding-right: 15px;
}
.chat-wrapp {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
