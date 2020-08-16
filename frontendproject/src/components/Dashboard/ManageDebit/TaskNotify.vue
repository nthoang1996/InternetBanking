<template>
  <div>
      <h3>Thông báo</h3>
      <div v-for="item in getListNotify" :key="item.id">
          <ItemNotify :data="item" />
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemNotify from "./ItemNotify";
export default {
    mounted() {
        this.$store.dispatch("setListNotify");
    },
    computed: {
    ...mapGetters(["getListNotify"])
    },
    components: {ItemNotify}
};
</script>

<style lang="scss" scoped>
</style>