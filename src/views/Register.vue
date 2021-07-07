<template>
<div class="reg-wrapp ">
    <div class="reg-info" v-if="!congratulationsFlag">
        <form class="registration-form" id="regForm" @submit.prevent="submit">
            <div class="first" v-show="flag">
                <div class="reg-foto-block">
                    <img class="reg-foto" src="../assets/foto/registration/regIcon.svg">
                </div>

                <div class="reg-name">
                    <input data-key="name" data-valid="name" class="reg-input" type="text" v-model="info.firstName" placeholder="Имя">
                </div>

                <div class="reg-familia">
                    <input data-key="surname" data-valid="name" class="reg-input" type="text" v-model="info.lastName" placeholder="Фамилия">
                </div>

                <router-link @click="flag=false" class='reg-link' to="">
                    <button class='reg-continue d-flex'>
                        <p>ДАЛЕЕ</p>
                        <img src="../assets/foto/registration/arrow_back.svg">
                    </button>
                </router-link>
            </div>

            <div class="second" v-show="!flag">
                <p class="reg-text">Регистрация</p>
                <div class="reg-block">
                    <input data-key="email" data-valid="email" class="reg-input" type="email" v-model="info.email" placeholder="E-mail">
                </div>

                <div class="reg-block ">
                    <input data-key="phone" data-valid="phone" class="reg-input" type="tel" v-model="info.phone" placeholder="+7(___)-___-__-__">
                </div>

                <div class="reg-block">
                    <input data-key="password" data-valid="password" class="reg-input" type="password" v-model="info.password" placeholder="Пароль">
                </div>

                <div class="reg-block ">
                    <input data-key="passwordConfirm" data-valid="password" class="reg-input" :class="{'disable-block':passwordFlag}" :disabled="passwordFlag" type="password" v-model="info.passwordConfirm" placeholder="Повторите пароль">
                </div>
                <button class='reg-btn' :class="{'disable-block':errCount.size!==0}" :disabled="errCount.size!==0" type="submit">Зарегистрироваться</button>
            </div>
        </form>
        <div class="switcher">
            <svg class="switcher-el" :class="{circle:!flag}" width="15" @click="flag= true" height="15" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="reg-toggle" :class="{ fill: flag }" cx="4.5" cy="4.5" r="4.3" fill="#C4C4C4" />
            </svg>
            <svg :class="{circle:flag}" @click="flag= false" width="15" height="15" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="reg-toggle" :class="{ fill: !flag }" cx="4.5" cy="4.5" r="4.3" fill="#C4C4C4" />
            </svg>
        </div>
    </div>
    <div class="congratulations" v-else>
        <p class="congratulations-text">Поздравляем!<br>Регистрация успешно пройдена</p>
        <p class="fw-bold fs-3">Просим вас подтвердить пароль!</p>
        <img class="congratulation-img" src="../assets/foto/registration/congratulations.svg" alt="">
        <router-link @click="flag=false" class='reg-link' to="/login">
            <button class='reg-continue d-flex'>
                <p>НАЧАТЬ</p>
                <img src="../assets/foto/registration/arrow_back.svg">
            </button>
        </router-link>
    </div>
</div>
</template>

<script>
// import router from "../router";
import submitForm from "../modules/submitForm";
import Validator from "../modules/validator";

import {
    mapState,
    mapActions
} from "vuex";

export default {
    data() {
        return {
            info: {
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                password: "",
                passwordConfirm: "",
            },
            flag: true,
            userData: {},
            errCount: new Set(),
            passwordFlag: true,
        };
    },
    computed: {
        ...mapState({
            chats: (state) => state.chats.chats,
            congratulationsFlag: (state) => state.chats.successRegister,
        }),
    },
    methods: {
        ...mapActions({
            register: "chats/register",
            loadChats: "chats/loadChats",
        }),
        //извлечение данных из формы
        submit: function (e) {
            setTimeout(() => {
                const data =  submitForm(e, this);
                this.register(data);
            }, 500);
        },
        //обводка инпутов 
        inputValid: data => {
            const inputsPasswords = document.querySelectorAll('input[type=password]');

            inputsPasswords.forEach(inputPassword => {
                data.errCount.add(inputPassword);
                inputPassword.addEventListener('change', () => {
                    if (inputPassword.dataset.key === 'password') {
                        if (data.password !== '') {
                            // inputPassword.classList.remove('cancel');
                            inputPassword.classList.add('success');
                            data.passwordFlag = false;
                            data.errCount.delete(inputPassword);
                        } else {
                            data.passwordFlag = true;
                            inputsPasswords[1].classList.remove('success');
                            // inputsPasswords[1].classList.remove('cancel');
                            inputPassword.classList.remove('success');
                            // inputPassword.classList.add('cancel');
                            data.passwordConfirm = '';
                        }
                    }
                    if (data.password === data.passwordConfirm && data.password !== '') {
                        // inputsPasswords[0].classList.remove('cancel');
                        // inputsPasswords[1].classList.remove('cancel');
                        inputsPasswords[0].classList.add('success');
                        inputsPasswords[1].classList.add('success');
                        data.errCount.delete(inputsPasswords[1]);
                    } else {
                        inputsPasswords[1].classList.remove('success');
                        // inputsPasswords[1].classList.add('cancel');
                    }
                });
            })
        },
    },
    mounted() {
        this.inputValid(this);
        
        const valid = new Validator({
            selector: '#regForm',
            pattern: {
                // phone: /\d{3}/,
            },
            method: {
                'name': [
                    ['notEmpty'],
                    ['pattern', 'name']
                ],
                'email': [
                    ['notEmpty'],
                    ['pattern', 'email']
                ],
                'phone': [
                    ['notEmpty'],
                    ['pattern', 'phone']
                ],
                'password': [
                    ['notEmpty'],
                    ['pattern', 'password']
                ]
            }
        });
        valid.init();

    },
};
</script>

<style scoped>
.reg-wrapp {
    width: 360px;
}

.reg-info {
    display: flex;
    flex-direction: column;
}

.first {
    display: flex;
    flex-direction: column;
}

.reg-foto-block {
    margin-bottom: 40px;
}

.reg-foto {
    width: 120px;
    height: 120px;
}

.reg-name {
    margin-bottom: 20px;
}

.reg-input {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.71);
    box-sizing: border-box;
    border-radius: 10px;
    width: 360px;
    height: 55px;
    padding: 19px 18px 18px 18px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.42);
    opacity: 0.54;
}

.reg-familia {
    margin-bottom: 40px;
}

.reg-link {
    margin: auto;
    text-decoration-line: none;
}

.reg-continue {
    background: #FFFFFF;
    border: 2px solid #000000;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 360px;
    height: 55px;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-transform: uppercase;

    color: #000000;
}

.reg-text {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}

.reg-block {
    margin-top: 20px;
}

.reg-btn {
    margin-top: 40px;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #000000;
    border-radius: 5px;
    width: 100%;
    height: 55px;
    border: none;
    margin-bottom: 20px;
}

.switcher {
    display: flex;
    justify-content: center;
    align-items: center;
}

.switcher-el {
    margin-right: 10px;
}

.circle {
    width: 10px;
    ;
}

.reg-toggle {
    cursor: pointer;
}

.fill {
    fill: #2F2F2F;
}

.congratulation-img {
    margin: 40px 0;
}

input.success {
    border: 4px solid green;
}

input.error {
    border: 4px solid red;
}
</style>
