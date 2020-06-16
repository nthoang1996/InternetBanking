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
      "getDataSendingBankID",
      "getIdContactSelected"
    ])
  },
  methods: {
    back() {
      return this.$router.push("/dashboard/list_contact");
    },
    async save() {
      await this.handleBeforeCallServer();
      if (this.$route.path == "/dashboard/edit_contact") {
        const formData = {
          bank_company_id: this.getDataSendingBankID,
          name_contact: this.getDataSendingAccountName
        };
        const url = "http://localhost:3000/customer/user_contact/"+ this.getIdContactSelected;
        fetch(url, {
          method: "put", // *GET, POST, PUT, DELETE, etc.
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
              return;
            } else {
              this.$store.dispatch("updateDataSendingUserID", "");
              this.$store.dispatch("updateDataSendingAccountName", "");
              this.$store.dispatch(
                "updateDataSendingBankID",
                "TttwVLKHvXRujyllDq"
              );
              alert("Thao tác thành công!");
              return this.$router.push("/dashboard/list_contact");
            }
          });
      } else {
        const formData = {
          bank_company_id: this.getDataSendingBankID,
          name_contact: this.getDataSendingAccountName,
          des_id: this.getDataSendingUserID
        };
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
              return;
            } else {
              this.$store.dispatch("updateDataSendingUserID", "");
              this.$store.dispatch("updateDataSendingAccountName", "");
              this.$store.dispatch(
                "updateDataSendingBankID",
                "TttwVLKHvXRujyllDq"
              );
              alert("Thao tác thành công!");
              return this.$router.push("/dashboard/list_contact");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>