<template>
  <div>
    <label for="bank-name">Tên ngân hàng</label>
    <b-form-select
      :value="getDataSendingBankID"
      :options="options"
      class="my-custom"
      v-on:change="getSelectedItem($event)"
    ></b-form-select>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
import { mapGetters } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      options: []
    };
  },
  async mounted() {
    await this.handleBeforeCallServer();
    const url = "http://localhost:3000/general/banks";
    fetch(url, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "x-access-token": localStorage.internetbanking_accesstoken
      }
    })
      .then(response => response.json())
      .then(json => {
        json.banks.forEach(element => {
          element.value = element.id;
          element.text = element.name;
        });
        this.options = [...json.banks];
      });
  },
  methods: {
    getSelectedItem(data) {
      this.$store.dispatch(
        "updateDataSendingBankID",
        data
      );
      this.$store.dispatch(
        "updateDataSendingAccountName",
        ""
      );
    }
  },
  computed: {
    ...mapGetters(["getDataSendingBankID"])
  }
};
</script>

<style scoped>
</style>
<style scoped src="@/assets/css/send_money_page.css"></style>