<template>
<div class="popup-wrapp">
    <div class="block d-flex flex-column">
        <div class="row1 d-flex justify-content-between">
            <div class="">Изменение пароля</div>
            <img src="../assets/foto/mainPage/close.svg" @click="$emit('cancel', !flag)">
        </div>
        <div class="row2">
            <p>Новый пароль</p>
            <p>Придумайте сложный пароль</p>
        </div>
        <form id="changePassword" class="d-flex flex-column"  @submit.prevent="submit">

        <input class="first-inp" data-key="password" data-valid="password" v-model="info.password" type="password" placeholder="Введите пароль">

        <input class="second-inp" data-key="passwordConfirm" data-valid="password" v-model="info.passwordConfirm"
        :disabled="passwordFlag" 
        type="password" placeholder="Повторите пароль">

        <button class="btn" :class="{'disable-block':errCount.size!==0}" :disabled="errCount.size!==0" type="submit">Сохранить</button>
        </form>
        
    </div>
</div>
</template>

<script>
import submitForm from "../modules/submitForm";
import Validator from "../modules/validator";

export default {
    data() {
        return {
             info: {
                password: "",
                passwordConfirm: "",
            },
            userData: {},
            errCount: new Set(),
            passwordFlag: true,
            
        }; 
    },
    props: {
        flag: Boolean
    },
     methods: {
       submit: function (e) {
            setTimeout(() => {
                if (submitForm(e, this)) {
                    document.querySelector('.row1 > img').click();
                }
                
            }, 500);
        },

        inputValid: data => {
            const inputsPassword = document.querySelector('.first-inp');
                inputsPassword.addEventListener('change', () => {
                        if (data.info.password !== '') {
                            data.passwordFlag = false;
                        } else {
                            data.passwordFlag = true;
                            data.info.passwordConfirm = '';
                        }
                });
        },
    },
    mounted() {
        this.inputValid(this);

        const valid = new Validator({
            selector: '#changePassword',
            pattern: {
            },
            method: {
                'password': [
                    ['notEmpty'],
                    ['pattern', 'password']
                ]
            }
        });
        valid.init();
    },

}
</script>

<style scoped>
.block {
    background: #FFFFFF;
    width: 40%;
    min-width: 305px;
    max-width: 640px;
}
.row1{
    padding: 16px;
}
.row1 img{
    cursor: pointer;
}
.row2{
    width: 100%;
    padding: 24px 32px;
    background: rgba(196, 196, 196, 0.4);
}

input{
    background: #FFFFFF;
border: 1px solid rgba(0, 0, 0, 0.71);
box-sizing: border-box;
border-radius: 10px;
margin: 0 60px;
padding: 20px 17px;
}
.first-inp{
margin-top: 24px;
}
.second-inp{
margin-top: 16px;

}
.btn{
margin: 0 60px;
padding: 20px 17px;
border-radius: 5px;
margin-bottom: 56px;
margin-top: 24px;

font-family: 'Montserrat',sans-serif;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
text-transform: uppercase;
color: #FFFFFF;
background: #000000;
}
input.success {
    border: 4px solid green;
}
input.error {
    border: 4px solid red;
}

</style>
