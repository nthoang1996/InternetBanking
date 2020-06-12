<template>
  <div class="my-footer pt-2">
    <div class="mt-3 my-padding-left my-container">
      <span class="my-title pl-3">LIÊN HỆ</span>
      <FooterContainer v-bind:data="data.contact" />
    </div>
    <div class="mt-3 my-container">
      <span class="my-title pl-3">TÌM USTechbank</span>
      <FooterContainer v-bind:data="data.founder" />
    </div>
    <div class="mt-3 my-container">
      <span class="my-title pl-3 ml-5">THÔNG TIN</span>
      <div class="row">
        <div class="col-sm-6">
          <FooterContainer v-bind:data="data.information_1" />
        </div>
        <div class="col-sm-6">
          <FooterContainer v-bind:data="data.information_2" />
        </div>
      </div>
      <div class="row"></div>
    </div>
    <div class="mt-3 my-container ml-5">
      <span class="my-title pl-3">CÔNG CỤ TÍNH TOÁN</span>
      <FooterContainer v-bind:data="data.tool" />
    </div>
  </div>
</template>

<script>
import data from "../assets/info.json";
import FooterContainer from "./FooterContainer.vue";
export default {
  name: "Footer",
  data(){
      return {data: data.footer}
  },
  components: { FooterContainer }
};
</script>

<style scoped>
.my-footer {
  background: #005030 !important;
  min-height: 200px;
  display: flex;
  align-items: flex-start;
}

.my-padding-left {
  margin-left: 20%;
}

.my-title {
  color: #ffffff;
  font-family: "Bitter", serif;
  font-size: 15px;
  font-weight: bold;
  display: block;
}

.my-container {
  width: 15%;
  display: inline-block;
}

.my-footer-text {
  color: #ffffff;
  font-family: "Bitter", serif;
  font-size: 12px;
  display: block;
}
</style>