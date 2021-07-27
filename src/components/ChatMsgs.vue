<template>
  
    <div class="chat-row" :class="{mine: info.user_id===profile.user_id,friend:info.user_id!==profile.user_id}">
      <div class="chat-block">
        <pre class="text">{{info.message}}</pre>
        <!-- <div class="time">22:10</div> -->
      </div>
    </div>
  
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      profile: (state) => state.chats.profile,
    }),
  },
  components: {},
  props: {
    info: Object,
  },
  methods: {
    ...mapActions({
      searchUsers: "chats/searchUsers",
    }),
    start() {
      // const
    },
  },
  mounted() {
    console.log(this.info);
    this.start();
  },
};
</script>


<style scoped>

.chat-row {
display: inline-flex;
padding: 0 10px;
}
.mine {
  
align-self: start;
}
.friend{
align-self: end;
}
.chat-block {
  background-color: #fff;
  width: auto;
  padding: 0;
  margin: auto;
  margin-top: 4px;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.32px;
  font-feature-settings: "pnum" on, "lnum" on;
  border-radius: 5px;
}
.chat-block .text{
  padding: 8px;
  word-break: break-all;
  width: 100%;
  text-align: left;
}
.time {
  padding: 0 6px 4px 0;
  margin-left: 17px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.32px;
  font-feature-settings: "pnum" on, "lnum" on;
  align-self: flex-end;
}
pre{
  margin: 0;
}
</style>
