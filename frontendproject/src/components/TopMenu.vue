<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-nav">
    <div class="col-sm-1"></div>
    <div class="col-sm-3 company-name">USTechbank</div>
    <div>
      <a class="nav-text text-center my-link" href="#">Trang chủ</a>
      <a class="nav-text text-center my-link" href="#">Giới thiệu</a>
      <a class="nav-text text-center my-link" href="#">Điều kiện & Điều khoản</a>
      <a class="nav-text text-center my-link" href="#">Hướng dẫn sử dụng</a>
      <a class="nav-text text-center my-link nav-final" href="#">Bảo mật trực tuyến</a>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.company-name {
    color: #f0efc9;
    font-family: 'Trocchi', serif;
    font-size: 45px;
    font-weight: normal;
    line-height: 48px;
    margin: 0;
}

.nav-text {
    font-family: 'Enriqueta', arial, serif;
    line-height: 1.25;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    border-right: 2px solid black;
    color: #ffffff !important;
}

.my-nav {
    background: #005030 !important;
}

.nav-final {
    border-right: none !important;
}

.my-link:hover {
    text-decoration: none;
    color: #1ee86f !important;
    cursor: pointer;
}
</style>