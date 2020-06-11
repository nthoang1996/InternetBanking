<template>

  <!-- Page Wrapper -->
  <div id="wrapper">
    <SideBar />
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <router-view></router-view>
      <button @click="deleteLocal($event)">Delete</button>
    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import SideBar from "./SideBar";
    export default {
        components: {SideBar},
        methods:{
          deleteLocal(event){
            console.log(event);
            localStorage.todoapp_accesstoken = "";
            localStorage.todoapp_refreshtoken = "";
            return this.$router.push('/');
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>