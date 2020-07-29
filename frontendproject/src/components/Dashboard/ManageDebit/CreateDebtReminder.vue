<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4>{{getCurrentPage}}</h4>
          <hr />
        </div>
      </div>
      <InputNameCompany />
      <InputAccountNumber />
      <OutputAccountName />
      <InputMoneyNumber />
      <InputMessage />
      <ButtonContainer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputNameCompany from "./InputNameCompany";
import InputAccountNumber from "./InputAccountNumber";
import OutputAccountName from "./OutputAccountName";
import InputMoneyNumber from "./InputMoneyNumber";
import InputMessage from "./InputMessage";
import ButtonContainer from "./ButtonContainer"

export default {
  computed: {
    ...mapGetters(["getCurrentPage"])
  },
  components: {
    InputNameCompany,
    InputAccountNumber,
    OutputAccountName,
    InputMoneyNumber,
    InputMessage,
    ButtonContainer
  },
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
  }
};
</script>

<style scoped>
</style>