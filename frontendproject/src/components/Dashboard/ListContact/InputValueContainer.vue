<template>
  <div>
    <label for="money">Số tiền</label>
    <input
      id="money"
      type="text"
      name="money"
      autocomplete="off"
      @keyup="handleChange($event)"
      :value="getDataSendingValue"
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
        "updateDataSendingValue",
        event.target.value
      );
    }
  },
  computed: {
    ...mapGetters(["getDataSendingValue"])
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