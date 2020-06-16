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
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters(["getDataSendingUserID"]),
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
</style>