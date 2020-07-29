<template>
  <div class="row mt-2 form-group">
    <div class="col-sm-2 text-right">
      <label for="money-number" class="my-label">Số tiền</label>
    </div>
    <div class="col-sm-3">
      <input
        id="money-number"
        type="number"
        class="my-input"
        placeholder="Số tiền"
        @keyup="handleChange($event)"
        autofocus
        :value="getMoneyNumber"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getMoneyNumber"]),
  },
  methods: {
    handleChange(event) {
      this.$store.dispatch("updateMoneyNumber", event.target.value);
    },
  },
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

.my-input:disabled {
  background: transparent;
  cursor: not-allowed;
}
</style>