<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <router-link to="/dashboard" class="sidebar-brand mb-4 my-hover">Xin chào <br>{{getUser.name}}</router-link>


    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <a class="nav-link">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>{{getCurrentPage}}</span>
      </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Thao tác</div>

    <!-- Heading -->
    <!-- Nav Item - Tables -->

    <router-link :to="item.url" v-for="item in getListDashBoard" class="nav-item dropdown-header" :key="item.id">
      <h6 :class="[item.class, 'my-hover']" style="color:white; font-weight: bold;">&nbsp;{{item.name}}</h6>
    </router-link>

    <a class="nav-item dropdown-header" @click="logOut"><h6 class="fa fa-sign-out my-hover" style="color:white; font-weight: bold;">&nbsp;Thoát</h6></a>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },
  async mounted() {
    await this.$store.dispatch("initSidebar");
    await this.$store.dispatch("setDashBoard");
    this.$store.dispatch("setCurrentPage", this.$route.path);
  },
  computed: {
    ...mapGetters(['getUser', 'getCurrentPage', 'getListDashBoard'])
  },
  methods:{
    logOut: function(){
      localStorage.internetbanking_accesstoken = "";
      localStorage.internetbanking_timeaccesstokenexpire = "0";
      localStorage.internetbanking_refreshtoken = "";
      return this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.my-hover:hover{
  cursor: pointer;
  color: aqua !important;
}
</style>