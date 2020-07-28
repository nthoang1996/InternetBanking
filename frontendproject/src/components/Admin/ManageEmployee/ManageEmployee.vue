<template>
    <div>
        <p class="txtTitle">QUẢN LÝ NHÂN VIÊN</p>
        <b-container class="content">
            <b-row class="mb-3">
                <b-col>
                    <b-button 
                        pill 
                        variant="primary" 
                        class="ml-2"
                        @click="handleClick"
                    >
                    <i class="fa fa-plus"></i>
                    Tạo tài khoản nhân viên
                    </b-button>
                </b-col>

                <!-- -->
                <b-col>
                    <FilterEmployee />
                </b-col>
            </b-row>

            <!-- -->
            <div v-for="item in getListAccountEmployee" :key="item.id" class="listAccount">
                <AccountEmployee :data="item" />
            </div>
        </b-container>
    </div>
</template>

<script>
import mixin from "../../../Mixin";
import FilterEmployee from './FilterEmployee';
import AccountEmployee from './AccountEmployee';
import { mapGetters } from "vuex";
export default {
    mixins: [mixin],
    mounted(){
        this.$store.dispatch("setListAccountEmployee");
        //this.$store.dispatch("updateListAccountCustomer", "");
        this.clearDataSending();
    },
    methods:{
        handleClick(){
            return this.$router.push("/admin/create_account_employee");
        }
    },
    computed: {
    ...mapGetters(["getListAccountEmployee"])
    },
    components:{FilterEmployee, AccountEmployee}
}
</script>

<style scoped>
.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 15px;
}

.content{
    padding: 30px;
}

.listAccount{
    padding: 0 15px;
}
</style>