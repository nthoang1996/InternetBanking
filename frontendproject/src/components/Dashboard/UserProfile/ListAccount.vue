<template>
  <div class="overflow-auto my-list">
    <b-list-group>
      <AccountItem v-for="item in getListAccount" :key="item.id" :data="item" />
    </b-list-group>
  </div>
</template>

<script>
import AccountItem from "./AccountItem";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getListAccount"])
  },
  mounted() {
    this.$store.dispatch("getListAccount");
  },
  components: { AccountItem }
};
</script>

<style scoped>
.my-list {
  height: 450px;
}
</style>