<template>
  <div class="row mt-2 form-group">
    <div class="col-sm-2 text-right">
      <label for="debt-message" class="my-label">Tin nhắn</label>
    </div>
    <div class="col-sm-3">
      <input
        id="debt-message"
        type="textarea"
        class="my-input"
        placeholder="Nội dung tin nhắn"
        @keyup="handleChange($event)"
        autofocus
        :value="getDebtMessage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getDebtMessage"]),
  },
  methods: {
    handleChange(event) {
      this.$store.dispatch("updateDebtMessage", event.target.value);
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