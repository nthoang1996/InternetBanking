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
import mixin from "../../../Mixin";
export default {
     mixins: [mixin],
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
      this.clearDataSending();
      return this.$router.push("/dashboard/add_new_contact");
    }
  }
};
</script>

<style scoped>
</style>