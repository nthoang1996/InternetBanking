<template>
  <div>
    <b-card :title="data.des_name" :sub-title="data.des_id" class="my-card">
      <b-card-text>
        <em>Ngân hàng: {{data.des_bank_name}}</em><br/>
        <em>Số tiền nợ: {{data.value}}</em><br/>
        <em>Tin nhắn: {{data.message}}</em><br/>
      </b-card-text>
      <b-button variant="danger" class="mr-1" @click="deleteDebit">
        <i class="fa fa-trash"></i>&nbsp;Hủy Nhắc Nợ
      </b-button>
      <b-button variant="success" @click="sendMoney()">
        <i class="fa fa-paper-plane"></i>&nbsp;Thanh Toán
      </b-button>
    </b-card>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
    props: ['data'],
    methods:{
      sendMoney(){
        this.$store.dispatch("updateDataSendingUserID", this.data.des_id);
        this.$store.dispatch("updateDataSendingAccountName", this.data.name_contact);
        this.$store.dispatch("updateDataSendingBankID", this.data.bank_company_id);
      },
      async deleteDebit(){
        await this.handleBeforeCallServer();
        const url = "http://localhost:3000/customer/user_contact/"+ this.data.id;
      fetch(url, {
        method: "delete", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "x-access-token": localStorage.internetbanking_accesstoken,
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (!json.success) {
            alert(json.error);
          } else {
            this.$store.dispatch("deleteListContact", this.data.id);
          }
        });
        
      }
    }
};
</script>

<style scoped>
.my-card {
  width: 100%;
}
</style>