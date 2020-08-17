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
      await this.handleBeforeCallServer();

      /** Xử lý hành vi nhập thông tin của người dùng */
      if (this.getCustomerName === "Not Found" || this.getCustomerName === "") {
        this.$swal.fire({
          icon: "error",
          text: "Thông tin người dùng chưa chính xác. Vui lòng thử lại.",
        });
        return;
      } else if (this.getMoneyNumber <= 0) {
        this.$swal.fire({
          icon: "error",
          text: "Số tiền không hợp lệ.",
        });
        return;
      }

      /** Tạo nhắc nợ */
      const url = "http://localhost:3000/customer/create_debt_reminder";
      const formData = {
        bankID: this.getBankID,
        accountNumber: this.getAccountNumber,
        customerName: this.getCustomerName,
        moneyNumber: this.getMoneyNumber,
        debtMessage: this.getDebtMessage,
      };

      fetch(url, {
        method: "post",
        headers: {
          "x-access-token": localStorage.internetbanking_accesstoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(async (json) => { 
          // Tạo nhắc nợ thất bại
          if (!json.success) {
            this.$swal.fire({
              icon: "error",
              text: json.error,
            });
            return;
          } else {
            // Tạo nhắc nợ thành công.
            this.resetDataDebtReminder();
            await this.$swal.fire({
              icon: "success",
              text: "Nhắc nợ đã được tạo thành công.",
            });
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