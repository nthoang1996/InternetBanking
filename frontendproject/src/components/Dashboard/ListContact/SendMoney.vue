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
          <InputRadioContainer />
          <button class="btn btn-outline submit-btn" @click="openModal($event)">
            <span>
              <i class="fa fa-paper-plane"></i>&nbsp;Chuyển tiền
            </span>
          </button>
        </form>
      </div>
    </div>
    <ModalSending @close="hide" @closeModalSuggest="hideSuggestionModal" />
  </div>
</template>

<script>
import data from "../../../assets/info.json";
import InputUserIDContainer from "./InputUserIDContainer";
import InputNameContainer from "./InputNameContainer";
import SelectedContainer from "./SelectedContainer";
import TextAreaContainer from "./TextAreaContainer";
import ModalSending from "./Modal-Sending";
import InputValueContainer from "./InputValueContainer";
import InputRadioContainer from "./InputRadioContainer";
import { mapGetters } from "vuex";
import mixin from "../../../Mixin";
import VueSweetalert2 from 'vue-sweetalert2';
import Vue from "vue";
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
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
    ...mapGetters([
      "getDataSendingUserID",
      "getDataSendingMyMessage",
      "getDataSendingAccountName",
      "getDataSendingValue",
      "getDataSendingBankID",
      "getListContact"
    ])
  },
  components: {
    InputUserIDContainer,
    SelectedContainer,
    TextAreaContainer,
    ModalSending,
    InputNameContainer,
    InputValueContainer,
    InputRadioContainer
  },
  methods: {
    async openModal(event) {
      event.preventDefault();
      if (this.getDataSendingAccountName === "") {
        Vue.swal('Vui lòng kiểm tra tài khoản trước khi thực hiện lệnh gửi tiền');
        return;
      }
      if (this.getDataSendingAccountName === "Không tìm thấy người dùng") {
        Vue.swal('Tài khoản không đúng');
        return;
      }
      if (parseInt(this.getDataSendingValue) < 1000) {
        Vue.swal('Số tiền không đủ lớn');
        return;
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
          if (!json.success) {
            Vue.swal('Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!');
          }
        });
      await this.$store.dispatch("updateModalType", 1);
      this.$modal.show("hello-world");
    },
    hide(isOpenModal) {
      console.log(isOpenModal);
      if (isOpenModal) {
        const contact = this.getListContact.find(
          contact => contact.des_id == this.getDataSendingUserID
        );
        if (!contact) {
          this.$store.dispatch("updateModalType", 2);
        } else {
          this.clearDataSending();
          this.$modal.hide("hello-world");
        }
      } else {
        this.clearDataSending();
        this.$modal.hide("hello-world");
      }
    },
    hideSuggestionModal() {
      this.clearDataSending();
      this.$modal.hide("hello-world");
    }
  }
};
</script>

<style scoped src="@/assets/css/send_money_page.css"></style>