<template>
    <div>
        <b-card no-body class="shadow-sm mt-4">
            <b-row no-gutters>
                <b-col>
                    <div class="content">
                        <span class="txtName">Họ tên khách hàng: </span>
                        <span class="name">Ngô Văn Kiều</span>
                        <br>
                        <span class="txtName">Địa chỉ: </span>
                        <span class="txtInfor">389/10 Ngô Gia Tự, phường 3, quận 10, TP.HCM</span>
                        <br>
                        <p>Nạp tiền</p>
                    </div>
                </b-col>
                <b-col>
                    <div class="content">
                        <span class="txtName">Số dư tài khoản: </span>
                        <span class="txtCoin">15,700,000</span>
                        <br>
                        <span class="txtName">Số điện thoại: </span>
                        <span class="txtInfor">0389874562</span>
                        <br>
                        <p>Lịch sử giao dịch</p>                    
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
.content{
    padding: 13px;
}
.content p{
    margin-top: 3px;
    color: red;
    margin-bottom: 0px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all .5s;
}
.content p:hover{
    text-decoration: underline;
}
.btn-naptien{
    width: 100%;
    height: 80%;
    font-size: 14px;
    font-weight: bold;
    border: solid 1px #5959ff ;
    border-radius: 7px;
    color: white;
    background-color: #5959ff;
}
.btn-khoa{
    width: 100%;
    height: 80%;
    font-size: 14px;
    font-weight: bold;
    border: solid 1px #ff4040;
    border-radius: 7px;
    color: white;
    background-color:#ff4040;
}
.txtName{
    font-size: 13px;
    color: darkgrey;
}
.name{
    font-size: 20px;
    font-weight: bold;
}
.txtInfor{
    font-size: 14px;
}
.txtCoin{
    font-size: 20px;
    font-weight: bold;
    color: rgba(49, 4, 252, 0.973);
}
.col-button{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>