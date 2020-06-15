<template>
  <div>
    <label :for="data.key">{{data.name}}</label>
    <textarea
      :id="data.key"
      :name="data.key"
      autocomplete="off"
      :disabled="data.is_disabled"
      class="my-custom my-text-area"
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
    return {};
  },
  methods: {
    handleChange(event) {
      const data = {
        key: this.data.key,
        value: event.target.value
      };
      this.$store.dispatch("updateDataSending", data);
      console.log(JSON.parse(JSON.stringify(this.getDataSending)));
    }
  },
  computed: {
    ...mapGetters(["getDataSending"])
  }
};
</script>

<style scoped src="@/assets/css/send_money_page.css"></style>