<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h2>
            <b>{{getCurrentPage}}</b>
          </h2>
          <hr />
        </div>
      </div>

      <div class="row myBtn">
        <div class="col-sm-10">
          <FilterItem />
        </div>

        <b-button variant="info" @click="CreateDebtReminder">
          <i class="fa fa-plus-circle"></i>&nbsp;Tạo Nhắc Nợ
        </b-button>
      </div>
      <hr />

      <div class="row overflow-auto full-width setup-layout">
        <div v-for="item in getListDebit" :key="item.id">
          <DebitItem :data="item" class="full-width debit-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DebitItem from "./DebitItem";
import FilterItem from "./FilterItem";
// import SendMoney from './SendMoney';
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
    this.$store.dispatch("setListDebit");
    this.clearDataSending();
  },
  computed: {
    ...mapGetters(["getCurrentPage", "getListDebit"]),
  },
  methods: {
    CreateDebtReminder() {
      this.clearDataSending();
      return this.$router.push("/dashboard/create_debt_reminder");
    }
  },
  components: { FilterItem, DebitItem },
};
</script>

<style scoped>
.debit-item{
  margin: 0 20px 15px 20px
}

.setup-layout{
  display: flex;
}

.myBtn {
  padding-right: 0;
  border-radius: 1.5rem;
}

.myBtn button {
  border-radius: 1.5rem;
}

.setup-layout {
  display: flex;
  justify-content: flex-start;
}
</style>