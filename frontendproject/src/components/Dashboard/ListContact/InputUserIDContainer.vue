<template>
  <div>
    <label for="user_id">Số tài khoản</label>
    <input
      id="user_id"
      type="text"
      name="user_id"
      autocomplete="off"
      @keyup="handleChange($event)"
      :value="getDataSendingUserID"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleChange(event) {
      this.$store.dispatch(
        "updateDataSendingUserID",
        event.target.value
      );
      this.$store.dispatch(
        "updateDataSendingAccountName",
        ""
      );
    }
  },
  computed: {
    ...mapGetters(["getDataSendingUserID"]),
  }
};
</script>

<style scoped>
.my-margin {
  margin-left: 0;
  margin-bottom: 20px;
}
</style>
<style scoped src="@/assets/css/send_money_page.css"></style>