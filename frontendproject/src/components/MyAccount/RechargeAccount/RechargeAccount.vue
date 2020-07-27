<template>
    <div>
        <b-container class="bv-example-row">
            <p class="txtTitle">NẠP TIỀN TÀI KHOẢN</p> 
            <b-row>
                <b-col class="rowLeft shadow-sm">
                    <div v-for="item in getAccountCustomerActive" :key="item.id">
                    <p class="txtTitleSmall">Thông tin tài khoản</p>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Họ và tên: </b-col>
                        <b-col cols="8" class="">{{item.name}}</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Số điện thoại: </b-col>
                        <b-col cols="8" class="">{{item.phone}}</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Email: </b-col>
                        <b-col cols="8" class="">{{item.email}}</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Địa chỉ: </b-col>
                        <b-col cols="8" class="">{{item.address}}</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Số dư tài khoản: </b-col>
                        <b-col cols="8" class="txtmoney">{{item.bank_balance}}</b-col>
                    </b-row>
                    </div>
                </b-col>
                
                <Recharge :data="getAccountCustomerActive" />
            </b-row>

            <div class="divChangAccount">  
                <p class="txtChangeAccount">Quay lại >></p>
            </div>
            
        </b-container>
    </div>
</template>

<script>
import mixin from "../../../Mixin";
import { mapGetters } from "vuex";
import Recharge from "./Recharge";
export default {
    mixins: [mixin],
    computed: {
    ...mapGetters(["getAccountCustomerActive"])
    },
    components:{Recharge}
}
</script>

<style scoped>
.txtTitle{
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-top: 35px;
    margin-bottom: 35px;
}
.rowLeft{
    margin-right: 20px;
    border-radius: 7px;
    padding: 40px;
    background-color: #fff;
}
.rowRight{
    padding: 40px;
    margin-left: 20px;
    border-radius: 7px; 
    background-color: #fff;   
}
.txtTitleSmall{
    font-weight: bold;
    font-size: 22px;
    text-align: center;
}
.divInfor{
    margin-top: 10px;
    font-size: 14px;
}
.divInforTitle{
    font-weight: bold;
}
.txtmoney{
    font-weight: bold;
    color:blue;
}
.txtChangeAccount{
    margin-top: 8px;
    margin-right: 5px;
    float: right;
    font-size: 14px;
    font-style: italic;
    color: dodgerblue;
    cursor: pointer;
    text-decoration: underline;
}
.divChangAccount{
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
}
.txtInputInvalid{
    font-style: italic;
    color: red;
    font-size: 13px;
    visibility: hidden;
}
#txtInputMoney{
    font-weight: bold;
    font-size: 14px;
}
.divButtonSubmit{
    display: flex;
    justify-content: center;
}
</style>