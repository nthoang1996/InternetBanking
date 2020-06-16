<template>
  <div class="row mt-2 form-group">
    <div class="col-sm-2 text-right">
      <label for="account-id" class="my-label">Số tài khoản</label>
    </div>
    <div class="col-sm-3">
      <input
        type="text"
        name="account-id"
        class="my-input"
        id="account-id"
        placeholder="Số tài khoản"
        @keyup="handleChange($event)"
        autofocus
        :value="getDataSendingUserID"
        :disabled="isDisabled"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            isDisabled: false
        }
    },
    computed: {
    ...mapGetters(["getDataSendingUserID"]),
  },
  mounted(){
      if(this.$route.path == '/dashboard/edit_contact'){
          console.log(this.$route.path);
          this.isDisabled = true;
      }
  },
  methods: {
    handleChange(event) {
      this.$store.dispatch("updateDataSendingUserID", event.target.value);
    },
  }
};
</script>

<style scoped>
.my-label {
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