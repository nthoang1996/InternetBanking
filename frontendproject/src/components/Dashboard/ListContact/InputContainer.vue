<template>
  <div>
    <label :for="data.key">{{data.name}}</label>
    <input
      :id="data.key"
      type="text"
      :name="data.key"
      autocomplete="off"
      :disabled="data.is_disabled"
      @keyup="handleChange($event)"
      :value="getDataSending[data.key]"
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
      const data= {
        key: this.data.key,
        value: event.target.value
      }
      this.$store.dispatch(
        "updateDataSending",
        data
      );
      console.log(JSON.parse(JSON.stringify(this.getDataSending)));
    }
  },
  computed: {
    ...mapGetters(["getDataSending"])
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