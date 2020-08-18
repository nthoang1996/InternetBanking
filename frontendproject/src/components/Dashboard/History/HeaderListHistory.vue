<template>
  <div class="row">
    <div class="col-sm-12">
      <FilterItem />
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
  }
};
</script>

<style scoped>
</style>