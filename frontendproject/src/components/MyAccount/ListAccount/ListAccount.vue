<template>
    <div class="cont">
        <b-container>
            <p class="txtTitle">DANH SÁCH KHÁCH HÀNG</p>
            <div class="divfilter">
                <FilterAccount />
            </div>    
            <div class="listAccount" id="thanhcuon">
                <div v-for="item in getListAccountCustomer" :key="item.id">
                    <Account :data="item" />
                </div>
            </div>
        </b-container>

    </div>
</template>


<script>
import Account from './Account';
import FilterAccount from './FilterAccount';
import { mapGetters } from "vuex";
import mixin from '../../../Mixin';
export default {
    mixins: [mixin],
    mounted(){
        this.$store.dispatch("setListAccountCustomer");
        this.$store.dispatch("updateListAccountCustomer", "");
        this.clearDataSending();
    },
    components:{ Account, FilterAccount },
    computed: {
    ...mapGetters(["getListAccountCustomer"])
    },
}
</script>

<style scoped>

.cont{
    margin-left: 20px;
    margin-right: 20px;
}
.txtTitle{
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 10px;
}

.divfilter{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    margin-bottom: 0px;
}

.listAccount{
    overflow: auto;
    margin-top: 25px;
    margin-bottom: 20px;
    height: 470px;
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb{
    background: #888;
    border-radius: 6px;
    padding-left: 10px;
}


</style>