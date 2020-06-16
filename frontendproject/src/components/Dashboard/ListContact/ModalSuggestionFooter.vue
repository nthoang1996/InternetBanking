<template>
  <div class="modal-footer">
    <slot name="footer">
      <b-button variant="primary" @click="saveContact">
        <i class="fa fa-check-square"></i>&nbsp;Đồng ý
      </b-button>
      <b-button variant="danger" @click="$emit('close')">
        <i class="fa fa-times-circle"></i>&nbsp;Để lúc khác
      </b-button>
    </slot>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
import { mapGetters } from "vuex";
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters([
      "getDataSendingUserID",
      "getDataSendingMyMessage",
      "getDataSendingAccountName",
      "getDataSendingValue",
      "getDataSendingBankID",
      "getCodeVerify"
    ])
  },
  methods: {
    async saveContact() {
      await this.handleBeforeCallServer();
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
        .then(async(json) => {
          console.log(json);
          if (!json.success) {
            alert(json.error);
            return;
          } else {
            await this.$store.dispatch('insertListContact', json.data);
            this.clearDataSending();
            alert("Thao tác thành công!");
            this.$emit("close");
          }
        });
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  height: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>