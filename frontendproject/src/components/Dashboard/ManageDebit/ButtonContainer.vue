<template>
  <div class="row mt-2">
    <div class="col-sm-5 d-flex justify-content-end">
      <b-button variant="success" @click="sendDebt" class="mr-2 myBtn">
        <i class="fa fa-paper-plane"></i>&nbsp;Gửi nhăc nợ
      </b-button>
      <b-button variant="danger" @click="back" class="myBtn">
        <i class="fa fa fa-arrow-left"></i>&nbsp;Quay lại
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters([
      "getDebtMessage",
      "getMoneyNumber",
      "getCustomerName",
      "getBankID",
      "getAccountNumber",
    ]),
  },
  methods: {
    back() {
      return this.$router.push("/dashboard/mine_debt_reminder");
    },
    async sendDebt() {
      if(this.getCustomerName === 'Not Found'){
        alert("Thông tin người dùng chưa chính xác. Vui lòng thử lại.")
        return;
      }else if(this.getMoneyNumber <= 0){
        alert("Số tiền không hợp lệ.")
        return;
      }
      await this.handleBeforeCallServer();
      const formData = {
        bankID: this.getBankID,
        accountNumber: this.getAccountNumber,
        customerName: this.getCustomerName,
        moneyNumber: this.getMoneyNumber,
        debtMessage: this.getDebtMessage,
      };
      const url = "http://localhost:3000/customer/create_debt_reminder";
      fetch(url, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "x-access-token": localStorage.internetbanking_accesstoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.success) {
            alert(json.error);
            return;
          } else {
            this.resetDataDebtReminder();
            return this.$router.push("/dashboard/mine_debt_reminder");
          }
        });
    },
  },
};
</script>

<style scoped>
.myBtn {
  width: 140px;
  height: 40px;
  padding: 4px 8px;
  font-size: 16px;
}
</style>