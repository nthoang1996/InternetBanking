<template>
  <div>
    <b-card :title="data.name_contact" :sub-title="data.des_id" class="my-card">
        <b-card-text>
      <em>Ngân hàng: {{data.bank_name}}</em>
    </b-card-text>
       <b-button variant="info" class="mr-1"><i class="fa fa-edit"></i>&nbsp;Cập nhật</b-button>
      <b-button variant="danger" class="mr-1"><i class="fa fa-trash"></i>&nbsp;Xóa</b-button>
      <b-button variant="success"><i class="fa fa-paper-plane"></i>&nbsp;Chuyển khoản</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
    props: ['data'],
};
</script>

<style scoped>
.my-card{
    width: 100%;
}
</style>