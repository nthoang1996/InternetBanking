<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4>{{getCurrentPage}}</h4>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 my-border-right">
          <h5>Danh sách tài khoản tiết kiệm</h5>
          <hr />
          <ListAccount />
        </div>
        <div class="col-sm-8">
          <InfoText v-for="(value, key) in getUserVisible" :key="key" :mykey="key" :value="value"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InfoText from './InfoText';
import ListAccount from './ListAccount';
export default {
    computed: {
    ...mapGetters(['getCurrentPage', 'getUserVisible', 'getListAccount'])
  },
  components: {InfoText, ListAccount},
};
</script>

<style scoped>
.my-border-right{
  border-right: 3px double black ;
}
</style>