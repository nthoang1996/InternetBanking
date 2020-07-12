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
        <div class="col-sm-5 my-border-right">
          <HeaderListHistory />
          <hr />
          <div class="my-list overflow-auto full-width">
            <div v-for="item in getListHistory" :key="item.id" class="row mb-2 full-width">
              <HistoryItem :data="item" class="full-width" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HistoryItem from "./HistoryItem";
import HeaderListHistory from './HeaderListHistory';
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  mounted() {
    console.log("abc: " + this.$route.path);
    this.$store.dispatch("setCurrentPage", this.$route.path); //query === this.$route.path === /dashboard/list_history
    this.$store.dispatch("setListHistory");
    this.clearDataSending();
  },
  computed: {
    ...mapGetters(["getCurrentPage", "getListHistory"])
  },
  components: { HistoryItem, HeaderListHistory }
};
</script>

<style scoped>
.my-list {
  height: 800px;
}
.full-width {
  width: 100%;
}
.my-border-right{
    border-right: 3px double black;
}
</style>