<template>
<div class="welcome">
    <div class="">
        <img class="preview-foto" src="../assets/foto/welcome/preview.png">
    </div>

    <div class="welcome-main-text">
        <p>TypeChat Desktop</p>
    </div>
    <div class="welcome-text">
        <p>Добро пожаловать в TypeChat.<br>
            Быстрый и безопасный обмен сообщениями </p>
    </div>

    <router-link class='welcome-rlink' to="/autorize">
        <button class="welcome-btn">
            НАЧАТЬ ОБЩЕНИЕ
        </button>
    </router-link>

</div>
</template>

<script>
    
</script>

<style>
p {
    margin: 0;
}

.welcome {
    max-width: 400px;
}

.welcome-main-text {
    font-family: 'Montserrat',sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 30px;
    margin: auto;
    color: #000000;
    margin-top: 20px;
}

.welcome-text {
    font-family: 'Montserrat',sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 39px;
}

.preview-foto {
    max-width: 400px;
}

.welcome-rlink {
    background: #000000;
    border-radius: 5px;
    text-decoration-line: none;
}

.welcome-btn {

    width: 360px;
    height: 55px;
    font-family: 'Montserrat',sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    margin: auto;
    text-transform: uppercase;
    background: #000000;
    border-radius: 5px;
    color: #FFFFFF;
}

.welcome-btn:hover {
    cursor: pointer;
}
</style>
