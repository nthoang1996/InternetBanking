<template>
    <div>
        <b-card no-body class="mb-3">
            <b-row no-gutters>
                <b-col>
                    <div class="content">
                        <span class="txtName">Họ tên khách hàng: </span>
                        <span class="name">Ngô Văn Kiều</span>
                        <br>
                        <span class="txtName">Địa chỉ: </span>
                        <span class="txtInfor">389/10 Ngô Gia Tự, phường 3, quận 10, TP.HCM</span>
                        <br>
                        <span class="btnTransfer">Nạp tiền</span>
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
                        <span class="btnViewHistory">Lịch sử giao dịch</span>                    
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

.txtName{
    font-size: 13px;
    color: rgb(83, 83, 83);
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
    background-color: #0d6628;
    padding: 3px 6px;
    color: #fff;
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
    color: #ecf1e5;
    padding: 2px 5px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
}

.btnViewHistory{
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: #fe0000;
    color: #fff;
    padding: 2px 5px;
    border-radius: 4px;
   cursor: pointer;
}
</style>