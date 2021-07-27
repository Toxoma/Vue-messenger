
    <template>
      <div class="congratulations">
        <p class="congratulations-text">Поздравляем!<br>Регистрация успешно пройдена</p>
        <p class="fw-bold fs-3">Просим вас подтвердить почту!</p>
        <img class="congratulation-img" src="../assets/foto/registration/congratulations.svg" alt="">
        <router-link @click="flag=false" class='reg-link' to="/login">
            <button class='reg-continue d-flex'>
                <p>НАЧАТЬ</p>
                <img src="../assets/foto/registration/arrow_back.svg">
            </button>
        </router-link>
    </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    
  },
  mounted() {

  },
};
</script>

<style>
.reg-link {
    margin: auto;
    text-decoration-line: none;
    display: flex;
justify-content: center;
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
</style>
