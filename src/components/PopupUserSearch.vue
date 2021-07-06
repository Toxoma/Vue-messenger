<template>
<div class="popup-wrapp">
    <div class="block d-flex flex-column">
        <div class="row1 d-flex justify-content-between">
            <div class="">Поиск контакта</div>
            <img src="../assets/foto/mainPage/close.svg" @click="$emit('cancel', !flag)">
        </div>

        <div class="row2">
            <div class="inner-row d-flex">
           <img src="../assets/foto/mainPage/local_phone.svg">

           <input class="input" v-model="phone" type="text" placeholder="+79...">

           <img class="reset" src="../assets/foto/mainPage/close.svg" @click="phone=''">
           </div>
        </div>

        <section v-if="valueFlag"  class="chat-list">
            <SearchBlock :phone="phone"></SearchBlock>
        </section>
        
    </div>
</div>
</template>

<script>
import SearchBlock from "../components/SearchBlock.vue";

export default {
    data() {
        return {
             info: {
                
            },
            valueFlag: false,
            phone:'',
        }; 
    },
    components: {
        SearchBlock
    },
    props: {
        flag: Boolean
    },
     methods: {
        
    },
    mounted() {
        const input = document.querySelector('.input');
        let wrongPhone;

        input.addEventListener('input',()=>{
            wrongPhone = document.getElementById('wrongPhone');
            if (/^\+\d*$/.test(this.phone)) {
                if (wrongPhone) {
                    wrongPhone.remove();
                }
                this.valueFlag = true;
            }else{
                if (!wrongPhone) {
                     document.querySelector('.inner-row ').insertAdjacentHTML('afterend',`
                <p id="wrongPhone">Некоректное значение!!!</p>
                `)
                }
               this.valueFlag = false;
            }
        });

    },

}
</script>

<style scoped>
.block {
    background: #FFFFFF;
    width: 40%;
    min-width: 370px;
    max-width: 640px;
    height: 575px;
}
.row1{
    padding: 16px;
}
.row1 img{
    cursor: pointer;
}
.row2{
    width: 100%;
    padding: 16px;
    background: rgba(196, 196, 196, 0.4);
}
.inner-row{
    background: #FFFFFF;
    border-radius: 10px;
    padding: 16px;
}
.input{
    margin: 0 10px;
    font-family: 'Roboto',sans-serif;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 18px;
color: rgba(0, 0, 0, 0.42);
opacity: 0.54;
}
.reset{
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
}
.reset:hover{
    background: rgba(0, 0, 0, 0.12);
}
input{
    border: none;
    width: 100%;
    margin-right: 5px;
}
.chat-list{
    padding: 8px;
}

</style>
