<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4>{{getCurrentPage}}</h4>
          <hr />
        </div>
      </div>
      <InfoText v-for="(value, key) in getUserVisible" :key="key" :mykey="key" :value="value"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InfoText from './InfoText';
export default {
    computed: {
    ...mapGetters(['getCurrentPage', 'getUserVisible'])
  },
  components: {InfoText},
};
</script>

<style scoped>
</style>