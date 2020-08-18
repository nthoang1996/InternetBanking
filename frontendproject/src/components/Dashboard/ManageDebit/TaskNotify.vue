<template>
  <div class="debt_notify">
        <h3 class="debt_notify__header">Thông báo</h3>
        <div class="debt_notify__notify-list">
            <div v-for="item in getListNotify.slice().reverse()" :key="item.id" >
            <ItemNotify :data="item" />
        </div>
        </div>
        
        <footer class="debt_notify__footer">
            <a href="#" class="debt_notify__footer-btn">Xem tất cả</a>
        </footer>
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

<style scoped>
.debt_notify__header{
    color: #666;
}

.debt_notify__footer{
    display: flex;
    margin: 10px 0;
}

.debt_notify__footer-btn{
    margin: auto;
    text-decoration: none;
    color: black;
    font-size: 14px;
}

.debt_notify__notify-list{
    overflow: auto;
}
</style>