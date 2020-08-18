<template>
  <div class="card m-1" style="height: 100%">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-12 text-center myHeader">
          <h2>
            <b>{{getCurrentPage}}</b>
            <button @click="resertNotify" class="float-right my-custom-btn">
              <i class="fa fa-bell notify">
                <span
                  v-if="getTotalNotify > 0"
                  class="badge badge-danger count_notify"
                >{{getTotalNotify}}</span>
              </i>
              <TaskNotify v-if="visible" class="notify-container" />
            </button>
          </h2>
          <hr />
        </div>
      </div>

      <div class="row myBtn">
        <div class="col-sm-6">
          <FilterItem />
        </div>
        <div v-if="!visible" class="col-sm-6 flex-right">
          <b-button variant="primary" @click="ShowMineDebtReminder">
            <i class="fa fa-user"></i>&nbsp;Nhắc nợ đã tạo
          </b-button>
        </div>
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
import TaskNotify from "./TaskNotify";
//import SendMoney from './SendMoney';
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
    this.$store.dispatch("setListDebit");
    this.$store.dispatch("setTotalNotify");
    this.clearDataSending();
    this.test();
  },
  data() {
    return {
      visible: false,
      resert: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentPage", "getListDebit", "getTotalNotify"]),
  },
  methods: {
    test() {
      console.log("time_2", this.getTotalNotify);
    },
    CreateDebtReminder() {
      this.clearDataSending();
      return this.$router.push("/dashboard/create_debt_reminder");
    },
    ShowMineDebtReminder() {
      this.$store.dispatch("updateDebtQuery", "");
      return this.$router.push("/dashboard/mine_debt_reminder");
    },
    async resertNotify() {
      await mixin.methods.handleBeforeCallServer();
      this.visible = !this.visible;
      this.$store.dispatch("updateTotalNotify", { value: 0, count: 0 });

      // resert toàn bộ status về 0
      if (this.resert) {
        const url = "http://localhost:3000/customer/resert_notify";
        await fetch(url, {
          method: "get",
          headers: {
            "x-access-token": localStorage.internetbanking_accesstoken,
          },
        });
      }
      this.resert = !this.resert;
    },
  },
  components: { FilterItem, DebitItem, TaskNotify },
};
</script>

<style scoped>
.card-body {
  padding-top: 10px;
}

.myHeader {
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

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.my-custom-btn {
  border: none;
  background-color: #fff;
  outline: none;
  position: relative;
}

.notify-container {
  position: absolute;
  background-color: #ddd;
  width: 250px;
  left: -220px;
  top: 80%;
  z-index: 1;
}
</style>