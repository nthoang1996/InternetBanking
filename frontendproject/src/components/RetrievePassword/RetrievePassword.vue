<template>
  <div class="anchor">
    <div class="h-75">
      <div>
        <CaroselHome :srcImage="srcImage" />
      </div>
    </div>
    <div v-if="visible">
      <ForgetPassword @verified = "changeVisible"/>
    </div>
    <div v-else>
      <CreateNewPassword />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CaroselHome from "../Login/CaroselHome.vue";
import caroselPic1 from "../../assets/carosel1.jpg";
import caroselPic2 from "../../assets/carosel2.jpg";
import caroselPic3 from "../../assets/carosel3.jpg";
import ForgetPassword from "./ForgetPassword.vue";
import CreateNewPassword from "./CreateNewPassword.vue";
const srcImage = [caroselPic1, caroselPic2, caroselPic3];
export default {
  name: "Body",
  computed: {
   ...mapGetters(["getCurrentPage"])
  },
  data() {
    return { 
      srcImage: srcImage,
      visible: true
     };
  },
  methods: {
    changeVisible() {
      this.visible = false;
    }
  },
  components: {CaroselHome,ForgetPassword,CreateNewPassword}
};
</script>

<style>
.anchor{
    position: relative;
}

</style>