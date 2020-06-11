<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <router-link to="/profile" class="sidebar-brand mb-3">Xin chào <br>{{getUser.name}}</router-link>


    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <a class="nav-link" href="index.html">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Interface</div>

    <!-- Heading -->
    <!-- Nav Item - Tables -->
    <li class="nav-item dropdown-header">
      <h6 class="fa fa-inbox" style="color:white; font-weight: bold;">Quản lý sản phẩm</h6>
      <a class="nav-link" href="/product">
        <i class="fa fa-th-list" aria-hidden="true"></i>
        <span>Tất Cả Sản Phẩm</span>
      </a>
      <a class="nav-link" href="/addproduct">
        <i class="fas fa-fw fa-table"></i>
        <span>Lập Đơn Nhập Hàng</span>
      </a>
    </li>

    <li class="nav-item dropdown-header">
      <h6 class="fa fa-inbox" style="color:white; font-weight: bold;">Quản lý bình luận</h6>
    </li>
    <li class="nav-item dropdown-header">
      <h6 class="fa fa-inbox" style="color:white; font-weight: bold;" hidden>Quản lý quảng cáo</h6>
    </li>
    <li class="nav-item dropdown-header">
      <h6 class="fa fa-inbox" style="color:white; font-weight: bold;" hidden>Quản lý đặt hàng</h6>
    </li>
    <li class="nav-item dropdown-header">
      <h6 class="fa fa-inbox" style="color:white; font-weight: bold;" hidden>Quản lý thanh toán</h6>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    this.$store.dispatch("initSidebar");
  },
  computed: {
    ...mapGetters(['getUser'])

    // visibleTasks() {
    //   // return this.$store.state.tasks;
    //   return this.$store.getters.visibleTasks;
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>