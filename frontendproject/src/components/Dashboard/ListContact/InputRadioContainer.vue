<template>
  <div class="mb-3">
    <b-form-group label="Hình thức thanh toán phí">
      <b-form-radio-group
        id="radio-group-1"
        v-model ="selected"
        :options="options"
        name="radio-options"
         @change="handleChange"
      ></b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      options: [
          {text: 'Người gửi trả phí', value: 1},
          {text: 'Người gửi trả phí', value: 2}
      ],
      selected: 1
    };
  },
  mouted(){
      this.$store.dispatch(
        "updateDataSendingTypePayment",
        1
      );
      this.selected = this.getDataSendingTypePayment;
  },
  methods: {
    handleChange(event) {
        console.log("AAAA", this.getDataSendingTypePayment, event);
      this.$store.dispatch(
        "updateDataSendingTypePayment",
        event
      );
    }
  },
  computed: {
    ...mapGetters(["getDataSendingTypePayment"]),
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