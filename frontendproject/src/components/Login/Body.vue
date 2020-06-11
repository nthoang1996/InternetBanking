<template>
  <div>
    <div class="h-75">
      <div>
        <CaroselHome :srcImage="srcImage" />
      </div>
    </div>
    <div>
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import CaroselHome from "./CaroselHome.vue";
import caroselPic1 from "../../assets/carosel1.jpg";
import caroselPic2 from "../../assets/carosel2.jpg";
import caroselPic3 from "../../assets/carosel3.jpg";
const srcImage = [caroselPic1, caroselPic2, caroselPic3];
export default {
  name: "Body",
  data() {
    return { srcImage: srcImage };
  },
  components: {CaroselHome, Login}
};
</script>

<style>


</style>