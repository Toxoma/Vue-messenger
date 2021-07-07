<template>
  <div class="chat-block">
                <div class="col1">
                    <img src="../assets/foto/mainPage/Ellipse.svg" alt="">
                    <img v-show="info.state" class="user-state" src="../assets/foto/mainPage/state.svg" alt="">
                </div>
                <div class="user-info">
                    <div class="main-info">
                        <p class="name">{{info.firstName}} {{info.lastName}}</p>
                        <p class="msg">{{info.msg}}</p>
                    </div>
                    <div class="dop-info">
                        <div class="time">
                            22:12
                        </div>
                        <div class="msg-state-unread">
                            5
                        </div>
                    </div>
                </div>

            </div>
</template>

<script>
export default {
  name: 'ChatBlock',
  props: {
    info: Object
  }
}
</script>

<style scoped>

.chat-block {
    width: 100%;
    height: 72px;
    display: flex;
}

.chat-block .col1 {
    margin: auto;
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
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.16px;
    font-feature-settings: 'pnum'on, 'lnum'on;
    color: rgba(0, 0, 0, 0.87);
}

.main-info .msg {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.16px;
    font-feature-settings: 'pnum'on, 'lnum'on;
    color: rgba(0, 0, 0, 0.87);
}

.dop-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8px;
}


.msg-state-unread {
    display: flex;
    justify-content: center;
    background: #9E9E9E;
    border-radius: 20px;
    width: 24px;
    height: 24px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.16px;
    color: #FFFFFF;
}
</style>
