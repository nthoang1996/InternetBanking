<template>
  <div>
    <b-card
      :title="data.des_name"
      :sub-title="data.des_id"
      class="my-card"
      v-bind:class="{deleted: this.is_delete}"
    >
      <b-card-text>
        <em>Ngân hàng: {{data.des_bank_name}}</em>
        <br />
        <em>Số tiền nợ: {{data.value}}</em>
        <br />
        <em>Tin nhắn: {{data.message}}</em>
        <br />
      </b-card-text>
      <b-button v-b-toggle="'collapse-2'" :disabled="is_delete" variant="danger" class="mr-2">
        <i class="fa fa-trash"></i>&nbsp;Hủy Nhắc Nợ
      </b-button>
      <b-button :disabled="is_delete" variant="success" @click="sendMoney()">
        <i class="fa fa-paper-plane"></i>&nbsp;Thanh Toán
      </b-button>
      <b-collapse v-model="visible" id="collapse-2" class="mt-2 cancelReminder">
        <b-form-textarea
          id="textarea-message"
          size="sm"
          v-model="message_content"
          placeholder="Nhập lời nhắn."
        ></b-form-textarea>
        <b-button
          aria-controls="collapse-2"
          @click="cancelOperationDelete"
          class="mt-1 myBtn"
          variant="primary"
        >Hủy Thao Tác</b-button>
      </b-collapse>
    </b-card>
  </div>
</template>


<script>
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  created() {
    console.log("state", this.data);
    this.checkDebitStatus(this.data);
  },
  data() {
    return {
      is_delete: false,
      message_content: "",
      visible: false,
    };
  },
  props: ["data"],
  computed: {},
  methods: {
    checkDebitStatus(data) {
      if (data.status === -1) {
        this.is_delete = true;
      }
    },
    sendMoney() {
      this.$store.dispatch("updateDataSendingUserID", this.data.des_id);
      this.$store.dispatch(
        "updateDataSendingAccountName",
        this.data.name_contact
      );
      this.$store.dispatch(
        "updateDataSendingBankID",
        this.data.bank_company_id
      );
    },
    async deleteDebit() {
      await this.handleBeforeCallServer();
      const url = "http://localhost:3000/customer/delete_debit/" + this.data.id;
      fetch(url, {
        method: "delete", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "x-access-token": localStorage.internetbanking_accesstoken,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.success) {
            alert(json.error);
          } else {
            this.$store.dispatch("deleteDebitItem", this.data.id);
            this.checkDebitStatus(this.data);
          }
        });
    },
    cancelOperationDelete() {
      this.message_content = "";
      this.visible = !this.visible;
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