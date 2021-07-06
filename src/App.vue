<template>
<div id="nav">
    <!-- 
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
     -->
</div>
<router-view />
</template>

<style>
html,
body,
#app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 98%;
    text-align: center;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input.success {
    border: 4px solid green;
}

input.error {
    border: 4px solid red;
}

.password-text {
    font-size: 12px;
    text-align: left;
    margin-left: 10px;
}
#changePassword .password-text{
    margin-left: 60px;
}
</style>
