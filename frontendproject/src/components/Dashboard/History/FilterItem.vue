<template>
  <div class="row">
    <div class="col-sm-6">
      <label for="inp" class="inp">
        <input
          type="text"
          id="inp"
          placeholder="Tìm kiếm"
          pattern=".{6,}"
          @keyup="handleChange($event)"
        />
        <svg
          width="280px"
          height="18px"
          viewBox="0 0 280 18"
          class="border"
          style="border:none !important"
        >
          <path
            d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"
          />
        </svg>
      </label>
    </div>

    <div class="col-sm-6 d-flex align-items-center justify-content-end">
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="recent"
        unchecked-value="not_recent"
        @input="onChange"
      >Trong vòng 30 ngày</b-form-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "not_recent",
    };
  },

  methods: {
    handleChange(event) {
      this.$store.dispatch("updateHistoryQuery", event.target.value);
      // alert(event.target.tagName);
    },

    onChange () {
      this.$store.dispatch("setListHistory", this.status);
    },
  },
};
</script>

<style scoped>
.inp {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  height: 53px;
}
.inp .border {
  position: absolute;
  left: 0;
  bottom: 0;
  fill: none;
}
.inp .border path {
  stroke: #c8ccd4;
  stroke-width: 2;
}
.inp .border path d {
  transition: all 0.2s ease;
}
.inp .check {
  position: absolute;
  top: 20px;
  right: 20px;
  fill: none;
  transform: translate(0, 9px) scale(0);
  transition: all 0.3s cubic-bezier(0.5, 0.9, 0.25, 1.3);
  transition-delay: 0.15s;
}
.inp .check path {
  stroke: rgb(17, 17, 17);
  stroke-width: 2;
}
.inp input {
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;
}
.inp input:focus {
  outline: none;
}
.inp input:focus + .border path {
  stroke: rgb(13, 13, 14);
}
.inp input:valid + .border path {
  animation: elasticInput 0.8s ease forwards;
}
.inp input:valid + .border + .check {
  transform: translate(0, 0) scale(1);
}
::placeholder {
  color: #9098a9;
}
</style>