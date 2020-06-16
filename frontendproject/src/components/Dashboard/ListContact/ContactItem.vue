<template>
  <div>
    <b-card :title="data.name_contact" :sub-title="data.des_id" class="my-card">
        <b-card-text>
      <em>Ngân hàng: {{data.bank_name}}</em>
    </b-card-text>
       <b-button variant="info" class="mr-1" @click="editContact"><i class="fa fa-edit"></i>&nbsp;Cập nhật</b-button>
      <b-button variant="danger" class="mr-1"><i class="fa fa-trash"></i>&nbsp;Xóa</b-button>
      <b-button variant="success"  @click="sendMoney()"><i class="fa fa-paper-plane"></i>&nbsp;Chuyển khoản</b-button>
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
        console.log(this.data);
        this.$store.dispatch("updateDataSendingUserID", this.data.des_id);
        this.$store.dispatch("updateDataSendingAccountName", this.data.name_contact);
        this.$store.dispatch("updateDataSendingBankID", this.data.bank_company_id);
      },
      editContact(){
        this.clearDataSending();
        this.$store.dispatch("updateDataSendingUserID", this.data.des_id);
        this.$store.dispatch("updateDataSendingAccountName", this.data.name_contact);
        this.$store.dispatch("updateDataSendingBankID", this.data.bank_company_id);
        this.$store.dispatch("updateIdContactSelected", this.data.id);
        return this.$router.push("/dashboard/edit_contact");
      }
    }
};
</script>

<style scoped>
.my-card{
    width: 100%;
}
</style>