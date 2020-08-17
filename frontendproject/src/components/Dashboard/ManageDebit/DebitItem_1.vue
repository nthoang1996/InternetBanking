<template>
  <div>
    <b-card
      :title="data.des_name"
      :sub-title="data.des_id"
      class="my-card"
      v-bind:class="{deleted: this.data.status === -1, paid: this.data.status === 0}"
    >
      <b-card-text>
        <em>Ngân hàng: {{data.des_bank_name}}</em>
        <br />
        <em>Số tiền nợ: {{data.value}}</em>
        <br />
        <em>Tin nhắn: {{data.message}}</em>
        <br />
      </b-card-text>
      <b-button @click="cancelDebit" :disabled="this.data.status !== 1" variant="danger" class="mr-2">
        <i class="fa fa-trash"></i>&nbsp;Hủy Nhắc Nợ
      </b-button>
      <b-button disabled variant="success" @click="sendMoney()">
        <i class="fa fa-paper-plane"></i>&nbsp;Thanh Toán
      </b-button>
    </b-card>
  </div>
</template>


<script>
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  props: ["data"],
  methods: {
    sendMoney() {
      this.$store.dispatch("updateDebtID", this.data.id);
      this.$store.dispatch("updateAccountNumber", this.data.source_STK);
      this.$store.dispatch("updateCustomerName", this.data.source_name);
      this.$store.dispatch("updateMoneyNumber", this.data.value);
      return this.$router.push('/dashboard/transaction_information');
    },

    /** Hàm xử lý về tin nhắn khi xóa nhắc nợ */
    // Nếu click vào Cancel => false
    // Nếu thành công => nội dung tin nhắn
    async showAlert() {
      return await this.$swal
        .fire({
          input: "textarea",
          inputPlaceholder: "Nhập nội dung tin nhắn",
          inputAttributes: {
            "aria-label": "Nhập nội dung tin nhắn",
          },
          showCancelButton: true,
          allowOutsideClick: false,
        })
        .then((text) => {
          if (text.dismis === "cancel") {
            return false;
          }
          return text.value;
        });
    },

   /** Hàm xử lý xóa nhắc nợ */
    async cancelDebit() {
      await this.handleBeforeCallServer();

      // Kiểm tra người dùng đã vượt qua bước nhập tin nhắn nhắc nợ chưa?
      const message = await this.showAlert();
      if (message === false) return;

      // Đoạn xử lý thao tác xóa nhắc nợ
      const url = "http://localhost:3000/customer/delete_debit";
      const data = JSON.stringify({
        message, // Nội dung tin nhắn
        id: this.data.id, // Id của nhắc nợ đang xóa
        reminderId: this.data.des_idUser, // Id của người Bị nhắc nợ
      });
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.internetbanking_accesstoken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then(async(json) => {
          if (!json.success) {
            this.$swal.fire({
              icon: "error",
              text: json.error,
            });
          } else {
            // Tạo thông báo tới người nhắc nợ
            const result = this.sendNotifyToPersonCreatedDebtReminder(
              this.data.des_idUser,
              message,
              1
            );
            if (result) {
              await this.$swal.fire({
                icon: "success",
                text: "Xóa nhắc nợ thành công.",
              });
            }

            // Cập nhập lại trạng thái của nhắc nợ trong VueX
            this.$store.dispatch("updateDebitStatus_1", {
              id: this.data.id,
              status: -1,
            });
          }
        });
    },

    /** Thông báo xóa nhắc nợ tới người tạo nhắc nợ */
    async sendNotifyToPersonCreatedDebtReminder(des_id, message, type) {
      await this.handleBeforeCallServer();
      const url = "http://localhost:3000/customer/create_notify";
      const data = JSON.stringify({
        des_id,
        message,
        type,
      });

      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.internetbanking_accesstoken,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            return true;
          } else {
            // Trường hợp xảy ra lỗi
            this.$swal.fire({
              icon: "error",
              text: json.error,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
}

.deleted {
  background-color: gray;
}

.paid{
  background-color: rgba(13, 185, 13, 0.829);
}

h6.card-subtitle {
  color: #aaa !important;
}

/* .myBtn {
  width: 80px;
  height: 30px;
} */

.cancelReminder {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}
</style>