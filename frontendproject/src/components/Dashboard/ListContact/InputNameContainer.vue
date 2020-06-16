<template>
  <div>
    <HeaderNameContainer/>

    <input
      id="account_name"
      type="text"
      name="account_name"
      autocomplete="off"
      disabled
      @keyup="handleChange($event)"
      :value="getDataSendingAccountName"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderNameContainer from './HeaderNameContainer'
export default {
  props: ["data"],
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapGetters(["getDataSendingAccountName"]),
  },
  components: { HeaderNameContainer }
};
</script>

<style scoped>
.my-margin {
  margin-left: 0;
  margin-bottom: 20px;
}

.my-button {
  width: 30px !important;
  height: 30px !important;
  padding: 0 !important;
  line-height: 30px !important;
}
</style>
<style scoped src="@/assets/css/send_money_page.css"></style>