<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-12 text-center myHeader">
          <h2>
            <b>{{getCurrentPage}}</b>
          </h2>
          <hr />
        </div>
      </div>

      <div class="row myBtn">
        <div class="col-sm-6">
          <FilterItem />
        </div>
        <div class="col-sm-6 flex-right">
          <b-button variant="danger" @click="back">
            <i class="fa fa-arrow-left"></i>&nbsp;Quay lại
          </b-button>
          <b-button variant="info" @click="CreateDebtReminder">
            <i class="fa fa-plus-circle"></i>&nbsp;Tạo nhắc nợ
          </b-button>
        </div>
      </div>
      <hr />

      <div class="row overflow-auto full-width setup-layout">
        <div v-for="item in getCreatedListDebit" :key="item.id">
          <DebitItem_1 :data="item" class="full-width debit-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DebitItem_1 from "./DebitItem_1";
import FilterItem from "./FilterItem";
// import SendMoney from './SendMoney';
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
    this.$store.dispatch("setTheCreatedDebitList");
    this.clearDataSending();
  },
  data() {
    return {
      n_notify: 9,
    };
  },
  computed: {
    ...mapGetters(["getCurrentPage", "getCreatedListDebit"]),
  },
  methods: {
    CreateDebtReminder() {
      this.clearDataSending();
      return this.$router.push("/dashboard/create_debt_reminder");
    },
    back(){
      this.$store.dispatch("updateDebtQuery", '');
      return this.$router.push("/dashboard/manage_debit");
    }
  },
  components: { FilterItem, DebitItem_1 },
};
</script>

<style scoped>
.card-body{
  padding-top: 10px;
}

.myHeader{
  box-sizing: border-box;
  height: 80%;
}

.debit-item {
  margin: 0 20px 15px 20px;
}

.setup-layout {
  display: flex;
}

.myBtn {
  padding-right: 0px;
  border-radius: 1.5rem;
  height: 40px;
}

.myBtn button {
  border-radius: 1.5rem;
  width: 160px;
  height: 40px;
  padding: 6px;
  margin-left: 1rem;
}

.setup-layout {
  display: flex;
  justify-content: flex-start;
}

.fa-bell-color {
  background-color: #fff !important;
  color: #ddd;
}

.notify {
  position: relative;
}

.notify:active {
  color: #eee;
}

.count_notify {
  font-size: 12px;
  position: absolute;
  left: 60%;
}

.flex-right{
  display: flex;
  justify-content: flex-end;
}
</style>