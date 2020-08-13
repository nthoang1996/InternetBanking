<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100%">
    <b-form @submit.prevent="handleSubmit" class="container-form">
      <h2>{{getCurrentPage.toUpperCase()}}</h2>

      <div v-if="isError" class="alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {{error}}
      </div>

      <b-form-group id="customerName" label="Chủ tài khoản" label-for="input-1">
        <b-form-input disabled :value="getCustomerName" type="text" id="input-1"></b-form-input>
      </b-form-group>

      <b-form-group id="accountNumber" label="Số tài khoản" label-for="input-2">
        <b-form-input disabled :value="getAccountNumber" type="text" id="input-2"></b-form-input>
      </b-form-group>

      <b-form-group id="bankName" label="Tên ngân hàng" label-for="input-3">
        <b-form-input disabled value="Cùng ngân hàng" type="text" id="input-3"></b-form-input>
      </b-form-group>

      <b-form-group id="moneyNumber" label="Số tiền" label-for="input-4">
        <b-form-input disabled :value="getMoneyNumber" type="text" id="input-4"></b-form-input>
      </b-form-group>

      <b-form-group id="message" label="Tin nhắn" label-for="input-5">
        <textarea v-model="message" id="input-5" autocomplete="off" class="my-text-area" />
      </b-form-group>

      <InputRadioContainer />

      <b-button @click="back" variant="danger" align-self="end" class="myBtn">Hủy bỏ</b-button>
      <b-button type="submit" variant="primary" align-self="end" class="myBtn">Xác nhận</b-button>
    </b-form>
  </div>
</template>

<script>
import swal from "sweetalert";
import { mapGetters } from "vuex";
import mixin from "../../../Mixin";
import InputRadioContainer from "./InputRadioContainer";
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters([
      "getCurrentPage",
      "getMoneyNumber",
      "getCustomerName",
      "getAccountNumber",
      "getDataSendingTypePayment",
      "getUser",
      "getDebtID"
    ]),
  },
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
  },
  data() {
    return {
      error: "",
      message: "",
      isError: false,
      otp: "",
    };
  },
  methods: {
    back() {
      return this.$router.push("/dashboard/manage_debit");
    },
    handleSubmit() {
      const self = this;
      self.handleBeforeCallServer();
      // Render form input OTP
      swal("Nhập OTP:", {
        content: "input",
      }).then((value) => {
        this.otp = value;
        const url_1 = "http://localhost:3000/customer/pay_debt";
        const formData = {
          otp: self.otp,
          receiver_STK: self.getAccountNumber,
          money_number: self.getMoneyNumber,
          type_payment: self.getDataSendingTypePayment,
          debtID : self.getDebtID
        };
        fetch(url_1, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.internetbanking_accesstoken,
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.success) {
              alert(json.error);
            }
            alert("Thao tác thành công.");
            this.$store.dispatch('updateDebitStatus', {id:self.getDebtID, status:0});
            return this.$router.push("/dashboard/manage_debit");
          });
      });

      const req_data = {
        email: self.getUser.email,
      };
      const url = "http://localhost:3000/account/send_otp";
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req_data),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.success) {
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!");
            return;
          }
          // send OTP => OK
        });

      // So khớp OTP + chuyển khoản
    },
  },
  components: { InputRadioContainer },
};
</script>

<style scoped>
.container-form {
  width: 450px;
  height: auto;
  margin-bottom: 2rem;
}

.container-form > h2 {
  text-align: center;
  margin: 1rem auto;
}

.myBtn {
  padding: 7px 16px;
  width: 120px;
  border-radius: 1.5rem;
  margin-right: 1.5rem;
}

.my-text-area {
  width: 100%;
}

.container-form input[type="text"] {
  border: 2px solid rgb(90, 84, 84);
}
</style>