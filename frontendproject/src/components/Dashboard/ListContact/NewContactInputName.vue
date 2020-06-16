<template>
  <div class="row mt-2 form-group">
    <div class="col-sm-2 text-right">
      <label for="account-name" class="my-label">Tên liên hệ</label>
    </div>
    <div class="col-sm-3">
      <input
        type="text"
        name="account-name"
        class="my-input"
        id="account-name"
        placeholder="Tên người dùng"
        @keyup="handleChange($event)"
        autofocus
        :value="getDataSendingAccountName"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    handleChange(event) {
      this.$store.dispatch("updateDataSendingAccountName", event.target.value);
    }
  },
  computed: {
    ...mapGetters(["getDataSendingAccountName"]),
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