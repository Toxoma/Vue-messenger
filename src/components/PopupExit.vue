<template>
  <div class="popup-wrapp">
    <div class="block">
      <div class="text">Вы действительно хотите выйти?</div>
      <div class="btns d-flex justify-content-end">
        <p
          class="popup-btn cancel"
          @click="$emit('cancel', !flag)"
          :class="{ focused1: focus1 }"
          @mouseover="focus1 = true"
          @mouseleave="focus1 = false"
        >
          ОТМЕНА
        </p>
        <p
          class="popup-btn exit"
          :class="{ focused2: focus2 }"
          @mouseover="focus2 = true"
          @mouseleave="focus2 = false"
          @click="logout"
        >
          ВЫЙТИ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      focus1: false,
      focus2: false,
    };
  },
  props: {
    flag: Boolean,
  },
  methods: {
    ...mapActions({
      logout: "chats/logout",
    }),
  },
  mounted() {},
};
</script>

<style scoped>
.block {
  background: #ffffff;
  padding: 30px 24px 24px 24px;
  height: 128px;
}

.text {
  font-family: "Segoe UI", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 29px;
}
.btns p {
  font-family: "Segoe UI", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  cursor: pointer;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cancel {
  color: #169fe6;
}
.exit {
  color: #e26f65;
}
.focused1 {
  background: rgba(80, 152, 199, 0.3);
}
.focused2 {
  background: rgba(215, 135, 128, 0.3);
}
</style>
