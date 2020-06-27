<template>
    <div>
        <b-container class="bv-example-row">
            <p class="txtTitle mb-4">NẠP TIỀN TÀI KHOẢN</p> 
            <b-row>
                <b-col class="rowLeft shadow">
                    <p class="txtTitleSmall">Thông tin tài khoản</p>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Họ và tên: </b-col>
                        <b-col cols="6" class="">Phan Công Minh</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Số điện thoại: </b-col>
                        <b-col cols="6" class="">0356845512</b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Email: </b-col>
                        <b-col cols="6" class="">congminhphan@gmail.com </b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Địa chỉ: </b-col>
                        <b-col cols="6" class="">389/10 Ngô Gia Tự, phường 3, quận 10, Tp. HCM </b-col>
                    </b-row>
                    <b-row class="divInfor">
                        <b-col cols="4" class="divInforTitle">Số dư tài khoản: </b-col>
                        <b-col cols="6" class="txtmoney">25,000,000</b-col>
                    </b-row>

                </b-col>
                <b-col class="rowRight shadow">
                    <p class="txtTitleSmall">Nạp tiền</p>
                    <b-form @submit="onSubmit" v-if="show">
                        <b-form-group id="txtInputMoney" label="Nhập số tiền cần nạp:" label-for="inputMoney" >
                            <b-form-input id="inputMoney" v-model="form.money" type="text"></b-form-input>
                            <span class="txtInputInvalid">Input Invalid</span>
                        </b-form-group>
                        <div class="divButtonSubmit">
                            <b-button type="submit" variant="primary">Nạp tiền</b-button>
                        </div>
                    </b-form>
                </b-col>
            </b-row>
            <div class="divChangAccount">  
                <p class="txtChangeAccount">Đổi tài khoản >></p>

            </div>
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    money: '',    
                },
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
        }
    }
</script>

<style scoped>
.txtTitle{
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 20px;
}
.rowLeft{
    margin-right: 20px;
    border-radius: 7px;
    padding: 40px;
}
.rowRight{
    padding: 40px;
    margin-left: 20px;
    border-radius: 7px;    
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