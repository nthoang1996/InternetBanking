<template>
  <div class="row">
    <div class="col-sm-9">
      <FilterItem />
    </div>
    <div class="col-sm-3">
      <b-button variant="primary" class="float-right mr-3 mt-3" @click="addContact">
        <i class="fa fa-plus-square"></i> &nbsp;Thêm mới
      </b-button>
    </div>
  </div>
</template>

<script>
import FilterItem from "./FilterItem";
import { mapGetters } from "vuex";
export default {
  components: { FilterItem },
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
    addContact() {
      this.$store.dispatch("updateDataSendingUserID", "");
      this.$store.dispatch("updateDataSendingAccountName", "");
      this.$store.dispatch("updateDataSendingValue", "");
      this.$store.dispatch("updateDataSendingBankID", "TttwVLKHvXRujyllDq");
      this.$store.dispatch("updateDataSendingMyMessage", "");
      return this.$router.push("/dashboard/add_new_contact");
    }
  }
};
</script>

<style scoped>
</style>