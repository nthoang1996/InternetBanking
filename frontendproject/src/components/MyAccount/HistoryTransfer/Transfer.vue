<template>
    <div class="mb-3">
        <b-card class="">
            <span class="spanTitle">Người gửi: </span>
            <span class="txtNameFrom">Bạn</span>
            <br>
            <span class="spanTitle">Loại giao dịch: </span>
            <span class="txtTypeTransfer">liên ngân hàng</span>
            <br>
            <span class="spanTitle">Tin nhắn: </span>
            <span class="txtMessage">tiền cá độ đá bóng</span>
        </b-card>  
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.spanTitle{
    font-size: 13px;
    color: darkgrey;
}

.txtNameTo{
    font-size: 18px;
    color: #4242fb;
    font-weight: 600;
}

.txtNameFrom{
    font-size: 18px;
    color: #4242fb;
    font-weight: 600;
}

.txtCoin{

}

.txtSendCoin {

}

.txtTypeTransfer{
    font-size: 15px;
    font-weight: 600;
}

.txtMessage{
    font-size: 14px;
    color: black;
}
</style>