<template>
    <div>
        <p class="txtTitle">LỊCH SỬ GIAO DỊCH</p>
        <b-container class="mb-3">
            <b-row>
                <b-col class="">
                    <div class="divfilter hide">
                        <FilterItem />
                    </div>
                    
                    <div class="card">
                        <div class="card-header title">
                            TÀI KHOẢN KHÁCH HÀNG
                        </div>

                        <div class="card-content">
                            <b-row class="divInfor">
                                <b-col cols="4" class="divInforTitle">Họ tên khách hàng: </b-col>
                                <b-col cols="6" class="txtName">Phan Công Minh</b-col>
                            </b-row>
                            <b-row class="divInfor">
                                <b-col cols="4" class="divInforTitle">Số điện thoại: </b-col>
                                <b-col cols="6" class="txtPhone">012645315</b-col>
                            </b-row>
                            <b-row class="divInfor">
                                <b-col cols="4" class="divInforTitle">Địa chỉ: </b-col>
                                <b-col cols="6" class="txtAddress">71 Xuân Hồng, quận Tân Bình, Tp. HCM</b-col>
                            </b-row>
                            <b-row class="divInfor">
                                <b-col cols="4" class="divInforTitle">Email: </b-col>
                                <b-col cols="6" class="txtEmail">anhsida@gc.com</b-col>
                            </b-row>
                            <b-row class="divInfor">
                                <b-col cols="4" class="divInforTitle">Số dư khả dụng: </b-col>
                                <b-col cols="6" class="txtMoney">100,000,000</b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
                <b-col class="inBank">
                    <div class="divfilter">
                        <FilterItem />
                    </div>
                    <div class="listHistoryTransfer">
                        <Transfer />
                        <Transfer />
                        <Transfer />
                        <Transfer />
                        <Transfer />
                        <Transfer />
                    </div>
                </b-col>
                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import FilterItem from './Filter'
import Transfer from './Transfer'
export default {
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
}


.divInfor{
    margin-bottom: 10px;
    margin-top: 10px;
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
    font-size: 14px;
    font-weight: bold;
    color: black;
}

.txtPhone{
font-size: 14px;
    color: black;
}

.txtAddress{
font-size: 14px;
    color: black;
}

.txtMoney{
font-size: 14px;
    color: #07a041;
    font-weight: bold;
}

.txtEmail{
font-size: 14px;
    font-style: italic;
    color: black;
}


</style>