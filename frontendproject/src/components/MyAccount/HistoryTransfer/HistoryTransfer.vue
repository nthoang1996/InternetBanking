<template>
    <div>
        <p class="txtTitle">LỊCH SỬ GIAO DỊCH</p>
        <b-container class="mb-3">
            <b-row>
                <b-col class="">
                    <div class="divfilter hide">
                        <FilterItem />
                    </div>
                    <p class="txtInfor">THÔNG TIN KHÁCH HÀNG</p>   
                    <div v-for="item in getAccountCustomerActive" :key="item.id" class="card-content">
                        <p>
                            <span class="txtTitleAccount">Họ tên khách hàng: </span>
                            <span class="txtName">{{item.name}}</span>
                        </p>
                        <p>
                            <span class="txtTitleAccount">Số tài khoản: </span>
                            <span class="txtUsername">{{item.username}}</span>
                        </p>
                        <p>
                            <span class="txtTitleAccount">Số điện thoại: </span>
                            <span class="txtPhone">{{item.phone}}</span>
                        </p>
                        <p>
                            <span class="txtTitleAccount">Địa chỉ: </span>
                            <span class="txtAddress">{{item.address}}</span>
                        </p>
                        <p>
                            <span class="txtTitleAccount">Email: </span>
                            <span class="txtEmail">{{item.email}}</span>
                        </p>
                        <p>
                            <span class="txtTitleAccount">Số dư khả dụng: </span>
                            <span class="txtMoney">{{item.bank_balance}}</span>
                        </p>
                    </div> 
                </b-col>

                <b-col class="inBank">
                    <div class="divfilter">
                        <FilterItem />
                    </div>
                    <div class="listHistoryTransfer">
                        <div class="andi" v-if="getListHistoryAccountCustomer.length === 0" >Tài khoản chưa có lịch sử giao dịch</div>
                        <div v-for="item in getListHistoryAccountCustomer" :key="item.id" >
                            <Transfer :data=item />
                        </div>
                    </div>
                </b-col>
                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import FilterItem from './Filter'
import Transfer from './Transfer'
import mixin from '../../../Mixin';
import { mapGetters } from "vuex";

export default {
    mixins: [mixin],
    mounted(){
        this.$store.dispatch("updateListHistoryTransfer", "");
        this.$store.dispatch("updateAccountCustomerActiveTwo", "");        
        this.$store.dispatch("updateHistortAccountCustomer","");
    },
    computed: {
    ...mapGetters(["getAccountCustomerActive", "getListHistoryAccountCustomer"])
    },
    components: { FilterItem, Transfer },
}
</script>

<style scoped>

.inBank{
    margin-right: 15px;
    margin-bottom: 15px;
}

.outBank{
    margin-left: 15px;
    margin-bottom: 15px;

}

.txtTitleSmall{
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #777;
    opacity: 0;
    margin-bottom: 25px;
}

.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 15px;
}
.divfilter{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    margin-bottom: 25px;
}
.listHistoryTransfer{
    height: 450px;
    overflow: auto;
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb{
    background: #999;
    border-radius: 6px;
    padding-left: 10px;
}

.hide {
    opacity: 0 !important;
}

.inforCustomer{
    margin-left: 10px;
    padding: 40px 30px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    background-color: #fff;
}

.card-content {
    padding: 20px;
    margin-left: 30px;    
}

.divInforTitle{
    font-size: 14px;    
    font-weight: 500;
    color: black;
}

.title{
    text-align: center;
    font-weight: bold;
    color: #fff;
    background-color: black;
}

.txtName {
    font-size: 18px;
    font-weight: bold;
    color: black;
}

.txtPhone{
    font-size: 17px;
    color: black;
}

.txtAddress{
    font-size: 17px;
    color: black;
}

.txtMoney{
    font-size: 17px;
    color: blue;
    font-weight: bold;
}

.txtEmail{
    font-size: 17px;
    font-style: italic;
    color: black;
}

.txtUsername{
    color: black;
    font-weight: bold;
}

.andi{
    display: block;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
}

.txtInfor{
    font-weight: bold;
    font-size: 20px;
    color: #000;
    text-align: center;
}

.txtTitleAccount{
    font-size: 17px;
    font-weight: bold;
}

</style>