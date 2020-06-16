<template>
  <div class="row mb-1">
    <div class="col-sm-3">
      <label for="account_name" style="position: absolute; bottom:0">Tên tài khoản</label>
    </div>
    <div class="col-sm-9">
      <button class="btn btn-outline my-button float-right" @click="check($event)">
        <i class="fa fa-check-square"></i>
      </button>
    </div>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  mixins: [mixin],
  computed: {
    ...mapGetters(["getDataSendingUserID", "getDataSendingBankID"])
  },
  methods: {
    async check(event) {
      event.preventDefault();
      await this.handleBeforeCallServer();
      const formData = {
        username: this.getDataSendingUserID,
        bank_id: this.getDataSendingBankID
      };
      const url = "http://localhost:3000/customer/user/";
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
          if (!json.data) {
            this.$store.dispatch("updateDataSendingAccountName", json.message);
          } else {
            this.$store.dispatch("updateDataSendingAccountName", json.data.name);
          }
        });
    }
  }
};
</script>

<style scoped>
.my-margin {
  margin-left: 0;
  margin-bottom: 20px;
}

.my-button {
  width: 30px !important;
  height: 30px !important;
  padding: 0 !important;
  line-height: 30px !important;
}
</style>
<style scoped src="@/assets/css/send_money_page.css"></style>