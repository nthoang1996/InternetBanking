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
          <HeaderListContact />
          <hr />
          <div class="my-list overflow-auto full-width">
            <div v-for="item in getListContact" :key="item.id" class="row mb-2 full-width">
              <ContactItem :data="item" class="full-width" />
            </div>
          </div>
        </div>
        <div class="col-sm-7">
          <SendMoney />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContactItem from "./ContactItem";
import HeaderListContact from './HeaderListContact';
import SendMoney from './SendMoney';
export default {
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
    this.$store.dispatch("setListContact");
  },
  computed: {
    ...mapGetters(["getCurrentPage", "getListContact"])
  },
  components: { ContactItem, HeaderListContact, SendMoney }
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