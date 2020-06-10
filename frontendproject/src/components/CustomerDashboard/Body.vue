<template>

  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- <%- include('sidebar'); -%> -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- <%- include('topbar'); -%> -->
        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <h1 class="h3 mb-2 text-gray-800">Tất Cả Sản Phẩm</h1>
        
          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Sản Phẩm</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Chọn</th>
                      <th>ID</th>
                      <th>Tên Mặt Hàng</th>
                      <th>Loại Hàng</th>
                      <th>Số Lượng Còn Lại</th>
                      <th>Số Lượng Quy Định</th>
                      <th>Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <%list.forEach(function(item){%>
                    <tr>
                      <td> <input type="checkbox"/></td>
                      <td> <%=item.id%></td>
                      <td> <%=item.name%></td>
                      <td> <%=item.type%></td>
                      <td> <%=item.amount%></td>
                      <td> <%=item.minimum%></td>
                      <td>
                        <button type="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#addProduct"
                        data-id=<%=item.id%>
                        data-name="<%=item.name%>"
                        data-type="<%=item.type%>"
                        data-amount="<%=item.amount%>"
                        data-minimum="<%=item.minimum%>"
                        data-provider="<%=item.provider%>"
                        >Chi Tiết Sản Phẩm</button>
                        <button type="button" class="btn btn-danger">Xóa</button>
                      </td>
                    </tr>
                    <%})%> -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>