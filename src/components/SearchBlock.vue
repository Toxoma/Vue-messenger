<template>
  <div class="chat-block" @click="()=>{
      $emit('close');
      event();
    }">
    <div class="col1">
      <img :srcset="info.avatar" alt="foto" />
    </div>
    <div class="user-info">
      <div class="main-info">
        <p class="name">{{info.name}} {{info.surname}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      valueFlag: false,
    };
  },
  computed: {
    ...mapState({
      chats: (state) => state.chats.chats,
    }),
  },
  props: {
    info: Object,
  },
  methods: {
    ...mapActions({
      beginChat: "chats/beginChat",
      getChats: "chats/chats",
    }),
    event(){
      this.beginChat(this.info.user_id)
      .then(()=>{
          this.getChats();
      })
      .catch((err)=>{
        console.error(err);
      });
    }
  },
  mounted() {
   
  },
};
</script>

<style scoped>
.chat-block {
  width: 100%;
  height: 72px;
  display: flex;
}
.chat-block:hover{
  background-color: rgb(215, 240, 247);
  border-radius: 30px;
}

.chat-block .col1 {
  margin: auto;
  margin-right: 10px;
}
.chat-block .col1 img{
      width: 60px;
      border-radius: 20px;
}

.chat-list .user-info {
  border-bottom: 1px solid #000;
  padding-left: 5px;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
}

.main-info .name {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.16px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.87);
}
.phone {
  text-align-last: left;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.16px;
}
</style>
