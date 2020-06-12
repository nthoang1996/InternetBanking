<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <router-link to="/" class="sidebar-brand mb-3">Xin chào <br>{{getUser.name}}</router-link>


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
      <h6 :class="item.class" style="color:white; font-weight: bold;">&nbsp;{{item.name}}</h6>
    </router-link>

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
    this.$store.dispatch("setCurrentPage", "Thông tin cá nhân");
    this.$store.dispatch("setDashBoard");
  },
  computed: {
    ...mapGetters(['getUser', 'getCurrentPage', 'getListDashBoard'])

    // visibleTasks() {
    //   // return this.$store.state.tasks;
    //   return this.$store.getters.visibleTasks;
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>