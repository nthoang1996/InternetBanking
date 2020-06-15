<template>
  <div>
    <div class="overlay" id="overlay">
      <div class="overlay-background" id="overlay-background"></div>
      <div class="overlay-content" id="overlay-content">
        <h1 class="main-heading">Chuyển khoản</h1>
        <h3 class="blurb">Vui lòng điền số tài khoản &mdash;</h3>
        <span class="blurb-tagline">và số tiền bạn muốn chuyển</span>
        <form class="signup-form" method="post" action="#" novalidate="novalidate">
          <InputContainer v-for="item in elements" :key="item.id" :data="item" />
          <SelectedContainer />
          <TextAreaContainer :data="{key:'my_message', name:'Tin nhắn', is_disabled: false}"/>
          <button class="btn btn-outline submit-btn" @click="transferMoney($event)">
            <span>
              <i class="fa fa-paper-plane"></i>&nbsp;Chuyển tiền
            </span>
          </button>
        </form>
      </div>
    </div>
    <ModalSending @close="hide"/>
  </div>
</template>

<script>
import data from "../../../assets/info.json";
import InputContainer from "./InputContainer";
import SelectedContainer from "./SelectedContainer";
import TextAreaContainer from "./TextAreaContainer";
import ModalSending from "./Modal-Sending"
export default {
  data() {
    return {
      elements: [],
      data_sending: {}
    };
  },
  mounted() {
    this.elements = [...data.send_money_label];
    this.$store.dispatch("initDataSending");
  },
  components: { InputContainer, SelectedContainer, TextAreaContainer, ModalSending },
  methods:{
    transferMoney(event){
      event.preventDefault();
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    }
  }
};
</script>

<style scoped src="@/assets/css/send_money_page.css"></style>