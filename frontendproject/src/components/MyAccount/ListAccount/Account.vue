<template>
    <div>
        <b-card no-body class="mb-3">
            <b-row no-gutters>
                <b-col cols="7">
                    <div class="content">
                        <span class="txtName">Họ tên khách hàng: </span>
                        <span class="name">{{data.name}}</span>
                        <br>
                        <span class="txtName">Số tài khoản: </span>
                        <span class="txtInfor">{{data.username}}</span>
                        <br>
                        <span class="txtName">Địa chỉ: </span>
                        <span class="txtInfor">{{data.address}}</span>
                        <br>
                        <span class="btnTransfer" @click="addCoin(data.id)">
                            <i class="fa fa-share"></i>
                            Nạp tiền
                        </span>
                    </div>
                </b-col>
                <b-col cols="5">
                    <div class="content">
                        <span class="txtName">Số dư tài khoản: </span>
                        <span class="txtCoin">{{data.bank_balance}}</span>
                        <br>
                        <span class="txtName">Số điện thoại: </span>
                        <span class="txtInfor">{{data.phone}}</span>
                        <br>
                        <span class="txtName">Email: </span>
                        <span class="txtInfor">{{data.email}}</span>
                        <br>
                        <span class="btnViewHistory" @click="viewHistory(data.id)">
                            <i class="fa fa-history"></i>
                            Lịch sử giao dịch
                        </span>                    
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import mixin from "../../../Mixin";
export default {
    mixins: [mixin],
    props: ["data"],
    methods: {
        addCoin(id){
            this.$store.dispatch("updateAccountCustomerActive", id);
            return this.$router.push("/employee/recharge_customer_account");
        },

        viewHistory(id){
            this.$store.dispatch("updateAccountCustomerActive", id);
            this.$store.dispatch("getHistoryAccountCustomer", id);
            return this.$router.push("/employee/historty_transfer_customer_account");
        }
    }
}
</script>

<style scoped>
.content{
    padding: 13px;
}

.txtName{
    font-size: 13px;
    color: #000;
    font-weight: 600;
}
.name{
    font-size: 17px;
    font-weight: bold;
    color: #000;
}
.txtInfor{
    font-size: 14px;
}
.txtCoin{
    font-size: 17px;
    padding: 3px 6px;
    color: #000;
    font-weight: bold;
    border-radius: 8px;
}
.col-button{
    display: flex;
    justify-content: center;
    align-items: center;
}

.btnTransfer{
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: #0070f7;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.btnViewHistory{
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: #0070f7;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}
</style>