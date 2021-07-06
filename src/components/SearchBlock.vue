<template>
  <div v-for="i in [1,2]" :key="i" class="chat-block">
                <div class="col1">
                    <img src="../assets/foto/mainPage/Ellipse.svg" alt="">
                </div>
                <div class="user-info">
                    <div class="main-info">
                        <p class="name">Иван Иванов</p>
                        <p class="phone">{{phone}}</p>
                    </div>
                </div>
            </div>
</template>

<script>
export default {

  props: {
    phone: String
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
    margin-right: 10px;
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
.phone{
    text-align-last: left;
    font-family: 'Roboto',sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.16px;
}

</style>
