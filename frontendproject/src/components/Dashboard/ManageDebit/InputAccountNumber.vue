<template>
  <div class="row mt-2 form-group">
    <div class="col-sm-2 text-right">
      <label for="account-number" class="my-label">Số tài khoản</label>
    </div>
    <div class="col-sm-3">
      <input
        id="account-number"
        type="number"
        class="my-input"
        placeholder="Số tài khoản"
        @keyup="updateAccountNumber()"
        v-model="accountNumber"
        @blur="getCustomerName"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      accountNumber: ""
    };
  },
  computed: {
    ...mapGetters(["getBankID"]),
  },

  methods: {
    updateAccountNumber() {
      this.$store.dispatch("updateAccountNumber", this.accountNumber);
    },
    async getCustomerName(event) {
      console.log(event);
      const url = "http://localhost:3000/customer/get_customer_name";
      const info = JSON.stringify({
        accountNumber : this.accountNumber,
        bankID : this.getBankID
      });
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.internetbanking_accesstoken,
        },
        body: info,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            this.$store.dispatch("updateCustomerName", data.customerName);
          } else if(data.success === false) {
            this.$store.dispatch("updateCustomerName", "Not Found");
          }
        });
    },
  },
};
</script>

<style scoped>
.my-label {
  height: 38px;
  line-height: 38px;
}
.my-input {
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
}

.my-input:focus {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

.my-input:disabled {
  background: transparent;
  cursor: not-allowed;
}
</style>