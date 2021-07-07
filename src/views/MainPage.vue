<template>
  <div class="main-wrapp row">
    <div class="burger-menu hide col-4">
      <section class="user-info d-flex align-items-center">
        <div class="col1">
          <img src="../assets/foto/mainPage/Ellipse.svg" alt="" />
        </div>
        <div class="col2">
          <p class="name">Иван Иванов</p>
          <p class="msg">+7 922 654 98 71</p>
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
      v-on:cancel="popupUserSearchFlag = $event"
      :flag="popupUserSearchFlag"
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
          :key="chat.id"
          :info="chat"
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
      <div v-else class="chat"></div>
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

import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      info: {
        state: true,
      },
      flagSelectChat: true,
      flagChatHas: true,
      popupExitFlag: false,
      popupChangeFlag: false,
      popupDataFlag: false,
      popupUserSearchFlag: false,
      burgerMenu: "",
      chatsArr: [],
    };
  },
  components: {
    ChatBlock,
    PopupExit,
    PopupChange,
    PopupUser,
    PopupUserSearch,
  },
  computed: {
    ...mapState({
      chats: (state) => state.chats.chats,
      isLogin: (state) => state.chats.isLogin,
    }),
  },
  methods: {
    ...mapActions({
      postAuthUserInfo: "chats/postAuthUserInfo",
      loadChats: "chats/loadChats",
    }),
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
        this.chatsArr = this.chats;
        return;
      }

      const arr = [];
      const str = new RegExp(value, "i");

      this.chats.forEach((item) => {
        const fullName = item.firstName + " " + item.lastName;
        if (str.test(fullName)) {
          arr.push(item);
        }
      });
      this.chatsArr = arr;
    },
  },
  mounted() {
    this.chatsArr = this.chats;

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
  height: 100%;
}
</style>
