<template>
  <div>
    <div class="overlay" id="overlay">
      <div class="overlay-background" id="overlay-background"></div>
      <div class="overlay-content" id="overlay-content">
        <h1 class="main-heading">Chuyển khoản</h1>
        <h3 class="blurb">Vui lòng điền số tài khoản &mdash;</h3>
        <span class="blurb-tagline">và số tiền bạn muốn chuyển</span>
        <form class="signup-form" method="post" action="#" novalidate="novalidate">
          <InputNameContainer />
          <InputUserIDContainer />
          <SelectedContainer />
          <InputValueContainer />
          <TextAreaContainer />
          <button class="btn btn-outline submit-btn" @click="openModal($event)">
            <span>
              <i class="fa fa-paper-plane"></i>&nbsp;Chuyển tiền
            </span>
          </button>
        </form>
      </div>
    </div>
    <ModalSending @close="hide" />
  </div>
</template>

<script>
import data from "../../../assets/info.json";
import InputUserIDContainer from "./InputUserIDContainer";
import InputNameContainer from "./InputNameContainer";
import SelectedContainer from "./SelectedContainer";
import TextAreaContainer from "./TextAreaContainer";
import ModalSending from "./Modal-Sending"
import InputValueContainer from './InputValueContainer'
import { mapGetters } from "vuex";
import mixin from "../../../Mixin";
export default {
  data() {
    return {
      elements: [],
      data_sending: {}
    };
  },
  mixins: [mixin],
  mounted() {
    this.elements = [...data.send_money_label];
  },
  computed: {
    ...mapGetters(["getDataSendingUserID", "getDataSendingMyMessage", "getDataSendingAccountName", "getDataSendingValue", "getDataSendingBankID"])
  },
  components: { InputUserIDContainer, SelectedContainer, TextAreaContainer, ModalSending, InputNameContainer, InputValueContainer },
  methods:{
    async openModal(event){
      event.preventDefault();
      if(this.getDataSendingAccountName === ""){
        alert("Vui lòng kiểm tra tài khoản trước khi thực hiện lệnh gửi tiền");
        return
      }
      if(this.getDataSendingAccountName === "Không tìm thấy người dùng"){
        alert("Tài khoản không đúng");
        return
      }
      if(parseInt(this.getDataSendingValue) < 1000 ){
        alert("Số tiền không đủ lớn");
        return
      }
      await this.handleBeforeCallServer();
      const formData = {
        des_id: this.getDataSendingUserID
      };
      const url = "http://localhost:3000/customer/confirmination_Email";
      fetch(url, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "x-access-token": localStorage.internetbanking_accesstoken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(json => {
          if(!json.success){
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!");
          }
        });

      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    }
  }
};
</script>

<style scoped src="@/assets/css/send_money_page.css"></style>