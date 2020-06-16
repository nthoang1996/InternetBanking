<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <h4>{{getCurrentPage}}</h4>
          <hr />
        </div>
      </div>
        <NewContactInputName />
        <NewContactUserID />
        <NewContactCompanyInput/>     
        <NewContactButtonContainer />  
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NewContactInputName from './NewContactInputName'
import NewContactUserID from './NewContactUserID'
import NewContactCompanyInput from './NewContactCompanyInput'
import NewContactButtonContainer from './NewContactButtonContainer'
export default {
  computed: {
    ...mapGetters(["getCurrentPage"])
  },
  components: { NewContactInputName, NewContactUserID, NewContactCompanyInput,NewContactButtonContainer },
  mounted(){
      this.$store.dispatch("setCurrentPage", this.$route.path);
  }

};
</script>

<style scoped>
</style>