<template>
  <div class="chat-block" @click=" $emit('selected', info)">
    <div class="col1">
      <img :srcset="info.chat_user.avatar" alt="foto" />
        <!-- <img v-show="info.state" class="user-state" src="../assets/foto/mainPage/state.svg" alt=""> -->
    </div>
    <div class="user-info">
      <div class="main-info">
        <p class="name">
          {{ name }} {{ surname }}
        </p>
        <p class="msg">{{ msg }}</p>
      </div>
      <div class="dop-info">
        <div class="time">22:12</div>
        <div class="msg-state-unread">
          {{ count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data() {
    return {
      name:'',
      surname:'',
      msg:'',
      count:'',
    };
  },
  props: {
    info: Object,
  },
  methods: {
    load(){
      this.name = this.info.chat_user.name;
      this.surname = this.info.chat_user.surname;
      if (this.info.last_message) {
        this.msg = this.info.last_message.message;
      }
      this.count = this.info.unread_counter;
    }
  },
  mounted() {
    this.load();
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
  background-color: rgb(147, 211, 236);
}
.chat-block .col1 {
  margin: auto;
}
.chat-block .col1 img{
  width: 50px;
}

.user-state {
  position: relative;
  top: 20px;
  left: -15px;
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

.main-info .msg {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.16px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.87);
}

.dop-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
}
.msg{
  max-height: 25px;
overflow: hidden;
}
.msg-state-unread {
  display: flex;
  justify-content: center;
  background: #9e9e9e;
  border-radius: 20px;
  width: 24px;
  height: 24px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.16px;
  color: #ffffff;
}
</style>
