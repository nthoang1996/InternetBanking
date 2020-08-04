<template>
  <div>
    <b-card
      :title="data.source_name"
      :sub-title="data.source_STK"
      class="my-card"
      v-bind:class="{deleted: this.is_delete, paid: this.paid}"
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
  async mounted() {
    this.checkDebitStatus(this.data);
  },
  data() {
    return {
      is_delete: false,
      paid: false,
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
      }else if(data.status === 0){
        this.paid = true;
      }
    },
    sendMoney() {
      this.$store.dispatch("updateDebtID", this.data.id);
      this.$store.dispatch("updateAccountNumber", this.data.source_STK);
      this.$store.dispatch("updateCustomerName", this.data.source_name);
      this.$store.dispatch("updateMoneyNumber", this.data.value);
      return this.$router.push('/dashboard/transaction_information');
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