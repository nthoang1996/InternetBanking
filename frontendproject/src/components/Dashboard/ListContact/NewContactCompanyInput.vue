<template>
  <div class="row mt-5 form-group">
    <div class="col-sm-2 text-right">
      <label class="my-label">Công ty</label>
    </div>
    <div class="col-sm-3">
      <b-form-select
        :value="getDataSendingBankID"
        :options="options"
        class="my-input"
        v-on:change="getSelectedItem($event)"
        :disabled="isDisabled"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
import { mapGetters } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      options: [],
      isDisabled: false
    };
  },
  async mounted() {
    await this.handleBeforeCallServer();
    const url = "http://localhost:3000/general/banks";
    fetch(url, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "x-access-token": localStorage.internetbanking_accesstoken
      }
    })
      .then(response => response.json())
      .then(json => {
        json.banks.forEach(element => {
          element.value = element.id;
          element.text = element.name;
        });
        this.options = [...json.banks];
      });
      if(this.$route.path == '/dashboard/edit_contact'){
          console.log(this.$route.path);
          this.isDisabled = true;
      }
  },
  methods: {
    getSelectedItem(data) {
      this.$store.dispatch("updateDataSendingBankID", data);
    }
  },
  computed: {
    ...mapGetters(["getDataSendingBankID"])
  },
  
};
</script>

<style scoped>
.my-label{
    height: 38px;
    line-height: 38px;
}
.my-input {
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
}

.my-input:focus {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

.my-input:disabled{
  background: transparent;
  cursor: not-allowed;
}
</style>