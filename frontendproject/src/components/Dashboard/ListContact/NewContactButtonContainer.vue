<template>
  <div class="row mt-2">
    <div class="col-sm-5 d-flex justify-content-end">
      <b-button variant="success" @click="save" class="mr-1">
        <i class="fa fa-save"></i>&nbsp;Lưu
      </b-button>
      <b-button variant="danger" @click="back">
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
      "getDataSendingUserID",
      "getDataSendingMyMessage",
      "getDataSendingAccountName",
      "getDataSendingValue",
      "getDataSendingBankID"
    ])
  },
  methods: {
    back() {
      return this.$router.push("/dashboard/list_contact");
    },
    async save() {
        await this.handleBeforeCallServer();
      const formData = {
        bank_company_id: this.getDataSendingBankID,
        name_contact: this.getDataSendingAccountName,
        des_id: this.getDataSendingUserID
      };
      console.log(formData);
      const url = "http://localhost:3000/customer/user_contact";
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
          console.log(json);
          if (!json.success) {
            alert(json.error);
          } else {
            this.$store.dispatch("updateDataSendingUserID", "");
            this.$store.dispatch("updateDataSendingAccountName", "");
            this.$store.dispatch(
              "updateDataSendingBankID",
              "TttwVLKHvXRujyllDq"
            );
            alert("Thao tác thành công!");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>